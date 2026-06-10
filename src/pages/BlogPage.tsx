import BlogCard from '../components/BlogCard'
import { getPostsByMonth } from '../lib/posts'

export default function BlogPage() {
  const postsByMonth = getPostsByMonth()

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Blog</h1>
        <p>
          Thoughts, tutorials, and insights about web development and
          technology.
        </p>
      </header>

      {postsByMonth.length === 0 ? (
        <p className="empty-state">No posts yet. Check back soon!</p>
      ) : (
        <div className="month-groups">
          {postsByMonth.map((group) => (
            <section key={`${group.month}-${group.year}`} className="month-group">
              <h2>
                {group.month} {group.year}
              </h2>
              <div className="post-grid">
                {group.posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
