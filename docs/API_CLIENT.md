# JairoJobs API Client

This document provides an overview of the JairoJobs API client implementation and how to use it in the application.

## Overview

The JairoJobs API client is a TypeScript-based SDK generated from our OpenAPI specification. It provides type-safe access to all API endpoints and is used throughout the application to interact with the backend services.

## Key Components

### 1. SDK Client (`src/lib/api/sdk-client.ts`)

The main entry point for all API interactions. This is a singleton instance of the generated API client.

```typescript
import { JairoJobsAPI } from '@/generated/jobs-api';

const apiClient = new JairoJobsAPI({
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4010',
});

export default apiClient;
```

### 2. Jobs Service (`src/lib/api/jobs-service.ts`)

A service layer that wraps the SDK client with application-specific logic and error handling.

Key features:
- Type-safe API calls
- Consistent error handling
- Request/response transformation
- Logging

### 3. Jobs Actions (`app/actions/jobs.ts`)

Server actions that use the jobs service to fetch and manipulate job data. These actions are used by Next.js server components and server actions.

## Usage Examples

### Fetching Jobs

```typescript
import { fetchJobs } from '@/app/actions/jobs';

// Basic usage
const { jobs, total } = await fetchJobs();

// With filters
const { jobs, total } = await fetchJobs({
  q: 'developer',
  location: 'Remote',
  type: 'Full-time',
  remote: true,
  page: 1,
  limit: 10,
});
```

### Fetching a Single Job

```typescript
import { fetchJobById } from '@/app/actions/jobs';

const job = await fetchJobById('job-123');
if (job) {
  // Job found
  console.log(job.title, job.company);
} else {
  // Job not found
}
```

### Searching Jobs

```typescript
import { searchJobs } from '@/app/actions/jobs';

const { jobs, total } = await searchJobs('React developer', {
  location: 'Remote',
  type: 'Full-time',
  limit: 10,
});
```

### Getting Related Jobs

```typescript
import { getRelatedJobs } from '@/app/actions/jobs';

const relatedJobs = await getRelatedJobs('job-123', 3);
```

## Error Handling

All API calls are wrapped in try-catch blocks and include error logging. The error handling strategy includes:

1. Logging errors with context
2. Returning null for 404 responses where appropriate
3. Re-throwing errors for the UI to handle

## Type Safety

The API client provides TypeScript types for all requests and responses. The main types are:

- `Job`: Basic job information
- `JobDetail`: Extended job information with additional fields
- `ExtendedJob`: Application-specific job type with all required fields

## Development

### Regenerating the SDK

If the API specification changes, you can regenerate the SDK using:

```bash
npm run generate:api
```

### Adding New Endpoints

1. Add the endpoint to the OpenAPI specification
2. Regenerate the SDK
3. Add any necessary methods to the jobs service
4. Create or update the corresponding action in `app/actions/jobs.ts`

## Best Practices

1. Always use the `jobsService` or action functions instead of calling the SDK directly
2. Keep business logic in the service layer, not in components
3. Use the `ExtendedJob` type in components for consistent typing
4. Always handle potential errors from API calls
5. Use the provided logger for error logging
