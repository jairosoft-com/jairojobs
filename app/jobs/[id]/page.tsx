import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchJobById } from '@/app/actions/jobs';
import type { ExtendedJob } from '@/types/extended-job';
import type { Job } from '@/types/job';

import JobDetailsClient from './JobDetailsClient';

// ✅ Required for `output: 'export'`
export async function generateStaticParams() {
  // For static generation, we'll just return an empty array
  // In a real app, you would fetch all jobs here
  return [];
  /* Example implementation when you have fetchJobs working:
  const jobs = await fetchJobs();
  return jobs.map((job) => ({
    id: `${job.id}-${job.slug || job.title.toLowerCase().replace(/\s+/g, '-')}`,
  }));
  */
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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

export default async function JobPage({ params }: { params: { id: string } }) {
  try {
    const jobId = params.id.split('-')[0];
    const job = await fetchJobById(jobId) as Job | null;
    
    if (!job) {
      notFound();
    }
    
    // Type assertion for additional properties not in Job interface
    type JobWithExtendedProperties = Job & {
      skills?: string[];
      applicationDeadline?: string;
      industry?: string;
      website?: string;
      featured?: boolean;
    };

    // Create an ExtendedJob object with all required fields
    const jobWithExtras = job as JobWithExtendedProperties;
    
    const extendedJob: ExtendedJob = {
      // Required Job properties
      id: job.id,
      title: job.title,
      company: job.company,
      slug: job.slug,
      location: job.location,
      type: job.type,
      postedDate: job.postedDate,
      description: job.description,
      tags: Array.isArray(job.tags) ? job.tags : [],
      
      // Optional Job properties with defaults
      salary: typeof job.salary === 'string' ? job.salary : undefined,
      requirements: Array.isArray(job.requirements) ? job.requirements : [],
      benefits: Array.isArray(job.benefits) ? job.benefits : [],
      isRemote: typeof job.isRemote === 'boolean' ? job.isRemote : false,
      companyLogo: typeof job.companyLogo === 'string' ? job.companyLogo : '/JairoLogo.svg',
      companySize: typeof job.companySize === 'string' ? job.companySize : '11-50 employees',
      
      // ExtendedJob specific properties
      skills: Array.isArray(jobWithExtras.skills) ? jobWithExtras.skills : [],
      applicationDeadline: typeof jobWithExtras.applicationDeadline === 'string' 
        ? jobWithExtras.applicationDeadline 
        : undefined,
      industry: typeof jobWithExtras.industry === 'string' ? jobWithExtras.industry : undefined,
      website: typeof jobWithExtras.website === 'string' ? jobWithExtras.website : undefined,
      featured: typeof jobWithExtras.featured === 'boolean' ? jobWithExtras.featured : false
    };
    
    return <JobDetailsClient job={extendedJob} />;
  } catch {
    // In production, you might want to log this to an error tracking service
    // For now, we'll just return a 404
    notFound();
  }
}
