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
  base: '/',
  plugins: [react(), copy404Plugin()],
})
