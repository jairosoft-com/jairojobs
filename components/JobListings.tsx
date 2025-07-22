'use client';

import { useState, useEffect } from 'react';
import { fetchJobs } from '@/app/actions/jobs';

import { Job } from '@/types/job';
import { JobFilters } from './jobs/JobFilters';
import { JobFiltersToggle } from './jobs/JobFiltersToggle';
import { JobGrid } from './jobs/JobGrid';
import { JobResultsHeader } from './jobs/JobResultsHeader';

export function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [_isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [salaryRange, setSalaryRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const jobsData = await fetchJobs();
        const formattedJobs = jobsData.map(job => {
          const typedJob = job as Job & {
            featured?: boolean;
            companyLogo?: string;
            applicationDeadline?: string;
            skills?: string[];
          };
          
          return {
            id: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            type: job.type,
            salary: job.salary || 'Salary not specified',
            postedDate: new Date(job.postedDate).toLocaleDateString(),
            description: job.description,
            tags: job.tags || [],
            isRemote: job.isRemote || false,
            featured: typedJob.featured || false,
            companyLogo: typedJob.companyLogo,
            applicationDeadline: typedJob.applicationDeadline,
            skills: typedJob.skills || []
          };
        });
        setJobs(formattedJobs);
      } catch (err) {
        // Using console.error for error logging is acceptable in this context
        // as it helps with debugging
        // eslint-disable-next-line no-console
        console.error('Failed to load jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, []);

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

            {/* Job Grid */}
            <JobGrid jobs={jobs} />
          </div>
        </div>
      </div>
    </section>
  );
}