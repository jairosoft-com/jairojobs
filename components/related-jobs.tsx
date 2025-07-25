'use client';

import { MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExtendedJob } from '@/types/extended-job';

interface RelatedJobsProps {
  currentJob: ExtendedJob;
  allJobs: ExtendedJob[];
  maxJobs?: number;
}

export function RelatedJobs({ currentJob, allJobs, maxJobs = 3 }: RelatedJobsProps) {
  // Filter out the current job and find related jobs based on industry, skills, and experience level
  const relatedJobs = React.useMemo(() => {
    return allJobs
      .filter(job => job.id !== currentJob.id) // Exclude current job
      .map(job => {
        // Calculate a relevance score based on matching criteria
        let score = 0;
        
        // Industry match (higher weight)
        if (job.industry === currentJob.industry) score += 3;
        
        // Experience level match
        if (job.experienceLevel === currentJob.experienceLevel) score += 2;
        
        // Skills match (count how many skills match)
        const matchingSkills = currentJob.skills?.filter(skill => 
          job.skills?.includes(skill)
        )?.length || 0;
        score += matchingSkills;
        
        return { ...job, score };
      })
      .filter(job => job.score > 0) // Only include jobs with at least one matching criterion
      .sort((a, b) => b.score - a.score) // Sort by relevance score
      .slice(0, maxJobs); // Limit the number of results
  }, [currentJob, allJobs, maxJobs]);

  if (relatedJobs.length === 0) {
    return null; // Don't render if no related jobs found
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Related Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relatedJobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-base">
                  <Link href={`/jobs/${job.slug || job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                </div>
                {job.experienceLevel && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {job.experienceLevel}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end">
                {job.salary && (
                  <span className="text-sm font-medium">{job.salary}</span>
                )}
                <span className="text-xs text-muted-foreground mt-1">
                  {job.postedDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/jobs">View All Jobs</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
