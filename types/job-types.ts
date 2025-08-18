// Base Job interface
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string | { min: number; max?: number };
  postedDate?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  tags: string[];
  isRemote: boolean;
  slug: string;
  skills: string[];
  featured?: boolean;
  companyLogo?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  applicationDeadline?: string;
}

// ExtendedJob has been removed as it didn't add any additional properties
// Use the base Job interface instead

// API Request/Response Types
export interface JobSearchParams {
  q?: string;
  location?: string;
  type?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  isRemote?: boolean;
}

export interface JobSearchResponse {
  jobs: Job[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// For backward compatibility
export type JobFilters = JobSearchParams;
