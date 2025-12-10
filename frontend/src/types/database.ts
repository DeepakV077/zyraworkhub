// database.ts
import { collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
// Use the centralized Firestore instance from our client wrapper
import { db } from "../lib/firebaseClient";

/* --------------------------------------------------
   💾 Firestore Collections
-------------------------------------------------- */

// Webinar collection
export const webinarsCollection = collection(db, "webinars");
export const speakersCollection = collection(db, "speakers");
export const webinarSpeakersCollection = collection(db, "webinar_speakers");
export const registrationsCollection = collection(db, "registrations");
export const projectsCollection = collection(db, "projects");
export const feedbackCollection = collection(db, "feedback");
export const contactSubmissionsCollection = collection(db, "contact_submissions");
export const blogPostsCollection = collection(db, "blog_posts");
export const newsletterSubscribersCollection = collection(db, "newsletter_subscribers");

/* --------------------------------------------------
   🧩 Types (Firebase-friendly interfaces)
-------------------------------------------------- */

export interface Webinar {
  id?: string;
  title: string;
  description: string;
  domain: string;
  date: string;
  duration_minutes?: number;
  capacity?: number;
  registered_count?: number;
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
  meeting_link?: string | null;
  thumbnail_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Speaker {
  id?: string;
  name: string;
  email: string;
  bio: string;
  photo_url?: string | null;
  expertise?: string[];
  linkedin_url?: string | null;
  twitter_url?: string | null;
  website_url?: string | null;
  status?: "pending" | "approved" | "rejected";
  submission_date?: string;
  cv_url?: string | null;
  abstract?: string | null;
  created_at?: string;
}

export interface WebinarSpeaker {
  webinar_id: string;
  speaker_id: string;
  role?: "host" | "guest" | "panelist";
}

export interface Registration {
  id?: string;
  webinar_id: string;
  name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  registration_date?: string;
  attended?: boolean;
  created_at?: string;
}

export type ImageEntry = { order?: number; url?: string };

export interface Project {
  id?: string;
  title: string;
  description: string;
  client_name: string;
  category: "branding" | "poster" | "digital-art" | "web-design" | "marketing" | "other";
  tags?: string[];
  images?: ImageEntry[];
  completion_date?: string | null;
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Feedback {
  id?: string;
  name: string;
  role: "student" | "client" | "partner";
  organization?: string | null;
  message: string;
  rating: number;
  photo_url?: string | null;
  approved?: boolean;
  created_at?: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  interest_type: "design-service" | "partnership" | "collaboration" | "general";
  message: string;
  status?: "new" | "in-progress" | "completed";
  created_at?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  cover_image_url?: string | null;
  tags?: string[];
  published?: boolean;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name?: string | null;
  subscribed?: boolean;
  subscribed_at?: string;
  created_at?: string;
}

/* --------------------------------------------------
   ⚙️ Utility Functions (Reusable CRUD)
-------------------------------------------------- */

import type { DocumentData, UpdateData } from 'firebase/firestore';

export const addDocument = async <T>(path: string, data: T) => {
  const colRef = collection(db, path);
  const docRef = await addDoc(colRef, data as unknown as DocumentData);
  return docRef.id;
};

export const getDocuments = async <T>(path: string): Promise<T[]> => {
  const colRef = collection(db, path);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
};

export const getDocumentById = async <T>(path: string, id: string): Promise<T | null> => {
  const docRef = doc(db, path, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T) : null;
};

export const updateDocument = async (path: string, id: string, data: UpdateData<DocumentData>) => {
  const docRef = doc(db, path, id);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (path: string, id: string) => {
  const docRef = doc(db, path, id);
  await deleteDoc(docRef);
};
