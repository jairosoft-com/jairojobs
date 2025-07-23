import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchJobById } from '@/app/actions/jobs';

import JobDetailsClient from './JobDetailsClient';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const jobId = params.id.split('-')[0];
  const job = await fetchJobById(jobId);

  if (!job) {
    return {
      title: 'Job Not Found',
      description: 'The job you are looking for does not exist or has been removed.'
    };
  }

  return {
    title: `${job.title} at ${job.company} | JairoJobs`,
    description: job.description.substring(0, 160),
  };
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const jobId = params.id.split('-')[0];
  const job = await fetchJobById(jobId);
  
  if (!job) {
    notFound();
  }
  
  return <JobDetailsClient job={job} />;
}