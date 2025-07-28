'use client';

import { motion } from 'framer-motion';
import { Calendar, Coffee, Code, BookOpen, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/Container';
import { DailyPostMeta } from '@/types/blog';

interface DailyPageClientProps {
  dailyPosts: DailyPostMeta[];
}

const moodIcons = {
  productive: Coffee,
  learning: BookOpen,
  challenging: Code,
  creative: Calendar,
};

const moodColors = {
  productive: 'text-green-500',
  learning: 'text-blue-500',
  challenging: 'text-orange-500',
  creative: 'text-purple-500',
};

const moodBgColors = {
  productive: 'bg-green-500/10',
  learning: 'bg-blue-500/10',
  challenging: 'bg-orange-500/10',
  creative: 'bg-purple-500/10',
};

// Client-side date formatting function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function DailyPageClient({ dailyPosts }: DailyPageClientProps) {
  return (
    <div className="py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Daily
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Quick thoughts, learnings, and updates from my daily development journey.
            </p>
          </div>

          {dailyPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No daily entries yet. Check back soon for regular updates!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {dailyPosts.map((post, index) => {
                const MoodIcon = moodIcons[post.mood];
                return (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-lg ${moodBgColors[post.mood]}`}>
                          <MoodIcon className={`w-5 h-5 ${moodColors[post.mood]}`} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <time
                            dateTime={post.date}
                            className="text-sm text-muted-foreground font-mono"
                          >
                            {formatDate(post.date)}
                          </time>
                          <span className={`text-xs px-2 py-1 rounded-full ${moodBgColors[post.mood]} ${moodColors[post.mood]} capitalize font-medium`}>
                            {post.mood}
                          </span>
                          {post.readingTime && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readingTime} min
                            </div>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          <Link href={`/daily/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={`/daily/${post.slug}`}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Read more
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          <div className="mt-16 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              About Daily Entries
            </h2>
            <p className="text-muted-foreground">
              These are quick, informal updates about what I'm working on, learning, or thinking about. 
              They're meant to capture the day-to-day journey of development work - the wins, challenges, and discoveries.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
