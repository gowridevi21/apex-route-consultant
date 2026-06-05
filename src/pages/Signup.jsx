import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(userCredential.user, {
  displayName: form.name,
});

await setDoc(doc(db, "users", userCredential.user.uid), {
  fullName: form.name,
  phone: form.phone,
  email: form.email,

  progress: 0,

  purchases: [],

  documents: [],

  timeline: [
    {
      phase: "Phase 1",
      status: "Pending",
    },
  ],

  createdAt: new Date(),
});

await sendEmailVerification(userCredential.user);

      setMessage(
        "Account created successfully. A confirmation email has been sent. Please verify your email before signing in."
      );

      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pt-32 text-white">
      <div className="mx-auto max-w-md rounded-md border border-white/10 bg-white/[0.04] p-8">
        <p className="font-black uppercase text-[#D4AF37]">Create Account</p>

        <h1 className="mt-3 text-3xl font-black uppercase">Sign Up</h1>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            required
            placeholder="Full Name"
            className="input-style"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            required
            type="tel"
            placeholder="Phone Number"
            className="input-style"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            className="input-style"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            required
            type="password"
            placeholder="Password"
            className="input-style"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {message && <p className="text-sm text-green-400">{message}</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white disabled:opacity-60"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-sm text-white/70">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#D4AF37]">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}