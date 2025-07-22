import { Job } from '@/types/job';

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Jairosft Inc.',
    location: 'Manila, Philippines',
    type: 'Full-time',
    salary: 'PHP 80,000 - 120,000',
    postedDate: '2023-05-15',
    description: 'We are looking for a skilled Frontend Developer to join our team...',
    companyDescription: 'A leading technology company specializing in innovative solutions...',
    tags: ['React', 'TypeScript', 'Next.js'],
    isRemote: true,
    companyLogo: '/JairoLogo.svg',
    companySize: '51-200 employees',
    industry: 'Information Technology',
    website: 'https://jairosoft.com',
    featured: true,
    culture: ['Innovative', 'Collaborative', 'Inclusive']
  },
  // Add more mock jobs as needed
];

export async function fetchJobs(): Promise<Job[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobs);
    }, 500); // Simulate network delay
  });
}
