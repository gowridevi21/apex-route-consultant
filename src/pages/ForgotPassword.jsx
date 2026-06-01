import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router";
import { auth } from "../firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent. Please check your email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pt-32 text-white">
      <div className="mx-auto max-w-md rounded-md border border-white/10 bg-white/[0.04] p-8">
        <p className="font-black uppercase text-[#D4AF37]">Reset Password</p>

        <h1 className="mt-3 text-3xl font-black uppercase">
          Forgot Password
        </h1>

        <form onSubmit={handleReset} className="mt-6 space-y-4">
          <input
            required
            type="email"
            placeholder="Email Address"
            className="input-style"
            onChange={(e) => setEmail(e.target.value)}
          />

          {message && <p className="text-sm text-green-400">{message}</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}

          <button className="w-full bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white">
            Send Reset Link
          </button>
        </form>

        <Link to="/signin" className="mt-5 block text-sm text-[#D4AF37]">
          Back to Sign In
        </Link>
      </div>
    </main>
  );
}