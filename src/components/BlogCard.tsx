import { Link } from 'react-router-dom'
import type { BlogPostMeta } from '../types/blog'
import { formatDateShort } from '../lib/posts'
import TagBadge from './TagBadge'

interface BlogCardProps {
  post: BlogPostMeta
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card-link">
        {post.featured && <span className="featured-badge">Featured</span>}
        <h3>{post.title}</h3>
        <p className="excerpt">{post.excerpt}</p>
        <div className="tag-list">
          {post.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <div className="meta">
          <time dateTime={post.date}>{formatDateShort(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </div>
      </Link>
    </article>
  )
}
