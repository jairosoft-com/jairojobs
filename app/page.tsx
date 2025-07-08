import { FeaturedCompanies } from '../components/FeaturedCompanies';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { JobListings } from '../components/JobListings';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <JobListings />
        <FeaturedCompanies />
      </main>
      <Footer />
    </div>
  );
}