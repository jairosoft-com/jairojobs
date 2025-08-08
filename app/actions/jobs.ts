// External dependencies

// Internal dependencies
import { jobsService } from '../../src/lib/api/jobs-service';
import { logger } from '../../src/lib/logger';

// Type imports
import type { Job, JobDetail, JobSalary } from '../../src/generated/jobs-api';
import type { JobJobType } from '../../src/generated/jobs-api/models/JobJobType';

// Type for API response that includes nested objects for related entities
interface ApiJobDetail extends Omit<JobDetail, 'requirements' | 'benefits' | 'tags' | 'skills'> {
  // These properties contain objects with the actual values in their properties
  requirements?: Array<{ requirement: string }>;
  benefits?: Array<{ benefit: string }>;
  tags?: Array<{ tag: string }>;
  skills?: Array<{ skill: string }>;
  isRemote?: boolean;
  companyLogo?: string;
  companySize?: string;
  featured?: boolean;
}

// Value imports

export interface JobFilters {
  q?: string;
  location?: string;
  type?: JobJobType;
  remote?: boolean;
  page?: number;
  limit?: number;
  featured?: boolean;
}

// Extended job type that includes all properties we need in the frontend
export interface ExtendedJob extends Omit<Job, 'salary' | 'isRemote' | 'companyLogo' | 'companySize' | 'featured'> {
  slug: string;
  postedDate: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  skills: string[];
  description: string;
  isRemote: boolean;
  companyLogo: string;
  companySize: string;
  featured: boolean;
  salary?: JobSalary | string;
}

// Function to map API job to our local job type
function mapApiJobToLocalJob(apiJob: Job | JobDetail): ExtendedJob {
  const baseJob: Partial<ExtendedJob> = {
    ...apiJob,
    slug: `job-${apiJob.id}`,
    postedDate: 'postedAt' in apiJob && apiJob.postedAt 
      ? new Date(apiJob.postedAt).toISOString() 
      : new Date().toISOString(),
    requirements: [],
    benefits: [],
    tags: [],
    skills: [],
    description: '',
    isRemote: false,
    companyLogo: '',
    companySize: '',
    featured: false,
  };

  // Handle job detail specific fields
  if ('description' in apiJob) {
    const jobDetail = apiJob as unknown as ApiJobDetail;
    baseJob.description = jobDetail.description || '';
    
    // Map requirements from API format to our local format
    if (Array.isArray(jobDetail.requirements)) {
      baseJob.requirements = jobDetail.requirements
        .map(r => r?.requirement)
        .filter((r): r is string => typeof r === 'string');
    }
    
    // Map benefits from API format to our local format
    if (Array.isArray(jobDetail.benefits)) {
      baseJob.benefits = jobDetail.benefits
        .map(b => b?.benefit)
        .filter((b): b is string => typeof b === 'string');
    }
    
    // Map tags from API format to our local format
    if (Array.isArray(jobDetail.tags)) {
      baseJob.tags = jobDetail.tags
        .map(t => t?.tag)
        .filter((t): t is string => typeof t === 'string');
    }
    
    // Map skills from API format to our local format
    if (Array.isArray(jobDetail.skills)) {
      baseJob.skills = jobDetail.skills
        .map(s => s?.skill)
        .filter((s): s is string => typeof s === 'string');
    }
    
    // Handle boolean and string fields with default values
    baseJob.isRemote = Boolean(jobDetail.isRemote);
    baseJob.companyLogo = typeof jobDetail.companyLogo === 'string' ? jobDetail.companyLogo : '';
    baseJob.companySize = typeof jobDetail.companySize === 'string' ? jobDetail.companySize : '';
    baseJob.featured = Boolean(jobDetail.featured);
  }

  return baseJob as ExtendedJob;
}

/**
 * Fetch jobs with optional filters
 */
export async function fetchJobs(filters: JobFilters = {}): Promise<ExtendedJob[]> {
  try {
    const { q, ...restFilters } = filters;
    const response = await jobsService.getJobs({
      q,
      ...restFilters,
      page: restFilters.page || 1,
      limit: restFilters.limit || 10,
    });
    
    return Array.isArray(response?.jobs) ? response.jobs.map(mapApiJobToLocalJob) : [];
  } catch (error) {
    logger.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }
}

// Alias for fetchJobs for backward compatibility
export const getAllJobs = fetchJobs;

/**
 * Fetch a single job by ID
 */
export async function fetchJobById(id: string): Promise<ExtendedJob | null> {
  try {
    const job = await jobsService.getJobById(id);
    return job ? mapApiJobToLocalJob(job) : null;
  } catch (error) {
    logger.error(`Error fetching job ${id}:`, error);
    return null;
  }
}

// Alias for fetchJobById for backward compatibility
export const getJobById = fetchJobById;

/**
 * Fetch featured jobs
 */
export async function fetchFeaturedJobs(limit = 5): Promise<ExtendedJob[]> {
  try {
    const response = await jobsService.getJobs({
      // Remove the featured filter since it's not in the type
      limit,
    });
    return Array.isArray(response?.jobs) ? response.jobs.map(mapApiJobToLocalJob) : [];
  } catch (error) {
    logger.error('Error fetching featured jobs:', error);
    return [];
  }
}

// Alias for fetchFeaturedJobs for backward compatibility
export const getFeaturedJobs = fetchFeaturedJobs;

/**
 * Search jobs with a query string
 */
export async function searchJobs(
  query: string,
  options: Omit<JobFilters, 'q'> = {}
): Promise<ExtendedJob[]> {
  try {
    const response = await jobsService.searchJobs(query, {
      ...options,
      page: options.page || 1,
      limit: options.limit || 10,
    });
    
    return Array.isArray(response?.jobs) ? response.jobs.map(mapApiJobToLocalJob) : [];
  } catch (error) {
    logger.error('Error searching jobs:', error);
    throw new Error('Failed to search jobs');
  }
}

/**
 * Get related jobs based on a job ID
 */
export async function getRelatedJobs(jobId: string, limit = 3): Promise<ExtendedJob[]> {
  try {
    const job = await fetchJobById(jobId);
    if (!job) return [];

    // Find jobs with similar tags or skills
    const allJobs = await fetchJobs({});
    const relatedJobs = allJobs
      .filter(j => j.id !== jobId) // Exclude the current job
      .filter(j => {
        // Match by tags or skills
        const tagMatch = j.tags.some(tag => job.tags.includes(tag));
        const skillMatch = j.skills.some(skill => job.skills.includes(skill));
        return tagMatch || skillMatch;
      })
      .slice(0, limit);

    return relatedJobs;
  } catch (error) {
    logger.error('Error getting related jobs:', error);
    return [];
  }
}
