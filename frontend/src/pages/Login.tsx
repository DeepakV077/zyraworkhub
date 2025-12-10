import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebaseClient";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Support redirecting back to the page that requested auth
  // Narrow the possible shape of location.state to avoid using `any`
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err || "Failed to sign in");
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err || "Google sign-in failed");
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Sign in to Zyra WorkHub</h1>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 p-2 rounded">{error}</div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full mb-4 inline-flex items-center justify-center gap-3 px-4 py-2 border rounded text-sm hover:shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.6 12.227c0-.68-.06-1.332-.173-1.956H12v3.708h5.28c-.227 1.224-.92 2.263-1.963 2.96v2.468h3.17c1.857-1.708 2.956-4.24 2.956-7.18z" fill="#4285F4"/>
          <path d="M12 22c2.7 0 4.968-.9 6.624-2.44l-3.17-2.47c-.876.59-2.004.94-3.454.94-2.656 0-4.906-1.792-5.72-4.196H2.99v2.63C4.63 19.86 8.04 22 12 22z" fill="#34A853"/>
          <path d="M6.28 13.834a6.597 6.597 0 010-3.668V7.535H2.99a9.98 9.98 0 000 8.93l3.29-2.63z" fill="#FBBC05"/>
          <path d="M12 6.48c1.47 0 2.8.504 3.847 1.49l2.88-2.88C16.964 3.34 14.7 2 12 2 8.04 2 4.63 4.14 2.99 7.535l3.29 2.63C7.094 8.272 9.344 6.48 12 6.48z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <div className="text-center text-sm text-gray-500 mb-4">or use your email</div>

      <form onSubmit={handleEmailSignIn} className="space-y-3">
        <label className="block">
          <span className="text-sm text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-primary-orange text-white px-4 py-2 rounded"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account? <Link to="/signup" className="text-primary-orange font-medium">Create one</Link>
      </p>
    </div>
  );
}
