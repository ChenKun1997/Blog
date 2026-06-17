import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function copy404Plugin(): Plugin {
  return {
    name: 'copy-404',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')
      copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // 本地开发用根路径（访问 http://localhost:5173/ 即可），
  // 生产构建用 /Blog/ 子路径以适配 GitHub Pages 项目页面。
  base: process.env.NODE_ENV === 'production' ? '/Blog/' : '/',
  plugins: [react(), copy404Plugin()],
})
