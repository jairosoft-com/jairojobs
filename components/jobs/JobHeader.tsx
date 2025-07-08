import { Building2, Bookmark } from 'lucide-react';

import { Button } from '../ui/button';

interface JobHeaderProps {
  title: string;
  company: string;
  featured?: boolean;
}

export function JobHeader({ title, company, featured = false }: JobHeaderProps) {
  return (
    <>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg shadow-sm">
            Featured
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          {/* Company Logo */}
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300">
            <Building2 className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-shrink-0 text-slate-400 hover:text-primary hover:bg-slate-50 p-2 h-8 w-8 transition-colors"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-slate-600 font-medium mb-3">{company}</p>
          </div>
        </div>
      </div>
    </>
  );
}