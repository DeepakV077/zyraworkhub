import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../lib/firebaseClient";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [step, setStep] = useState(1);
  const [finished, setFinished] = useState(false); // Success screen
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    skills: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const availableInterests = [
    "AI",
    "Design",
    "Product",
    "Web",
    "Mobile",
    "Business",
    "Data",
    "Marketing",
  ];

  // Preview photo logic
  useEffect(() => {
    if (!photoFile) return setPhotoPreviewUrl(null);
    const url = URL.createObjectURL(photoFile);
    setPhotoPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  // Step validation
  const validateStep = () => {
    if (step === 1 && !form.name.trim()) return false;
    if (step === 2 && !form.role.trim()) return false;
    return true;
  };

  // Step navigation
  const handleNext = () => {
    if (!validateStep()) return alert("Please complete this step before continuing.");
    if (step < 5) return setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Final submission
  const handleFinish = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setUploading(true);
    let photoUrl: string | null = null;

    try {
      if (photoFile) {
        const filename = `profile_photos/${user.uid}_${Date.now()}`;
        const sRef = storageRef(storage, filename);
        const uploadTask = uploadBytesResumable(sRef, photoFile);

        photoUrl = await new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              if (snapshot.totalBytes) {
                const pct = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setUploadProgress(pct);
              }
            },
            reject,
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (e) {
                reject(e);
              }
            }
          );
        });
      }

      const payload = {
        name: form.name || user.displayName || "",
        role: form.role,
        bio: form.bio,
        skills: form.skills
          ? form.skills.split(",").map((s) => s.trim())
          : [],
        interests,
        photo_url: photoUrl || null,
        onboardingComplete: true,
        updatedAt: new Date(),
      };

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), payload, { merge: true });

      // Sync Firebase Auth
      await updateProfile(user, {
        displayName: payload.name,
        photoURL: photoUrl || undefined,
      });

      // 🎉 Show success screen
      setFinished(true);

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (e) {
      alert("Failed to complete setup. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Success screen
  if (finished) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 text-gray-800 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-orange-600 mb-3">🎉 Setup Complete!</h1>
          <p className="text-gray-600">Redirecting to your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 text-gray-800 px-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center transition-all">
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-3">👋 Welcome to Zyra Academy!</h2>
            <p className="text-gray-600 mb-6">Let’s personalize your profile.</p>
            <input
              type="text"
              placeholder="Your Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <button onClick={handleNext} className="btn-orange">Continue →</button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-3">💼 What’s your role?</h2>
            <input
              type="text"
              placeholder="e.g., Frontend Developer"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleBack} className="btn-gray">← Back</button>
              <button onClick={handleNext} className="btn-orange">Continue →</button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-3">🧠 Short Bio</h2>
            <textarea
              rows={3}
              placeholder="I build AI-driven systems..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleBack} className="btn-gray">← Back</button>
              <button onClick={handleNext} className="btn-orange">Continue →</button>
            </div>
          </>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold mb-3">🚀 Top Skills</h2>
            <input
              type="text"
              placeholder="React, Firebase, Python"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              className="w-full p-3 border rounded-lg mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleBack} className="btn-gray">← Back</button>
              <button onClick={() => setStep(5)} className="btn-orange">Continue →</button>
            </div>
          </>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <>
            <h2 className="text-2xl font-bold mb-3">📸 Add Photo & Interests</h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
              className="w-full mb-4"
            />

            {photoPreviewUrl && (
              <img src={photoPreviewUrl} className="w-32 h-32 rounded-full mx-auto mb-4" />
            )}

            <h3 className="font-semibold mb-2">Your Interests</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {availableInterests.map((i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={interests.includes(i)}
                    onChange={(e) =>
                      setInterests(
                        e.target.checked
                          ? [...interests, i]
                          : interests.filter((x) => x !== i)
                      )
                    }
                  />
                  {i}
                </label>
              ))}
            </div>

            {uploading && (
              <p className="text-sm text-gray-600 mb-3">
                Uploading: {uploadProgress}%
              </p>
            )}

            <div className="flex justify-between">
              <button onClick={handleBack} className="btn-gray">← Back</button>
              <button
                onClick={handleFinish}
                disabled={uploading}
                className="btn-orange"
              >
                {uploading ? "Uploading..." : "Finish 🎉"}
              </button>
            </div>
          </>
        )}

        <p className="mt-4 text-gray-500 text-sm">Step {step} of 5</p>
      </div>
    </div>
  );
}

/* Utility button styles (Tailwind) */
const btnOrange =
  "px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600";
const btnGray =
  "px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100";
