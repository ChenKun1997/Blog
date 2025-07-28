import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Tool, ToolMeta } from '@/types/blog';

const toolsDirectory = path.join(process.cwd(), 'content/tools');

export function getAllTools(): ToolMeta[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(toolsDirectory)) {
    fs.mkdirSync(toolsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(toolsDirectory);
  const allToolsData = fileNames
    .filter((fileName: string) => fileName.endsWith('.md'))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(toolsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        name: data.name,
        description: data.description,
        tags: data.tags || [],
        featured: data.featured || false,
        github: data.github,
        demo: data.demo,
        npm: data.npm,
        website: data.website,
        readingTime: calculateReadingTime(fileContents),
      } as ToolMeta;
    });

  return allToolsData.sort((a, b) => {
    // Sort by featured first, then alphabetically
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });
}

export function getToolBySlug(slug: string): Tool | null {
  try {
    const fullPath = path.join(toolsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      name: data.name,
      description: data.description,
      content,
      tags: data.tags || [],
      featured: data.featured || false,
      github: data.github,
      demo: data.demo,
      npm: data.npm,
      website: data.website,
      readingTime: calculateReadingTime(fileContents),
    };
  } catch (error) {
    return null;
  }
}

export function getToolsByTag(tag: string): ToolMeta[] {
  const allTools = getAllTools();
  return allTools.filter((tool) =>
    tool.tags.some((toolTag) => toolTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllToolTags(): { name: string; count: number }[] {
  const allTools = getAllTools();
  const tagCounts: { [key: string]: number } = {};

  allTools.forEach((tool) => {
    tool.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getFeaturedTools(): ToolMeta[] {
  const allTools = getAllTools();
  return allTools.filter((tool) => tool.featured);
}

export function getRelatedTools(currentSlug: string, tags: string[], limit: number = 3): ToolMeta[] {
  const allTools = getAllTools();
  
  // Filter out current tool and find tools with matching tags
  const relatedTools = allTools
    .filter((tool) => tool.slug !== currentSlug)
    .map((tool) => {
      const matchingTags = tool.tags.filter((tag) => 
        tags.some((currentTag) => currentTag.toLowerCase() === tag.toLowerCase())
      );
      return { ...tool, matchingTagsCount: matchingTags.length };
    })
    .filter((tool) => tool.matchingTagsCount > 0)
    .sort((a, b) => b.matchingTagsCount - a.matchingTagsCount)
    .slice(0, limit);

  return relatedTools;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
