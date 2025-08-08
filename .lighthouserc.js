module.exports = {
  ci: {
    collect: {
      // Run Lighthouse tests on the development server
      url: ['http://localhost:3000'],
      // Number of times to run Lighthouse for each URL
      numberOfRuns: 1,
      // Start the development server automatically
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 60000, // 60 seconds
      // Chrome settings
      chromeFlags: [
        '--no-sandbox',
        '--headless=new',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-zygote',
        '--disable-setuid-sandbox'
      ]
    },
    upload: {
      // Upload results to temporary public storage
      target: 'temporary-public-storage',
    },
    // Performance budget settings
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
