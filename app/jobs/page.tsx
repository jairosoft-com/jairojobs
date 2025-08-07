'use client';

import { Building2, Briefcase, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExtendedJob } from '@/types/extended-job';

// Create a separate component that uses useSearchParams
function JobsContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get('company');
  const [jobs, setJobs] = useState<ExtendedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        
        // Filter jobs by company if company query parameter exists
        const filteredJobs = company 
          ? data.filter((job: ExtendedJob) => job.company === company)
          : data;
          
        setJobs(filteredJobs);
      } catch {
        // Log error to error reporting service
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [company]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {company ? `Jobs at ${company}` : 'All Jobs'}
        </h1>
        <p className="text-muted-foreground">
          {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
          {company && ` at ${company}`}
        </p>
      </div>

      <div className="grid gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link 
              key={job.id} 
              href={`/jobs/${job.id}-${job.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="block hover:opacity-90 transition-opacity"
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </span>
                        {job.isRemote && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Remote
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                      {job.salary && (
                        <span className="mt-2 text-sm font-medium text-green-600">
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
            <p className="text-muted-foreground">
              {company 
                ? `There are currently no open positions at ${company}.`
                : 'There are currently no job listings available.'}
            </p>
            {company && (
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/jobs">View all jobs</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}
