declare global {
  interface Window {
    WEBFLOW_INITIALIZED?: boolean;
    Webflow?: {
      ready?: () => void;
      require?: (module: string) => any;
      destroy?: () => void;
    };
  }
}

export {}; 