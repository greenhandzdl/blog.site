# 排查记录：Fish 启动报 Disk Quota Exceeded 错误

## 问题现象

进入 TTY 或打开新的 Fish Shell 时，终端抛出如下错误，且无法在 `/tmp` 下创建或写入新文件：

```shell
cat: write error: Disk quota exceeded
```

## 问题诊断

### 1. 定位受影响的目录

首先尝试在 `/tmp` 写入测试文件，确认是 `/tmp`（通常挂载为 `tmpfs`）触发了写保护，而非物理磁盘满：

```shell
❯ touch /tmp/test_write_123
❯ echo "hello" > /tmp/test_write_123 2>&1
write: Disk quota exceeded
```

### 2. 检查用户配额 (Quota) 状态

使用 `quota-tools`（如果不用可以跳过） 工具检查当前用户 `greenhandzdl` 在各个文件系统上的配额使用情况：

```shell
❯ quota -u greenhandzdl 2>/dev/null

Disk quotas for user greenhandzdl (uid 1000): 
  Filesystem  blocks    quota    limit    grace   files   quota   limit   grace
       tmpfs 13109408  13109411 13109411             115       0       0   
```

> **诊断结论：**
>
> 用户的 `blocks` 使用量（已用约 **12.5 GB**）已经达到了设置的硬限制 `limit`（13109411 blocks），导致无剩余空间可用。

### 3. 排查引发报错的具体源头

在 Fish 的初始化脚本中，追踪是哪一段引发了 `cat: write error`。通过分段执行发现是 `starship` 提示符初始化时使用了 `psub`（Fish 的进程替换功能，会在 `/tmp` 产生临时文件）而报错：

```shell
# 具体排查用到命令
ps auxf | grep -A5 fish
# 根据上面输出找到是starship问题
starship init fish | source 
starship init fish 2>&1
starship prompt 2>&1
ls -la ~/.config/starship.toml 2>&1
```



```shell
❯ starship init fish | source 
cat: write error: Disk quota exceeded
```

### 4. 分析空间占用大户

通过 `find` 命令分析 `/tmp` 下属于当前用户的大文件：

```shell
❯ find /tmp -user greenhandzdl -ls 2>/dev/null
...
 5483 3675484 -rw------- 1 greenhandzdl greenhandzdl 3763692048 Jul 23 18:51 /tmp/hf_upload_delta/models/sft-merged/model.safetensors
 5478 3675484 -rw------- 1 greenhandzdl greenhandzdl 3763692048 Jul 23 18:51 /tmp/hf_upload_delta/models/dpo-merged/model.safetensors
 5261 3675484 -rw------- 1 greenhandzdl greenhandzdl 3763692048 Jul 23 18:45 /tmp/hf_git_push/models/dpo-merged/model.safetensors
...
```

> **根因分析：**
>
> 之前运行的大模型训练（LLM Train）任务在 `/tmp` 临时打包并上传 HuggingFace，留下了数个 **3.5GB+** 的 `.safetensors` 模型权重文件，直接榨干了 `tmpfs` 的用户配额。

## 解决方案

### 方案 A：清理临时大文件（治标，推荐优先执行）

如果不打算调整配额，最直接的方法是删掉 `/tmp` 下不需要的缓存：

```shell
rm -rf /tmp/hf_* /tmp/claude-*
```

### 方案 B：扩容 tmpfs 并调整配额限制（治本）

#### Step 1. 修改 `/etc/fstab` 提升 tmpfs 上限

增加 `tmpfs` 的整体大小至 32G，并确保开启了 `usrquota`（用户配额，如果没用可以不加）功能：

```shell
# 向 /etc/fstab 追加或修改 tmpfs 挂载参数
echo "tmpfs /tmp tmpfs rw,nosuid,nodev,size=32G,nr_inodes=2097152,inode64,huge=advise,usrquota 0 0" | sudo tee -a /etc/fstab
```

#### Step 2. 重新挂载使其生效

Bash

```shell
sudo mount -o remount /tmp
sudo systemctl daemon-reload
```

#### Step 3. 调整用户硬配额限制

通过 `edquota` 交互式编辑器，调高 `greenhandzdl` 在 `tmpfs` 上的 `blocks` 的 `soft` 和 `hard` 限制值：

```shell
sudo edquota -u greenhandzdl
```

#### Step 4. 验证修改结果

最后，检查配额以确认限制已成功放开：

```shell
# 查看个人配额
quota -u greenhandzdl

# 查看文件系统整体配额报告
sudo repquota -u /tmp
```

## 相关参考

- [Arch Wiki - Disk Quota](https://wiki.archlinux.org/title/Disk_quota)
