import { Search } from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';

interface JobFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedJobTypes: string[];
  onJobTypeChange: (jobType: string, checked: boolean) => void;
  remoteOnly: boolean;
  setRemoteOnly: (remote: boolean) => void;
  salaryRange: string;
  setSalaryRange: (range: string) => void;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export function JobFilters({
  searchTerm,
  setSearchTerm,
  selectedJobTypes,
  onJobTypeChange,
  remoteOnly,
  setRemoteOnly,
  salaryRange,
  setSalaryRange,
  activeFiltersCount,
  onClearFilters,
}: JobFiltersProps) {
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Filters</CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-primary hover:text-primary/80 hover:bg-primary/5 p-2 text-sm"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search within results */}
        <div>
          <label className="text-sm font-medium text-slate-900 mb-2 block">
            Search within results
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>

        <Separator className="bg-slate-200" />

        {/* Job Type */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-3">Job Type</h4>
          <div className="space-y-3">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedJobTypes.includes(type)}
                  onCheckedChange={(checked) => onJobTypeChange(type, checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label 
                  htmlFor={type} 
                  className="text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-200" />

        {/* Remote Work */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-3">Work Location</h4>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={remoteOnly}
              onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
              className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label 
              htmlFor="remote" 
              className="text-sm text-slate-600 cursor-pointer hover:text-slate-900 transition-colors"
            >
              Remote only
            </label>
          </div>
        </div>

        <Separator className="bg-slate-200" />

        {/* Salary Range */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-3">Salary Range</h4>
          <Select value={salaryRange} onValueChange={setSalaryRange}>
            <SelectTrigger className="border-slate-300 focus:border-primary focus:ring-primary/20">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50k">$0 - $50k</SelectItem>
              <SelectItem value="50k-100k">$50k - $100k</SelectItem>
              <SelectItem value="100k-150k">$100k - $150k</SelectItem>
              <SelectItem value="150k+">$150k+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}