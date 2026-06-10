interface TagBadgeProps {
  tag: string
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="tag-badge">
      {tag}
    </span>
  )
}
