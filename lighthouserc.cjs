module.exports = {
  ci: {
    collect: {
      // URL to test
      url: ['http://localhost:3000'],
      numberOfRuns: 1,

      // Command to start your app
      startServerCommand: 'npm run start',

      // Adjust this to match what your app logs when ready
      startServerReadyPattern: 'http://localhost:3000',
      startServerReadyTimeout: 60000, // Wait up to 60 seconds

      // Recommended Chrome flags for CI
      chromeFlags: [
        '--no-sandbox',
        '--headless=new',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    },

    // Where to upload results
    upload: {
      target: 'temporary-public-storage', // You can view results with the link after running
    },

    // Optional performance thresholds
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
