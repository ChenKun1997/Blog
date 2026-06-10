export interface FrontmatterData {
  title: string
  date: string
  excerpt: string
  tags: string[]
  featured: boolean
}

function parseQuotedValue(line: string, key: string): string | null {
  const match = line.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`))
  return match ? match[1] : null
}

function parseYamlBlock(text: string): FrontmatterData {
  const result: FrontmatterData = {
    title: '',
    date: '',
    excerpt: '',
    tags: [],
    featured: false,
  }

  for (const line of text.split(/\r?\n/)) {
    const title = parseQuotedValue(line, 'title')
    if (title !== null) {
      result.title = title
      continue
    }

    const date = parseQuotedValue(line, 'date')
    if (date !== null) {
      result.date = date
      continue
    }

    const excerpt = parseQuotedValue(line, 'excerpt')
    if (excerpt !== null) {
      result.excerpt = excerpt
      continue
    }

    const tagsMatch = line.match(/^tags:\s*(\[.*\])\s*$/)
    if (tagsMatch) {
      result.tags = JSON.parse(tagsMatch[1]) as string[]
      continue
    }

    const featuredMatch = line.match(/^featured:\s*(true|false)\s*$/)
    if (featuredMatch) {
      result.featured = featuredMatch[1] === 'true'
    }
  }

  return result
}

export function parseFrontmatter(raw: string): {
  data: FrontmatterData
  content: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)

  if (!match) {
    throw new Error('Invalid markdown frontmatter')
  }

  return {
    data: parseYamlBlock(match[1]),
    content: match[2],
  }
}
