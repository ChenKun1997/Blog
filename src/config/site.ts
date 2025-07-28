import { SiteConfig, NavigationItem } from '@/types/blog';

export const siteConfig: SiteConfig = {
  name: "ChenKun's Blog",
  description: "A personal blog about web development, technology, and life as a developer.",
  author: {
    name: "ChenKun",
    email: "kunk97@163.com",
    bio: "Full-stack developer passionate about creating amazing web experiences. I love working with React, Next.js, and modern web technologies.",
    avatar: "/avatar.jpg", // Add your avatar image to public folder
  },
  social: {
    github: "https://github.com/ChenKun1997",
    twitter: "https://twitter.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "kunk97@163.com",
  },
  siteUrl: "https://chenkun1997.github.io/Blog",
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
  {
    name: "Profile",
    href: "/profile",
  },
];
