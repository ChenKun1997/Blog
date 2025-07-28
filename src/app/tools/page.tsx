import { Metadata } from 'next';
import ToolsPageClient from './ToolsPageClient';
import { getAllTools } from '@/lib/tools.server';

export const metadata: Metadata = {
  title: 'Tools',
  description: 'Useful tools and utilities I\'ve built to solve common development problems.',
  openGraph: {
    title: 'Tools',
    description: 'Useful tools and utilities I\'ve built to solve common development problems.',
    type: 'website',
  },
};

export default function ToolsPage() {
  const tools = getAllTools();
  return <ToolsPageClient tools={tools} />;
}
