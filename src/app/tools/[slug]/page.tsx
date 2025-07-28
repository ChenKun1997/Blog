import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Globe, Package } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/Container';
import TagBadge from '@/components/TagBadge';
import { getToolBySlug, getAllTools, getRelatedTools } from '@/lib/tools.server';
import { siteConfig } from '@/config/site';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all tools
export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} | Tools`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | Tools`,
      description: tool.description,
      type: 'article',
      url: `${siteConfig.siteUrl}/tools/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | Tools`,
      description: tool.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool.slug, tool.tags);

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/tools"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
        </div>

        {/* Tool Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {tool.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {tool.description}
              </p>
            </div>
            {tool.featured && (
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Tool Links */}
          <div className="flex flex-wrap gap-3 mb-6">
            {tool.github && (
              <a
                href={tool.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-background border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            )}
            {tool.demo && (
              <a
                href={tool.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                Live Demo
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            )}
            {tool.npm && (
              <a
                href={tool.npm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-background border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Package className="w-4 h-4 mr-2" />
                NPM
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            )}
            {tool.website && (
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-background border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                Website
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tool.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          {/* Reading Time */}
          {tool.readingTime && (
            <p className="text-sm text-muted-foreground">
              {tool.readingTime} min read
            </p>
          )}
        </header>

        {/* Tool Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <MDXRemote source={tool.content} />
        </article>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Tools
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((relatedTool) => (
                <Link
                  key={relatedTool.slug}
                  href={`/tools/${relatedTool.slug}`}
                  className="block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {relatedTool.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {relatedTool.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {relatedTool.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Container>
  );
}
