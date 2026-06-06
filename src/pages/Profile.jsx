import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  updateEmail,
} from "firebase/auth";
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
  Pencil,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "client",
    purchases: [],
    progress: 0,
  });

  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
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

        const loadedProfile = {
          fullName: data.fullName || user.displayName || "Client",
          email: data.email || user.email || "",
          phone: data.phone || "",
          role: data.role || "client",
          purchases: data.purchases || [],
          progress: data.progress || 0,
        };

        setProfile(loadedProfile);
        setEditForm({
          fullName: loadedProfile.fullName,
          email: loadedProfile.email,
          phone: loadedProfile.phone,
        });
      } else {
        const newProfile = {
          fullName: user.displayName || "Client",
          email: user.email || "",
          phone: "",
          role: "client",
          purchases: [],
          progress: 0,
        };

        setProfile(newProfile);
        setEditForm({
          fullName: newProfile.fullName,
          email: newProfile.email,
          phone: newProfile.phone,
        });

        await setDoc(userRef, {
          ...newProfile,
          documents: [],
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

  const handleEdit = () => {
    setEditForm({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
    });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    setSaving(true);

    try {
      await updateProfile(currentUser, {
        displayName: editForm.fullName,
      });

      if (editForm.email !== currentUser.email) {
        await updateEmail(currentUser, editForm.email);
      }

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          fullName: editForm.fullName,
          email: editForm.email,
          phone: editForm.phone,
          role: profile.role,
          purchases: profile.purchases,
          progress: profile.progress,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      setProfile({
        ...profile,
        fullName: editForm.fullName,
        email: editForm.email,
        phone: editForm.phone,
      });

      setEditing(false);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/requires-recent-login") {
        alert(
          "For security, please log out and sign in again before changing your email."
        );
      } else {
        alert("Failed to update profile.");
      }
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
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-black text-black">
                    {profile.fullName || "Client"}
                  </h2>

                  <p className="mt-3 text-gray-600">
                    Your account information is shown below.
                  </p>
                </div>

                {!editing && (
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center gap-2 bg-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
                  >
                    <Pencil size={16} />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <ProfileField
                  label="Full Name"
                  value={profile.fullName}
                  editing={editing}
                  inputValue={editForm.fullName}
                  onChange={(value) =>
                    setEditForm({ ...editForm, fullName: value })
                  }
                />

                <ProfileField
                  label="Email"
                  value={profile.email}
                  editing={editing}
                  inputValue={editForm.email}
                  type="email"
                  onChange={(value) =>
                    setEditForm({ ...editForm, email: value })
                  }
                />

                <ProfileField
                  label="Phone"
                  value={profile.phone || "Not provided"}
                  editing={editing}
                  inputValue={editForm.phone}
                  type="tel"
                  onChange={(value) =>
                    setEditForm({ ...editForm, phone: value })
                  }
                />

                <ReadOnlyCard label="Role" value={profile.role} gold />

                <ReadOnlyCard
                  label="Purchased Systems"
                  value={profile.purchases.length}
                  gold
                />

                <ReadOnlyCard
                  label="Progress"
                  value={`${profile.progress}% complete`}
                  gold
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {editing && (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="bg-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      onClick={handleCancel}
                      className="border border-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                    >
                      Cancel
                    </button>
                  </>
                )}

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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileField({ label, value, editing, inputValue, onChange, type = "text" }) {
  return (
    <div className="border border-gray-300 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-gray-500">{label}</p>

      {editing ? (
        <input
          type={type}
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          className="mt-3 w-full border border-gray-300 px-4 py-3 text-xl font-black text-black outline-none focus:border-[#caa12a]"
        />
      ) : (
        <p className="mt-2 text-xl font-black text-black">{value}</p>
      )}
    </div>
  );
}

function ReadOnlyCard({ label, value, gold = false }) {
  return (
    <div className="border border-gray-300 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-gray-500">{label}</p>
      <p
        className={`mt-2 text-2xl font-black capitalize ${
          gold ? "text-[#c28f00]" : "text-black"
        }`}
      >
        {value}
      </p>
    </div>
  );
}