import { X } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface JobResultsHeaderProps {
  jobCount: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedJobTypes: string[];
  onJobTypeChange: (jobType: string, checked: boolean) => void;
  remoteOnly: boolean;
  setRemoteOnly: (remote: boolean) => void;
  activeFiltersCount: number;
}

export function JobResultsHeader({
  jobCount,
  sortBy,
  setSortBy,
  selectedJobTypes,
  onJobTypeChange,
  remoteOnly,
  setRemoteOnly,
  activeFiltersCount,
}: JobResultsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          <span className="font-medium text-slate-900">{jobCount}</span> jobs found
        </span>
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedJobTypes.map((type) => (
              <Badge key={type} variant="secondary" className="flex items-center gap-1 bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200">
                {type}
                <button 
                  onClick={() => onJobTypeChange(type, false)}
                  className="hover:bg-slate-300 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {remoteOnly && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
                Remote
                <button 
                  onClick={() => setRemoteOnly(false)}
                  className="hover:bg-emerald-300 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
      
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-48 border-slate-300 focus:border-primary focus:ring-primary/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
          <SelectItem value="salary-high">Salary: High to Low</SelectItem>
          <SelectItem value="salary-low">Salary: Low to High</SelectItem>
          <SelectItem value="company">Company A-Z</SelectItem>
          <SelectItem value="relevance">Most relevant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}