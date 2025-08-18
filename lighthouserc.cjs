module.exports = {
  ci: {
    collect: {
      // Pages to test
      url: ['http://localhost:3000'],
      numberOfRuns: 1,

      // Command to start the local dev server
      startServerCommand: 'npm run start',

      // Wait until this pattern appears in stdout to consider the server ready
      startServerReadyPattern: 'http://localhost:3000',
      startServerReadyTimeout: 60000, // 60 seconds

      // Recommended Chrome flags for CI environments
      chromeFlags: [
        '--no-sandbox',
        '--headless=new',
        '--disable-gpu',
        '--disable-dev-shm-usage',
      ],
    },

    upload: {
      // Upload results to temporary public storage (viewable via a generated URL)
      target: 'temporary-public-storage',
    },

    assert: false,  // Completely disable all assertions
    },
  },
};
