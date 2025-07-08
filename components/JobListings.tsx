'use client';

import { useState } from 'react';

import { JobFilters } from './jobs/JobFilters';
import { JobFiltersToggle } from './jobs/JobFiltersToggle';
import { JobGrid } from './jobs/JobGrid';
import { JobResultsHeader } from './jobs/JobResultsHeader';

// Mock job data with featured flag
const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $160k',
    postedDate: '2 days ago',
    description: 'We are looking for a talented Senior Frontend Developer to join our dynamic team. You will be responsible for developing user-facing features using modern React.js workflows.',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    isRemote: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $170k',
    postedDate: '1 day ago',
    description: 'Join our product team to drive the development of cutting-edge software solutions. We need someone with strong analytical skills and product vision.',
    tags: ['Product Strategy', 'Analytics', 'Agile', 'User Research'],
    isRemote: false,
    featured: false,
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Design Studio Pro',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90k - $120k',
    postedDate: '3 days ago',
    description: 'Creative UX/UI Designer wanted to create beautiful and intuitive user experiences. Experience with Figma and user research methodologies required.',
    tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    isRemote: true,
    featured: true,
  },
  {
    id: '4',
    title: 'Data Scientist',
    company: 'DataVision Analytics',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$140k - $180k',
    postedDate: '5 days ago',
    description: 'Looking for a Data Scientist to analyze complex datasets and build predictive models. Strong background in machine learning and statistics required.',
    tags: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    isRemote: true,
    featured: false,
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    company: 'Growth Marketing Co.',
    location: 'Los Angeles, CA',
    type: 'Part-time',
    salary: '$60k - $80k',
    postedDate: '1 week ago',
    description: 'Join our marketing team to develop and execute digital marketing campaigns. Experience with social media and content marketing preferred.',
    tags: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics'],
    isRemote: false,
    featured: false,
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Denver, CO',
    type: 'Full-time',
    salary: '$110k - $150k',
    postedDate: '4 days ago',
    description: 'Seeking a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. Experience with AWS and Kubernetes required.',
    tags: ['AWS', 'Kubernetes', 'Docker', 'CI/CD'],
    isRemote: true,
    featured: false,
  },
];

export function JobListings() {
  const [jobs] = useState(mockJobs);
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

            {/* Job Grid */}
            <JobGrid jobs={jobs} />
          </div>
        </div>
      </div>
    </section>
  );
}