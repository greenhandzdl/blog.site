## 记录wayland下使用xwayland
> 因为niri并没有自行配置xwayland环境，所以得自行配置相应窗口。

### 软件需求
* xwayland-satellite
* tmux

### 脚本
```bash
#!/bin/bash

# 检查是否传入了命令参数
if [ $# -eq 0 ]; then
    echo "用法: $0 <command> [args...]" >&2
    exit 1
fi

SESSION_NAME="xwayland_satellite"
DISPLAY_NUM=":1"

# 检查 tmux 会话是否已存在
if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
    # 启动新的 tmux 会话并在后台运行 xwayland-satellite
    tmux new-session -d -s "$SESSION_NAME" "xwayland-satellite $DISPLAY_NUM"
    echo "已启动 xwayland-satellite 在 tmux 会话 '$SESSION_NAME' 中。"
else
    echo "tmux 会话 '$SESSION_NAME' 已存在，跳过启动 xwayland-satellite。"
fi

# 设置 DISPLAY 环境变量并执行传入的命令
DISPLAY="$DISPLAY_NUM" "$@"
```