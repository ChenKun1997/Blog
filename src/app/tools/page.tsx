import { Metadata } from 'next';
import ToolsPageClient from './ToolsPageClient';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Useful tools and utilities I\'ve built to solve common development problems.',
  openGraph: {
    title: 'Tools',
    description: 'Useful tools and utilities I\'ve built to solve common development problems.',
    type: 'website',
  },
};

interface Tool {
  name: string;
  description: string;
  url: string;
  github?: string;
  tags: string[];
  featured?: boolean;
}

const tools: Tool[] = [
  {
    name: "Code Snippet Manager",
    description: "A simple tool to manage and organize your code snippets with syntax highlighting and search functionality.",
    url: "https://example.com/snippet-manager",
    github: "https://github.com/yourusername/snippet-manager",
    tags: ["React", "TypeScript", "Productivity"],
    featured: true,
  },
  {
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes for your web projects with accessibility considerations.",
    url: "https://example.com/color-palette",
    github: "https://github.com/yourusername/color-palette",
    tags: ["CSS", "Design", "Accessibility"],
  },
  {
    name: "API Response Formatter",
    description: "Format and beautify JSON API responses for better readability during development.",
    url: "https://example.com/api-formatter",
    tags: ["JSON", "API", "Development"],
  },
];

export default function ToolsPage() {
  return <ToolsPageClient />;
}
