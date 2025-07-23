module.exports = {
  ci: {
    collect: {
      // Use Next.js output directory for static files
      staticDistDir: './.next',
      // Run Lighthouse tests on these URLs after build
      url: ['http://localhost:3000'],
      // Number of times to run Lighthouse tests per URL
      numberOfRuns: 3,
      // Use the Next.js dev server for testing
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'ready',
      startServerReadyTimeout: 10000,
      // Chrome settings
      chromeFlags: '--no-sandbox --headless --disable-gpu',
    },
    upload: {
      // Upload results to a temporary public storage
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
