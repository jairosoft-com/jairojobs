import { CompanyGrid } from './companies/CompanyGrid';

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

const featuredCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    industry: 'Technology',
    location: 'San Francisco, CA',
    size: '1,000-5,000',
    rating: 4.5,
    jobCount: 23,
    description: 'Leading technology company focused on innovative software solutions and cutting-edge development.',
    featured: true,
  },
  {
    id: '2',
    name: 'Innovation Labs',
    industry: 'Software',
    location: 'New York, NY',
    size: '500-1,000',
    rating: 4.7,
    jobCount: 18,
    description: 'Fast-growing startup revolutionizing the way businesses operate with AI-powered solutions.',
    featured: true,
  },
  {
    id: '3',
    name: 'Design Studio Pro',
    industry: 'Design',
    location: 'Austin, TX',
    size: '100-500',
    rating: 4.6,
    jobCount: 12,
    description: 'Creative agency specializing in user experience design and brand development.',
    featured: true,
  },
  {
    id: '4',
    name: 'DataVision Analytics',
    industry: 'Analytics',
    location: 'Seattle, WA',
    size: '200-500',
    rating: 4.4,
    jobCount: 15,
    description: 'Data science company helping businesses make informed decisions through advanced analytics.',
    featured: true,
  },
  {
    id: '5',
    name: 'CloudTech Solutions',
    industry: 'Cloud Computing',
    location: 'Denver, CO',
    size: '500-1,000',
    rating: 4.3,
    jobCount: 20,
    description: 'Cloud infrastructure provider enabling scalable and secure business operations.',
    featured: true,
  },
  {
    id: '6',
    name: 'Growth Marketing Co.',
    industry: 'Marketing',
    location: 'Los Angeles, CA',
    size: '50-100',
    rating: 4.8,
    jobCount: 8,
    description: 'Performance marketing agency focused on driving growth for e-commerce businesses.',
    featured: true,
  },
];

export function FeaturedCompanies() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 text-gray-950">Featured Companies</h2>
          <p className="text-lg text-gray-600">
            Explore opportunities at top-rated companies across various industries
          </p>
        </div>

        <CompanyGrid companies={featuredCompanies} />
      </div>
    </section>
  );
}