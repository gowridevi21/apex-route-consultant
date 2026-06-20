import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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

  const getFriendlyError = (code) => {
    if (code === "auth/email-already-in-use") {
      return "This email already has an account. Please sign in instead, or use Forgot Password if you do not remember your password.";
    }

    if (code === "auth/weak-password") {
      return "Password should be at least 6 characters.";
    }

    if (code === "auth/invalid-email") {
      return "Please enter a valid email address.";
    }

    return "Something went wrong. Please try again.";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const cleanEmail = form.email.trim().toLowerCase();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        form.password
      );

      await updateProfile(userCredential.user, {
        displayName: form.name.trim(),
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName: form.name.trim(),
        phone: form.phone.trim(),
        email: cleanEmail,
        progress: 0,
        purchases: [],
        documents: [],
        training: [],
        uploads: [],
        invoices: [],
        supportTickets: [],
        nextStep: "No action assigned yet",
        timeline: [],
        currentPhase: "Not started",
        role: "client",
        createdAt: new Date(),
      });

      await sendEmailVerification(userCredential.user);

      await signOut(auth);

      setMessage(
        "Account created successfully. A verification email has been sent. Please verify your email before signing in."
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 4000);
} catch (err) {
  console.log("SIGNUP ERROR CODE:", err.code);
  console.log("SIGNUP ERROR MESSAGE:", err.message);

  setError(getFriendlyError(err.code));
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
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            required
            type="tel"
            placeholder="Phone Number"
            className="input-style"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            required
            type="email"
            placeholder="Email Address"
            className="input-style"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            required
            type="password"
            placeholder="Password"
            className="input-style"
            value={form.password}
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