// Simple LHCI configuration for Next.js
module.exports = {
  ci: {
    collect: {
      // Don't use staticDistDir since we're using a live server
      // Run Lighthouse tests on these URLs
      url: ['http://localhost:3000'],
      // Number of times to run Lighthouse for each URL
      numberOfRuns: 1,
      // Don't start the server automatically - we'll start it manually
      startServerCommand: 'echo "Please start the Next.js server manually with \'npm run dev\'"',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 10000, // 10 seconds
      // Chrome settings
      chromeFlags: [
        '--no-sandbox',
        '--headless=new',
        '--disable-gpu',
        '--disable-dev-shm-usage'
      ]
    },
    upload: {
      // Upload results to temporary public storage
      target: 'temporary-public-storage',
    },
  },
};
