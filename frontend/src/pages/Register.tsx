import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebaseClient";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // 🧠 Email Registration
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser && name) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err || "Registration failed");
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 Google OAuth Sign-Up
  async function handleGoogleSignup() {
    setError(null);
    setLoading(true);

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err || "Google sign-up failed");
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Create your <span className="text-orange-500">Zyra WorkHub</span> account
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full mb-5 inline-flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="flex items-center justify-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Full name</span>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
