import { Metadata } from 'next';
import TagsPageClient from './TagsPageClient';
import { getAllTags } from '@/lib/blog.server';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Explore posts by topic. Click on any tag to see related articles.',
  openGraph: {
    title: 'Tags',
    description: 'Explore posts by topic. Click on any tag to see related articles.',
    type: 'website',
  },
};

export default function TagsPage() {
  const tags = getAllTags();
  return <TagsPageClient tags={tags} />;
}
