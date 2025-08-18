// This file contains type declarations for Next.js

declare module 'next' {
  export * from 'next/types';
  
  // Export Metadata and Viewport types
  export type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
  export type { Viewport } from 'next/dist/lib/metadata/types/extra-types';
  
  // Page props interface for Next.js pages
  interface PageProps {
    params?: { [key: string]: string | string[] };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
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
