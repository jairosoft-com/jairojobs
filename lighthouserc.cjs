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

    assert: {
      // Use Lighthouse's recommended assertions as base
      preset: 'lighthouse:recommended',
      assertions: {
        // Category scores (set to warn with minimum acceptable scores)
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.8 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],

        // Disable specific audits known to cause instability or not applicable
        'csp-xss': 'off',
        'maskable-icon': 'off',
        'splash-screen': 'off',
        'unused-css-rules': 'off',
        'unused-javascript': 'off',
        'render-blocking-resources': 'off',
      },
    },
  },
};
