import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'JairoJobs - Find Your Dream Job Today',
    template: '%s | JairoJobs'
  },
  description: 'Discover thousands of job opportunities from top companies. Take the next step in your career journey with JairoJobs - the modern job board platform.',
  keywords: [
    'jobs',
    'careers',
    'employment',
    'hiring',
    'job search',
    'recruitment',
    'remote jobs',
    'tech jobs',
    'full-time jobs',
    'part-time jobs'
  ],
  authors: [{ name: 'JairoJobs Team', url: 'https://jairojobs.com' }],
  creator: 'JairoJobs',
  publisher: 'JairoJobs',
  category: 'Jobs & Career',
  classification: 'Business',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jairojobs.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: 'JairoJobs - Find Your Dream Job Today',
    description: 'Discover thousands of job opportunities from top companies. Take the next step in your career journey with JairoJobs.',
    url: '/',
    siteName: 'JairoJobs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JairoJobs - Find Your Dream Job Today',
    description: 'Discover thousands of job opportunities from top companies. Take the next step in your career journey with JairoJobs.',
    creator: '@jairojobs',
    site: '@jairojobs',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  appleWebApp: {
    title: 'JairoJobs',
    statusBarStyle: 'default',
    capable: true,
  },
  applicationName: 'JairoJobs',
  referrer: 'origin-when-cross-origin',
  appLinks: {
    web: {
      url: 'https://jairojobs.com',
      should_fallback: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Basic favicon setup - will fallback gracefully if files don't exist */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JairoJobs" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}