'use server';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  description: string;
  tags: string[];
  isRemote: boolean;
  featured: boolean;
  [key: string]: any; // Allow for additional properties
}

export async function fetchJobs(): Promise<Job[]> {
  try {
    // Try both environment variable names for compatibility
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_JOBSMOCK || process.env.API_JOBSMOCK;
    
    if (!apiBaseUrl) {
      throw new Error('API_JOBSMOCK or NEXT_PUBLIC_API_JOBSMOCK environment variable is not set');
    }

    const apiUrl = `${apiBaseUrl}/jobs/list`;
    console.log('Fetching jobs from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      cache: 'no-store', // Disable caching for development
      next: { revalidate: 60 } // Revalidate every 60 seconds in production
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Raw API response:', JSON.stringify(data, null, 2));
    
    // Check if the response has a data property that contains the jobs array
    const jobsData = data.data || data;
    
    // Normalize the response to always be an array
    const dataArray = Array.isArray(jobsData) ? jobsData : [jobsData];
    console.log('Data after array conversion:', JSON.stringify(dataArray, null, 2));
    
    // Ensure each job has required fields and normalize data
    const jobs = dataArray.map((job, index) => {
      const normalizedJob: Job = {
        id: (job.id?.toString() || `job-${index}-${Date.now()}`) as string,
        title: job.title || 'Untitled Position',
        company: job.company || 'Unknown Company',
        location: job.location || 'Location not specified',
        type: job.type || 'Full-time',
        salary: job.salary,
        postedDate: job.postedDate || new Date().toISOString(),
        description: job.description || 'No description available',
        tags: Array.isArray(job.tags) ? job.tags : 
             typeof job.tags === 'string' ? job.tags.split(',').map((tag: string) => tag.trim()) : [],
        isRemote: Boolean(job.isRemote || job.remote),
        featured: Boolean(job.featured)
      };
      
      // Add any additional properties that aren't already covered
      Object.keys(job).forEach(key => {
        if (!(key in normalizedJob)) {
          (normalizedJob as any)[key] = job[key];
        }
      });
      
      return normalizedJob;
    });
    
    return jobs;
  } catch (error) {
    console.error('Error in fetchJobs:', error);
    
    // Return mock data if in development and API is not available
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock data due to API error');
      return [
        {
          id: '1',
          title: 'Senior Frontend Developer (Mock)',
          company: 'TechCorp Inc.',
          location: 'Remote',
          type: 'Full-time',
          salary: '$120k - $160k',
          postedDate: 'Just now',
          description: 'This is mock data because the API is not available.',
          tags: ['React', 'TypeScript', 'Next.js'],
          isRemote: true,
          featured: true,
        }
      ];
    }
    
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch jobs');
  }
}
