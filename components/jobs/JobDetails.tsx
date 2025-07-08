import { MapPin, Calendar, DollarSign, Clock } from 'lucide-react';

import { Badge } from '../ui/badge';

interface JobDetailsProps {
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  description: string;
  tags: string[];
  isRemote?: boolean;
}

export function JobDetails({
  location,
  type,
  salary,
  postedDate,
  description,
  tags,
  isRemote = false,
}: JobDetailsProps) {
  return (
    <>
      {/* Job Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span className="text-slate-600">{location}</span>
          {isRemote && (
            <Badge variant="secondary" className="ml-1 text-xs bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
              Remote
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-slate-500" />
          <span className="text-slate-600">{type}</span>
        </div>
        
        {salary && (
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-slate-500" />
            <span className="font-medium text-slate-900">{salary}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-slate-500" />
          <span className="text-slate-600">{postedDate}</span>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* Job Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border-slate-200"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </>
  );
}