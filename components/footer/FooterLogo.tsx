import { Briefcase } from 'lucide-react';

export function FooterLogo() {
  return (
    <div className="lg:col-span-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
          <Briefcase className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-white">JairoJobs</span>
      </div>
      <p className="mb-6 leading-relaxed text-slate-300">
        Your trusted partner in finding the perfect job opportunity. 
        Connect with top employers and advance your career with confidence.
      </p>
    </div>
  );
}