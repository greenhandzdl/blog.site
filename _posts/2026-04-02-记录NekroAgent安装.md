## 记录 NekroAgent 安装

### 背景介绍

> [!NOTE]
> 截止目前，[官方](https://github.com/NekroAI) 已提供 na-tools、[NekroAgentForWindows](https://github.com/NekroAI/nekro-agent-for-windows) 等工具。考虑到 Nekro-Agent-Toolkit 项目维护者较少，且个人精力有限，我计划中止该项目的进一步开发，并逐步停止维护。
>
> 此前使用备份恢复功能的用户，在完成恢复后可考虑改用 na-tools 等官方工具。
>
> 本文以 Nekro-Agent-Toolkit 未发布的 1.6.0-pre 版本作为告别之作，以弥补最后的遗憾。


### 安装步骤

1. 下载 [Docker](https://docs.docker.com/engine/install/)，Mac 用户可考虑使用 [OrbStack](https://orbstack.dev/)。

> [!NOTE]
> Windows 用户在安装 Docker Desktop 时务必启用 WSL 功能，否则只能运行 Windows Container（目前 NekroAgent 镜像暂不支持）。国内用户安装完成后建议更换国内镜像源或配置代理。

2. Fork [nekro-agent-toolkit](https://github.com/greenhandzdl/nekro-agent-toolkit) 仓库，然后运行 Generate Installer Files 工作流生成安装文件。生成完成后，将安装包上传到服务器并解压到目标安装目录。
3. 根据需要修改 `.env` 配置文件。如需切换 Preview 版本，可自行修改 `docker-compose.yml`。

> [!NOTE]
> Windows 用户在编辑 `.env` 中的安装路径时，需要手动转换文件路径格式，例如：
>
> ```bash
> C:\Users\YourName\NekroAgentToolkit -> /c/Users/YourName/NekroAgentToolkit
> ```

4. 拉取镜像（Preview 版 `kromiose/nekro-agent-sandbox:preview` 或稳定版 `kromiose/nekro-agent-sandbox:latest`）并启动服务。

```bash
sudo docker pull kromiose/nekro-agent-sandbox:preview && \
sudo docker-compose --env-file .env pull nekro_agent && \
sudo docker-compose --env-file .env up --build -d nekro_agent
```

5. 配置模型、协议端等。

> 参考资料：
>
> - [NekroDoc](https://doc.nekro.ai/)
> - [NekroDocRep](https://github.com/KroMiose/nekro-agent-doc)
> - [NapCatDoc](https://napneko.github.io/)