import { Job } from './job';

export interface ExtendedJob extends Job {
  // These properties are already in Job interface but redeclared here for clarity
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
  companyLogo: string;
  companySize: string;
  skills: string[];
  
  // Additional properties specific to ExtendedJob
  applicationDeadline?: string;
  industry?: string;
  website?: string;
  featured?: boolean;
}
