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

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}
