'use client';

import { Building, Users, Globe, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

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
  description = 'A leading technology company specializing in innovative solutions. ' +
    'We are committed to delivering high-quality software solutions that help businesses grow. ' +
    'Our team of experts works tirelessly to ensure customer satisfaction and innovation in every project. ' +
    'Join us in our mission to transform the digital landscape with cutting-edge technology.',
  culture = ['Innovative', 'Collaborative', 'Inclusive']
}: CompanyInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120; // Maximum characters to show before truncation
  const shouldTruncate = description.length > maxLength;
  const displayText = isExpanded ? description : `${description.substring(0, maxLength)}${shouldTruncate ? '...' : ''}`;
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-md bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
            {companyLogo ? (
              <div className="relative h-12 w-12">
                <Image
                  src={companyLogo || '/JairoLogo.svg'}
                  alt={`${company} logo`}
                  fill
                  className="rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/JairoLogo.svg';
                  }}
                />
              </div>
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
          <div className="mt-4 text-sm text-slate-600">
            <p className="whitespace-pre-line">{displayText}</p>
            {shouldTruncate && (
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 flex items-center text-sm font-medium text-primary hover:text-primary/90 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span>Read Less</span>
                    <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Read More</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
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
