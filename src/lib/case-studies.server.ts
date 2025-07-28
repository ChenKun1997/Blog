import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CaseStudy, CaseStudyMeta } from '@/types/blog';

const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies');

export function getAllCaseStudies(): CaseStudyMeta[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(caseStudiesDirectory)) {
    fs.mkdirSync(caseStudiesDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(caseStudiesDirectory);
  const allCaseStudiesData = fileNames
    .filter((fileName: string) => fileName.endsWith('.md'))
    .map((fileName: string) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(caseStudiesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        technologies: data.technologies || [],
        duration: data.duration,
        year: data.year,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        featured: data.featured || false,
        category: data.category,
      } as CaseStudyMeta;
    });

  return allCaseStudiesData.sort((a, b) => {
    // Sort by year (newest first), then by featured status
    if (a.year !== b.year) return parseInt(b.year) - parseInt(a.year);
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      content,
      technologies: data.technologies || [],
      duration: data.duration,
      year: data.year,
      liveUrl: data.liveUrl,
      githubUrl: data.githubUrl,
      featured: data.featured || false,
      challenges: data.challenges || [],
      outcomes: data.outcomes || [],
      images: data.images || [],
      category: data.category,
    };
  } catch (error) {
    return null;
  }
}

export function getCaseStudiesByTechnology(technology: string): CaseStudyMeta[] {
  const allCaseStudies = getAllCaseStudies();
  return allCaseStudies.filter((caseStudy) =>
    caseStudy.technologies.some((tech) => tech.toLowerCase() === technology.toLowerCase())
  );
}

export function getCaseStudiesByYear(year: string): CaseStudyMeta[] {
  const allCaseStudies = getAllCaseStudies();
  return allCaseStudies.filter((caseStudy) => caseStudy.year === year);
}

export function getCaseStudiesByCategory(category: string): CaseStudyMeta[] {
  const allCaseStudies = getAllCaseStudies();
  return allCaseStudies.filter((caseStudy) => 
    caseStudy.category?.toLowerCase() === category.toLowerCase()
  );
}

export function getAllTechnologies(): { name: string; count: number }[] {
  const allCaseStudies = getAllCaseStudies();
  const techCounts: { [key: string]: number } = {};

  allCaseStudies.forEach((caseStudy) => {
    caseStudy.technologies.forEach((tech) => {
      techCounts[tech] = (techCounts[tech] || 0) + 1;
    });
  });

  return Object.entries(techCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllYears(): string[] {
  const allCaseStudies = getAllCaseStudies();
  const years = [...new Set(allCaseStudies.map((caseStudy) => caseStudy.year))];
  return years.sort((a, b) => parseInt(b) - parseInt(a));
}

export function getAllCategories(): { name: string; count: number }[] {
  const allCaseStudies = getAllCaseStudies();
  const categoryCounts: { [key: string]: number } = {};

  allCaseStudies.forEach((caseStudy) => {
    if (caseStudy.category) {
      categoryCounts[caseStudy.category] = (categoryCounts[caseStudy.category] || 0) + 1;
    }
  });

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  const allCaseStudies = getAllCaseStudies();
  return allCaseStudies.filter((caseStudy) => caseStudy.featured);
}

export function getRelatedCaseStudies(currentSlug: string, technologies: string[], limit: number = 3): CaseStudyMeta[] {
  const allCaseStudies = getAllCaseStudies();
  
  // Filter out current case study and find case studies with matching technologies
  const relatedCaseStudies = allCaseStudies
    .filter((caseStudy) => caseStudy.slug !== currentSlug)
    .map((caseStudy) => {
      const matchingTechs = caseStudy.technologies.filter((tech) => 
        technologies.some((currentTech) => currentTech.toLowerCase() === tech.toLowerCase())
      );
      return { ...caseStudy, matchingTechsCount: matchingTechs.length };
    })
    .filter((caseStudy) => caseStudy.matchingTechsCount > 0)
    .sort((a, b) => b.matchingTechsCount - a.matchingTechsCount)
    .slice(0, limit);

  return relatedCaseStudies;
}
