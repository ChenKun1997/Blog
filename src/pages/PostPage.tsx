import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '../components/MarkdownContent'
import TagBadge from '../components/TagBadge'
import { siteConfig } from '../config/site'
import { formatDate, getPostBySlug } from '../lib/posts'

export default function PostPage() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    return (
      <div className="container page">
        <h1>Post Not Found</h1>
        <p>The article you are looking for does not exist.</p>
        <Link to="/blog">← Back to blog</Link>
      </div>
    )
  }

  return (
    <article className="container page post-page">
      <Link to="/blog" className="back-link">
        ← Back to blog
      </Link>

      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </div>
        <div className="tag-list">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </header>

      <MarkdownContent content={post.content} />

      <footer className="post-footer">
        <p>Written by {siteConfig.author.name}</p>
        <Link to="/blog">← Back to all posts</Link>
      </footer>
    </article>
  )
}
