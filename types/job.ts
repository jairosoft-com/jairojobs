export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  description: string;
  companyDescription?: string;
  tags: string[];
  isRemote?: boolean;
  companyLogo?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  featured?: boolean;
  culture?: string[];
  applicationDeadline?: string;
  requirements?: string[];
  benefits?: string[];
  skills?: string[];
}
