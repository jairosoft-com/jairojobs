import { JairoJobsAPI } from '../../generated/jobs-api';
import { logger } from '../logger';

// Define types for our job data
interface SalaryRange {
  min?: number;
  max?: number;
  currency?: string;
  amount?: number;
  period?: string;
}

interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string | SalaryRange;
  type?: string;
  remote?: boolean;
  postedDate?: string;
  [key: string]: unknown; // Use unknown instead of any for type safety
}

// Define types for our API responses
interface JobsResponse {
  jobs: JobData[];
  total: number;
  page: number;
  limit: number;
}

// Type guard to check if the response is an error
function isErrorResponse(response: unknown): response is { error: string } {
  return (response !== null && 
          typeof response === 'object' && 
          'error' in response && 
          typeof (response as { error: unknown }).error === 'string');
}

// Type guard to check if the response is a valid jobs response
interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface SalaryRange {
  min?: number;
  max?: number;
  currency?: string;
  amount?: number;
  period?: string;
}

interface JobResponse {
  id?: string;
  title?: string;
  company?: string;
  location?: string;
  salary?: string | SalaryRange;
  type?: string;
  remote?: boolean;
  postedDate?: string;
  [key: string]: unknown;
}

function isValidJobsResponse(response: unknown): response is { 
  jobs: JobResponse[]; 
  pagination: Pagination;
} {
  if (!response || typeof response !== 'object') return false;
  const r = response as Record<string, unknown>;
  
  if (!('jobs' in r) || !Array.isArray(r.jobs)) return false;
  if (!('pagination' in r) || typeof r.pagination !== 'object' || r.pagination === null) return false;
  
  const pagination = r.pagination as Record<string, unknown>;
  return (
    'total' in pagination &&
    typeof pagination.total === 'number' &&
    'page' in pagination &&
    typeof pagination.page === 'number' &&
    'limit' in pagination &&
    typeof pagination.limit === 'number'
  );
}

// Create a singleton instance of the API client
const apiClient = new JairoJobsAPI({
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4010',
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'test-api-key-123',
  },
});

// Helper function to handle API errors
const handleError = (error: unknown, context: string): never => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  logger.error(`API Error (${context}):`, errorMessage);
  throw new Error(`API Error (${context}): ${errorMessage}`);
};

// Jobs API methods
export const jobsApi = {
  /**
   * Search for jobs with pagination and filters
   */
  async fetchJobs(params: {
    page?: number;
    limit?: number;
    q?: string;
    location?: string;
    type?: string;
    remote?: boolean;
    featured?: boolean;
  } = {}): Promise<JobsResponse> {
    try {
      const { page = 1, limit = 10, q, location } = params;
      
      const response = await apiClient.jobs.searchAndListJobs({
        q,
        location,
        page,
        limit,
        // TODO: Add support for type, remote, and featured filters once they're added to the API
      });
      
      // Handle error response
      if (isErrorResponse(response)) {
        throw new Error(response.error || 'Failed to fetch jobs');
      }
      
      // Transform the response to match our expected format
      if (isValidJobsResponse(response)) {
        return {
          jobs: response.jobs.map((job: JobResponse) => {
            const jobData: JobData = {
              id: job.id || '',
              title: job.title || '',
              company: job.company || '',
              location: job.location || '',
              salary: job.salary,
              type: job.type,
              remote: job.remote,
              postedDate: job.postedDate,
            };
            return jobData;
          }),
          total: response.pagination.total,
          page: response.pagination.page,
          limit: response.pagination.limit,
        };
      }
      
      // Return empty result if response format is unexpected
      return {
        jobs: [],
        total: 0,
        page: 1,
        limit: 10,
      };
      
    } catch (error) {
      return handleError(error, 'fetchJobs');
    }
  },

  /**
   * Fetch a single job by ID
   */
  async fetchJobById(id: string): Promise<JobData | null> {
    try {
      // First try to fetch the job directly if the endpoint exists
      try {
        // Use a type-safe approach to check for the method
        const jobsClient = apiClient.jobs as unknown as {
          getJobById?: (params: { jobId: string }) => Promise<JobData | { error: string }>;
        };
        
        if (jobsClient.getJobById) {
          const response = await jobsClient.getJobById({ jobId: id });
          if (response && !('error' in response)) {
            return response;
          }
        }
      } catch (error) {
        // Log the error but continue to fallback implementation
        logger.error('Error in getJobById', { error });
      }
      
      // Fallback: fetch all jobs and find the matching one
      const { jobs } = await jobsApi.fetchJobs({});
      return jobs.find((job: JobData) => job.id === id) || null;
      
    } catch (error) {
      // Handle 404 specifically to return null for non-existent jobs
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return null;
      }
      return handleError(error, 'fetchJobById');
    }
  },
};

export default jobsApi;
