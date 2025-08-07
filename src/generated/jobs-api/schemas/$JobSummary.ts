/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
export const $JobSummary = {
    description: `A summary of a job listing.`,
    properties: {
        id: {
            type: 'string',
            description: `Unique identifier for the job.`,
        },
        title: {
            type: 'string',
            description: `The title of the job.`,
        },
        company: {
            type: 'string',
            description: `The name of the company posting the job.`,
        },
        location: {
            type: 'string',
            description: `The location of the job.`,
        },
        type: {
            type: 'JobSummaryJobType',
        },
        remoteOption: {
            type: 'JobSummaryRemoteOption',
        },
        postedAt: {
            type: 'string',
            description: `The date the job was posted.`,
            format: 'date-time',
        },
    },
} as const;
