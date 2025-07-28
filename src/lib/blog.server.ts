// Server-side only blog functions
// This file should ONLY be imported in server components

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta, PostsByMonth, TagWithCount } from '@/types/blog';
import { format, parseISO } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): BlogPostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName: string) => fileName.endsWith('.md'))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags || [],
        featured: data.featured || false,
        readingTime: calculateReadingTime(fileContents),
      } as BlogPostMeta;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
      tags: data.tags || [],
      featured: data.featured || false,
      readingTime: calculateReadingTime(fileContents),
    };
  } catch (error) {
    return null;
  }
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllTags(): TagWithCount[] {
  const allPosts = getAllPosts();
  const tagCounts: Record<string, number> = {};

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByMonth(): PostsByMonth[] {
  const allPosts = getAllPosts();
  const postsByMonth: Record<string, BlogPostMeta[]> = {};

  allPosts.forEach((post) => {
    const date = parseISO(post.date);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!postsByMonth[monthYear]) {
      postsByMonth[monthYear] = [];
    }
    postsByMonth[monthYear].push(post);
  });

  return Object.entries(postsByMonth)
    .map(([monthYear, posts]) => {
      const [month, year] = monthYear.split(' ');
      return {
        month,
        year: parseInt(year),
        posts: posts.sort((a, b) => (a.date < b.date ? 1 : -1)),
      };
    })
    .sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      return new Date(`${a.month} 1, ${a.year}`).getMonth() - new Date(`${b.month} 1, ${b.year}`).getMonth();
    });
}

export function getFeaturedPosts(): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.featured);
}

export function getRecentPosts(limit: number = 5): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
}

export function formatDateShort(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}
