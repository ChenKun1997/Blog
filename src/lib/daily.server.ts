import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseISO, format } from 'date-fns';
import { DailyPost, DailyPostMeta } from '@/types/blog';

const dailyDirectory = path.join(process.cwd(), 'content/daily');

export function getAllDailyPosts(): DailyPostMeta[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(dailyDirectory)) {
    fs.mkdirSync(dailyDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(dailyDirectory);
  const allDailyData = fileNames
    .filter((fileName: string) => fileName.endsWith('.md'))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(dailyDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        mood: data.mood || 'productive',
        tags: data.tags || [],
        readingTime: calculateReadingTime(fileContents),
      } as DailyPostMeta;
    });

  return allDailyData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getDailyPostBySlug(slug: string): DailyPost | null {
  try {
    const fullPath = path.join(dailyDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      mood: data.mood || 'productive',
      tags: data.tags || [],
      readingTime: calculateReadingTime(fileContents),
    };
  } catch (error) {
    return null;
  }
}

export function getDailyPostsByTag(tag: string): DailyPostMeta[] {
  const allPosts = getAllDailyPosts();
  return allPosts.filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getDailyPostsByMood(mood: string): DailyPostMeta[] {
  const allPosts = getAllDailyPosts();
  return allPosts.filter((post) => post.mood === mood);
}

export function getAllDailyTags(): { name: string; count: number }[] {
  const allPosts = getAllDailyPosts();
  const tagCounts: { [key: string]: number } = {};

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAdjacentDailyPosts(currentSlug: string): {
  previous: DailyPostMeta | null;
  next: DailyPostMeta | null;
} {
  const allPosts = getAllDailyPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

export function getRecentDailyPosts(limit: number = 5): DailyPostMeta[] {
  const allPosts = getAllDailyPosts();
  return allPosts.slice(0, limit);
}

export function getDailyPostsByMonth(): { month: string; year: number; posts: DailyPostMeta[] }[] {
  const allPosts = getAllDailyPosts();
  const postsByMonth: { [key: string]: DailyPostMeta[] } = {};

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
      const date = parseISO(posts[0].date);
      return {
        month: format(date, 'MMMM'),
        year: date.getFullYear(),
        posts: posts.sort((a, b) => (a.date < b.date ? 1 : -1)),
      };
    })
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return new Date(`${a.month} 1, ${a.year}`).getMonth() - new Date(`${b.month} 1, ${b.year}`).getMonth();
    });
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
