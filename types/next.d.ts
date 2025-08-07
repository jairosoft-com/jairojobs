// Minimal type declarations for Next.js

// Viewport type for Next.js 13+
type Viewport = {
  width?: string;
  height?: string;
  initialScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
  viewportFit?: 'auto' | 'cover' | 'contain';
};

// Page props interface
type PageProps = {
  params?: { [key: string]: string | string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type { Viewport, PageProps };

// Global type augmentation
declare global {
  // Global Viewport type
  // eslint-disable-next-line no-var
  var Viewport: Viewport;

  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
    }
  }
  
  // Global PageProps interface for type safety
  interface PageProps {
    params?: { [key: string]: string | string[] };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}

// This helps TypeScript understand the page props for dynamic routes
type PageParams = {
  params: { [key: string]: string | string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
};
