// Type definitions for LHCI configuration
declare module '@lhci/cli' {
  export interface LHCI {
    ci: {
      collect: {
        staticDistDir: string;
        url: string[];
        numberOfRuns: number;
        startServerCommand: string;
        startServerReadyPattern: string;
        startServerReadyTimeout: number;
        chromeFlags: string;
      };
      upload: {
        target: string;
      };
      assert: {
        preset: string;
        assertions: Record<string, [string, { minScore: number }]>;
      };
    };
  }

  // This allows us to use `export default` in the config file
  const config: LHCI;
  export default config;
}
