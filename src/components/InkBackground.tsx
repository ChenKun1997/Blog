import { useEffect, useMemo, useState } from 'react'

/**
 * 飘落的水墨汉字背景。
 *
 * 设计意图：贴合站点「印章 + 楷体」的文人调性，给原本静态的页面添一点呼吸感。
 * 字符像落雪/落花一样极慢下落，颜色极淡（如同纸张里的暗纹），绝不喧宾夺主。
 *
 * 实现：
 * - 每个字符的位置 / 大小 / 时长 / 延迟在客户端随机生成，挂载后不再变化
 *   （避免每帧 JS 计算），纯 CSS 动画驱动下落，GPU 友好。
 * - 客户端 useEffect 注入，对 SSR / 预渲染的静态 HTML 零影响。
 * - 完整支持 prefers-reduced-motion：降级为静止的暗纹水印。
 * - 移动端减少字符数量，避免性能与视觉负担。
 */

// 精选汉字：文人意象 + 技术心法，呼应「陈坤的博客」气质
const INK_CHARS = [
  '墨', '思', '笔', '码', '文', '禅', '心', '悟',
  '道', '简', '静', '远', '观', '学', '行', '写',
  '言', '意', '知', '觉', '微', '虚', '云', '水',
  '光', '影', '时', '空', '理', '象',
]

// 桌面端字符数量，移动端折半
const COUNT_DESKTOP = 14

interface InkChar {
  char: string
  left: number // %
  size: number // rem
  duration: number // s（单个字符下落一圈的时长）
  delay: number // s（错峰起始）
  drift: number // px（横向漂移幅度，让下落不是纯垂直线）
  opacity: number
}

function makeChar(seed: () => number): InkChar {
  return {
    char: INK_CHARS[Math.floor(seed() * INK_CHARS.length)],
    // 多数字符偏左偏右分散，避免堆在中线遮挡正文
    left: seed() * 100,
    size: 1.5 + seed() * 2.5, // 1.5 ~ 4rem
    // 极慢：单个字符下落一圈 30~70 秒，慢到几乎察觉不到
    duration: 30 + seed() * 40,
    delay: -seed() * 60, // 负延迟，挂载即处于下落中途，画面立刻有内容
    drift: (seed() - 0.5) * 60,
    opacity: 0.04 + seed() * 0.045, // 0.04 ~ 0.085，极淡
  }
}

// 极简的种子随机数（挂载时一次性使用，保证一次会话内位置稳定）
function createRng() {
  let s = Math.floor(Math.random() * 1e9) + 1
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

export default function InkBackground() {
  // 仅在客户端挂载后才渲染字符，保证 SSR / 预渲染的静态 HTML 不含任何随机字符
  // （避免污染 SEO 抓取内容、避免首屏 HTML 带入无意义的装饰文字）。
  const [mounted, setMounted] = useState(false)
  // 是否启用动画：尊重 reduced-motion，且移动端只渲染静态暗纹（数量更少、不移动）
  const [enabled, setEnabled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setMotion = () => setEnabled(!motionQuery.matches)
    setMotion()
    motionQuery.addEventListener('change', setMotion)

    const mobileQuery = window.matchMedia('(max-width: 480px)')
    const setMobile = () => setIsMobile(mobileQuery.matches)
    setMobile()
    mobileQuery.addEventListener('change', setMobile)

    return () => {
      motionQuery.removeEventListener('change', setMotion)
      mobileQuery.removeEventListener('change', setMobile)
    }
  }, [])

  const chars = useMemo(() => {
    const count = isMobile ? Math.ceil(COUNT_DESKTOP / 2) : COUNT_DESKTOP
    const seed = createRng()
    return Array.from({ length: count }, () => makeChar(seed))
  }, [isMobile])

  // SSR / 首次渲染前不输出任何内容，保持静态 HTML 干净
  if (!mounted) return null

  return (
    <div
      className="ink-bg"
      aria-hidden="true"
      data-motion={enabled ? 'on' : 'off'}
    >
      {chars.map((c, i) => (
        <span
          key={i}
          className="ink-char"
          style={{
            left: `${c.left}%`,
            fontSize: `${c.size}rem`,
            // 全部用 CSS 变量传给动画，避免 inline opacity 被 keyframes 覆盖
            ['--dur' as string]: `${c.duration}s`,
            ['--delay' as string]: `${c.delay}s`,
            // 原始淡度：由 CSS 根据亮/暗模式派生出最终的 --ink-opacity
            ['--ink-opacity-raw' as string]: c.opacity,
            ['--drift' as string]: `${c.drift}px`,
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  )
}
