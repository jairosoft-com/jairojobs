import { JobActions } from './jobs/JobActions';
import { JobDetails } from './jobs/JobDetails';
import { JobHeader } from './jobs/JobHeader';
import { Card, CardContent } from './ui/card';

interface JobCardProps {
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
  companyLogo?: string;
  featured?: boolean;
}

export function JobCard({
  title,
  company,
  location,
  type,
  salary,
  postedDate,
  description,
  tags,
  isRemote = false,
  featured = false,
}: JobCardProps) {
  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-slate-200 bg-white hover:border-slate-300 ${
      featured 
        ? 'ring-2 ring-primary/20 border-primary/30 shadow-lg' 
        : 'hover:shadow-lg'
    }`}>
      <CardContent className="p-6">
        <JobHeader title={title} company={company} featured={featured} />
        <JobDetails 
          location={location}
          type={type}
          salary={salary}
          postedDate={postedDate}
          description={description}
          tags={tags}
          isRemote={isRemote}
        />
        <JobActions />
      </CardContent>
    </Card>
  );
}