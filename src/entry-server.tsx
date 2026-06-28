import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './routes'

/**
 * 服务端渲染入口。
 * 预渲染脚本（scripts/prerender.mjs）通过 Vite SSR 构建此文件，
 * 然后调用 render(path) 得到该路由对应的 HTML 字符串。
 *
 * basename 与客户端 App.tsx 保持一致。
 * 绑定自定义域名后 GitHub Pages 以根路径提供服务，basename 为空字符串，
 * 预渲染时 location 直接传路由路径（如 /blog/slug/）。
 */
const PROD_BASENAME = ''

export function render(url: string): string {
  return renderToString(
    <StaticRouter basename={PROD_BASENAME} location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}
