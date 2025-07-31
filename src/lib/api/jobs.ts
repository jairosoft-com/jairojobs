import { Job, JobSearchParams, JobSearchResponse } from '@/types/job-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4010';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'test-api-key-123';

/**
 * Generic API request function
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const headers = new Headers(options.headers);
  
  headers.set('Content-Type', 'application/json');
  headers.set('x-api-key', API_KEY);
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        if (response.status === 422) {
          errorMessage = `Validation Error (422): ${JSON.stringify(errorData)}`;
        }
      } catch {
        if (response.status === 422) {
          errorMessage = 'Validation Error (422): Invalid request data';
        }
      }
      
      interface ApiError extends Error {
        status: number;
        data: unknown;
      }
      
      const error = new Error(errorMessage) as ApiError;
      error.status = response.status;
      error.data = errorData;
      throw error;
    }
    
    return response.json() as Promise<T>;
  } catch (error: unknown) {
    // Re-throw the error to be handled by the caller
    throw error;
  }
}

/**
 * Search for jobs with pagination and filters
 */
export async function fetchJobs(params: JobSearchParams = { page: 1, limit: 10 }): Promise<JobSearchResponse> {
  const query = new URLSearchParams();
  
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());
  if (params.q) query.set('q', params.q);
  if (params.location) query.set('location', params.location);
  if (params.type) query.set('type', params.type);
  if (params.featured) query.set('featured', 'true');
  
  return apiRequest<JobSearchResponse>(`/v1/jobs?${query.toString()}`);
}

/**
 * Fetch a single job by ID
 */
export async function fetchJobById(id: string): Promise<Job | null> {
  try {
    const response = await apiRequest<Job>(`/v1/jobs/${id}`);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('404')) {
      return null; // Job not found
    }
    // Error is already included in the error message
    if (error instanceof Error && error.message.includes('422')) {
      // Error is already included in the error message
    }
    throw error;
  }
}

// Export the API methods for direct use
export const jobsApi = {
  fetchJobs,
  fetchJobById,
};
