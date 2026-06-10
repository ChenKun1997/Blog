---
title: "Chrome 远程调试 Android 卡在 Pending authentication 的解决办法"
date: "2026-06-10"
excerpt: "用 Chrome 连接 Android 手机调试移动端页面时，chrome://inspect 一直看不到设备，页面提示 Pending authentication。记录排查过程和最终有效的修复步骤。"
tags: ["chrome", "android", "adb", "debug", "development"]
featured: false
---

## 问题现象

今天在用 Chrome 连接 Android 手机调试移动端页面时，打开 `chrome://inspect` 页面，**始终看不到已连接的设备**。

页面一直显示：

> Pending authentication: please accept debugging session on the device.

意思是「等待认证：请在设备上接受调试会话」。但手机上并没有弹出授权提示，或者即使反复插拔、重启，问题依旧。

## 排查过程

我先后尝试了这些常见做法，都没有解决：

- 在手机上反复开关「开发者选项」和「USB 调试」
- 更换 USB 数据线、换 USB 口
- 重启 Chrome、重启手机、重启电脑
- 在 `chrome://inspect` 里勾选 Discover USB devices

设备连接状态看起来正常，但 Chrome 就是卡在 Pending authentication，无法进入远程调试。

## 最终有效的解决办法

最后通过**重置 ADB 密钥 + 使用官方 platform-tools 重启 ADB 服务**解决了问题。完整步骤如下。

### 1. 找到 `.android` 目录

- **macOS / Linux**：`/Users/<username>/.android`
- **Windows**：`C:\Users\<username>\.android`

### 2. 删除 ADB 密钥文件

进入上述目录，删除这两个文件：

- `adbkey`
- `adbkey.pub`

这两个文件是 ADB 与设备配对时生成的 RSA 密钥。当密钥与设备侧记录不一致、或配对状态损坏时，就容易出现「一直 Pending authentication、手机却不弹授权框」的情况。删除后，下次连接 ADB 会重新生成密钥并触发授权。

> 删除前如果目录里还有其他重要配置，可以先备份整个 `.android` 文件夹。

### 3. 下载官方 platform-tools

从 Google 官方下载最新版 platform-tools：

- **Windows**：[platform-tools-latest-windows.zip](https://dl.google.com/android/repository/platform-tools-latest-windows.zip?hl=zh-cn)
- **macOS**：[platform-tools-latest-darwin.zip](https://dl.google.com/android/repository/platform-tools-latest-darwin.zip)
- **Linux**：[platform-tools-latest-linux.zip](https://dl.google.com/android/repository/platform-tools-latest-linux.zip)

### 4. 解压并放到固定路径

以 Windows 为例：将下载的 zip 解压，得到 `platform-tools` 文件夹，放到 `C:\` 根目录下，即 `C:\platform-tools`。

macOS / Linux 可以放到任意目录，例如 `~/platform-tools`，只要后续命令能进入该目录即可。

### 5. 重启 ADB 服务

打开终端，**进入 platform-tools 目录**（该目录下才有 `adb` 命令），依次执行：

```bash
adb kill-server
adb start-server
```

Windows PowerShell 示例：

```powershell
cd C:\platform-tools
.\adb kill-server
.\adb start-server
```

macOS / Linux 示例：

```bash
cd ~/platform-tools
./adb kill-server
./adb start-server
```

执行 `adb start-server` 后，如果密钥已重置，手机通常会弹出「允许 USB 调试吗？」的 RSA 指纹授权框，**务必勾选「始终允许」并点确定**。

### 6. 重新连接手机

- 用 USB 线连接电脑和手机
- 手机上开启「开发者选项」→「USB 调试」
- **USB 连接模式选择「传文件 / 文件传输（MTP）」**，不要选「仅充电」

仅充电模式下，ADB 往往无法正常通信，Chrome 也就发现不了设备。

### 7. 回到 Chrome 验证

再次打开 `chrome://inspect/#devices`，稍等几秒，应该能看到设备和可调试的 WebView / 浏览器标签页。

## 为什么这样能解决？

简要归纳一下原因：

| 环节 | 说明 |
|------|------|
| ADB 密钥损坏或不一致 | 删除 `adbkey` / `adbkey.pub` 强制重新配对 |
| 系统自带的 adb 版本过旧 | 使用 Google 官方 platform-tools 保证兼容性 |
| ADB 进程状态异常 | `kill-server` + `start-server` 干净重启服务 |
| USB 模式不对 | 传文件模式才能建立 ADB 通道 |

## 小结

遇到 `chrome://inspect` 显示 **Pending authentication: please accept debugging session on the device**，且常规排查无效时，可以按本文顺序操作：**删密钥 → 官方 adb → 重启服务 → 传文件模式重连**。我这边按这套流程走完后，设备立刻出现在 Chrome 远程调试列表里。

如果仍有问题，可以再检查：手机是否开启「USB 调试（安全设置）」、是否安装了冲突的第三方手机助手、以及 Windows 设备管理器里 Android 驱动是否正常。
