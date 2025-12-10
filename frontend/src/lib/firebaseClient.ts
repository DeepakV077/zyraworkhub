// ------------------------------------------------------------
// 🔥 firebaseClient.premium.ts — PREMIUM Firebase client
// - Safe single-init
// - Robust Firestore persistence fallback
// - Controlled debug logging
// - Lazy, typed Analytics init (safe for SSR)
// ------------------------------------------------------------

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  persistentSingleTabManager,
  persistentLocalCache,
  enableNetwork,
  Firestore,
} from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import firebaseConfig from "../firebaseConfig";

// Toggle debug logs via:
//  - NODE_ENV !== "production" OR
//  - NEXT_PUBLIC_DEBUG_FIREBASE === "true"
const DEBUG =
  typeof process !== "undefined" &&
  (process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_DEBUG_FIREBASE === "true");

const log = (...args: any[]) => {
  if (DEBUG) console.debug("[firebase]", ...args);
};

// -------------------------
// App (singleton-safe)
// -------------------------
const app: FirebaseApp =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

log("App initialized", app.name);

// -------------------------
// Firestore (persistent cache, robust)
// -------------------------
let db: Firestore;

try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager(),
    }),
  });
  log("Firestore initialized with persistentLocalCache");
} catch (err) {
  // If initializeFirestore already called elsewhere or persistence APIs fail,
  // fall back to getFirestore() so the app remains usable.
  log("initializeFirestore failed, falling back to getFirestore()", err);
  db = getFirestore(app);
}

// Always attempt to enable network (no-op if already enabled). Fail silently.
enableNetwork(db)
  .then(() => log("Firestore network enabled"))
  .catch((e) => log("enableNetwork() error (ignored)", e));

// -------------------------
// Auth & Storage
// -------------------------
const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);

log("Auth & Storage ready");

// -------------------------
// Analytics (lazy + safe for SSR)
// -------------------------
// Usage: await initAnalytics(); // returns Analytics | null
let analyticsInitPromise: Promise<Analytics | null> | null = null;

export function initAnalytics(): Promise<Analytics | null> {
  if (analyticsInitPromise) return analyticsInitPromise;

  analyticsInitPromise = (async (): Promise<Analytics | null> => {
    if (typeof window === "undefined") {
      log("Skipping analytics init on server");
      return null;
    }

    try {
      const supported = await isSupported();
      if (!supported) {
        log("Analytics not supported in this environment");
        return null;
      }
      const a = getAnalytics(app);
      log("Analytics initialized");
      return a;
    } catch (e) {
      log("Analytics initialization failed", e);
      return null;
    }
  })();

  return analyticsInitPromise;
}

// -------------------------
// Exports (typed singletons)
// -------------------------
export { app, db, auth, storage, log };
export type { Firestore, Auth, FirebaseStorage, Analytics };

// convenience default export (optional)
export default {
  app,
  db,
  auth,
  storage,
  initAnalytics,
  log,
};
