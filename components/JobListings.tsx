'use client';

import { useState, useEffect } from 'react';

import { JobFilters } from './jobs/JobFilters';
import { JobFiltersToggle } from './jobs/JobFiltersToggle';
import { JobGrid } from './jobs/JobGrid';
import { JobResultsHeader } from './jobs/JobResultsHeader';
import { fetchJobs } from '@/app/actions/jobs';

// Import the Job type from our actions
import type { Job } from '@/app/actions/jobs';

export function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!process.env.NEXT_PUBLIC_API_JOBSMOCK) {
          console.warn('NEXT_PUBLIC_API_JOBSMOCK environment variable is not set. Using mock data.');
          // We'll let the server action handle the fallback to mock data
        }
        
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        console.error('Error loading jobs:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load jobs. Please try again later.';
        setError(errorMessage);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryRange, setSalaryRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    } else {
      setSelectedJobTypes(selectedJobTypes.filter(type => type !== jobType));
    }
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedLocations([]);
    setRemoteOnly(false);
    setSalaryRange('');
    setSearchTerm('');
  };

  const activeFiltersCount = selectedJobTypes.length + selectedLocations.length + (remoteOnly ? 1 : 0) + (salaryRange ? 1 : 0);

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

            {/* Job Grid with Loading and Error States */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
                <p className="mt-1 text-sm text-gray-500">There are currently no job listings available.</p>
              </div>
            ) : (
              <JobGrid jobs={jobs} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}