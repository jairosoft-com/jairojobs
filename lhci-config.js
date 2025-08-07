// Simple LHCI configuration for Next.js
module.exports = {
  ci: {
    collect: {
      // Use Next.js output directory for static files
      staticDistDir: './out',
      // Run Lighthouse tests on these URLs
      url: ['http://localhost:3000'],
      // Number of times to run Lighthouse for each URL
      numberOfRuns: 1,
      // Start the server before running Lighthouse
      startServerCommand: 'npm run build && npm run export',
      startServerReadyPattern: 'Export complete',
      startServerReadyTimeout: 300000, // 5 minutes
      // Chrome settings
      chromeFlags: '--no-sandbox --headless --disable-gpu',
    },
    upload: {
      // Upload results to temporary public storage
      target: 'temporary-public-storage',
    },
  },
};
