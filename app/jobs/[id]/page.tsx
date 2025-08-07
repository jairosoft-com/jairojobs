import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import { fetchJobById } from '@/app/actions/jobs';
import type { ExtendedJob } from '@/types/extended-job';

import JobDetailsClient from './JobDetailsClient';

type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// ✅ Required for `output: 'export'`
export async function generateStaticParams() {
  // For static generation, we'll just return an empty array
  // In a real app, you would fetch all jobs here
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const jobId = params.id.split('-')[0];
  const job = await fetchJobById(jobId);

  if (!job) {
    return {
      title: 'Job Not Found',
      description: 'The job you are looking for does not exist or has been removed.',
    };
  }

  return {
    title: `${job.title} at ${job.company} | JairoJobs`,
    description: job.description.substring(0, 160),
  };
}

export default async function JobPage({ params }: Props) {
  const jobId = params.id.split('-')[0];
  const job = await fetchJobById(jobId);
  
  if (!job) {
    notFound();
  }
  
  // Create an ExtendedJob object with all required fields
  const extendedJob: ExtendedJob = {
    // Required Job properties
    id: job.id,
    title: job.title,
    company: job.company,
    slug: job.id, // Use job.id as fallback for slug
    location: job.location,
    type: job.type,
    postedDate: job.postedDate,
    description: job.description,
    tags: Array.isArray(job.tags) ? job.tags : [],
    
    // Optional Job properties with defaults
    salary: job.salary,
    requirements: Array.isArray(job.requirements) ? job.requirements : [],
    benefits: Array.isArray(job.benefits) ? job.benefits : [],
    isRemote: Boolean(job.isRemote),
    companyLogo: job.companyLogo || '/JairoLogo.svg',
    companySize: job.companySize || '11-50 employees',
    
    // ExtendedJob specific properties with type-safe defaults
    skills: [],
    applicationDeadline: undefined,
    industry: undefined,
    website: undefined,
    featured: false
  };
  
  return <JobDetailsClient job={extendedJob} />;
}
