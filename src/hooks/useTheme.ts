import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  // index.html 的内联脚本已提前在 <html> 上设置了 data-theme，直接读取即可，
  // 保证 React 首次渲染与首屏一致，避免闪烁。
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  // 兜底：若无属性（理论上不会发生），按系统偏好决定
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// View Transitions API 的类型补全（TS DOM lib 尚未收录）
type ViewTransition = {
  ready: Promise<void>
  finished: Promise<void>
  skipped: Promise<void>
}
type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void) => ViewTransition
}

/**
 * 主题 hook：两态（亮/暗）。
 *
 * - 首屏：data-theme 已由 index.html 内联脚本提前设置，这里只读取并同步到 state。
 * - 切换：写入 localStorage + 更新 <html data-theme>，CSS 变量随之响应。
 * - 过渡：toggleThemeAt 支持「从指定坐标圆形扩散」的 View Transition 动画，
 *   不支持的浏览器降级为普通切换。
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  // 同步到 DOM + 持久化（纯副作用，不碰 React state）
  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* localStorage 不可用时静默降级，仅本次会话生效 */
    }
  }, [])

  // 挂载时确保 DOM 与 state 一致（内联脚本已处理首屏，这里做幂等保险）
  useEffect(() => {
    applyTheme(theme)
    // 仅初始化一次，后续切换由 toggleTheme 触发
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 切换主题。
   * @param origin 扩散动画的圆心坐标（视口坐标），不传则无动画直接切换。
   */
  const toggleThemeAt = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const apply = () => {
        applyTheme(next)
        setThemeState(next)
      }

      // 无坐标或不支持 View Transition：直接切换
      const doc = document as DocumentWithVT
      if (
        !origin ||
        typeof doc.startViewTransition !== 'function' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        apply()
        return
      }

      // 计算扩散圆心与最大半径（取到视口最远角的距离，保证覆盖整屏）
      const { x, y } = origin
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )
      const root = document.documentElement
      root.style.setProperty('--theme-x', `${x}px`)
      root.style.setProperty('--theme-y', `${y}px`)
      root.style.setProperty('--theme-r', `${endRadius}px`)

      // startViewTransition 的回调内同步修改 DOM，浏览器据此拍新旧快照
      const transition = doc.startViewTransition(apply)
      transition.finished.finally(() => {
        root.classList.remove('theme-transitioning')
      })
    },
    [theme, applyTheme],
  )

  return { theme, toggleThemeAt }
}
