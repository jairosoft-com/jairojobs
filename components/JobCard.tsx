import { ArrowRight, Bookmark, Briefcase, Clock, DollarSign, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  description: string;
  tags: string[];
  isRemote?: boolean;
  companyLogo?: string;
  featured?: boolean;
}

export function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  postedDate,
  description,
  tags = [],
  isRemote = false,
  featured = false,
  companyLogo,
}: JobCardProps) {
  // Format the posted date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 bg-white hover:border-primary/30 ${
      featured ? 'ring-1 ring-primary/20' : ''
    }`}>
      {/* Featured Ribbon */}
      {featured && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
            Featured
          </Badge>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
              {companyLogo ? (
                <Image 
                  src={companyLogo} 
                  alt={`${company} logo`} 
                  width={40} 
                  height={40}
                  className="object-contain max-w-[80%] max-h-[80%]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                    // The fallback is the first letter of the company name
                    const fallback = document.createElement('div');
                    fallback.className = 'text-blue-600 font-bold text-xl';
                    fallback.textContent = company.charAt(0).toUpperCase();
                    target.parentNode?.insertBefore(fallback, target.nextSibling);
                  }}
                />
              ) : (
                <span className="text-blue-600 font-bold text-xl">
                  {company.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            {/* Job Title and Company */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{company}</p>
            </div>

            {/* Job Details */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{location}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <span>{type}</span>
              </div>
              {salary && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-green-600 font-medium">
                    <DollarSign className="h-4 w-4" />
                    <span>{salary}</span>
                  </div>
                </>
              )}
              {isRemote && (
                <Badge variant="outline" className="ml-1 text-xs bg-blue-50 text-blue-600 border-blue-100">
                  Remote
                </Badge>
              )}
            </div>

            {/* Description Preview */}
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {description}
            </p>

            {/* Skills/Tags */}
            {tags.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="px-2.5 py-0.5 text-xs bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {tags.length > 3 && (
                    <Badge 
                      variant="outline" 
                      className="px-2.5 py-0.5 text-xs text-gray-500 bg-white border-dashed"
                    >
                      +{tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>Posted {formatDate(postedDate)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <Bookmark className="h-4 w-4" />
            <span className="sr-only">Save job</span>
          </Button>
          <Button asChild variant="outline" className="group/button">
            <Link href={`/jobs/${id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}