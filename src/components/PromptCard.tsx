import { Link } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'
import type { PromptMeta } from '../types/prompt'

interface PromptCardProps {
  prompt: PromptMeta
}

/**
 * 提示词卡片。整卡可点击进入详情页。
 * 展示：分类徽章、标题、摘要、推荐模型。
 */
export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Link to={`/prompts/${prompt.slug}`} className="prompt-card">
      <CategoryBadge category={prompt.category} />
      <h3 className="prompt-card-title">{prompt.title}</h3>
      <p className="prompt-card-excerpt">{prompt.excerpt}</p>
      {prompt.models.length > 0 && (
        <p className="prompt-card-models">
          {prompt.models.join(' · ')}
        </p>
      )}
    </Link>
  )
}
