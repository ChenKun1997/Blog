// 预渲染脚本：在 vite build 之后运行，为每个路由生成含完整内容和 SEO meta 的静态 HTML。
//
// 流程：
//   1. 读取 dist/index.html 作为模板（含构建后的 <script>/<link> 资源引用与 <div id="root">）
//   2. 读取 content/posts/*.md 解析出文章列表（slug/title/date/excerpt/tags）
//   3. 对每个路由调用 SSR bundle 的 render(path)，把渲染结果注入模板的 #root，
//      同时替换 <title>、注入 meta description / og / canonical / JSON-LD
//   4. 写出 dist/{route}/index.html
//   5. 生成 dist/sitemap.xml
//
// 说明：该脚本用 Node 原生 ESM 运行（package.json type: module），
//       SSR bundle 由 vite build --ssr 生成在 dist/server/entry-server.js。

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = resolve(ROOT, 'dist')
const TEMPLATE = resolve(DIST, 'index.html')

// ---------- 文章元数据解析（Node 端独立实现，不依赖 import.meta.glob） ----------

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return null
  const block = match[1]
  const get = (key) => {
    const m = block.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'))
    return m ? m[1] : null
  }
  const tagsMatch = block.match(/^tags:\s*(\[.*\])\s*$/m)
  return {
    title: get('title') ?? '',
    date: get('date') ?? '',
    excerpt: get('excerpt') ?? '',
    tags: tagsMatch ? JSON.parse(tagsMatch[1]) : [],
  }
}

function getSlugFromPath(path) {
  const m = path.match(/\/([^/]+)\.md$/)
  return m ? m[1] : ''
}

function getAllPosts() {
  const dir = resolve(ROOT, 'content/posts')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const full = resolve(dir, f)
      const raw = readFileSync(full, 'utf8')
      const fm = parseFrontmatter(raw)
      if (!fm) return null
      return { slug: getSlugFromPath(full), ...fm }
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

// ---------- meta 注入工具 ----------

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// 与 src/config/site.ts 保持一致
const SITE_URL = 'https://chenkun1997.github.io/Blog'
const OG_IMAGE = `${SITE_URL}/og.svg`
const SITE_NAME = '陈坤的博客'
const SITE_DESC =
  '一个关于 Web 开发、技术与开发者生活的个人博客。聚焦 React、TypeScript 及现代 Web 开发，分享前端工程化、组件设计与实战经验。'
// 生产环境的 base 路径，须与 vite.config.ts 的 base 及 entry-server 的 basename 一致。
const PROD_BASENAME = '/Blog'

function buildHeadTags({ path, meta, jsonLd }) {
  const title = meta.title
  const desc = meta.description
  const canonical = meta.canonical
  const ogType = meta.ogType
  const ogTitle = meta.ogTitle ?? title
  const ogDesc = meta.ogDescription ?? desc
  const ogUrl = meta.ogUrl ?? canonical
  const publishedTime = meta.publishedTime
  const keywords = meta.keywords?.join(', ')

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(desc)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(ogDesc)}" />`,
    `<meta property="og:url" content="${escapeHtml(ogUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(ogDesc)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}" />`,
  ]

  if (keywords) {
    tags.push(`<meta name="keywords" content="${escapeHtml(keywords)}" />`)
  }
  if (publishedTime) {
    tags.push(
      `<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />`,
    )
  }
  if (jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
    )
  }
  return tags.join('\n    ')
}

// 把 SEO 标签注入模板：移除旧 <title>，在 </head> 前插入新标签；
// 把渲染结果塞进 #root 容器。
function injectIntoTemplate(template, appHtml, headTags) {
  // 移除模板里的占位 head 标签，避免预渲染注入的标签与默认占位重复。
  // 被移除的：占位 title、description、canonical、og:*、twitter:*。
  let html = template
    .replace(/\s*<title>[^<]*<\/title>/, '')
    .replace(
      /\s*<meta\s+name="description"[^>]*>/,
      '',
    )
    .replace(/\s*<link\s+rel="canonical"[^>]*>/, '')
    .replace(/\s*<meta\s+property="og:[^>]*>/g, '')
    .replace(/\s*<meta\s+name="twitter:[^>]*>/g, '')
  // 在 </head> 前注入 head 标签
  html = html.replace('</head>', `    ${headTags}\n  </head>`)
  // 注入渲染后的应用 HTML
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )
  return html
}

// ---------- 路由列表 ----------

const posts = getAllPosts()

const routes = [
  {
    path: '/',
    output: '', // → dist/index.html（根）
    meta: {
      title: `${SITE_NAME} | Web 开发与技术分享`,
      description: SITE_DESC,
      canonical: `${SITE_URL}/`,
      ogType: 'website',
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: SITE_DESC,
      author: {
        '@type': 'Person',
        name: '陈坤',
        url: 'https://github.com/ChenKun1997',
      },
    },
  },
  {
    path: '/blog/',
    output: 'blog/',
    meta: {
      title: `全部文章 | ${SITE_NAME}`,
      description: `浏览${SITE_NAME}的全部文章，涵盖 React、TypeScript、前端工程化与 Web 开发实战。`,
      canonical: `${SITE_URL}/blog/`,
      ogType: 'website',
    },
    jsonLd: null,
  },
  ...posts.map((post) => ({
    path: `/blog/${post.slug}/`,
    output: `blog/${post.slug}/`,
    meta: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      canonical: `${SITE_URL}/blog/${post.slug}/`,
      ogType: 'article',
      publishedTime: post.date,
      keywords: post.tags,
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      image: OG_IMAGE,
      author: {
        '@type': 'Person',
        name: '陈坤',
        url: 'https://github.com/ChenKun1997',
      },
      publisher: { '@type': 'Person', name: '陈坤' },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/${post.slug}/`,
      },
      keywords: post.tags.join(', '),
    },
  })),
]

// ---------- 主流程 ----------

async function main() {
  if (!existsSync(TEMPLATE)) {
    throw new Error(
      `模板不存在: ${TEMPLATE}。请确认 vite build (client) 已先执行。`,
    )
  }

  const serverEntryPath = resolve(DIST, 'server/entry-server.js')
  if (!existsSync(serverEntryPath)) {
    throw new Error(
      `SSR bundle 不存在: ${serverEntryPath}。请确认 vite build --ssr 已执行。`,
    )
  }

  const { render } = await import(serverEntryPath)
  const template = await readFile(TEMPLATE, 'utf8')

  const lastmods = []
  for (const route of routes) {
    // entry-server 用 basename="/Blog"，故传入的完整 URL 需带 /Blog 前缀，
    // 否则 StaticRouter 会因 location 不以 basename 开头而匹配失败。
    const appHtml = render(`${PROD_BASENAME}${route.path}`.replace(/\/$/, '') || PROD_BASENAME)
    const headTags = buildHeadTags(route)
    const html = injectIntoTemplate(template, appHtml, headTags)

    const outFile = resolve(DIST, route.output, 'index.html')
    await mkdir(dirname(outFile), { recursive: true })
    await writeFile(outFile, html, 'utf8')

    const post = posts.find((p) => `/blog/${p.slug}/` === route.path)
    if (post) lastmods.push({ url: route.meta.canonical, lastmod: post.date })
    else lastmods.push({ url: route.meta.canonical, lastmod: null })

    console.log(`✓ 预渲染: ${route.path}`)
  }

  // 生成 sitemap.xml
  const today = new Date().toISOString().slice(0, 10)
  const urls = lastmods
    .map(
      (u) =>
        `  <url>\n    <loc>${u.url}</loc>${
          u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : `\n    <lastmod>${today}</lastmod>`
        }\n    <changefreq>${u.url.endsWith('/blog/') || u.url === `${SITE_URL}/` ? 'daily' : 'weekly'}</changefreq>\n  </url>`,
    )
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  await writeFile(resolve(DIST, 'sitemap.xml'), sitemap, 'utf8')
  console.log(`✓ 生成 sitemap.xml（${lastmods.length} 个 URL）`)
  console.log('预渲染完成。')
}

main().catch((err) => {
  console.error('预渲染失败:', err)
  process.exit(1)
})
