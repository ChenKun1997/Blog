export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  featured: boolean
  readingTime: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  featured: boolean
  readingTime: number
}

export interface PostsByMonth {
  month: string
  year: number
  posts: BlogPostMeta[]
}
