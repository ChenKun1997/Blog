import { Link, NavLink, Outlet } from 'react-router-dom'
import SealLogo from './SealLogo'
import { siteConfig } from '../config/site'

export default function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="site-title" aria-label="首页">
            <SealLogo />
            {/* <span className="site-name">{siteConfig.name}</span> */}
          </Link>
          <nav className="site-nav">
            <NavLink to="/" end>
              首页
            </NavLink>
            <NavLink to="/blog">博客</NavLink>
            <NavLink to="/prompts">提示词</NavLink>
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
