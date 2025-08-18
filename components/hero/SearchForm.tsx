'use client';

import { useState } from 'react';

import { MapPin, Search } from 'lucide-react';


import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    // console.log('Searching for:', { searchQuery, location });
  };

  const popularSearches = [
    { label: 'Remote', onClick: () => setSearchQuery('Remote') },
    { label: 'Frontend Developer', onClick: () => setSearchQuery('Frontend Developer') },
    { label: 'Product Manager', onClick: () => setSearchQuery('Product Manager') },
    { label: 'Data Scientist', onClick: () => setSearchQuery('Data Scientist') },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 lg:p-8 mb-12 border border-slate-200 backdrop-blur-sm">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Job Title/Keywords */}
          <div className="lg:col-span-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20 bg-white"
              />
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                type="text"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 text-base border-slate-300 focus:border-primary focus:ring-primary/20 bg-white"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-3">
            <Button 
              type="submit"
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary/90 hover:to-blue-600/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Jobs
            </Button>
          </div>
        </div>
        
        {/* Popular Searches */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-600 font-medium">Popular:</span>
          {popularSearches.map((search, index) => (
            <span key={search.label}>
              <button 
                type="button" 
                className="text-primary hover:text-primary/80 transition-colors font-medium hover:underline"
                onClick={search.onClick}
              >
                {search.label}
              </button>
              {index < popularSearches.length - 1 && (
                <span className="text-slate-300 ml-2">•</span>
              )}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}