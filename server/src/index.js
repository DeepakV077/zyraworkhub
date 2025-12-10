// index.js - Zyra WorkHub Backend Server
// -------------------------------------
// Express backend for Zyra WorkHub
// Handles API routes for projects, feedback, webinars, contacts, and speakers.
// Includes Firebase Admin integration (optional).

// Load environment variables from .env (if present)
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const { initFirebaseAdmin } = require("./firebaseAdmin");

const app = express();
app.use(cors());
app.use(express.json());

// Simple request logger for debugging (prints incoming requests)
app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
});

// ✅ Initialize Firebase Admin (safe no-op if not configured)
initFirebaseAdmin();

// -------------------------------------
// Data utilities (local JSON store fallback)
// -------------------------------------

const DATA_DIR = path.join(__dirname, "..", "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log("📂 Created missing data directory:", DATA_DIR);
}

// Read JSON helper
function readJSON(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`❌ Failed to read data file: ${filename}`, err.message);
    return [];
  }
}

// Write JSON helper
function writeJSON(filename, data) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error(`❌ Failed to write data file: ${filename}`, err.message);
    return false;
  }
}

// -------------------------------------
// API Routes
// -------------------------------------

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ✅ Projects endpoint (optional ?featured=true&limit=3)
app.get("/api/projects", (req, res) => {
  const projects = readJSON("projects.json");
  const featured = req.query.featured === "true";
  let out = projects;
  if (featured) out = projects.filter((p) => p.featured);
  res.json(out.slice(0, Number(req.query.limit) || out.length));
});

// ✅ Feedback endpoint (optional ?approved=true&limit=5)
app.get("/api/feedback", (req, res) => {
  const feedback = readJSON("feedback.json");
  const approved = req.query.approved === "true";
  let out = feedback;
  if (approved) out = feedback.filter((f) => f.approved);
  res.json(out.slice(0, Number(req.query.limit) || out.length));
});

// ✅ Webinars endpoint
app.get("/api/webinars", (req, res) => {
  const webinars = readJSON("webinars.json");
  res.json(webinars);
});

// ✅ Contact form submission
app.post("/api/contact", (req, res) => {
  const payload = req.body || {};
  if (!payload.name || !payload.email || !payload.message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const contacts = readJSON("contacts.json");
  const entry = {
    id: `c_${Date.now()}`,
    ...payload,
    created_at: new Date().toISOString(),
  };

  contacts.unshift(entry);
  const ok = writeJSON("contacts.json", contacts);

  if (!ok) return res.status(500).json({ error: "Failed to save contact" });
  res.status(201).json({ success: true });
});

// ✅ Speaker registration endpoint (stores application + sends confirmation email)
app.post("/api/speakers", async (req, res) => {
  const payload = req.body || {};

  // Validate required fields from frontend form
  const required = ["name", "email", "bio", "expertise", "abstract"];
  for (const f of required) {
    if (!payload[f] || (Array.isArray(payload[f]) ? payload[f].length === 0 : String(payload[f]).trim() === "")) {
      return res.status(400).json({ error: `Missing required field: ${f}` });
    }
  }

  const speakers = readJSON("speakers.json");
  const entry = {
    id: `s_${Date.now()}`,
    ...payload,
    created_at: new Date().toISOString(),
  };

  speakers.unshift(entry);
  const ok = writeJSON("speakers.json", speakers);

  if (!ok) {
    return res.status(500).json({ error: "Failed to save speaker application" });
  }

  // Log entry saved for easier debugging
  console.log(`📨 Speaker application saved: id=${entry.id} name=${entry.name} email=${entry.email}`);

  // Also try to persist into Firestore (if Firebase Admin initialized)
  try {
    const admin = initFirebaseAdmin();
    if (!admin) {
      console.warn('⚠️ Firebase Admin not initialized; skipping Firestore write for speaker.');
    } else if (typeof admin.firestore !== 'function') {
      console.warn('⚠️ Firebase Admin initialized but firestore() is not available; skipping Firestore write.');
    } else {
      const db = admin.firestore();
      // Write document with the same id so local and cloud entries are correlated
      await db.collection('speakers').doc(entry.id).set(entry);
      console.log(`☁️ Speaker written to Firestore: ${entry.id}`);
    }
  } catch (fireErr) {
    // Log full error to aid debugging (code, message, stack)
    const errObj = {
      message: fireErr && fireErr.message ? fireErr.message : String(fireErr),
      code: fireErr && fireErr.code ? fireErr.code : undefined,
      stack: fireErr && fireErr.stack ? fireErr.stack : undefined,
    };

    // If we see the Firestore gRPC NOT_FOUND (code 5), provide an actionable hint
    if (errObj.code === 5) {
      console.warn('⚠️ Failed to write speaker to Firestore (NOT_FOUND). Possible causes:');
      console.warn('- The service account/project credentials do not match an active Firestore database.');
      console.warn('- Firestore API is not enabled for the configured project.');
      console.warn('- The project is set up in Datastore mode instead of Firestore in Native mode.');
      console.warn('- Project ID mismatch between credentials and intended project.');
      console.warn('Check `server/serviceAccountKey.json`, GOOGLE_APPLICATION_CREDENTIALS, and that Firestore is enabled for the project.');
    }

    console.warn('⚠️ Failed to write speaker to Firestore:', errObj);
  }

    // Try to send confirmation email using nodemailer if credentials are present
    try {
      // Lazy require to avoid adding runtime dependency when not needed
      const nodemailer = require("nodemailer");

      const GMAIL_USER = process.env.GMAIL_USER;
      const GMAIL_PASS = process.env.GMAIL_PASS; // app password (fallback)

      // OAuth2 creds
      const GMAIL_OAUTH_CLIENT_ID = process.env.GMAIL_OAUTH_CLIENT_ID;
      const GMAIL_OAUTH_CLIENT_SECRET = process.env.GMAIL_OAUTH_CLIENT_SECRET;
      const GMAIL_OAUTH_REFRESH_TOKEN = process.env.GMAIL_OAUTH_REFRESH_TOKEN;

      let transporter;

      if (GMAIL_OAUTH_CLIENT_ID && GMAIL_OAUTH_CLIENT_SECRET && GMAIL_OAUTH_REFRESH_TOKEN && GMAIL_USER) {
        // Use OAuth2 — nodemailer will use the refresh token to obtain access tokens
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: GMAIL_USER,
            clientId: GMAIL_OAUTH_CLIENT_ID,
            clientSecret: GMAIL_OAUTH_CLIENT_SECRET,
            refreshToken: GMAIL_OAUTH_REFRESH_TOKEN,
          },
        });
      } else if (GMAIL_USER && GMAIL_PASS) {
        // Fallback: SMTP with app password
        transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS,
          },
        });
      } else {
        transporter = null;
        console.warn("No Gmail credentials provided in environment — skipping email sending for speaker application.");
      }

      if (transporter) {
        const adminEmail = process.env.ADMIN_EMAIL || GMAIL_USER;

        const applicantMailOptions = {
          from: `${GMAIL_USER}`,
          to: entry.email,
          subject: "Zyra WorkHub — Speaker Application Received",
          text: `Hi ${entry.name},\n\nThanks for submitting your speaker application to Zyra WorkHub. We've received your submission and our team will review it within 5-7 business days.\n\nSummary:\nExpertise: ${Array.isArray(entry.expertise) ? entry.expertise.join(", ") : entry.expertise}\nAbstract: ${entry.abstract}\n\nIf we need more information we'll reach out to ${entry.email}.\n\nThanks,\nZyra WorkHub Team`,
        };

        // Send confirmation to applicant
        await transporter.sendMail(applicantMailOptions);

        // Send notification to admin (ADMIN_EMAIL or GMAIL_USER)
        const adminMailOptions = {
          from: `${GMAIL_USER}`,
          to: adminEmail,
          subject: `New Speaker Application — ${entry.name}`,
          text: `New speaker application received:\n\nName: ${entry.name}\nEmail: ${entry.email}\nExpertise: ${Array.isArray(entry.expertise) ? entry.expertise.join(", ") : entry.expertise}\nAbstract: ${entry.abstract}\nBio: ${entry.bio}\nSubmitted at: ${entry.created_at}\n\nFull payload:\n${JSON.stringify(entry, null, 2)}`,
        };

        await transporter.sendMail(adminMailOptions);
      }
    } catch (err) {
      // Log but do not fail the request — application is already saved.
      console.error("Failed to send confirmation emails for speaker application:", err && err.message ? err.message : err);
    }

  res.status(201).json({ success: true });
});

// 🔧 Debug helper: write a test speaker entry to speakers.json (GET)
app.get('/api/debug-write', (req, res) => {
  try {
    const speakers = readJSON('speakers.json');
    const entry = {
      id: `s_debug_${Date.now()}`,
      name: 'Debug Tester',
      email: 'debug@example.com',
      bio: 'Auto-generated debug entry',
      expertise: ['debug'],
      abstract: 'This is a debug write',
      created_at: new Date().toISOString(),
    };
    speakers.unshift(entry);
    const ok = writeJSON('speakers.json', speakers);
    if (!ok) return res.status(500).json({ error: 'Failed to write debug entry' });
    console.log('🔧 Debug entry written to speakers.json:', entry.id);
    return res.json({ ok: true, entry });
  } catch (err) {
    console.error('Error in /api/debug-write', err);
    return res.status(500).json({ error: 'server error' });
  }
});

// ✅ Admins endpoints: persist admins locally and to Firestore
app.get('/api/admins', (req, res) => {
  const admins = readJSON('admins.json');
  res.json(admins || []);
});

app.post('/api/admins', async (req, res) => {
  const payload = req.body || {};
  if (!payload.email) return res.status(400).json({ error: 'Missing admin email' });

  const admins = readJSON('admins.json');
  const entry = {
    id: `a_${Date.now()}`,
    email: payload.email,
    name: payload.name || '',
    created_at: new Date().toISOString(),
  };
  admins.unshift(entry);
  const ok = writeJSON('admins.json', admins);
  if (!ok) return res.status(500).json({ error: 'Failed to save admin' });

  // Try to persist admin to Firestore as well
  try {
    const admin = initFirebaseAdmin();
    if (admin && admin.firestore) {
      await admin.firestore().collection('admins').doc(entry.id).set(entry);
      console.log(`☁️ Admin written to Firestore: ${entry.id}`);
    }
  } catch (e) {
    console.warn('⚠️ Failed to write admin to Firestore:', e && e.message ? e.message : e);
  }

  res.status(201).json({ success: true, entry });
});

// ✅ Admin status endpoint — useful for debugging Firestore / credentials
app.get('/api/admin-status', async (req, res) => {
  try {
    const admin = initFirebaseAdmin();
    const svcPath = path.join(__dirname, '..', 'serviceAccountKey.json');
    const serviceAccountPresent = fs.existsSync(svcPath);

    if (!admin) {
      return res.json({ initialized: false, serviceAccountPresent });
    }

    // Try to access app options and Firestore listCollections to verify reachability
    let projectId = undefined;
    try {
      projectId = (admin.apps && admin.apps[0] && admin.apps[0].options && admin.apps[0].options.projectId) || process.env.GCLOUD_PROJECT || process.env.GCLOUD_PROJECT_ID;
    } catch (e) {
      // ignore
    }

    let firestoreReachable = false;
    let collections = [];
    try {
      if (typeof admin.firestore === 'function') {
        const db = admin.firestore();
        const cols = await db.listCollections();
        collections = cols.map((c) => c.id);
        firestoreReachable = true;
      }
    } catch (err) {
      // reachable stays false
      console.warn('Admin-status: Firestore listCollections failed:', err && err.message ? err.message : err);
    }

    return res.json({ initialized: true, serviceAccountPresent, projectId, firestoreReachable, collections });
  } catch (err) {
    return res.status(500).json({ error: 'failed to evaluate admin status', message: err && err.message ? err.message : String(err) });
  }
});

// -------------------------------------
// Server Startup
// -------------------------------------

const PORT = process.env.PORT || 4000;
// Bind to loopback by default on Windows shells to avoid environment network namespace issues
const HOST = process.env.HOST || "127.0.0.1";

// Global error handlers to avoid silent crashes
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err && err.stack ? err.stack : err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT} (host=${HOST})`);
  console.log("📡 Available endpoints: /api/health, /api/speakers, /api/contact, /api/webinars, /api/projects");
});
