import type { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import BlogPage from './pages/BlogPage'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'

/**
 * 站点路由定义。
 * 客户端用 BrowserRouter（见 App.tsx），预渲染用 StaticRouter（见 scripts/prerender.mjs）。
 * 两者各自提供 Router，内部 Routes 在此处共享，避免路由逻辑重复。
 */
export function AppRoutes(): ReactNode {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<PostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
