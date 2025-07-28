import { Metadata } from 'next';
import DailyPageClient from './DailyPageClient';
import { BookOpen, Calendar, Code, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Daily',
  description: 'Quick thoughts, learnings, and updates from my daily development journey.',
  openGraph: {
    title: 'Daily',
    description: 'Quick thoughts, learnings, and updates from my daily development journey.',
    type: 'website',
  },
};

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

export default function DailyPage() {
  return <DailyPageClient />;
}
