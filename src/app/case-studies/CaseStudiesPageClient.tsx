'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Briefcase, Calendar, Clock } from 'lucide-react';
import Container from '@/components/Container';

interface CaseStudy {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  duration: string;
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  challenges: string[];
  outcomes: string[];
}

const caseStudies: CaseStudy[] = [
  {
    title: "E-commerce Platform Redesign",
    description: "Complete redesign and development of a modern e-commerce platform with improved UX and performance.",
    longDescription: "Led the complete redesign of an existing e-commerce platform, focusing on improving user experience, site performance, and conversion rates. The project involved migrating from a legacy system to a modern tech stack.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    duration: "3 months",
    year: "2024",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    featured: true,
    challenges: [
      "Migrating large product catalog without downtime",
      "Implementing complex filtering and search functionality",
      "Optimizing for mobile-first experience"
    ],
    outcomes: [
      "40% increase in conversion rate",
      "60% improvement in page load times",
      "95% mobile usability score"
    ]
  },
  {
    title: "Real-time Collaboration Tool",
    description: "Built a real-time collaboration platform for remote teams with live editing and video chat features.",
    longDescription: "Developed a comprehensive collaboration platform that enables remote teams to work together in real-time, featuring live document editing, video conferencing, and project management tools.",
    technologies: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB"],
    duration: "4 months",
    year: "2023",
    githubUrl: "https://github.com/yourusername/collaboration-tool",
    challenges: [
      "Implementing real-time synchronization",
      "Handling WebRTC connections for video chat",
      "Scaling to support multiple concurrent users"
    ],
    outcomes: [
      "Successfully deployed to 500+ users",
      "99.9% uptime achieved",
      "Positive user feedback on performance"
    ]
  },
  {
    title: "Personal Finance Dashboard",
    description: "A comprehensive personal finance management application with budgeting, expense tracking, and analytics.",
    longDescription: "Created a full-featured personal finance application that helps users track expenses, create budgets, and visualize their financial data through interactive charts and reports.",
    technologies: ["Vue.js", "Express.js", "Chart.js", "MySQL", "Docker"],
    duration: "2 months",
    year: "2023",
    liveUrl: "https://finance-dashboard-demo.com",
    challenges: [
      "Implementing secure bank account integration",
      "Creating intuitive data visualization",
      "Ensuring data privacy and security"
    ],
    outcomes: [
      "Featured in local tech meetup",
      "Open-sourced with 100+ GitHub stars",
      "Used as portfolio piece for job applications"
    ]
  }
];

export default function CaseStudiesPageClient() {
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
              <Briefcase className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Case Studies
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Detailed breakdowns of projects I've worked on, including challenges faced and solutions implemented.
            </p>
          </div>

          {caseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No case studies yet. Check back soon for detailed project breakdowns!
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {caseStudies.map((study, index) => (
                <motion.article
                  key={study.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                    study.featured ? 'ring-2 ring-primary/20' : ''
                  }`}
                >
                  <div className="p-8">
                    {study.featured && (
                      <div className="flex items-center gap-1 text-primary mb-4">
                        <span className="text-xs font-medium uppercase tracking-wide">Featured Project</span>
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-foreground mb-3">
                          {study.title}
                        </h2>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{study.year}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{study.duration}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {study.longDescription}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="font-semibold text-foreground mb-3">Key Challenges</h3>
                            <ul className="space-y-2">
                              {study.challenges.map((challenge, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  {challenge}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-foreground mb-3">Outcomes</h3>
                            <ul className="space-y-2">
                              {study.outcomes.map((outcome, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        {study.liveUrl && (
                          <a
                            href={study.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Live
                          </a>
                        )}
                        {study.githubUrl && (
                          <a
                            href={study.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
