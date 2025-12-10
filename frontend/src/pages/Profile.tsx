import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  enableNetwork,
} from "firebase/firestore";
import { auth, db } from "../lib/firebaseClient";

interface UserData {
  name?: string;
  email?: string | null;
  role?: string;
  bio?: string;
  skills?: string[];
  projects?: number;
  hackathons?: number;
  tasks?: number;
  onboardingComplete?: boolean;
  photo_url?: string | null;
  // Premium fields
  premium?: boolean;
  premiumSince?: any;
  // allow createdAt from serverTimestamp
  createdAt?: any;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const navigate = useNavigate();

  // ------------------------------
  // WATCH AUTH STATE
  // ------------------------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      if (u) {
        await fetchUserProfile(u.uid, u);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ------------------------------
  // FETCH USER PROFILE
  // ------------------------------
  async function fetchUserProfile(uid: string, u: User) {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUserData(snap.data() as UserData);
      } else {
        // NEW USER → CREATE DEFAULT PROFILE (includes premium flag)
        const newData: UserData = {
          name: u.displayName || "New User",
          email: u.email,
          role: "Developer",
          bio: "Building intelligent solutions with AI, IoT, and Neurotech.",
          skills: ["React", "Firebase", "Python", "Machine Learning"],
          projects: 0,
          hackathons: 0,
          tasks: 0,
          onboardingComplete: false,
          photo_url: null,
          premium: false,
          createdAt: serverTimestamp(),
        };

        await setDoc(ref, newData, { merge: true });
        setUserData(newData);
      }
    } catch (err: any) {
      console.error("Failed to fetch user document:", err);

      const msg = err?.message?.toLowerCase() || "";

      // Attempt to recover from offline
      if (msg.includes("offline") || msg.includes("failed to get document")) {
        try {
          await enableNetwork(db);
          const retrySnap = await getDoc(doc(db, "users", uid));
          if (retrySnap.exists()) {
            setUserData(retrySnap.data() as UserData);
            return;
          }
        } catch (e) {
          console.warn("Retry fetch failed:", e);
        }
      }

      setFetchError(err?.message || "Unable to fetch profile from Firestore.");
    }
  }

  // ------------------------------
  // ONBOARDING REDIRECT
  // ------------------------------
  useEffect(() => {
    if (!loading && user && userData) {
      // If onboardingComplete is missing or false → redirect
      if (!userData.onboardingComplete) {
        navigate("/profile-setup");
      }
    }
  }, [loading, user, userData, navigate]);

  // ------------------------------
  // LOADING UI
  // ------------------------------
  if (loading || !userData) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-600">
        Loading your profile...
      </div>
    );
  }

  // ------------------------------
  // NOT LOGGED IN UI
  // ------------------------------
  if (!user) {
    return (
      <div className="max-w-xl mx-auto my-20 p-6 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-semibold mb-2">Not signed in</h2>
        <p className="mb-4 text-gray-600">Sign in or create an account to view your profile.</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-primary-orange text-white rounded hover:bg-orange-500 transition"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  // ------------------------------
  // PROFILE RENDER
  // ------------------------------
  const joinDate = new Date(
    user.metadata.creationTime || Date.now()
  ).toLocaleDateString();

  const lastLogin = new Date(
    user.metadata.lastSignInTime || Date.now()
  ).toLocaleString();

  const role = userData.role || "Developer";
  const bio = userData.bio || "";
  const skills = userData.skills || [];

  // show premiumSince nicely if available
  const premiumSince =
    userData.premium && userData.premiumSince
      ? typeof (userData.premiumSince as any)?.toDate === "function"
        ? (userData.premiumSince as any).toDate().toLocaleDateString()
        : String(userData.premiumSince)
      : null;

  const profileCompletion = Math.min(
    100,
    40 +
      (skills.length * 10 + (bio ? 20 : 0) + (user.photoURL ? 10 : 0)) +
      (userData.premium ? 10 : 0) // premium gives extra completion boost
  );

  // Tailwind arbitrary width class for completion bar (rounded to nearest integer)
  const completionWidthClass = `w-[${Math.round(profileCompletion)}%]`;

  // ------------------------------
  // PREMIUM ACTIONS
  // ------------------------------
  async function upgradeToPremium() {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    try {
      // In real app: integrate payment flow here, then record premium status.
      await setDoc(
        ref,
        { premium: true, premiumSince: serverTimestamp() },
        { merge: true }
      );
      // refresh local state
      const snap = await getDoc(ref);
      if (snap.exists()) setUserData(snap.data() as UserData);
      alert("Thanks! Your account has been upgraded to Premium (demo).");
    } catch (e: any) {
      console.error("Upgrade failed:", e);
      alert("Upgrade failed: " + (e?.message || "unknown error"));
    }
  }

  async function downgradeFromPremium() {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    try {
      await setDoc(ref, { premium: false, premiumSince: null }, { merge: true });
      const snap = await getDoc(ref);
      if (snap.exists()) setUserData(snap.data() as UserData);
      alert("Your Premium subscription has been removed (demo).");
    } catch (e: any) {
      console.error("Downgrade failed:", e);
      alert("Downgrade failed: " + (e?.message || "unknown error"));
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-16 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* ERROR BANNER */}
      {fetchError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4">
          <p className="font-medium">Profile data unavailable</p>
          <p className="text-sm">{fetchError}</p>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 p-8 text-white relative">
        <div className="flex items-center gap-6">
          <img
            src={userData.photo_url || user.photoURL || "/favicon.ico"}
            alt={user.displayName ?? user.email ?? undefined}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">
                {user.displayName || userData.name}
              </h1>
              {userData.premium && (
                <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-semibold">
                  ★ Premium
                </span>
              )}
            </div>
            <p className="text-sm opacity-90">{user.email}</p>
            <p className="mt-1 text-sm font-medium">🎯 Role: {role}</p>

            {userData.premium && premiumSince && (
              <p className="text-xs mt-1 opacity-80">Member since {premiumSince}</p>
            )}
          </div>
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DetailCard title="Joined" value={joinDate} />
        <DetailCard title="Last Login" value={lastLogin} />
        <DetailCard title="Verified" value={user.emailVerified ? "✅ Yes" : "⚠️ No"} />
      </div>

      {/* BIO */}
      <div className="px-6 py-4 border-t">
        <h2 className="text-lg font-semibold mb-2">About Me</h2>
        <p className="text-gray-700 mb-3">{bio}</p>
        <h3 className="text-md font-semibold mb-1">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* PREMIUM BENEFITS */}
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">Premium Benefits</h4>
              <p className="text-sm text-gray-600">
                Get profile highlights, priority support, and exclusive resources.
              </p>
            </div>
            <div className="text-right">
              {userData.premium ? (
                <span className="text-sm text-green-600 font-medium">Active</span>
              ) : (
                <span className="text-sm text-gray-500">Available</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* COMPLETION */}
      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600 mb-1">Profile Completion</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
            <div className={`h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 ${completionWidthClass}`} />
        </div>
        <p className="text-right text-sm mt-1 text-gray-600">
          {profileCompletion}%
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap justify-end gap-3 p-6 border-t">
        <button
          onClick={() => navigate("/settings")}
          className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
        >
          ⚙️ Settings
        </button>

        <button
          onClick={async () => {
            await signOut(auth);
            navigate("/");
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          🚪 Logout
        </button>

        {/* Premium upgrade / manage */}
        {!userData.premium ? (
          <button
            onClick={async () => {
              if (
                window.confirm(
                  "Upgrade to Premium? (demo will immediately grant Premium access)"
                )
              ) {
                await upgradeToPremium();
              }
            }}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            ⭐ Upgrade to Premium
          </button>
        ) : (
          <button
            onClick={async () => {
              if (
                window.confirm(
                  "Are you sure you want to cancel Premium? (demo will remove Premium)"
                )
              ) {
                await downgradeFromPremium();
              }
            }}
            className="px-4 py-2 border border-yellow-500 text-yellow-700 rounded-lg hover:bg-yellow-50 transition"
          >
            Manage Premium
          </button>
        )}

        <button
          onClick={async () => {
            if (window.confirm("Are you sure you want to delete your account?")) {
              try {
                if (auth.currentUser) {
                  await deleteUser(auth.currentUser);
                  navigate("/");
                }
              } catch (e: any) {
                alert("Error deleting account: " + e.message);
              }
            }
          }}
          className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition"
        >
          🗑 Delete Account
        </button>
      </div>
    </div>
  );
}

/* REUSABLE CARDS */
function DetailCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-sm transition bg-white">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

