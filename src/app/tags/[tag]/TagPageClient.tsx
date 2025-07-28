'use client';

import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import TagBadge from '@/components/TagBadge';
import { BlogPostMeta, TagWithCount } from '@/types/blog';

interface TagPageClientProps {
  posts: BlogPostMeta[];
  actualTag: TagWithCount;
  allTags: TagWithCount[];
  decodedTag: string;
}

export default function TagPageClient({ 
  posts, 
  actualTag, 
  allTags, 
  decodedTag 
}: TagPageClientProps) {
  return (
    <div className="py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back button */}
          <Link
            href="/tags"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all tags
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {actualTag.name}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with{' '}
              <TagBadge tag={actualTag.name} clickable={false} size="md" />
            </p>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {/* Related tags */}
          <div className="mt-16 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Explore Other Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags
                .filter(tag => tag.name.toLowerCase() !== decodedTag.toLowerCase())
                .slice(0, 10)
                .map((tag) => (
                  <TagBadge 
                    key={tag.name} 
                    tag={tag.name} 
                    count={tag.count} 
                    size="md" 
                  />
                ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
