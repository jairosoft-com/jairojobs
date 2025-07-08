import { JobCard } from '../JobCard';
import { Button } from '../ui/button';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  description: string;
  tags: string[];
  isRemote?: boolean;
  featured?: boolean;
}

interface JobGridProps {
  jobs: Job[];
}

export function JobGrid({ jobs }: JobGridProps) {
  return (
    <>
      {/* Job Cards Grid */}
      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button 
          variant="outline" 
          size="lg" 
          className="px-8 py-3 border-border hover:bg-accent hover:text-accent-foreground"
        >
          Load More Jobs
        </Button>
      </div>
    </>
  );
}