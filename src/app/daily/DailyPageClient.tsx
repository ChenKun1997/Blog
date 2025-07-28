'use client';

import { motion } from 'framer-motion';
import { Calendar, Coffee, Code, BookOpen } from 'lucide-react';
import Container from '@/components/Container';

interface DailyEntry {
  date: string;
  title: string;
  content: string;
  mood: 'productive' | 'learning' | 'challenging' | 'creative';
  tags: string[];
}

const dailyEntries: DailyEntry[] = [
  {
    date: "2024-12-01",
    title: "Launched My Personal Blog",
    content: "Finally got my personal blog up and running! Built it with Next.js 15 and Tailwind CSS. The theme system with smooth transitions turned out really nice. Planning to write more about the development process.",
    mood: "productive",
    tags: ["Next.js", "Blog", "Launch"],
  },
  {
    date: "2024-11-30",
    title: "Deep Dive into React Server Components",
    content: "Spent the day learning about React Server Components and how they work with Next.js App Router. The mental model shift is interesting - thinking about what runs on the server vs client.",
    mood: "learning",
    tags: ["React", "Server Components", "Learning"],
  },
  {
    date: "2024-11-29",
    title: "Debugging CSS Grid Issues",
    content: "Had a tricky CSS Grid layout issue today. Turns out it was a simple misunderstanding of how grid-template-areas work. Sometimes the simplest bugs take the longest to find!",
    mood: "challenging",
    tags: ["CSS", "Grid", "Debugging"],
  },
];

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

export default function DailyPageClient() {
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

          {dailyEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No daily entries yet. Check back soon for regular updates!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {dailyEntries.map((entry, index) => {
                const MoodIcon = moodIcons[entry.mood];
                return (
                  <motion.article
                    key={entry.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-lg bg-muted ${moodColors[entry.mood]}`}>
                          <MoodIcon className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <time 
                            dateTime={entry.date}
                            className="text-sm text-muted-foreground font-mono"
                          >
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          <span className={`text-xs px-2 py-1 rounded-full bg-muted ${moodColors[entry.mood]} capitalize`}>
                            {entry.mood}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {entry.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {entry.content}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
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
