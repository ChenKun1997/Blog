import { SiteConfig, NavigationItem } from '@/types/blog';

export const siteConfig: SiteConfig = {
  name: "My Personal Blog",
  description: "A personal blog about web development, technology, and life as a developer.",
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    bio: "Full-stack developer passionate about creating amazing web experiences. I love working with React, Next.js, and modern web technologies.",
    avatar: "/avatar.jpg", // Add your avatar image to public folder
  },
  social: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "your.email@example.com",
  },
  siteUrl: "https://yourdomain.com",
};

export const navigation: NavigationItem[] = [
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Tools",
    href: "/tools",
  },
  {
    name: "Daily",
    href: "/daily",
  },
  {
    name: "Case Studies",
    href: "/case-studies",
  },
];
