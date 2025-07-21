import { notFound } from 'next/navigation';
import { fetchJobById } from '@/app/actions/jobs';
import JobDetailsClient from './JobDetailsClient';

interface PageProps {
  params: { id: string };
}

export default async function JobPage({ params }: PageProps) {
  // Extract the job ID from the URL (removing the slug part if present)
  const jobId = params.id.split('-')[0];
  
  // Fetch job data on the server
  const job = await fetchJobById(jobId);
  
  if (!job) {
    return notFound();
  }
  
  return <JobDetailsClient job={job} />;
}
