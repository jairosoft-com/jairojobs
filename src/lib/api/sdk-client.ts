import { JairoJobsAPI } from '../../generated/jobs-api';

// Create a singleton instance of the API client
const apiClient = new JairoJobsAPI({
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4010',
  WITH_CREDENTIALS: true,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add API key in the X-API-Key header as required by the API
    ...(process.env.NEXT_PUBLIC_API_KEY ? { 'X-API-Key': process.env.NEXT_PUBLIC_API_KEY } : {})
  }
});

export default apiClient;
