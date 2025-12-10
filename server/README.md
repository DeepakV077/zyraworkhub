# Zyra WorkHub - Server (Firebase-ready)

This folder contains a small Express server scaffold intended as the backend for the frontend in `frontend/`.

What it provides now:

- Simple REST endpoints for projects and feedback (/api/projects, /api/feedback) that serve sample data from `server/data/`.
- A Firebase Admin initialization stub (`src/firebaseAdmin.js`) — drop your `serviceAccountKey.json` into this folder and update `GOOGLE_APPLICATION_CREDENTIALS` or follow the README to enable production use.

How to run (development):

1. cd server
2. npm install
3. npm run dev

Notes:
- Do NOT commit your Firebase service account JSON. Add it to `server/.gitignore` (already included).
- The current endpoints return sample data; when you configure Firebase, replace the data read with calls to Firestore/Realtime Database as required.
