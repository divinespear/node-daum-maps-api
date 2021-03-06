export {
  DaumPostcode,
} from './postcode';

export interface DaumLibraryLoader {
  readonly hasLoader: boolean;
  readonly loaded: boolean;
  loadlib(): Promise<void>;
}

/* type definitions */

declare global {
  interface Window {
    readonly daum: DaumNamespace;
  }

  interface DaumScriptLoader {
    load(callback: () => void): void;
  }
}
