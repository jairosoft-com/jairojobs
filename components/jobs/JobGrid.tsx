import { Job } from '@/types/job-types';

import { JobCard } from '../JobCard';
import { Button } from '../ui/button';

interface JobGridProps {
  jobs: Job[];
  onJobClick: (jobId: string) => void;
}

export function JobGrid({ jobs, onJobClick }: JobGridProps) {
  const handleJobClick = (jobId: string) => (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (jobId) {
        onJobClick(jobId);
      }
    } catch {
      // Silently fail in production
    }
  };

  return (
    <>
      {/* Job Cards Grid */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            onClick={handleJobClick(job.id)}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <JobCard {...job} />
          </div>
        ))}
      </div>

      {jobs.length > 0 && (
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 border-border hover:bg-accent hover:text-accent-foreground"
            onClick={() => {}}
          >
            Load More Jobs
          </Button>
        </div>
      )}
    </>
  );
}