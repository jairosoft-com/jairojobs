'use client';

import { Share2, Mail, Linkedin, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ShareOptionsProps {
  jobTitle: string;
  company: string;
  jobUrl: string;
}

export function ShareOptions({ jobTitle, company, jobUrl }: ShareOptionsProps) {
  const shareText = `Check out this ${jobTitle} position at ${company}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(jobUrl);

  const shareOptions = [
    {
      name: 'Email',
      icon: <Mail className="mr-2 h-4 w-4" />,
      href: `mailto:?subject=${encodeURIComponent(
        `${jobTitle} at ${company}`
      )}&body=${encodedText}%0A%0A${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="mr-2 h-4 w-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: <Twitter className="mr-2 h-4 w-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareOptions.map((option) => (
          <DropdownMenuItem key={option.name} asChild>
            <a
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              {option.icon}
              <span>Share via {option.name}</span>
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={async () => {
            try {
              if (navigator.share) {
                await navigator.share({
                  title: `${jobTitle} at ${company}`,
                  text: shareText,
                  url: jobUrl,
                });
              } else {
                // Fallback for browsers that don't support Web Share API
                await navigator.clipboard.writeText(`${shareText} - ${jobUrl}`);
                alert('Link copied to clipboard!');
              }
            } catch {
              // Log error to error reporting service
              // Error is intentionally not shown to the user
            }
          }}
          className="md:hidden"
        >
          <Share2 className="mr-2 h-4 w-4" />
          <span>More options...</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
