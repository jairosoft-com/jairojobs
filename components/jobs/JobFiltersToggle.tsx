import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface JobFiltersToggleProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFiltersCount: number;
}

export function JobFiltersToggle({
  showFilters,
  setShowFilters,
  activeFiltersCount,
}: JobFiltersToggleProps) {
  return (
    <div className="lg:hidden mb-4">
      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="w-full justify-between h-12"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </span>
        {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
  );
}