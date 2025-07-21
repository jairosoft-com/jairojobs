import { notFound, useRouter } from 'next/navigation';
import { JobHeader } from '@/components/jobs/JobHeader';
import { JobActions } from '@/components/jobs/JobActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { fetchJobById } from '@/app/actions/jobs';
import { Building2, Globe, Clock, Calendar, MapPin, DollarSign, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Job } from '@/types/job';

interface JobPageProps {
  params: {
    id: string;
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const job = await fetchJobById(params.id);

  if (!job) {
    notFound();
  }

  // Format the requirements and benefits for display
  const requirements = job.requirements || [];
  const benefits = job.benefits || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button 
        variant="ghost" 
        asChild 
        className="mb-6 -ml-2"
      >
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight mb-2">{job.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Building2 className="h-4 w-4 mr-1.5" />
                    <span>{job.company}</span>
                    {job.featured && (
                      <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                  </svg>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {job.type}
                </Badge>
                {job.isRemote && (
                  <Badge variant="outline" className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    Remote
                  </Badge>
                )}
                {job.salary && (
                  <Badge variant="outline" className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" />
                    {job.salary}
                  </Badge>
                )}
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </Badge>
                {job.applicationDeadline && (
                  <Badge variant="outline" className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Apply by {new Date(job.applicationDeadline).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                <p className="text-muted-foreground">{job.description}</p>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {requirements.length > 0 ? (
                      requirements.map((req: string, i: number) => (
                        <li key={`req-${i}`} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-muted-foreground">No specific requirements listed.</li>
                    )}
                  </ul>
                </div>

                {(job.skills && job.skills.length > 0) && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Skills & Qualifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill: string, i: number) => (
                        <Badge key={`skill-${i}`} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <h3 className="text-lg font-semibold mt-8 mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {benefits.length > 0 ? (
                    benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-muted-foreground">No benefits listed.</li>
                  )}
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="border-t bg-muted/50">
              <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  <span>Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    Save Job
                  </Button>
                  <Button className="flex-1 sm:flex-none">
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          {/* Similar Jobs Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Placeholder for similar jobs */}
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Frontend Developer</h3>
                      <p className="text-sm text-muted-foreground">TechStart Inc.</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                      </svg>
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">Full-time</Badge>
                    <Badge variant="secondary">Remote</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">UI/UX Designer</h3>
                      <p className="text-sm text-muted-foreground">DesignHub</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                      </svg>
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">Contract</Badge>
                    <Badge variant="secondary">Remote</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {job.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{job.company}</h3>
                    <p className="text-sm text-muted-foreground">{job.industry || 'Information Technology'}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Company Size</h4>
                    <p className="text-sm">{job.companySize || '11-50 employees'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                    <p className="text-sm">{job.location}</p>
                  </div>
                  
                  {job.website && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Website</h4>
                      <a 
                        href={job.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {new URL(job.website).hostname.replace('www.', '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Posted</h4>
                  <p className="text-sm">{new Date(job.postedDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              {job.applicationDeadline && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Apply Before</h4>
                    <p className="text-sm">{new Date(job.applicationDeadline).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Job Type</h4>
                  <p className="text-sm">{job.type}</p>
                </div>
              </div>
              
              {job.salary && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Salary</h4>
                    <p className="text-sm">{job.salary}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <JobActions jobId={job.id} />
        </div>
      </div>
    </div>
  );
}
