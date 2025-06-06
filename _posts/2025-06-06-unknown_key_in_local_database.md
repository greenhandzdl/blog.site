---
layout: post
title:  "unknown_key_in_local_database"
date: 2025-06-06
permalink: /unknown_key_in_local_database.html
---

# 错误解决:Arch Linux更新后出现unknown key in local database报错

* 无效:

```shell
pacman -Qqn | pacman -S -
```

* 有效([参考链接](https://bbs.archlinux.org/viewtopic.php?id=294130)):

```shell
sudo find /var/lib/pacman/local/ -type f -name "desc" -exec sed -i '/^%INSTALLED_DB%$/,+2d' {} \;
```

可能原因:

* 引用**CachyOS**软件库,与**Arch Linux**冲突