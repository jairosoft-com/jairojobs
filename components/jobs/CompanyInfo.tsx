import { Building, Users, Globe, Briefcase } from 'lucide-react';
import { Badge } from '../ui/badge';

interface CompanyInfoProps {
  company: string;
  companyLogo?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  description?: string;
  culture?: string[];
}

export function CompanyInfo({
  company,
  companyLogo,
  companySize,
  industry,
  website = 'https://jairosoft.com',
  description = 'A leading technology company specializing in innovative solutions.',
  culture = ['Innovative', 'Collaborative', 'Inclusive']
}: CompanyInfoProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-md bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt={`${company} logo`} 
                className="h-full w-full object-contain p-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/JairoLogo.svg';
                }}
              />
            ) : (
              <Building className="h-8 w-8 text-slate-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{company}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {companySize && (
                <div className="flex items-center text-sm text-slate-600">
                  <Users className="h-4 w-4 mr-1 text-slate-500" />
                  {companySize}
                </div>
              )}
              {industry && (
                <div className="flex items-center text-sm text-slate-600">
                  <Briefcase className="h-4 w-4 mr-1 text-slate-500" />
                  {industry}
                </div>
              )}
            </div>
          </div>
        </div>
        {website && (
          <a 
            href={website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            <Globe className="h-4 w-4 mr-1.5" />
            Visit Website
          </a>
        )}
      </div>

      {description && (
        <div className="mt-4">
          <p className="text-sm text-slate-600 line-clamp-3">
            {description}
          </p>
          <button className="text-sm font-medium text-primary hover:text-primary/80 mt-1">
            Read more
          </button>
        </div>
      )}

      {culture && culture.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-medium text-slate-900 mb-2">Company Culture</h4>
          <div className="flex flex-wrap gap-2">
            {culture.map((item, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
