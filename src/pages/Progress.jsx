import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  FileText,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  User,
  Video,
} from "lucide-react";

export default function Progress() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState({
    progress: 0,
    nextStep: "No action assigned yet",
    currentPhase: "Not started",
    timeline: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));

      if (userSnap.exists()) {
        const data = userSnap.data();

        setProgressData({
          progress: data.progress || 0,
          nextStep: data.nextStep || "No action assigned yet",
          currentPhase: data.currentPhase || "Not started",
          timeline: data.timeline || [],
        });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

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
        <p className="text-[#D4AF37]">Loading progress...</p>
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
            Progress
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Track your current phase, next step, and overall client progress.
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
              <Link to="/profile" className="hover:text-[#D4AF37]">
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
                    name === "Progress"
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
                Progress Overview
              </h2>

              <p className="mt-3 text-gray-600">
                Your current client journey status is shown below.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Progress Score
                  </p>
                  <p className="mt-2 text-3xl font-black text-[#c28f00]">
                    {progressData.progress}% complete
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Current Phase
                  </p>
                  <p className="mt-2 text-xl font-black text-[#c28f00]">
                    {progressData.currentPhase}
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Next Step
                  </p>
                  <p className="mt-2 text-xl font-black text-[#c28f00]">
                    {progressData.nextStep}
                  </p>
                </div>
              </div>

              <div className="mt-8 border border-gray-300 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black">Progress Timeline</h3>

                <div className="mt-6 space-y-5">
                  {progressData.timeline.length === 0 ? (
                    <div className="rounded border border-dashed border-gray-300 p-6 text-sm text-gray-500">
                      No progress timeline has been assigned yet.
                    </div>
                  ) : (
                    progressData.timeline.map((item, index) => (
                      <div
                        key={`${item.phase}-${index}`}
                        className={`flex items-center gap-4 ${
                          item.status === "locked" ? "text-gray-500" : ""
                        }`}
                      >
                        {item.status === "locked" ? (
                          <span className="flex h-6 w-6 items-center justify-center bg-gray-300">
                            <Lock size={14} />
                          </span>
                        ) : (
                          <span className="h-6 w-6 bg-[#caa12a]"></span>
                        )}

                        <div>
                          <p className="font-black">
                            {item.phase || `Phase ${index + 1}`}
                          </p>
                          {item.description && (
                            <p className="mt-1 text-sm text-gray-600">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="bg-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
                >
                  Back to Dashboard
                </Link>

                <Link
                  to="/support"
                  className="border border-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}