// firebaseAdmin.js
// Initialize Firebase Admin SDK
// ✅ Place your service account key at: server/serviceAccountKey.json
// and set the environment variable: GOOGLE_APPLICATION_CREDENTIALS=./server/serviceAccountKey.json

const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let initialized = false;

function initFirebaseAdmin() {
  if (initialized) return admin;

  try {
    // Prefer explicit service account file if present in project root
    const svcPath = path.join(__dirname, "..", "serviceAccountKey.json");
    if (fs.existsSync(svcPath)) {
      const serviceAccount = require(svcPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      initialized = true;
      console.log("✅ Firebase Admin initialized with serviceAccountKey.json");
      return admin;
    }

    // Fallback to application default credentials
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    initialized = true;
    console.log("✅ Firebase Admin initialized with application default credentials");
  } catch (err) {
    console.warn(
      "⚠️ Firebase Admin SDK not initialized. Add service account to enable Firebase features.",
      "\nError:",
      err.message
    );
  }

  // If initialization failed above, return null so callers know Admin is not ready.
  return initialized ? admin : null;
}

module.exports = { initFirebaseAdmin };
