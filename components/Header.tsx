'use client';

import { useState } from 'react';

import { Logo } from './header/Logo';
import { MobileMenu } from './header/MobileMenu';
import { Navigation } from './header/Navigation';
import { UserActions } from './header/UserActions';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Navigation />
            <UserActions />
          </div>
          
          {/* Mobile Menu */}
          <MobileMenu 
            isOpen={isMenuOpen} 
            onToggle={() => setIsMenuOpen(!isMenuOpen)} 
          />
        </div>
      </div>
    </header>
  );
}