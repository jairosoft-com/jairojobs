// This file extends the JSX namespace for TypeScript
// The React import is not needed as we're just extending types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: Record<string, unknown>;
    }
  }
}

export {};
