import HomePageClient from './HomePageClient';
import { getRecentPosts } from '@/lib/blog.server';

export default function Home() {
  const recentPosts = getRecentPosts(3);

  return <HomePageClient recentPosts={recentPosts} />;
}
