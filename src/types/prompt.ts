/**
 * 提示词模块的类型定义。
 *
 * 与博客文章（types/blog.ts）保持对称的命名风格，但字段独立，
 * 互不依赖。
 */

/** 支持的提示词类别 */
export const PROMPT_CATEGORIES = ['text', 'image', 'video', 'coding'] as const

export type PromptCategory = (typeof PROMPT_CATEGORIES)[number]

/** 类别 → 中文标签 + 图标标识（图标在 CategoryBadge 组件里映射） */
export const CATEGORY_LABELS: Record<PromptCategory, string> = {
  text: 'text',
  image: 'image',
  video: 'video',
  coding: 'Coding',
}

/** 完整提示词（含正文） */
export interface Prompt {
  slug: string
  title: string
  date: string
  excerpt: string
  category: PromptCategory
  models: string[]
  featured: boolean
  content: string
}

/** 提示词摘要（列表用，不含正文） */
export interface PromptMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  category: PromptCategory
  models: string[]
  featured: boolean
}
