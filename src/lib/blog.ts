// Client-safe blog utilities
// This file can be imported in both server and client components

import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
}

export function formatDateShort(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMM d, yyyy');
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
