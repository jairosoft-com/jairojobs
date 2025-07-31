import { jobsApi } from '@/src/lib/api/jobs';
import type { ExtendedJob, JobFilters, Job } from '@/types/job-types';

// Re-export types for convenience
export type { ExtendedJob, JobFilters };

// Export all API functions
export * from '@/src/lib/api/jobs';

// Function to map API job to our local job type
// Function to map API job to our local job type
export function mapApiJobToLocalJob(apiJob: Job): ExtendedJob {
  return {
    ...apiJob,
    slug: apiJob.slug || `job-${apiJob.id}`,
    postedDate: apiJob.postedDate || new Date().toISOString(),
    requirements: apiJob.requirements || [],
    benefits: apiJob.benefits || [],
    tags: apiJob.tags || [],
    skills: apiJob.skills || [],
    description: apiJob.description || '',
    isRemote: apiJob.isRemote || false,
    featured: apiJob.featured || false,
    // Format salary if it's a range object
    ...(typeof apiJob.salary === 'object' && apiJob.salary !== null && 'min' in apiJob.salary && ({
      salary: `$${apiJob.salary.min}${apiJob.salary.max ? ` - $${apiJob.salary.max}` : ''}`
    })),
  };
}

/**
 * Get all jobs with optional filtering
 * @param filters Filtering parameters
 * @returns Promise with array of jobs
 */
// Get all jobs with optional filtering
export async function getAllJobs(filters: JobFilters = {}): Promise<ExtendedJob[]> {
  try {
    const response = await jobsApi.fetchJobs({
      page: filters.page || 1,
      limit: filters.limit || 20,
      q: filters.q, // Using 'q' instead of 'query' to match our API
      location: filters.location,
      type: filters.type,
      featured: filters.featured,
    });
    
    if (response?.jobs) {
      return response.jobs.map(mapApiJobToLocalJob);
    }
    return [];
  } catch (error) {
    // Error is already logged by the error boundary
    throw error;
  }
}

/**
 * Get a single job by ID
 * @param id The job ID to fetch
 * @returns Promise with job details or null if not found
 */
// Get a single job by ID
export async function getJobById(id: string): Promise<ExtendedJob | null> {
  try {
    const job = await jobsApi.fetchJobById(id);
    return job ? mapApiJobToLocalJob(job) : null;
  } catch {
    // Error is already handled by the UI state
    return null;
  }
}

/**
 * Get featured jobs
 * @param limit Maximum number of featured jobs to return (default: 5)
 * @returns Promise with array of featured jobs
 */
// Get featured jobs
export async function getFeaturedJobs(limit: number = 5): Promise<ExtendedJob[]> {
  try {
    const response = await jobsApi.fetchJobs({
      featured: true,
      limit,
      page: 1,
    });
    
    if (response?.jobs) {
      return response.jobs.map(mapApiJobToLocalJob);
    }
    return [];
  } catch {
    // Error is already handled by the UI state
    return [];
  }
}

/**
 * Search jobs by query string
 * @param query Search query string
 * @param filters Additional filters to apply
 * @returns Promise with array of matching jobs
 */
// Search jobs by query string
export async function searchJobs(
  query: string, 
  filters: Omit<JobFilters, 'q'> = {}
): Promise<ExtendedJob[]> {
  try {
    const response = await jobsApi.fetchJobs({
      ...filters,
      q: query, // Using 'q' instead of 'query' to match our API
      page: 1, // Always start from first page for searches
      limit: filters.limit || 20,
    });
    
    if (response?.jobs) {
      return response.jobs.map(mapApiJobToLocalJob);
    }
    return [];
  } catch {
    // Error is already handled by the UI state
    return [];
  }
}
