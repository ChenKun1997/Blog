import { Metadata } from 'next';
import CaseStudiesPageClient from './CaseStudiesPageClient';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Detailed breakdowns of projects I\'ve worked on, including challenges faced and solutions implemented.',
  openGraph: {
    title: 'Case Studies',
    description: 'Detailed breakdowns of projects I\'ve worked on, including challenges faced and solutions implemented.',
    type: 'website',
  },
};

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

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
