import { OutRef } from 'lucid-cardano';

export type Wallets = 'nami' | 'flint' | 'eternl' | 'lace' | 'gerowallet' | 'cardwallet';

export interface TokenMetadata {
  [key: string]:
    | number
    | {
        [key: string]: {
          name: string;
          image: string[];
          mediaType: string;
          ref: OutRef;
        };
      };
}
