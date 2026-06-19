import { Link } from 'react-router-dom'
import BlogPostItem from '../components/BlogPostItem'
import CategoryBadge from '../components/CategoryBadge'
import { EmailIcon, GitHubIcon } from '../components/SocialIcons'
import { siteConfig } from '../config/site'
import { getRecentPosts } from '../lib/posts'
import { getRecentPrompts } from '../lib/prompts'

export default function HomePage() {
  const recentPosts = getRecentPosts(5)
  const recentPrompts = getRecentPrompts(4)

  return (
    <div className="container page">
      <section className="intro">
        <h1 className="page-title">{siteConfig.name}</h1>
        <p>{siteConfig.author.bio}</p>
        <p>
          我在<Link to="/blog">博客</Link>上分享 Web 开发、React、TypeScript
          与前端工程化的实践与思考。
        </p>
      </section>

      <hr className="divider" />

      <section>
        <p className="section-label">在这里找到我</p>
        <div className="social-links">
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon />
            </a>
          )}
          {siteConfig.social.email && (
            <a
              href={`mailto:${siteConfig.social.email}`}
              aria-label="Email"
              title="Email"
            >
              <EmailIcon />
            </a>
          )}
        </div>
      </section>

      {recentPosts.length > 0 && (
        <>
          <hr className="divider" />
          <section>
            <p className="section-label">最新文章</p>
            <ul className="post-list">
              {recentPosts.map((post) => (
                <BlogPostItem key={post.slug} post={post} />
              ))}
            </ul>
          </section>
        </>
      )}

      {recentPrompts.length > 0 && (
        <>
          <hr className="divider" />
          <section>
            <p className="section-label">最新提示词</p>
            <ul className="post-list">
              {recentPrompts.map((prompt) => (
                <li key={prompt.slug} className="post-item">
                  <Link to={`/prompts/${prompt.slug}`}>
                    <span className="post-item-title">{prompt.title}</span>
                    <span className="post-item-meta">
                      <CategoryBadge category={prompt.category} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  )
}
