import { Menu } from 'lucide-react';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

import { UserActions } from './UserActions';

export function MobileMenu({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const navLinks = [
    { href: "#jobs", label: "Find Jobs" },
    { href: "#companies", label: "Companies" },
    { href: "#employers", label: "For Employers" },
    { href: "#resources", label: "Resources" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm" className="px-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-6 py-6">
          {/* Mobile Logo */}
          <div className="flex items-center space-x-2 pb-4 border-b border-border">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <span className="text-xs font-bold text-primary-foreground">J</span>
            </div>
            <span className="text-lg font-semibold">JairoJobs</span>
          </div>
          
          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={onToggle}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Actions */}
          <UserActions mobile onAction={onToggle} />
        </div>
      </SheetContent>
    </Sheet>
  );
}