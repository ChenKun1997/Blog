import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './routes'

/**
 * 服务端渲染入口。
 * 预渲染脚本（scripts/prerender.mjs）通过 Vite SSR 构建此文件，
 * 然后调用 render(path) 得到该路由对应的 HTML 字符串。
 *
 * basename 与客户端 App.tsx 保持一致（生产为 /Blog/），
 * 这样预渲染出的内部链接 href 会带 /Blog/ 前缀，与 GitHub Pages 部署路径一致，
 * 避免在 React hydrate 之前点击链接跳到错误路径。
 *
 * location 传相对于 basename 的路径（如 /blog/slug/，不含 /Blog 前缀），
 * StaticRouter 会用 basename 拼接生成最终 href。
 */
const PROD_BASENAME = '/Blog'

export function render(url: string): string {
  return renderToString(
    <StaticRouter basename={PROD_BASENAME} location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}
