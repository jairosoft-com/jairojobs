/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
import type { JobSummaryJobType } from './JobSummaryJobType';
import type { JobSummaryRemoteOption } from './JobSummaryRemoteOption';
/**
 * A summary of a job listing.
 */
export type JobSummary = {
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
     * The location of the job.
     */
    location?: string;
    type?: JobSummaryJobType;
    remoteOption?: JobSummaryRemoteOption;
    /**
     * The date the job was posted.
     */
    postedAt?: string;
};

