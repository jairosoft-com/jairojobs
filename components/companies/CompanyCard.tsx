import { Building2, MapPin, Users, Star } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

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

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 bg-white hover:border-slate-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center group-hover:from-primary/10 group-hover:to-primary/20 transition-all duration-300">
              <Building2 className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">{company.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{company.rating}</span>
              </div>
            </div>
          </div>
          {company.featured && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
              Featured
            </Badge>
          )}
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {company.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <Building2 className="h-4 w-4 mr-2 text-slate-400" />
            {company.industry}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
            {company.location}
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Users className="h-4 w-4 mr-2 text-slate-400" />
            {company.size} employees
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-primary font-medium">
            {company.jobCount} open positions
          </span>
          <Button variant="outline" size="sm" className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300">
            View Company
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}