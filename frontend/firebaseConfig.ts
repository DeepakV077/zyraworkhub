// firebaseConfig.ts
// Convert of the runtime JS config into TypeScript so the project has a single
// typed source of truth for Firebase initialization at the frontend root.

import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYQ5Y_4UkVXrmGIEBRVOs3Etg-W39BXsU",
  authDomain: "zyraworkhub.firebaseapp.com",
  projectId: "zyraworkhub",
  storageBucket: "zyraworkhub.appspot.com",
  messagingSenderId: "201929831665",
  appId: "1:201929831665:web:4c1efde1a770f52f97a550",
  measurementId: "G-T0J45FT85T",
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize analytics only in browser environments
export let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    // Analytics may fail in some environments; ignore.
     
    console.warn("Firebase analytics init skipped:", e);
  }
}

export default firebaseConfig;
