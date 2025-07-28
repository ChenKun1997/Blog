'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container';
import TagBadge from '@/components/TagBadge';
import { TagWithCount } from '@/types/blog';

interface TagsPageClientProps {
  tags: TagWithCount[];
}

export default function TagsPageClient({ tags }: TagsPageClientProps) {

  return (
    <div className="py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tags
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore posts by topic. Click on any tag to see related articles.
            </p>
          </div>

          {tags.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No tags yet. Check back when there are more posts!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tags.map((tag, index) => (
                  <motion.div
                    key={tag.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex justify-center"
                  >
                    <TagBadge 
                      tag={tag.name} 
                      count={tag.count} 
                      size="lg" 
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-muted/50 rounded-lg">
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  About Tags
                </h2>
                <p className="text-muted-foreground">
                  Tags help organize content by topic. The number in parentheses shows how many posts are tagged with that topic. 
                  Click on any tag to see all related posts.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
