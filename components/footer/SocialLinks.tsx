import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

import { Button } from '../ui/button';

export function SocialLinks() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <div className="flex space-x-3">
      {socialLinks.map(({ icon: Icon, href: _href, label }) => (
        <Button 
          key={label}
          variant="ghost" 
          size="sm" 
          className="p-2 h-10 w-10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </Button>
      ))}
    </div>
  );
}