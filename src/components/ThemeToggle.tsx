import { useCallback } from 'react'
import type { PointerEvent } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa6'
import { useTheme } from '../hooks/useTheme'

/**
 * 主题切换按钮，带「从点击处圆形扩散」的过渡动画（View Transitions API）。
 * 不支持的浏览器（如 Firefox）优雅降级为普通切换。
 * 图标语义：显示「点击后会变成的状态」（暗→太阳，亮→月亮）。
 */
export default function ThemeToggle() {
  const { theme, toggleThemeAt } = useTheme()
  const isDark = theme === 'dark'

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      // 扩散圆心 = 点击坐标，交给 hook 内的 View Transition 动画
      toggleThemeAt({ x: e.clientX, y: e.clientY })
    },
    [toggleThemeAt],
  )

  return (
    <button
      type="button"
      className="theme-toggle"
      onPointerDown={handlePointerDown}
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
      title={isDark ? '亮色模式' : '暗色模式'}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  )
}
