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
  Menu,
  X,
  PlayCircle,
} from "lucide-react";

export default function Training() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState([]);

  const categories = ["Videos", "Guides", "Walkthroughs ", "SOPs", "Homework"];
const getGoogleDriveDownloadLink = (url) => {
  if (!url) return "";

  const fileMatch = url.match(/\/file\/d\/([^/]+)/);

  if (fileMatch) {
    return `https://drive.google.com/uc?export=download&id=${fileMatch[1]}`;
  }

  return url;
};
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));

      if (userSnap.exists()) {
        const data = userSnap.data();
        setTraining(data.training || []);
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
        <p className="text-[#D4AF37]">Loading training...</p>
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
            Training
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Access videos, guides, walkthroughs, SOPs, and weekly homework
            assigned to your account.
          </p>
        </div>

        <div className="overflow-hidden rounded-md border border-[#D4AF37]/30 bg-white shadow-2xl">
          <div className="flex flex-col gap-4 bg-[#0b1118] px-6 py-5 text-white md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-center justify-between gap-3">
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

  <button
    onClick={() => setMobileMenuOpen(true)}
    className="md:hidden"
  >
    <Menu size={24} />
  </button>
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
            <>
  {mobileMenuOpen && (
    <div
      className="fixed inset-0 z-40 bg-black/50 md:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />
  )}

  <aside
    className={`
      fixed left-0 top-0 z-50 h-full w-72 bg-[#eee9dc] p-5
      transition-transform duration-300
      md:static md:h-auto md:w-auto md:translate-x-0
      ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
    `}
  >
    <div className="mb-6 flex items-center justify-between md:hidden">
  <h3 className="font-black">Menu</h3>

  <button onClick={() => setMobileMenuOpen(false)}>
    <X size={22} />
  </button>
</div>
              {sidebarLinks.map(([name, path, Icon]) => (
                <Link
  key={name}
  to={path}
  onClick={() => setMobileMenuOpen(false)}
                  className={`mb-3 flex items-center gap-3 px-5 py-4 text-sm font-black uppercase transition ${
                    name === "Training"
                      ? "bg-[#caa12a] text-black"
                      : "text-black hover:bg-[#d8cfae]"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </Link>
              ))}
            </aside>
            </>
            <div className="bg-[#f7f7f7] p-6 md:p-8">
              <h2 className="text-3xl font-black text-black">
                Training Center
              </h2>

              <p className="mt-3 text-gray-600">
                Apex training content assigned to your program will appear here.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
                {categories.map((item) => (
                  <div
                    key={item}
                    className="border border-[#caa12a]/30 bg-white p-4 text-center shadow-sm min-h-[80px] flex items-center justify-center"
                  >
                    <p className="text-sm font-black uppercase text-[#caa12a]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                {training.length === 0 ? (
                  <div className="rounded border border-dashed border-gray-300 bg-white p-8 text-center">
                    <PlayCircle className="mx-auto text-[#caa12a]" size={52} />

                    <h3 className="mt-4 text-xl font-black text-black">
                      Training resources will appear here
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
                      Once Apex assigns videos, guides, walkthroughs, SOPs, or
                      weekly homework to your program, they will appear here.
                    </p>

                    <Link
                      to="/support"
                      className="mt-6 inline-flex bg-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
                    >
                      Contact Support
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    {training.map((item, index) => (
                      <div
                        key={`${item.title}-${index}`}
                        className="border border-gray-300 bg-white p-6 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#caa12a]">
                            {item.locked ? (
                              <Lock size={24} className="text-[#caa12a]" />
                            ) : (
                              <PlayCircle
                                size={24}
                                className="text-[#caa12a]"
                              />
                            )}
                          </span>

                          <div>
                            <h3 className="text-lg font-black text-black">
                              {item.title || "Training Resource"}
                            </h3>

                            <p className="mt-2 text-sm text-gray-600">
                              {item.description ||
                                "Apex assigned training material."}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="rounded bg-[#f2efe4] px-3 py-1 text-xs font-black uppercase text-[#c28f00]">
                                {item.type || "Training"}
                              </span>

                              {item.locked ? (
                                <span className="rounded bg-red-100 px-3 py-1 text-xs font-black uppercase text-red-600">
                                  Locked
                                </span>
                              ) : (
                                <span className="rounded bg-green-100 px-3 py-1 text-xs font-black uppercase text-green-600">
                                  Unlocked
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

<div className="mt-6 flex flex-wrap gap-3">
  {item.locked ? (
    <button className="inline-flex bg-gray-200 px-5 py-3 text-sm font-black uppercase text-gray-500">
      Locked Content
    </button>
  ) : item.url ? (
    <>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex bg-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
      >
        Open Training
      </a>

      <a
        href={getGoogleDriveDownloadLink(item.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex border border-[#caa12a] px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
      >
        Download
      </a>
    </>
  ) : (
    <button className="inline-flex bg-gray-200 px-5 py-3 text-sm font-black uppercase text-gray-500">
      No Link Added
    </button>
  )}
</div>
                      </div>
                    ))}
                  </div>
                )}
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