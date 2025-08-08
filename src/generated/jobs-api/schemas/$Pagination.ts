/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
export const $Pagination = {
    description: `Pagination information for a list of items.`,
    properties: {
        total: {
            type: 'number',
            description: `Total number of items.`,
        },
        page: {
            type: 'number',
            description: `Current page number.`,
        },
        limit: {
            type: 'number',
            description: `Items per page.`,
        },
        totalPages: {
            type: 'number',
            description: `Total number of pages.`,
        },
    },
} as const;
