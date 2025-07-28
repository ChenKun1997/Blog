import { Metadata } from 'next';
import CaseStudiesPageClient from './CaseStudiesPageClient';
import { getAllCaseStudies, getAllTechnologies, getAllYears, getAllCategories } from '@/lib/case-studies.server';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Detailed breakdowns of projects I\'ve worked on, including challenges faced and solutions implemented.',
  openGraph: {
    title: 'Case Studies',
    description: 'Detailed breakdowns of projects I\'ve worked on, including challenges faced and solutions implemented.',
    type: 'website',
  },
};



export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();
  const technologies = getAllTechnologies();
  const years = getAllYears();
  const categories = getAllCategories();

  return (
    <CaseStudiesPageClient
      caseStudies={caseStudies}
      technologies={technologies}
      years={years}
      categories={categories}
    />
  );
}
