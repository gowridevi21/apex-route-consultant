import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Signin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const createMissingUserDocument = async (user, cleanEmail) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(
        userRef,
        {
          fullName: user.displayName || "Client",
          phone: "",
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
        },
        { merge: true }
      );
    }
  };

  

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cleanEmail = form.email.trim().toLowerCase();

      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        form.password
      );

      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        setError(
          "Please verify your email before signing in. Check your inbox, spam, or promotions folder."
        );
        setLoading(false);
        return;
      }

      await createMissingUserDocument(userCredential.user, cleanEmail);

      navigate("/dashboard");
    } 
    catch (err) {
  console.error("Firebase Sign In Error:", err);

  alert(err.code);

  setError(err.code + " - " + err.message);
}

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pt-32 text-white">
      <div className="mx-auto max-w-md rounded-md border border-white/10 bg-white/[0.04] p-8">
        <p className="font-black uppercase text-[#D4AF37]">Welcome Back</p>

        <h1 className="mt-3 text-3xl font-black uppercase">Sign In</h1>

        <form onSubmit={handleSignin} className="mt-6 space-y-4">
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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 accent-[#D4AF37]"
            />

            <label htmlFor="rememberMe" className="text-sm text-white/80">
              Remember me
            </label>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-5 flex justify-between text-sm text-white/70">
          <Link to="/signup" className="text-[#D4AF37]">
            Create Account
          </Link>

          <Link to="/forgot-password" className="text-[#D4AF37]">
            Forgot Password?
          </Link>
        </div>
      </div>
    </main>
  );
}