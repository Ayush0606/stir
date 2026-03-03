// Type augmentation for Next.js client components
// This addresses false positive warnings about function props in client components

declare module '@next/plugin' {
  interface NextConfig {
    typescript?: {
      ignoreBuildErrors?: boolean;
    };
  }
}

// Client component props can include functions
declare global {
  namespace React {
    interface FunctionComponent<P = {}> {
      (props: P): ReactElement | null;
    }
  }
}

export {};
