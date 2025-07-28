import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags } from '@/lib/blog.server';
import TagPageClient from './TagPageClient';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

// Generate static params for all tags
export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name.toLowerCase()),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  // Find the actual tag name with correct casing
  const allTags = getAllTags();
  const actualTag = allTags.find(
    tag => tag.name.toLowerCase() === decodedTag.toLowerCase()
  );

  if (!actualTag || posts.length === 0) {
    notFound();
  }

  return (
    <TagPageClient
      posts={posts}
      actualTag={actualTag}
      allTags={allTags}
      decodedTag={decodedTag}
    />
  );
}
