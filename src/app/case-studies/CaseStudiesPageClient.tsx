'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Briefcase, Calendar, Clock, Filter, X } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/Container';
import { CaseStudyMeta } from '@/types/blog';

interface CaseStudiesPageClientProps {
  caseStudies: CaseStudyMeta[];
  technologies: { name: string; count: number }[];
  years: string[];
  categories: { name: string; count: number }[];
}

export default function CaseStudiesPageClient({
  caseStudies,
  technologies,
  years,
  categories
}: CaseStudiesPageClientProps) {
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter case studies based on selected filters
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((study) => {
      const matchesTechnology = !selectedTechnology ||
        study.technologies.some(tech => tech.toLowerCase() === selectedTechnology.toLowerCase());
      const matchesYear = !selectedYear || study.year === selectedYear;
      const matchesCategory = !selectedCategory ||
        study.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesTechnology && matchesYear && matchesCategory;
    });
  }, [caseStudies, selectedTechnology, selectedYear, selectedCategory]);

  const clearFilters = () => {
    setSelectedTechnology('');
    setSelectedYear('');
    setSelectedCategory('');
  };

  const hasActiveFilters = selectedTechnology || selectedYear || selectedCategory;
  return (
    <div className="py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-primary" />
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Case Studies
                </h1>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-background border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                )}
              </button>
            </div>
            <p className="text-xl text-muted-foreground">
              Detailed breakdowns of projects I've worked on, including challenges faced and solutions implemented.
            </p>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 bg-card border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filter Projects</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Technology Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Technology
                  </label>
                  <select
                    value={selectedTechnology}
                    onChange={(e) => setSelectedTechnology(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">All Technologies</option>
                    {technologies.map((tech) => (
                      <option key={tech.name} value={tech.name}>
                        {tech.name} ({tech.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredCaseStudies.length} of {caseStudies.length} projects
              {hasActiveFilters && ' (filtered)'}
            </p>
          </div>

          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {hasActiveFilters
                  ? "No case studies match your current filters. Try adjusting your selection."
                  : "No case studies yet. Check back soon for detailed project breakdowns!"
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {filteredCaseStudies.map((study, index) => (
                <motion.article
                  key={study.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                    study.featured ? 'ring-2 ring-primary/20' : ''
                  }`}
                >
                  <Link href={`/case-studies/${study.slug}`} className="block h-full">
                  <div className="p-6">
                    {study.featured && (
                      <div className="flex items-center gap-1 text-primary mb-4">
                        <span className="text-xs font-medium uppercase tracking-wide">Featured Project</span>
                      </div>
                    )}

                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {study.title}
                      </h2>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{study.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{study.duration}</span>
                        </div>
                        {study.category && (
                          <span className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded">
                            {study.category}
                          </span>
                        )}
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {study.description}
                      </p>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 4 && (
                          <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                            +{study.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {study.liveUrl && (
                            <a
                              href={study.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Live
                            </a>
                          )}
                          {study.githubUrl && (
                            <a
                              href={study.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
                            >
                              <Github className="w-3 h-3" />
                              Code
                            </a>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          View details →
                        </span>
                      </div>
                    </div>
                  </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
