'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import { PostsByMonth } from '@/types/blog';

interface BlogPageClientProps {
  postsByMonth: PostsByMonth[];
}

export default function BlogPageClient({ postsByMonth }: BlogPageClientProps) {

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
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Thoughts, tutorials, and insights about web development and technology.
            </p>
          </div>

          {postsByMonth.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {postsByMonth.map((monthGroup, groupIndex) => (
                <motion.section
                  key={`${monthGroup.month}-${monthGroup.year}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6 border-b border-border pb-2">
                    {monthGroup.month} {monthGroup.year}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {monthGroup.posts.map((post, postIndex) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: groupIndex * 0.1 + postIndex * 0.05 
                        }}
                      >
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
