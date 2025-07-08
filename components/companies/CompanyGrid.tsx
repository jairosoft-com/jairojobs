import { Button } from '../ui/button';

import { CompanyCard } from './CompanyCard';

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  size: string;
  rating: number;
  jobCount: number;
  description: string;
  featured?: boolean;
}

interface CompanyGridProps {
  companies: Company[];
}

export function CompanyGrid({ companies }: CompanyGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          View All Companies
        </Button>
      </div>
    </>
  );
}