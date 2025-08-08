import { useState } from 'react';

import { Bookmark, Building2, Calendar, Clock, DollarSign, MapPin } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface JobHeaderProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  isRemote?: boolean;
  postedDate: string;
  applicationDeadline?: string;
  featured?: boolean;
  companyLogo?: string;
  onImageError?: () => void;
}

export function JobHeader({ 
  title, 
  company, 
  location,
  type,
  salary,
  isRemote,
  postedDate,
  applicationDeadline,
  featured = false,
  companyLogo,
  onImageError
}: JobHeaderProps) {
  const [isImageError, setIsImageError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.style.display = 'none';
    setIsImageError(true);
    if (onImageError) onImageError();
  };

  return (
    <div className="relative bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg shadow-sm">
            Featured
          </div>
        </div>
      )}
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Company Logo */}
            {companyLogo && !isImageError ? (
              <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                <Image 
                  src={companyLogo}
                  alt={`${company} logo`}
                  fill
                  className="object-cover"
                  onError={handleImageError}
                />
              </div>
            ) : (
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-slate-500" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-primary hover:bg-slate-50 p-2 h-8 w-8"
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center mt-1">
                <p className="text-lg font-medium text-gray-700">{company}</p>
                {isRemote && (
                  <Badge variant="secondary" className="ml-2">
                    Remote
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{type}</span>
          </div>
          {salary && (
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>{salary}</span>
            </div>
          )}
          {applicationDeadline && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
              <span>Apply by {new Date(applicationDeadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="outline" className="text-sm">
            {new Date(postedDate).toLocaleDateString()}
          </Badge>
        </div>
      </div>
    </div>
  );
}