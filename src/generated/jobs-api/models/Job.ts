/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
import type { JobBenefits } from './JobBenefits';
import type { JobExperienceLevel } from './JobExperienceLevel';
import type { JobJobType } from './JobJobType';
import type { JobRemoteOption } from './JobRemoteOption';
import type { JobRequirements } from './JobRequirements';
import type { JobResponsibilities } from './JobResponsibilities';
import type { JobSalary } from './JobSalary';
import type { JobTags } from './JobTags';
/**
 * Full details of a job listing.
 */
export type Job = {
    /**
     * Unique identifier for the job.
     */
    id?: string;
    /**
     * The title of the job.
     */
    title?: string;
    /**
     * The name of the company posting the job.
     */
    company?: string;
    /**
     * Unique identifier for the company.
     */
    companyId?: string;
    /**
     * URL to the company's logo.
     */
    companyLogo?: string;
    /**
     * The location of the job.
     */
    location?: string;
    type?: JobJobType;
    experienceLevel?: JobExperienceLevel;
    remoteOption?: JobRemoteOption;
    salary?: JobSalary;
    /**
     * The full description of the job.
     */
    description?: string;
    requirements?: JobRequirements;
    responsibilities?: JobResponsibilities;
    benefits?: JobBenefits;
    tags?: JobTags;
    /**
     * The date the job was posted.
     */
    postedAt?: string;
    /**
     * The deadline for applying for the job.
     */
    applicationDeadline?: string;
    /**
     * The number of applicants for the job.
     */
    applicants?: number;
    /**
     * Whether the job is featured or not.
     */
    featured?: boolean;
    /**
     * Whether the job is active or not.
     */
    active?: boolean;
};

