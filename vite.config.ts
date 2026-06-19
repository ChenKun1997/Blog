import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { build, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const execFileAsync = promisify(execFile)

function copy404Plugin(): Plugin {
  return {
    name: 'copy-404',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))
    },
  }
}

/**
 * 预渲染插件：客户端构建完成后，
 *   1. 以 SSR 模式构建 entry-server.tsx → dist/server/entry-server.js
 *   2. 运行 scripts/prerender.mjs 生成各路由静态 HTML 与 sitemap.xml
 * 仅在生产构建（输出到磁盘）时执行。
 */
function prerenderPlugin(): Plugin {
  return {
    name: 'prerender',
    apply: 'build',
    // 在 copy404 之前执行：预渲染会重写 dist/index.html（根路由），
    // 之后 copy404 基于最新 index.html 复制出 404.html。
    enforce: 'pre',
    async closeBundle() {
      const distDir = resolve(__dirname, 'dist')

      // 1. 构建 SSR bundle
      await build({
        configFile: false,
        mode: 'production',
        logLevel: 'warn',
        build: {
          ssr: resolve(__dirname, 'src/entry-server.tsx'),
          outDir: resolve(distDir, 'server'),
          minify: false,
          rollupOptions: {
            output: {
              entryFileNames: 'entry-server.js',
            },
          },
        },
      })

      // 2. 运行预渲染脚本
      const { stdout, stderr } = await execFileAsync('node', [
        resolve(__dirname, 'scripts/prerender.mjs'),
      ])
      if (stdout) process.stdout.write(stdout)
      if (stderr) process.stderr.write(stderr)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // 本地开发用根路径（访问 http://localhost:5173/ 即可），
  // 生产构建用 /Blog/ 子路径以适配 GitHub Pages 项目页面。
  base: process.env.NODE_ENV === 'production' ? '/Blog/' : '/',
  plugins: [react(), prerenderPlugin(), copy404Plugin()],
})
