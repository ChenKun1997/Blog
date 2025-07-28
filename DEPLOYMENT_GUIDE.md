# GitHub Pages 部署指南

## 🎯 **部署目标**
将你的 Next.js 博客部署到 GitHub Pages，访问地址将是：
`https://chenkun1997.github.io/Blog`

## ✅ **预配置状态**
- ✅ Next.js 静态导出配置完成
- ✅ GitHub Actions 工作流配置完成
- ✅ 代码已推送到 GitHub 仓库
- ✅ 站点配置已更新

## 📋 **部署步骤**

### 1. **配置 GitHub Pages**

1. 访问你的 GitHub 仓库：
   ```
   https://github.com/ChenKun1997/Blog
   ```

2. 点击仓库顶部的 **Settings** 标签

3. 在左侧菜单中找到 **Pages** 选项

4. 在 **Source** 部分：
   - 选择 **GitHub Actions**
   - 这会启用自动部署

### 2. **推送更新并触发部署**

运行以下命令推送最新的配置更改：

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "Configure site for GitHub Pages deployment"

# 推送到 GitHub
git push origin master
```

### 3. **监控部署过程**

1. 访问仓库的 **Actions** 标签：
   ```
   https://github.com/ChenKun1997/Blog/actions
   ```

2. 你会看到 "Deploy to GitHub Pages" 工作流正在运行

3. 等待构建完成（通常需要 2-5 分钟）

### 4. **访问你的博客**

部署完成后，你的博客将在以下地址可用：
```
https://chenkun1997.github.io/Blog
```

## 🔧 **故障排除**

### 如果部署失败：

1. **检查 Actions 日志**：
   - 访问 Actions 标签查看错误信息
   - 常见问题通常是依赖安装或构建错误

2. **检查 Node.js 版本**：
   - 确保使用 Node.js 18 或更高版本

3. **检查构建命令**：
   ```bash
   # 本地测试构建
   npm run build
   ```

### 如果页面显示 404：

1. **检查 GitHub Pages 设置**：
   - 确保 Source 设置为 "GitHub Actions"
   - 确保仓库是公开的

2. **等待 DNS 传播**：
   - 有时需要等待几分钟才能访问

## 🎨 **自定义域名（可选）**

如果你有自己的域名：

1. 在 GitHub Pages 设置中添加自定义域名
2. 在你的域名提供商处配置 CNAME 记录
3. 更新 `src/config/site.ts` 中的 `siteUrl`

## 🔄 **后续更新**

每次你推送代码到 `master` 分支时，GitHub Actions 会自动：
1. 构建你的博客
2. 部署到 GitHub Pages
3. 更新线上版本

## 📝 **添加新博客文章**

1. 在 `content/posts/` 目录下创建新的 `.md` 文件
2. 使用正确的 frontmatter 格式
3. 提交并推送到 GitHub
4. 等待自动部署完成

## 🎉 **完成！**

你的博客现在已经部署到 GitHub Pages 上了！

访问地址：https://chenkun1997.github.io/Blog

享受你的新博客吧！🚀
