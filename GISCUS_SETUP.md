# Giscus 评论系统配置指南

本博客已集成 Giscus 评论系统，基于 GitHub Discussions 提供评论功能。请按照以下步骤完成配置。

## 🚀 快速配置

### 1. 启用 GitHub Discussions

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 向下滚动到 **Features** 部分
4. 勾选 **Discussions** 复选框

### 2. 安装 Giscus App

1. 访问 [GitHub Apps - giscus](https://github.com/apps/giscus)
2. 点击 **Install** 按钮
3. 选择要安装的仓库（你的博客仓库）
4. 授权安装

### 3. 获取配置参数

1. 访问 [giscus.app](https://giscus.app)
2. 在 **仓库** 部分输入你的仓库信息：`用户名/仓库名`
3. 选择 **页面 ↔️ discussion 映射关系**：
   - ✅ **推荐选择**：`Discussion 的标题包含页面的 pathname`
4. 选择 **Discussion 分类**：
   - ✅ **推荐选择**：`General` 或 `Announcements`
5. 复制生成的配置信息

### 4. 更新配置文件

编辑 `src/config/giscus.ts` 文件，替换以下配置：

```typescript
export const giscusConfig = {
  // 替换为你的仓库信息
  repo: 'your-username/your-repo-name',
  
  // 从 giscus.app 获取的 Repository ID
  repoId: 'R_kgDOxxxxxxx',
  
  // Discussion 分类
  category: 'General',
  
  // 从 giscus.app 获取的 Category ID  
  categoryId: 'DIC_kwDOxxxxxxx',
  
  // 其他配置保持默认即可
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'zh-CN',
  loading: 'lazy',
};
```

## 📋 配置示例

假设你的 GitHub 用户名是 `johndoe`，仓库名是 `my-blog`：

```typescript
export const giscusConfig = {
  repo: 'johndoe/my-blog',
  repoId: 'R_kgDOH1234567',
  category: 'General',
  categoryId: 'DIC_kwDOH1234567',
  // ... 其他配置
};
```

## ✅ 验证配置

配置完成后：

1. 重启开发服务器：`npm run dev`
2. 访问任意文章页面
3. 滚动到页面底部查看评论区域
4. 如果配置正确，会显示 Giscus 评论框
5. 如果配置有误，会显示配置提示信息

## 🎨 主题适配

评论系统会自动适配你的网站主题：
- 浅色模式：使用 `light` 主题
- 深色模式：使用 `dark` 主题

## 📱 响应式设计

评论系统已针对移动设备进行优化，在不同屏幕尺寸下都能正常显示。

## 🔧 自定义配置

如需自定义更多选项，可以修改 `src/config/giscus.ts` 文件：

- `mapping`: 页面与 discussion 的映射方式
- `reactionsEnabled`: 是否启用表情反应
- `inputPosition`: 评论输入框位置（'top' 或 'bottom'）
- `lang`: 界面语言

## 🐛 常见问题

### 评论不显示？

1. 检查仓库是否启用了 Discussions
2. 确认 Giscus App 已正确安装
3. 验证配置文件中的 `repo`、`repoId`、`categoryId` 是否正确
4. 检查浏览器控制台是否有错误信息

### 主题不匹配？

评论系统会自动跟随网站主题切换，如果发现不匹配，请检查：
1. 主题切换功能是否正常工作
2. 浏览器是否阻止了第三方脚本

### 权限问题？

确保：
1. 仓库是公开的，或者访问者有相应权限
2. Giscus App 有访问仓库的权限

## 📞 获取帮助

如果遇到问题，可以：
1. 查看 [Giscus 官方文档](https://giscus.app)
2. 在 [Giscus GitHub 仓库](https://github.com/giscus/giscus) 提交 Issue
3. 检查浏览器开发者工具的控制台错误信息
