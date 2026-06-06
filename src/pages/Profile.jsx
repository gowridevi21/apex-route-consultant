import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  User,
  Video,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "client",
    purchases: [],
    progress: 0,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      setCurrentUser(user);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        setProfile({
          fullName: data.fullName || user.displayName || "Client",
          email: data.email || user.email || "",
          phone: data.phone || "",
          role: data.role || "client",
          purchases: data.purchases || [],
          progress: data.progress || 0,
        });
      } else {
        setProfile({
          fullName: user.displayName || "Client",
          email: user.email || "",
          phone: "",
          role: "client",
          purchases: [],
          progress: 0,
        });

        await setDoc(userRef, {
          fullName: user.displayName || "Client",
          email: user.email || "",
          phone: "",
          role: "client",
          purchases: [],
          documents: [],
          progress: 0,
          nextStep: "No action assigned yet",
          timeline: [],
          currentPhase: "Not started",
          createdAt: new Date(),
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    setSaving(true);

    try {
      await updateProfile(currentUser, {
        displayName: profile.fullName,
      });

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          role: profile.role,
          purchases: profile.purchases,
          progress: profile.progress,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      alert("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const sidebarLinks = [
    ["Dashboard", "/dashboard", LayoutDashboard],
    ["My Vault", "/my-vault", FileText],
    ["Progress", "/progress", TrendingUp],
    ["Training", "/training", Video],
    ["Uploads", "/uploads", UploadCloud],
    ["Invoices", "/invoices", Receipt],
    ["Support", "/support", MessageSquare],
    ["Profile", "/profile", User],
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-8 text-black md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-black uppercase tracking-wide text-[#D4AF37]">
            Apex Client Portal
          </p>

          <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
            Profile
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Manage your client account details and portal access.
          </p>
        </div>

        <div className="overflow-hidden rounded-md border border-[#D4AF37]/30 bg-white shadow-2xl">
          <div className="flex flex-col gap-4 bg-[#0b1118] px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo1.png"
                alt="Apex Logo"
                className="h-10 w-auto"
              />

              <h2 className="text-lg font-black uppercase tracking-wide">
                Apex Client Portal
              </h2>
            </div>

            <div className="text-sm font-bold">
              <Link to="/profile" className="text-[#D4AF37]">
                Profile
              </Link>{" "}
              |{" "}
              <Link to="/support" className="hover:text-[#D4AF37]">
                Support
              </Link>{" "}
              |{" "}
              <button onClick={handleLogout} className="hover:text-[#D4AF37]">
                Logout
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-[260px_1fr]">
            <aside className="bg-[#eee9dc] p-5">
              {sidebarLinks.map(([name, path, Icon]) => (
                <Link
                  key={name}
                  to={path}
                  className={`mb-3 flex items-center gap-3 px-5 py-4 text-sm font-black uppercase transition ${
                    name === "Profile"
                      ? "bg-[#caa12a] text-black"
                      : "text-black hover:bg-[#d8cfae]"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </Link>
              ))}
            </aside>

            <div className="bg-[#f7f7f7] p-6 md:p-8">
              <h2 className="text-3xl font-black text-black">
                {profile.fullName || "Client"}
              </h2>

              <p className="mt-3 text-gray-600">
                Edit your account information below.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <label className="text-sm font-black uppercase text-gray-500">
                    Full Name
                  </label>
                  <input
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    className="mt-3 w-full border border-gray-300 px-4 py-3 text-lg font-bold outline-none focus:border-[#caa12a]"
                  />
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <label className="text-sm font-black uppercase text-gray-500">
                    Email
                  </label>
                  <input
                    value={profile.email}
                    disabled
                    className="mt-3 w-full border border-gray-200 bg-gray-100 px-4 py-3 text-lg font-bold text-gray-500 outline-none"
                  />
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <label className="text-sm font-black uppercase text-gray-500">
                    Phone
                  </label>
                  <input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    className="mt-3 w-full border border-gray-300 px-4 py-3 text-lg font-bold outline-none focus:border-[#caa12a]"
                  />
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Role
                  </p>
                  <p className="mt-3 text-xl font-black capitalize text-[#c28f00]">
                    {profile.role}
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Purchased Systems
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#c28f00]">
                    {profile.purchases.length}
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Progress
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#c28f00]">
                    {profile.progress}% complete
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="bg-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Profile"}
                </button>

                <Link
                  to="/dashboard"
                  className="border border-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Back to Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="border border-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Logout
                </button>
              </div>

              <p className="mt-6 text-xs text-gray-500">
                Signed in UID: {currentUser?.uid}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}