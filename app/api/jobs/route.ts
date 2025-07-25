import { NextResponse } from 'next/server';

import { fetchJobs } from '@/app/actions/jobs';

export async function GET() {
  try {
    const jobs = await fetchJobs();
    return NextResponse.json(jobs);
  } catch {
    // Log error to error reporting service
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
