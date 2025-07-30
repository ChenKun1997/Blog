// Giscus 评论系统配置
// 请在 https://giscus.app 获取你的配置信息并替换下面的值

export const giscusConfig = {
  // 你的 GitHub 仓库信息 (格式: "用户名/仓库名")
  repo: 'ChenKun1997/Blog', // 例如: 'johndoe/my-blog'
  
  // 仓库 ID (在 giscus.app 配置页面获取)
  repoId: 'R_kgDOGuk55g',
  
  // Discussion 分类 (推荐使用 "General" 或 "Announcements")
  category: 'Comment',
  
  // 分类 ID (在 giscus.app 配置页面获取)
  categoryId: 'DIC_kwDOGuk55s4Ctlpf',
  
  // 页面与 discussion 的映射方式
  // 'pathname' - 使用页面路径 (推荐)
  // 'url' - 使用完整 URL
  // 'title' - 使用页面标题
  // 'og:title' - 使用 Open Graph 标题
  mapping: 'title' as const,
  
  // 是否启用严格标题匹配
  strict: '0',
  
  // 是否启用反应表情
  reactionsEnabled: '1',
  
  // 是否发出元数据
  emitMetadata: '0',
  
  // 输入框位置 ('top' | 'bottom')
  inputPosition: 'bottom' as const,
  
  // 语言设置
  lang: 'zh-CN',
  
  // 加载方式
  loading: 'lazy' as const,
};

// 获取主题对应的 Giscus 主题名称
export function getGiscusTheme(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? 'dark' : 'light';
}

// 验证配置是否完整
export function validateGiscusConfig(): boolean {
  const requiredFields = ['repo', 'repoId', 'category', 'categoryId'];
  
  for (const field of requiredFields) {
    const value = giscusConfig[field as keyof typeof giscusConfig];
    if (!value || value.toString().startsWith('YOUR_')) {
      console.warn(`Giscus 配置不完整: ${field} 需要设置`);
      return false;
    }
  }
  
  return true;
}
