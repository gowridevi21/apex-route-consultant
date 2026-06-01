import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
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

      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 pt-32 text-white">
      <div className="mx-auto max-w-md rounded-md border border-white/10 bg-white/[0.04] p-8">
        <p className="font-black uppercase text-[#D4AF37]">Create Account</p>

        <h1 className="mt-3 text-3xl font-black uppercase">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input
            required
            placeholder="Full Name"
            className="input-style"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
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

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white"
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