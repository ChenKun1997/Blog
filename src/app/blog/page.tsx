import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import { getPostsByMonth } from '@/lib/blog.server';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about web development and technology.',
  openGraph: {
    title: 'Blog',
    description: 'Thoughts, tutorials, and insights about web development and technology.',
    type: 'website',
  },
};

export default function BlogPage() {
  const postsByMonth = getPostsByMonth();
  return <BlogPageClient postsByMonth={postsByMonth} />;
}
