/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
export const $Job = {
    description: `Full details of a job listing.`,
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
        companyId: {
            type: 'string',
            description: `Unique identifier for the company.`,
            pattern: '^comp-[a-zA-Z0-9]+$',
        },
        companyLogo: {
            type: 'string',
            description: `URL to the company's logo.`,
            format: 'uri',
        },
        location: {
            type: 'string',
            description: `The location of the job.`,
        },
        type: {
            type: 'JobJobType',
        },
        experienceLevel: {
            type: 'JobExperienceLevel',
        },
        remoteOption: {
            type: 'JobRemoteOption',
        },
        salary: {
            type: 'JobSalary',
        },
        description: {
            type: 'string',
            description: `The full description of the job.`,
        },
        requirements: {
            type: 'JobRequirements',
        },
        responsibilities: {
            type: 'JobResponsibilities',
        },
        benefits: {
            type: 'JobBenefits',
        },
        tags: {
            type: 'JobTags',
        },
        postedAt: {
            type: 'string',
            description: `The date the job was posted.`,
            format: 'date-time',
        },
        applicationDeadline: {
            type: 'string',
            description: `The deadline for applying for the job.`,
            format: 'date-time',
        },
        applicants: {
            type: 'number',
            description: `The number of applicants for the job.`,
        },
        featured: {
            type: 'boolean',
            description: `Whether the job is featured or not.`,
        },
        active: {
            type: 'boolean',
            description: `Whether the job is active or not.`,
        },
    },
} as const;
