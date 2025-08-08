/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { Error } from '../models/Error';
import type { JobDetail } from '../models/JobDetail';
import type { SearchAndListJobsResponse200Json } from '../models/SearchAndListJobsResponse200Json';
export class JobsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Search and List Jobs
     * Retrieves a paginated list of job postings, with optional filters for search query and location.
     * @returns SearchAndListJobsResponse200Json A paginated list of jobs.
     * @returns Error An unexpected server error occurred.
     * @throws ApiError
     */
    public searchAndListJobs({
        q,
        location,
        page = 1,
        limit = 10,
    }: {
        /**
         * A search query to filter jobs by title, company, or description.
         */
        q?: string,
        /**
         * A location to filter jobs by.
         */
        location?: string,
        /**
         * The page number to retrieve.
         */
        page?: number,
        /**
         * The number of jobs to return per page.
         */
        limit?: number,
    }): CancelablePromise<SearchAndListJobsResponse200Json | Error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/jobs',
            query: {
                'q': q,
                'location': location,
                'page': page,
                'limit': limit,
            },
            errors: {
                401: `Unauthorized. Invalid or missing API key.`,
                403: `Forbidden.`,
                404: `Not found.`,
                406: `Not Acceptable. The requested content type is not supported.`,
                429: `Too Many Requests.`,
            },
        });
    }
    /**
     * Get Job Details
     * Retrieves the full details for a specific job posting.
     * @returns JobDetail Detailed information about the job.
     * @throws ApiError
     */
    public getJobDetails({
        jobId,
    }: {
        /**
         * ID of the job to retrieve.
         */
        jobId: string,
    }): CancelablePromise<JobDetail> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/jobs/{jobId}',
            path: {
                'jobId': jobId,
            },
            errors: {
                404: `Job not found.`,
            },
        });
    }
}
