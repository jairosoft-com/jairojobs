'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';


import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    // console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <div>
      <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>
      <p className="mb-4 text-sm leading-relaxed text-slate-300">
        Subscribe to our newsletter for the latest job opportunities and career insights.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-r-none border-slate-600 bg-slate-800 text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary"
            required
          />
          <Button 
            type="submit"
            className="rounded-l-none border-l-0 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}