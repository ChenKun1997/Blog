import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '../components/MarkdownContent'
import TagBadge from '../components/TagBadge'
import { formatDate, getPostBySlug } from '../lib/posts'

export default function PostPage() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    return (
      <div className="container page">
        <h1 className="page-title">文章未找到</h1>
        <p className="empty-state">您访问的文章不存在。</p>
        <Link to="/blog">← 返回博客</Link>
      </div>
    )
  }

  return (
    <article className="container page">
      <Link to="/blog" className="back-link">
        ← 博客
      </Link>

      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime} 分钟阅读</span>
        </div>
        {post.tags.length > 0 && (
          <div className="tag-list">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <MarkdownContent content={post.content} />

      <footer className="post-footer">
        <Link to="/blog">← 返回所有文章</Link>
      </footer>
    </article>
  )
}
