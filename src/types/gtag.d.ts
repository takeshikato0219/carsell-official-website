interface GtagConfig {
  page_path?: string;
  page_location?: string;
  [key: string]: string | number | boolean | undefined;
}

type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: GtagCommand,
      targetId: string | Date,
      config?: GtagConfig
    ) => void;
  }
}

export {};

