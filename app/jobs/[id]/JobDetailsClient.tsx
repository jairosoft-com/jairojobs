'use client';

import { ArrowLeft, Building2, Calendar, CheckCircle, Clock, DollarSign, Globe, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ExtendedJob } from '@/types/extended-job';

interface JobDetailsClientProps {
  job: ExtendedJob | null;
}

export default function JobDetailsClient({ job }: JobDetailsClientProps) {
  const router = useRouter();
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-muted-foreground">The job you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Ensure all required fields have default values
  const requirements = job.requirements || [];
  const benefits = job.benefits || [];
  const skills = job.skills || [];
  const tags = job.tags || [];
  const postedDate = job.postedDate || new Date().toISOString().split('T')[0];
  const location = job.location || 'Location not specified';
  const jobType = job.type || 'Full-time';

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2"
        onClick={() => router.back()}
      >
        <div className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </div>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Job Details */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2">{job.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Building2 className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-lg font-medium">{job.company}</span>
                    {job.featured && (
                      <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Quick Apply Button */}
                <Button className="hidden md:flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Apply Now
                </Button>
              </div>
              
              {/* Job Meta Information */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {jobType}
                </Badge>
                {job.isRemote && (
                  <Badge variant="outline" className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border-blue-200">
                    <Globe className="h-3.5 w-3.5" />
                    Remote
                  </Badge>
                )}
                {job.salary && (
                  <Badge variant="outline" className="flex items-center gap-1.5 bg-green-50 text-green-700 border-green-200">
                    <DollarSign className="h-3.5 w-3.5" />
                    {job.salary}
                  </Badge>
                )}
                <Badge variant="outline" className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Posted {new Date(postedDate).toLocaleDateString()}
                </Badge>
                {job.applicationDeadline && (
                  <Badge variant="outline" className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border-amber-200">
                    <Clock className="h-3.5 w-3.5" />
                    Apply by {new Date(job.applicationDeadline).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                {/* Job Description Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 border-b pb-2">Job Description</h3>
                  <div className="text-slate-700 leading-relaxed space-y-4">
                    {job.description ? (
                      <p>{job.description}</p>
                    ) : (
                      <p className="text-muted-foreground italic">No job description provided.</p>
                    )}
                  </div>
                </div>
                
                {/* Requirements Section */}
                {requirements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-slate-900 border-b pb-2">Requirements</h3>
                    <ul className="space-y-3">
                      {requirements.map((req, i) => (
                        <li key={`req-${i}`} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
    
                {/* Skills Section */}
                {skills.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-slate-900 border-b pb-2">Skills & Qualifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <Badge 
                          key={`skill-${i}`} 
                          variant="secondary" 
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
    
                {/* Benefits Section */}
                {benefits.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-slate-900 border-b pb-2">Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {benefits.map((benefit, i) => (
                        <div key={`benefit-${i}`} className="flex items-start p-3 bg-slate-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="border-t bg-slate-50/50">
              <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  <span>Posted on {new Date(postedDate).toLocaleDateString()}</span>
                  {job.applicationDeadline && (
                    <span className="ml-4">
                      • Apply by: <span className="font-medium text-amber-700">{new Date(job.applicationDeadline).toLocaleDateString()}</span>
                    </span>
                  )}
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="flex-1 sm:flex-none gap-2"
                    onClick={() => {
                      // Handle save job
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                    Save Job
                  </Button>
                  <Button 
                    className="flex-1 sm:flex-none gap-2 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      // Handle apply now
                    }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info Card */}
          <Card className="border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">About {job.company}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-100 overflow-hidden">
                  {job.companyLogo ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image 
                        src={job.companyLogo || ''}
                        alt={`${job.company} logo`}
                        width={40}
                        height={40}
                        className="object-contain max-w-[80%] max-h-[80%]"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.style.display = 'none';
                          // The fallback is the first letter of the company name
                          const fallback = document.createElement('div');
                          fallback.className = 'text-blue-600 font-bold text-xl';
                          fallback.textContent = job.company.charAt(0).toUpperCase();
                          target.parentNode?.insertBefore(fallback, target.nextSibling);
                        }}
                      />
                    </div>
                  ) : (
                    <span className="text-blue-600 font-bold text-xl">
                      {job.company.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">{job.company}</h3>
                  {job.industry && (
                    <p className="text-sm text-slate-500">{job.industry}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                {job.companySize && (
                  <div className="flex items-center text-slate-700">
                    <Building2 className="mr-2 h-4 w-4 text-slate-400" />
                    <span>{job.companySize} employees</span>
                  </div>
                )}
                <div className="flex items-center text-slate-700">
                  <MapPin className="mr-2 h-4 w-4 text-slate-400" />
                  <span>{location}</span>
                </div>
                {job.website && (
                  <a
                    href={job.website.startsWith('http') ? job.website : `https://${job.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Job Summary Card */}
          <Card className="border-slate-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Job Type</span>
                  <span className="font-medium text-slate-900">{jobType}</span>
                </div>
                
                {job.salary && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Salary</span>
                    <span className="font-medium text-slate-900">{job.salary}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-slate-500">Posted</span>
                  <span className="font-medium text-slate-900">{new Date(postedDate).toLocaleDateString()}</span>
                </div>
                
                {job.applicationDeadline && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Apply Before</span>
                    <span className="font-medium text-amber-700">{new Date(job.applicationDeadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {tags.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-sm font-medium text-slate-700 mb-2">Job Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <Badge 
                        key={`tag-${i}`} 
                        variant="outline" 
                        className="px-2.5 py-1 text-xs bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4" />
                  Apply for this position
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
