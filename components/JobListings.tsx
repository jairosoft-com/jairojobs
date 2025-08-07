'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

import { jobsApi } from '@/src/lib/api/jobs';
import { ExtendedJob, JobFilters as JobFiltersType } from '@/types/job-types';

import { JobFilters } from './jobs/JobFilters';
import { JobFiltersToggle } from './jobs/JobFiltersToggle';
import { JobGrid } from './jobs/JobGrid';
import { JobResultsHeader } from './jobs/JobResultsHeader';

export function JobListings() {
  const router = useRouter();
  const [jobs, setJobs] = useState<ExtendedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryRange, setSalaryRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const loadJobs = useCallback(async (filters: Partial<JobFiltersType> = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const fetchParams = {
        page: currentPage,
        limit: jobsPerPage,
        location: selectedLocations.join(','),
        type: selectedJobTypes.join(','),
        q: searchTerm, // Add search term to query params
        ...filters,
      };
      
      const response = await jobsApi.fetchJobs(fetchParams);
      
      if (response?.jobs) {
        setJobs(response.jobs);
        // Use the total count from the API response if available
        setTotalJobs(response.pagination?.total || response.jobs.length);
      } else {
        setJobs([]);
        setTotalJobs(0);
      }
    } catch {
      // Error is logged to the console for debugging
      setError('Failed to load jobs. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, selectedJobTypes, selectedLocations]);

  // Load initial filters from URL if present
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    try {
      const params = new URLSearchParams(window.location.search);
      const location = params.get('location');
      const jobType = params.get('type');
      
      if (location) setSelectedLocations([location]);
      if (jobType) setSelectedJobTypes([jobType]);
    } catch {
      // Silently fail in production
    }
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    const applyFilters = async () => {
      const filters: Partial<JobFiltersType> = {};
      
      if (selectedJobTypes.length) filters.type = selectedJobTypes.join(',');
      if (selectedLocations.length) filters.location = selectedLocations.join(',');
      if (remoteOnly) filters.isRemote = true;
      
      try {
        await loadJobs(filters);
      } catch {
        // Error is handled by the error boundary
        setError('Failed to load jobs. Please try again later.');
      }
    };

    applyFilters();
  }, [loadJobs, searchTerm, selectedJobTypes, selectedLocations, remoteOnly]);

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    setSelectedJobTypes(prev => 
      checked 
        ? [...prev, jobType]
        : prev.filter(type => type !== jobType)
    );
  };
  
  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedLocations([]);
    setRemoteOnly(false);
    setSalaryRange('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const activeFiltersCount = selectedJobTypes.length + 
    selectedLocations.length + 
    (remoteOnly ? 1 : 0) + 
    (salaryRange ? 1 : 0) +
    (searchTerm ? 1 : 0);
    
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  
  if (isLoading && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Latest Job Opportunities</h2>
          <p className="text-lg text-slate-600">Discover your next career move from our curated job listings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            {/* Mobile Filter Toggle */}
            <JobFiltersToggle
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              activeFiltersCount={activeFiltersCount}
            />

            {/* Filters Panel */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
              <JobFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedJobTypes={selectedJobTypes}
                onJobTypeChange={handleJobTypeChange}
                remoteOnly={remoteOnly}
                setRemoteOnly={setRemoteOnly}
                salaryRange={salaryRange}
                setSalaryRange={setSalaryRange}
                activeFiltersCount={activeFiltersCount}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Sort and Results Header */}
            <JobResultsHeader
              jobCount={jobs.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedJobTypes={selectedJobTypes}
              onJobTypeChange={handleJobTypeChange}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              activeFiltersCount={activeFiltersCount}
            />

            {/* Job Grid */}
            {jobs.length > 0 ? (
              <>
                <JobGrid 
                  jobs={jobs} 
                  onJobClick={handleJobClick} 
                />
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-4 py-2 rounded-md ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}