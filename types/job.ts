export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  applicationDeadline?: string;
  description: string;
  requirements?: string[];
  skills?: string[];
  benefits?: string[];
  tags: string[];
  isRemote?: boolean;
  companyLogo?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  featured?: boolean;
}

export interface JobCardProps extends Omit<Job, 'requirements' | 'benefits' | 'companySize' | 'industry' | 'website'> {
  // Additional props specific to JobCard if needed
}

export interface JobDetailsProps {
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  description: string;
  tags: string[];
  isRemote?: boolean;
}
