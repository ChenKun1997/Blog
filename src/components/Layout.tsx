import { Link, Outlet } from 'react-router-dom'
import { siteConfig } from '../config/site'

export default function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="site-title">
            {siteConfig.name}
          </Link>
          <nav className="site-nav">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {siteConfig.author.name}
          </p>
        </div>
      </footer>
    </div>
  )
}
