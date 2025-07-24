// This file contains type declarations for Next.js
// Remove any existing global declarations that might conflict with Next.js types

declare module 'next' {
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
  
  // This helps TypeScript understand the page props for dynamic routes
  interface PageProps {
    params?: { [key: string]: string | string[] };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}
