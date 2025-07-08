/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for Next.js 15
  experimental: {
    // Optimize package imports for better performance
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Enable static generation improvements
    
    // Enable optimized CSS loading
    optimizeCss: true,
    // Enable React 19 features
    reactCompiler: false, // Set to true if you want to enable React Compiler (experimental)
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['images.unsplash.com', 'unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Enable placeholder blur for better UX
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,

  // TypeScript configuration
  typescript: {
    // Enable type checking during build
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Run ESLint during builds
    ignoreDuringBuilds: false,
  },

  // Bundle analyzer (conditional)
  ...(process.env.ANALYZE === 'true' && {
    bundleAnalyzer: {
      enabled: true,
    },
  }),

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirect configuration
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },

  // Rewrite configuration
  async rewrites() {
    return [
      // Add any rewrites here if needed
    ];
  },
};

export default nextConfig;