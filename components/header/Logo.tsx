import { Briefcase } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <Briefcase className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-semibold tracking-tight">JairoJobs</span>
    </div>
  );
}