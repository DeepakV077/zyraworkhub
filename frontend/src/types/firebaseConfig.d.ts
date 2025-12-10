declare module "../../firebaseConfig" {
  import type { FirebaseOptions, FirebaseApp } from 'firebase/app';
  import type { Analytics } from 'firebase/analytics';

  const firebaseConfig: FirebaseOptions;
  export default firebaseConfig;
  export const app: FirebaseApp;
  export const analytics: Analytics | undefined;
}

// Some imports include the .js extension depending on bundler/config.
// Provide an additional declaration so TypeScript recognizes both forms.
declare module "../../firebaseConfig.js" {
  import type { FirebaseOptions, FirebaseApp } from 'firebase/app';
  import type { Analytics } from 'firebase/analytics';

  const firebaseConfig: FirebaseOptions;
  export default firebaseConfig;
  export const app: FirebaseApp;
  export const analytics: Analytics | undefined;
}
