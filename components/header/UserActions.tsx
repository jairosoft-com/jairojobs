import { User, Building2 } from 'lucide-react';

import { Button } from '../ui/button';

interface UserActionsProps {
  className?: string;
  mobile?: boolean;
  onAction?: () => void;
}

export function UserActions({ className = "", mobile = false, onAction }: UserActionsProps) {
  if (mobile) {
    return (
      <div className={`flex flex-col space-y-3 pt-4 border-t border-border ${className}`}>
        <Button 
          variant="ghost" 
          className="justify-start text-foreground/80 hover:text-foreground"
          onClick={onAction}
        >
          <User className="mr-2 h-4 w-4" />
          Sign In
        </Button>
        <Button 
          className="justify-start bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onAction}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Post Job
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground">
        <User className="mr-2 h-4 w-4" />
        Sign In
      </Button>
      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
        Post Job
      </Button>
    </div>
  );
}