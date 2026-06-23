import { useState } from 'react'
import PromptCard from '../components/PromptCard'
import {
  getAllPrompts,
  getPromptsByCategory,
} from '../lib/prompts'
import {
  CATEGORY_LABELS,
  PROMPT_CATEGORIES,
  type PromptCategory,
  type PromptMeta,
} from '../types/prompt'

/** Tab 过滤项：'all' 或某个类别 */
type Filter = 'all' | PromptCategory

const FILTERS: Filter[] = ['all', ...PROMPT_CATEGORIES]

function filterLabel(f: Filter): string {
  return f === 'all' ? '全部' : CATEGORY_LABELS[f]
}

export default function PromptsPage() {
  const [active, setActive] = useState<Filter>('all')

  const prompts: PromptMeta[] =
    active === 'all' ? getAllPrompts() : getPromptsByCategory(active)

  return (
    <div className="container page">
      <h1 className="page-title">提示词</h1>
      <p className="prompts-intro">
        收录我日常使用、值得推荐的提示词，覆盖 text、image、video 与
        Coding 场景。点击卡片查看完整内容，可一键复制使用。
      </p>

      <nav className="prompt-tabs" aria-label="提示词分类">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`prompt-tab${active === f ? ' active' : ''}`}
            onClick={() => setActive(f)}
          >
            {filterLabel(f)}
          </button>
        ))}
      </nav>

      {prompts.length === 0 ? (
        <p className="empty-state">该分类下暂无提示词。</p>
      ) : (
        <div className="prompt-grid">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  )
}
