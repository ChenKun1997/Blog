'use client';

import Link from 'next/link';
import { Calendar, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPostMeta } from '@/types/blog';
import { formatDateShort } from '@/lib/blog';
import TagBadge from './TagBadge';

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="p-6">
          {/* Featured badge */}
          {post.featured && (
            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 mb-3">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-medium uppercase tracking-wide">Featured</span>
            </div>
          )}

          {/* Title */}
          <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${
            featured ? 'text-xl md:text-2xl mb-3' : 'text-lg mb-2'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-muted-foreground line-clamp-3 ${
            featured ? 'text-base mb-4' : 'text-sm mb-3'
          }`}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, featured ? 4 : 3).map((tag) => (
              <TagBadge key={tag} tag={tag} size={featured ? 'md' : 'sm'} />
            ))}
            {post.tags.length > (featured ? 4 : 3) && (
              <span className="text-xs text-muted-foreground">
                +{post.tags.length - (featured ? 4 : 3)} more
              </span>
            )}
          </div>

          {/* Meta information */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <time dateTime={post.date}>
                {formatDateShort(post.date)}
              </time>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </motion.article>
  );
}
