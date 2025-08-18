/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
export const $Error = {
    description: `Error response schema.`,
    properties: {
        code: {
            type: 'number',
            description: `HTTP status code.`,
            isRequired: true,
        },
        message: {
            type: 'string',
            description: `A human-readable error message.`,
            isRequired: true,
        },
    },
} as const;
