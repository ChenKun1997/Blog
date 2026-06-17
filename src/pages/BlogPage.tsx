import BlogPostItem from '../components/BlogPostItem'
import { getPostsByYear } from '../lib/posts'

export default function BlogPage() {
  const postsByYear = getPostsByYear()

  return (
    <div className="container page">
      <h1 className="page-title">博客</h1>

      {postsByYear.length === 0 ? (
        <p className="empty-state">暂无文章。</p>
      ) : (
        postsByYear.map((group) => (
          <section key={group.year} className="year-group">
            <h2 className="year-label">{group.year}</h2>
            <ul className="post-list">
              {group.posts.map((post) => (
                <BlogPostItem key={post.slug} post={post} />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  )
}
