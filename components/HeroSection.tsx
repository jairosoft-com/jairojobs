import { HeroContent } from './hero/HeroContent';
import { SearchForm } from './hero/SearchForm';
import { StatsSection } from './hero/StatsSection';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Content */}
            <HeroContent />

            {/* Search Section */}
            <SearchForm />

            {/* Stats Section */}
            <StatsSection />
          </div>
        </div>
      </div>
    </section>
  );
}