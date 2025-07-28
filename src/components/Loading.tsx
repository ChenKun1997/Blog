'use client';

import { motion } from 'framer-motion';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function Loading({ size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-muted border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="mt-4 text-muted-foreground text-sm">{text}</p>
      )}
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
      <div className="h-6 bg-muted rounded w-full mb-2"></div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-muted rounded w-full"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-muted rounded-full w-16"></div>
        <div className="h-6 bg-muted rounded-full w-20"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-3 bg-muted rounded w-20"></div>
        <div className="h-3 bg-muted rounded w-16"></div>
      </div>
    </div>
  );
}
