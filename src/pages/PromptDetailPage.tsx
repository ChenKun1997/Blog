import { Link, useParams } from 'react-router-dom'
import CategoryBadge from '../components/CategoryBadge'
import CopyButton from '../components/CopyButton'
import { formatPromptDate, getPromptBySlug } from '../lib/prompts'

export default function PromptDetailPage() {
  const { slug } = useParams()
  const prompt = slug ? getPromptBySlug(slug) : null

  if (!prompt) {
    return (
      <div className="container page">
        <h1 className="page-title">提示词未找到</h1>
        <p className="empty-state">您访问的提示词不存在。</p>
        <Link to="/prompts">← 返回提示词</Link>
      </div>
    )
  }

  return (
    <article className="container page">
      <Link to="/prompts" className="back-link">
        ← 提示词
      </Link>

      <header className="prompt-detail-header">
        <h1>{prompt.title}</h1>
        <div className="meta">
          <CategoryBadge category={prompt.category} />
          {prompt.models.length > 0 && (
            <>
              <span>·</span>
              <span>{prompt.models.join(' · ')}</span>
            </>
          )}
          <span>·</span>
          <time dateTime={prompt.date}>{formatPromptDate(prompt.date)}</time>
        </div>
      </header>

      <div className="prompt-body">
        <CopyButton text={prompt.content} />
        <pre>{prompt.content}</pre>
      </div>

      <footer className="post-footer">
        <Link to="/prompts">← 返回所有提示词</Link>
      </footer>
    </article>
  )
}
