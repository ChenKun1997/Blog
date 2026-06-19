import { useState } from 'react'
import { TbCopy, TbCheck } from 'react-icons/tb'

interface CopyButtonProps {
  /** 要复制的文本 */
  text: string
  /** 按钮内文字，默认「复制」 */
  label?: string
  /** 复制成功后的文字，默认「已复制」 */
  copiedLabel?: string
}

/**
 * 一键复制按钮。点击后调用剪贴板 API，图标从复制切换为对勾，
 * 1.5 秒后恢复。初始渲染为静态复制图标，SSR 安全。
 */
export default function CopyButton({
  text,
  label = '复制',
  copiedLabel = '已复制',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // 剪贴板 API 在非 HTTPS / 旧浏览器可能失败，静默降级
    }
  }

  return (
    <button
      type="button"
      className={`copy-button${copied ? ' copied' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? <TbCheck /> : <TbCopy />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  )
}
