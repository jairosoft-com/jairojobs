// External dependencies
import { logger } from '../../lib/logger';

// Internal dependencies
import apiClient from './sdk-client';

// Type imports
import type { Job, JobDetail } from '../../generated/jobs-api';
import type { JobJobType } from '../../generated/jobs-api/models/JobJobType';

// Internal dependencies

// Type guard to check if the response is an error
function isErrorResponse(response: unknown): response is { error: string } {
  return Boolean(
    response &&
    typeof response === 'object' &&
    'error' in response &&
    typeof (response as { error: unknown }).error === 'string'
  );
}

// Type for jobs API response
interface JobsApiResponse {
  jobs?: Job[];
  pagination?: {
    total: number;
  };
}

// Type guard to check if the response has the expected jobs structure
function isJobsResponse(response: unknown): response is JobsApiResponse {
  return Boolean(
    response &&
    typeof response === 'object' &&
    'jobs' in response &&
    Array.isArray((response as { jobs: unknown }).jobs)
  );
}

export const jobsService = {
  /**
   * Fetch all jobs with optional filters
   */
  async getJobs(filters: {
    q?: string;
    location?: string;
    type?: JobJobType;
    remote?: boolean;
    page?: number;
    limit?: number;
  } = {}): Promise<{ jobs: Job[]; total: number }> {
    try {
      // Prepare the query parameters according to the API spec
      const queryParams: {
        q?: string;
        location?: string;
        page?: number;
        limit?: number;
      } = {
        q: filters?.q,
        location: filters?.location,
        page: filters?.page,
        limit: filters?.limit,
      };

      // Add remote filter if specified
      if (filters?.remote !== undefined) {
        queryParams.q = queryParams.q 
          ? `${queryParams.q} ${filters.remote ? 'remote:true' : ''}`
          : `remote:${filters.remote}`;
      }

      // Add job type filter if specified
      if (filters?.type) {
        queryParams.q = queryParams.q 
          ? `${queryParams.q} type:${filters.type}`
          : `type:${filters.type}`;
      }

      const response = await apiClient.jobs.searchAndListJobs(queryParams);
      
      // Check if the response is an error
      if (isErrorResponse(response)) {
        logger.warn('API returned an error', { error: response.error });
        return { jobs: [], total: 0 };
      }
      
      // Type assertion for the API response
      const apiResponse = response as {
        jobs?: Job[];
        pagination?: { total: number };
      };
      
      return {
        jobs: Array.isArray(apiResponse.jobs) ? apiResponse.jobs : [],
        total: apiResponse.pagination?.total || 0,
      };
      
      // If we get here, the response doesn't have the expected structure
      logger.warn('Unexpected API response structure', { response });
      return { jobs: [], total: 0 };
    } catch (error) {
      logger.error('Failed to fetch jobs', { error, filters });
      throw error;
    }
  },

  /**
   * Fetch a single job by ID
   */
  async getJobById(id: string): Promise<JobDetail | null> {
    try {
      const response = await apiClient.jobs.getJobDetails({ jobId: id });
      return response as JobDetail;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as { status: unknown }).status;
        if (status === 404) {
          logger.warn('Job not found', { id });
          return null;
        }
      }
      logger.error('Failed to fetch job by ID', { error, id });
      return null;
    }
  },

  /**
   * Fetch featured jobs
   */
  async getFeaturedJobs(limit: number = 5): Promise<Job[]> {
    try {
      const response = await apiClient.jobs.searchAndListJobs({
        q: 'featured:true',
        limit,
      });
      
      // Check if the response is an error
      if (isErrorResponse(response)) {
        logger.warn('API returned an error for featured jobs', { error: response.error });
        return [];
      }
      
      // Check if the response has the expected structure
      if (isJobsResponse(response)) {
        return response.jobs || [];
      }
      
      return [];
    } catch (error) {
      logger.error('Failed to fetch featured jobs', { error });
      return [];
    }
  },

  /**
   * Search jobs with a query string
   */
  async searchJobs(
    query: string,
    options: {
      location?: string;
      type?: string;
      remote?: boolean;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<{ jobs: Job[]; total: number }> {
    try {
      // Build the query string with filters
      let searchQuery = query;
      if (options.type) {
        searchQuery = `${searchQuery} ${options.type}`.trim();
      }
      if (options.remote) {
        searchQuery = `${searchQuery} remote:true`.trim();
      }

      const response = await apiClient.jobs.searchAndListJobs({
        q: searchQuery,
        location: options.location,
        page: options.page,
        limit: options.limit,
      });

      // Handle error response
      if (isErrorResponse(response)) {
        logger.warn('API returned an error during search', { error: response.error });
        return { jobs: [], total: 0 };
      }

      // Type assertion for successful response
      const successResponse = response as {
        jobs?: Job[];
        pagination?: { total: number };
      };
      
      return {
        jobs: Array.isArray(successResponse.jobs) ? successResponse.jobs : [],
        total: successResponse.pagination?.total || 0,
      };
    } catch (error) {
      logger.error('Failed to search jobs', { error, query, options });
      throw error;
    }
  },
};
