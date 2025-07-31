import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/Container';
import TagBadge from '@/components/TagBadge';
import Comments from '@/components/Comments';
import { getDailyPostBySlug, getAllDailyPosts, getAdjacentDailyPosts, formatDate } from '@/lib/daily.server';
import { siteConfig } from '@/config/site';
import { mdxOptions, components } from '@/lib/mdx';

interface DailyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all daily posts
export function generateStaticParams() {
  const posts = getAllDailyPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: DailyPageProps) {
  const { slug } = await params;
  const post = getDailyPostBySlug(slug);

  if (!post) {
    return {
      title: 'Daily Post Not Found',
    };
  }

  return {
    title: `${post.title} | Daily`,
    description: post.content.substring(0, 160) + '...',
    openGraph: {
      title: `${post.title} | Daily`,
      description: post.content.substring(0, 160) + '...',
      type: 'article',
      url: `${siteConfig.siteUrl}/daily/${slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary',
      title: `${post.title} | Daily`,
      description: post.content.substring(0, 160) + '...',
    },
  };
}

// Mood icons and colors
const moodConfig = {
  productive: {
    icon: '☕',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    label: 'Productive'
  },
  learning: {
    icon: '📚',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    label: 'Learning'
  },
  challenging: {
    icon: '💪',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    label: 'Challenging'
  },
  creative: {
    icon: '🎨',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    label: 'Creative'
  }
};

export default async function DailyPage({ params }: DailyPageProps) {
  const { slug } = await params;
  const post = getDailyPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentDailyPosts(post.slug);
  const mood = moodConfig[post.mood];

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/daily"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Daily
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Date */}
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>

            {/* Reading Time */}
            {post.readingTime && (
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readingTime} min read</span>
              </div>
            )}

            {/* Mood */}
            <div className={`flex items-center px-3 py-1 rounded-full ${mood.bgColor}`}>
              <span className="mr-2">{mood.icon}</span>
              <span className={`text-sm font-medium ${mood.color}`}>
                {mood.label}
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <MDXRemote source={post.content} options={mdxOptions} components={components} />
        </article>

        {/* Navigation */}
        {(previous || next) && (
          <nav className="border-t border-border pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous Post */}
              <div>
                {previous ? (
                  <Link
                    href={`/daily/${previous.slug}`}
                    className="group block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {previous.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(previous.date)}
                    </p>
                  </Link>
                ) : (
                  <div className="p-6 bg-muted/30 border border-border rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      No previous post
                    </div>
                  </div>
                )}
              </div>

              {/* Next Post */}
              <div>
                {next ? (
                  <Link
                    href={`/daily/${next.slug}`}
                    className="group block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-right"
                  >
                    <div className="flex items-center justify-end text-sm text-muted-foreground mb-2">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {next.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(next.date)}
                    </p>
                  </Link>
                ) : (
                  <div className="p-6 bg-muted/30 border border-border rounded-lg text-right">
                    <div className="text-sm text-muted-foreground">
                      No next post
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}

        {/* Comments Section */}
        <Comments className="mt-12" />
      </div>
    </Container>
  );
}
