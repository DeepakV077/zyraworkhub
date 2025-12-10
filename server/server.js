// ======================
// 📦 Imports
// ======================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

// ======================
// 🔥 FIREBASE ADMIN INIT
// ======================
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const speakerRef = db.collection("speakers");
console.log("🔥 Firebase initialized for project:", admin.app().options.credential.projectId);

// ======================
// ✉️ NODEMAILER SETUP
// ======================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ======================
// 💌 EMAIL TEMPLATES
// ======================

// Applicant confirmation email
const speakerTemplate = (name) => `
  <div style="font-family:Arial, sans-serif; background:#f9fafb; padding:30px;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color:#2b6cb0;text-align:center;">🎤 Hi ${name},</h2>
      <p style="font-size:16px;line-height:1.6;">
        Thank you for applying to become a <strong>Speaker at Zyra WorkHub!</strong> <br/>
        We’ve received your submission and our team will reach out soon after reviewing your application.
      </p>
      <div style="text-align:center;margin:25px 0;">
        <a href="https://zyraworkhub.web.app" 
          style="background-color:#2b6cb0;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
          Visit Zyra WorkHub
        </a>
      </div>
      <p style="font-size:14px;color:#555;">Warm regards,<br/><strong>Zyra WorkHub Team</strong></p>
    </div>
  </div>
`;

// Admin notification email
const adminTemplate = (data) => `
  <div style="font-family:Arial,sans-serif;background:#f9fafb;padding:30px;">
    <div style="max-width:600px;margin:auto;background:#fff;padding:25px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color:#222;">📢 New Speaker Application Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Expertise:</strong> ${data.expertise}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Abstract:</strong> ${data.abstract}</p>
      <p><strong>LinkedIn:</strong> ${data.linkedin_url || "N/A"}</p>
      <p><strong>Twitter:</strong> ${data.twitter_url || "N/A"}</p>
      <p><strong>Website:</strong> ${data.website_url || "N/A"}</p>
      <br/>
      <p>🕒 Submitted on: ${new Date().toLocaleString()}</p>
    </div>
  </div>
`;

// ======================
// 🧠 API ENDPOINT
// ======================
app.post("/api/speakers", async (req, res) => {
  try {
    const data = req.body;

    // 🔹 1. Save to Firestore
    const docRef = await speakerRef.add({
      ...data,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`✅ Speaker saved: ${docRef.id} (${data.name})`);

    // 🔹 2. Send confirmation to speaker
    await transporter.sendMail({
      from: `"Zyra WorkHub" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "🎤 Speaker Application Received - Zyra WorkHub",
      html: speakerTemplate(data.name),
    });

    // 🔹 3. Send admin notification
    await transporter.sendMail({
      from: `"Zyra WorkHub System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📢 New Speaker Application: ${data.name}`,
      html: adminTemplate(data),
    });

    res.status(200).json({
      success: true,
      message: "Speaker saved and emails sent successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("❌ Error processing speaker:", error);
    res.status(500).json({ error: "Failed to process speaker application" });
  }
});

// ======================
// 📋 VIEW ALL SPEAKERS (Admin route)
// ======================
app.get("/api/speakers", async (req, res) => {
  try {
    const snapshot = await speakerRef.orderBy("submittedAt", "desc").get();
    const speakers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(speakers);
  } catch (error) {
    console.error("❌ Error fetching speakers:", error);
    res.status(500).json({ error: "Failed to fetch speakers" });
  }
});

// ======================
// 🚀 START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
});
