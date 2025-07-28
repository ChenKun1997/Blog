export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured: boolean;
  readingTime?: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  readingTime?: number;
}

export interface PostsByMonth {
  month: string;
  year: number;
  posts: BlogPostMeta[];
}

export interface TagWithCount {
  name: string;
  count: number;
}

export interface SiteConfig {
  name: string;
  description: string;
  author: {
    name: string;
    email: string;
    bio: string;
    avatar?: string;
  };
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  siteUrl: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  content: string;
  tags: string[];
  featured: boolean;
  github?: string;
  demo?: string;
  npm?: string;
  website?: string;
  readingTime?: number;
}

export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  featured: boolean;
  github?: string;
  demo?: string;
  npm?: string;
  website?: string;
  readingTime?: number;
}

export interface DailyPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  mood: 'productive' | 'learning' | 'challenging' | 'creative';
  tags: string[];
  readingTime?: number;
}

export interface DailyPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  mood: 'productive' | 'learning' | 'challenging' | 'creative';
  tags: string[];
  readingTime?: number;
}

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  content: string;
  technologies: string[];
  duration: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  challenges: string[];
  outcomes: string[];
  images?: string[];
  category?: string;
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  duration: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category?: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}
