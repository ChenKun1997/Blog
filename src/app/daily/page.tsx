import { Metadata } from 'next';
import DailyPageClient from './DailyPageClient';
import { getAllDailyPosts } from '@/lib/daily.server';

export const metadata: Metadata = {
  title: 'Daily',
  description: 'Quick thoughts, learnings, and updates from my daily development journey.',
  openGraph: {
    title: 'Daily',
    description: 'Quick thoughts, learnings, and updates from my daily development journey.',
    type: 'website',
  },
};

export default function DailyPage() {
  const dailyPosts = getAllDailyPosts();
  return <DailyPageClient dailyPosts={dailyPosts} />;
}
