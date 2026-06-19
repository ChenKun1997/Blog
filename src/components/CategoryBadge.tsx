import { TbCode, TbPhoto, TbTextSpellcheck, TbVideo } from 'react-icons/tb'
import {
  CATEGORY_LABELS,
  type PromptCategory,
} from '../types/prompt'

/** 类别 → 克制线性图标（react-icons/tb） */
const CATEGORY_ICONS: Record<PromptCategory, typeof TbCode> = {
  text: TbTextSpellcheck,
  image: TbPhoto,
  video: TbVideo,
  coding: TbCode,
}

interface CategoryBadgeProps {
  category: PromptCategory
  /** 是否显示图标，默认 true */
  withIcon?: boolean
}

/**
 * 分类徽章：图标 + 中文名。在列表页 Tab、卡片角标、详情页元信息处复用。
 * 颜色沿用 --muted，不引入品牌色。
 */
export default function CategoryBadge({
  category,
  withIcon = true,
}: CategoryBadgeProps) {
  const Icon = CATEGORY_ICONS[category]
  return (
    <span className="category-badge">
      {withIcon && (
        <Icon className="category-badge-icon" aria-hidden="true" />
      )}
      <span>{CATEGORY_LABELS[category]}</span>
    </span>
  )
}
