'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Wrench, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/Container';
import { ToolMeta } from '@/types/blog';

interface ToolsPageClientProps {
  tools: ToolMeta[];
}

export default function ToolsPageClient({ tools }: ToolsPageClientProps) {
  return (
    <div className="py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Tools
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Useful tools and utilities I've built to solve common development problems.
            </p>
          </div>

          {tools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No tools yet. Check back soon for useful development utilities!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 ${
                    tool.featured ? 'ring-2 ring-primary/20' : ''
                  }`}
                >
                  {tool.featured && (
                    <div className="flex items-center gap-1 text-primary mb-3">
                      <span className="text-xs font-medium uppercase tracking-wide">Featured</span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    <Link href={`/tools/${tool.slug}`} className="hover:text-primary transition-colors">
                      {tool.name}
                    </Link>
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {tool.demo && (
                        <a
                          href={tool.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      )}
                      {tool.github && (
                        <a
                          href={tool.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Source
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-16 p-6 bg-muted/50 rounded-lg">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Have a Tool Idea?
            </h2>
            <p className="text-muted-foreground">
              If you have an idea for a useful development tool or would like to collaborate on a project, 
              feel free to reach out! I'm always interested in building tools that solve real problems.
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
