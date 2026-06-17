import { Link } from 'react-router-dom'
import type { BlogPostMeta } from '../types/blog'
import { formatDateCompact } from '../lib/posts'

interface BlogPostItemProps {
  post: BlogPostMeta
}

export default function BlogPostItem({ post }: BlogPostItemProps) {
  return (
    <li className="post-item">
      <Link to={`/blog/${post.slug}`}>
        <span className="post-item-title">{post.title}</span>
        <span className="post-item-meta">
          {formatDateCompact(post.date)}
          <span className="dot">·</span>
          {post.readingTime} 分钟
        </span>
      </Link>
    </li>
  )
}
