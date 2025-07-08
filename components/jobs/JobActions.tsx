import { ExternalLink } from 'lucide-react';

import { Button } from '../ui/button';

export function JobActions() {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-colors"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        View Details
      </Button>
      <Button 
        size="sm" 
        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all duration-200 hover:shadow-md"
      >
        Apply Now
      </Button>
    </div>
  );
}