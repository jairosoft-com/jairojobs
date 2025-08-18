import { notFound } from 'next/navigation';


// Application imports
import { fetchJobById } from '@/app/actions/jobs';


// Utility imports
import { logger } from '../../../src/lib/logger';

import JobDetailsClient from './JobDetailsClient';

import type { ExtendedJob } from '@/types/extended-job';
import type { Metadata } from 'next/types';

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

export async function generateMetadata({ params: _params }: Props): Promise<Metadata> {
  // Use default metadata to avoid server component errors
  // We'll let the client-side handle the actual job data
  return {
    title: 'Job Details | JairoJobs',
    description: 'View job details and apply for this position',
  };
}

// Sample UUIDs for development
const SAMPLE_UUIDS = [
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  '44444444-4444-4444-4444-444444444444',
  '55555555-5555-5555-5555-555555555555',
  '66666666-6666-6666-6666-666666666666',
  '77777777-7777-7777-7777-777777777777',
];

// Helper function to check if a string is a valid UUID
function isUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
}

// Separate the component to handle the params safely
export default async function JobPage(props: { params: { id: string } }) {
  // Await params first
  const params = await Promise.resolve(props.params);
  
  // For development, we'll map numeric IDs to sample UUIDs
  const jobId = getJobId(params.id);
  
  // Get the job data
  const job = await getJobData(jobId);
  
  // If no job is found, return 404
  if (!job) {
    notFound();
  }
  
  // Render the job details
  return <JobDetailsClient job={job} />;
}

// Helper function to get the job ID (handles numeric to UUID mapping)
function getJobId(id: string): string {
  // If the ID is a number, map it to a sample UUID
  const numericId = parseInt(id, 10);
  if (!isNaN(numericId) && numericId > 0 && numericId <= SAMPLE_UUIDS.length) {
    return SAMPLE_UUIDS[numericId - 1];
  }
  return id;
}

// Helper function to fetch job data
async function getJobData(jobId: string) {
  try {
    let job = await fetchJobById(jobId);
    
    // If job not found and ID is not a UUID, try with a sample UUID
    if (!job && !isUUID(jobId)) {
      const numericId = parseInt(jobId, 10);
      if (!isNaN(numericId) && numericId > 0 && numericId <= SAMPLE_UUIDS.length) {
        const sampleUuid = SAMPLE_UUIDS[numericId - 1];
        job = await fetchJobById(sampleUuid);
      }
    }
    
    if (!job) return null;
    
    // Create an ExtendedJob object with all required fields
    return {
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
    } as ExtendedJob;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`Error fetching job (ID: ${jobId}):`, errorMessage);
    return null;
  }
}
