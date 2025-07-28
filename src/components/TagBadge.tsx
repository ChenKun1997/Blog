'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface TagBadgeProps {
  tag: string;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
}

export default function TagBadge({ 
  tag, 
  count, 
  size = 'sm', 
  clickable = true 
}: TagBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const content = (
    <motion.span
      whileHover={clickable ? { scale: 1.05 } : undefined}
      whileTap={clickable ? { scale: 0.95 } : undefined}
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        bg-secondary text-secondary-foreground
        hover:bg-accent hover:text-accent-foreground
        transition-colors duration-200
        ${sizeClasses[size]}
        ${clickable ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <span className="truncate">{tag}</span>
      {count !== undefined && (
        <span className="text-muted-foreground">({count})</span>
      )}
    </motion.span>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}>
      {content}
    </Link>
  );
}
