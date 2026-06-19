import { parseISO, format } from 'date-fns'
import {
  PROMPT_CATEGORIES,
  type Prompt,
  type PromptCategory,
  type PromptMeta,
} from '../types/prompt'

/**
 * 提示词数据层。与 src/lib/posts.ts 对称，但 frontmatter 字段不同
 * （category / models 而非 tags），因此解析逻辑独立，不复用 frontmatter.ts。
 *
 * 注意：scripts/prerender.mjs 有一份 Node 端的副本（parsePromptFrontmatter /
 * getAllPrompts），改字段时需两边同步。
 */

const promptFiles = import.meta.glob('../../content/prompts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

interface PromptFrontmatter {
  title: string
  date: string
  excerpt: string
  category: PromptCategory
  models: string[]
  featured: boolean
}

function parseQuotedValue(block: string, key: string): string | null {
  const match = block.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'))
  return match ? match[1] : null
}

function parsePromptFrontmatter(raw: string): {
  data: PromptFrontmatter
  content: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    throw new Error('Invalid prompt markdown frontmatter')
  }

  const block = match[1]

  const modelsMatch = block.match(/^models:\s*(\[.*\])\s*$/m)
  const rawCategory = parseQuotedValue(block, 'category')

  // category 缺失或非法时回退为 text，保证渲染不崩
  const category: PromptCategory = (
    rawCategory && PROMPT_CATEGORIES.includes(rawCategory as PromptCategory)
      ? rawCategory
      : 'text'
  ) as PromptCategory

  const featuredMatch = block.match(/^featured:\s*(true|false)\s*$/m)

  return {
    data: {
      title: parseQuotedValue(block, 'title') ?? '',
      date: parseQuotedValue(block, 'date') ?? '',
      excerpt: parseQuotedValue(block, 'excerpt') ?? '',
      category,
      models: modelsMatch ? (JSON.parse(modelsMatch[1]) as string[]) : [],
      featured: featuredMatch ? featuredMatch[1] === 'true' : false,
    },
    content: match[2].trim(),
  }
}

function getSlugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : ''
}

function parsePrompt(slug: string, raw: string): Prompt {
  const { data, content } = parsePromptFrontmatter(raw)
  return { slug, ...data, content }
}

function toMeta(prompt: Prompt): PromptMeta {
  const { content, ...meta } = prompt
  void content
  return meta
}

export function getAllPrompts(): PromptMeta[] {
  return Object.entries(promptFiles)
    .map(([path, raw]) => toMeta(parsePrompt(getSlugFromPath(path), raw)))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPromptBySlug(slug: string): Prompt | null {
  const entry = Object.entries(promptFiles).find(
    ([path]) => getSlugFromPath(path) === slug,
  )
  if (!entry) {
    return null
  }
  return parsePrompt(slug, entry[1])
}

export function getRecentPrompts(limit = 5): PromptMeta[] {
  return getAllPrompts().slice(0, limit)
}

export function getPromptsByCategory(category: PromptCategory): PromptMeta[] {
  return getAllPrompts().filter((p) => p.category === category)
}

export function formatPromptDate(dateString: string): string {
  return format(parseISO(dateString), 'yyyy年M月d日')
}
