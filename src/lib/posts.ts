import { format, parseISO } from 'date-fns'
import { parseFrontmatter } from './frontmatter'
import type { BlogPost, BlogPostMeta, PostsByMonth } from '../types/blog'

const postFiles = import.meta.glob('../../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function getSlugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : ''
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = parseFrontmatter(raw)

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
    tags: data.tags || [],
    featured: data.featured || false,
    readingTime: calculateReadingTime(raw),
  }
}

function toMeta(post: BlogPost): BlogPostMeta {
  const { content: _, ...meta } = post
  return meta
}

export function getAllPosts(): BlogPostMeta[] {
  return Object.entries(postFiles)
    .map(([path, raw]) => toMeta(parsePost(getSlugFromPath(path), raw)))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const entry = Object.entries(postFiles).find(([path]) =>
    getSlugFromPath(path) === slug,
  )

  if (!entry) {
    return null
  }

  return parsePost(slug, entry[1])
}

export function getRecentPosts(limit = 5): BlogPostMeta[] {
  return getAllPosts().slice(0, limit)
}

export function getPostsByMonth(): PostsByMonth[] {
  const postsByMonth: Record<string, BlogPostMeta[]> = {}

  getAllPosts().forEach((post) => {
    const monthYear = format(parseISO(post.date), 'MMMM yyyy')

    if (!postsByMonth[monthYear]) {
      postsByMonth[monthYear] = []
    }

    postsByMonth[monthYear].push(post)
  })

  return Object.entries(postsByMonth)
    .map(([monthYear, posts]) => {
      const [month, year] = monthYear.split(' ')
      return {
        month,
        year: Number.parseInt(year, 10),
        posts,
      }
    })
    .sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year
      }

      return (
        new Date(`${a.month} 1, ${a.year}`).getMonth() -
        new Date(`${b.month} 1, ${b.year}`).getMonth()
      )
    })
}

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'MMMM d, yyyy')
}

export function formatDateShort(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy')
}
