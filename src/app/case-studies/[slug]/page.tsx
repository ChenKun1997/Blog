import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, ExternalLink, Github, Globe } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Container from '@/components/Container';
import Comments from '@/components/Comments';
import { getCaseStudyBySlug, getAllCaseStudies, getRelatedCaseStudies } from '@/lib/case-studies.server';
import { siteConfig } from '@/config/site';
import { mdxOptions, components } from '@/lib/mdx';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all case studies
export function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} | Case Studies`,
    description: caseStudy.description,
    openGraph: {
      title: `${caseStudy.title} | Case Studies`,
      description: caseStudy.description,
      type: 'article',
      url: `${siteConfig.siteUrl}/case-studies/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${caseStudy.title} | Case Studies`,
      description: caseStudy.description,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = getRelatedCaseStudies(caseStudy.slug, caseStudy.technologies);

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {caseStudy.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {caseStudy.description}
              </p>
            </div>
            {caseStudy.featured && (
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Project Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{caseStudy.year}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              <span>{caseStudy.duration}</span>
            </div>
            {caseStudy.category && (
              <span className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded-full">
                {caseStudy.category}
              </span>
            )}
          </div>

          {/* Project Links */}
          <div className="flex flex-wrap gap-3 mb-6">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Globe className="w-4 h-4 mr-2" />
                View Live Project
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            )}
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-background border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source Code
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            )}
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-foreground mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Case Study Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none mb-12">
          <MDXRemote source={caseStudy.content} options={mdxOptions} components={components} />
        </article>

        {/* Challenges and Outcomes */}
        {(caseStudy.challenges.length > 0 || caseStudy.outcomes.length > 0) && (
          <div className="grid md:grid-cols-2 gap-8 mb-12 p-6 bg-card border border-border rounded-lg">
            {caseStudy.challenges.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Challenges</h3>
                <ul className="space-y-3">
                  {caseStudy.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {caseStudy.outcomes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Outcomes & Results</h3>
                <ul className="space-y-3">
                  {caseStudy.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Related Case Studies
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((relatedStudy) => (
                <Link
                  key={relatedStudy.slug}
                  href={`/case-studies/${relatedStudy.slug}`}
                  className="block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {relatedStudy.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {relatedStudy.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{relatedStudy.year}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{relatedStudy.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <Comments className="mt-12" />
      </div>
    </Container>
  );
}
