import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import { siteConfig } from '../config/site'
import { getRecentPosts } from '../lib/posts'

export default function HomePage() {
  const recentPosts = getRecentPosts(6)

  return (
    <div className="container page">
      <section className="hero">
        <h1>
          Hi, I&apos;m <span className="highlight">{siteConfig.author.name}</span>
        </h1>
        <p className="hero-bio">{siteConfig.author.bio}</p>
        <div className="hero-actions">
          {siteConfig.social.github && (
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          <Link to="/blog" className="primary-button">
            Read My Blog
          </Link>
        </div>
      </section>

      <section className="recent-posts">
        <div className="section-header">
          <h2>Recent Posts</h2>
          <Link to="/blog">View all posts →</Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="empty-state">No posts yet. Check back soon!</p>
        ) : (
          <div className="post-grid">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
