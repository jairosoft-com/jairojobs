/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
export const $JobSalary = {
    description: `Salary information for a job.`,
    properties: {
        min: {
            type: 'number',
            description: `Minimum salary for the job.`,
            format: 'float',
        },
        max: {
            type: 'number',
            description: `Maximum salary for the job.`,
            format: 'float',
        },
        currency: {
            type: 'string',
            description: `The currency of the salary.`,
        },
        period: {
            type: 'string',
            description: `The period of the salary.`,
        },
    },
} as const;
