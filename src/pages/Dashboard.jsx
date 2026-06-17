import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

//import PortalLayout from "../components/PortalLayout";
import {
  FileText,
  LayoutDashboard,
  Lock,
  Menu,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  User,
  Video,
  X,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState("Client");
  const [userRole, setUserRole] = useState("client");

  const [clientData, setClientData] = useState({
    purchases: [],
    documents: [],
    progress: 0,
    nextStep: "No action assigned yet",
    timeline: [],
    currentPhase: "Not started",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      try {
        const userSnap = await getDoc(doc(db, "users", user.uid));

        if (userSnap.exists()) {
          const data = userSnap.data();

          setUserRole(data.role || data.documents?.role || "client");

          const cleanName = (data.fullName || user.displayName || "Client")
            .split("|")[0]
            .trim();

          setClientName(cleanName);

          setClientData({
            purchases: data.purchases || [],
            documents: Array.isArray(data.documents) ? data.documents : [],
            progress: data.progress || 0,
            nextStep: data.nextStep || "No action assigned yet",
            timeline: data.timeline || [],
            currentPhase: data.currentPhase || "Not started",
          });
        } else {
          const cleanName = (user.displayName || "Client")
            .split("|")[0]
            .trim();

          setClientName(cleanName);
        }
      } catch (error) {
        console.error("Dashboard data error:", error);
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
  const totalDocuments = clientData.documents.length;
  //const totalPurchases = clientData.purchases.length;
  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading dashboard...</p>
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
            Apex Client Command Center
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Your purchases, progress reports, action steps, training resources,
            uploads, invoices, and support are organized in one secure place.
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
            {mobileMenuOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            <aside
              className={`fixed left-0 top-0 z-50 h-full w-72 bg-[#eee9dc] p-5 transition-transform duration-300 md:static md:h-auto md:w-auto md:translate-x-0 ${
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="mb-6 flex items-center justify-between md:hidden">
                <h3 className="font-black">Menu</h3>

                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              {sidebarLinks.map(([name, path, Icon], index) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mb-3 flex items-center gap-3 px-5 py-4 text-sm font-black uppercase transition ${
                    index === 0
                      ? "bg-[#caa12a] text-black"
                      : "text-black hover:bg-[#d8cfae]"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </Link>
              ))}

              {userRole === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-3 flex items-center gap-3 bg-black px-5 py-4 text-sm font-black uppercase text-[#caa12a] transition hover:bg-[#caa12a] hover:text-black"
                >
                  <LayoutDashboard size={18} />
                  Admin
                </Link>
              )}
            </aside>

            <div className="bg-[#f7f7f7] p-4 md:p-8">
              <h2 className="text-2xl font-black text-black md:text-3xl">
                Welcome back, {clientName}
              </h2>

              <p className="mt-3 text-gray-600">
                Your purchases, progress reports, action steps, and resources
                are organized here.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Purchased Systems
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#c28f00]">
                    {clientData.documents.length} files
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Progress Score
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#c28f00]">
                    {clientData.progress}% complete
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Next Step
                  </p>
                  <p className="mt-2 text-xl font-black text-[#c28f00]">
                    {clientData.nextStep}
                  </p>
                  <div className="border border-gray-300 bg-white p-5 shadow-sm">
  <p className="text-sm font-black uppercase text-gray-500">
    Current Phase
  </p>

  <p className="mt-2 text-xl font-black text-[#c28f00]">
    {clientData.currentPhase}
  </p>
</div>

<div className="border border-gray-300 bg-white p-5 shadow-sm">
  <p className="text-sm font-black uppercase text-gray-500">
    Documents
  </p>

  <p className="mt-2 text-2xl font-black text-[#c28f00]">
    {totalDocuments}
  </p>
</div>
                </div>
              </div>
              
              <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
                <div className="border border-gray-300 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-black">
                      Recent Purchased Documents
                    </h3>

                    <Link
                      to="/my-vault"
                      className="text-sm font-black uppercase text-[#c28f00]"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="mt-5 space-y-3">
                    {clientData.documents.length === 0 ? (
                      <div className="rounded border border-dashed border-gray-300 p-6 text-sm text-gray-500">
                        No purchased documents yet. Once Apex assigns files to
                        your account, they will appear here.
                      </div>
                    ) : (
                      clientData.documents.map((docItem, index) => (
                        <div
                          key={`${docItem.name}-${index}`}
                          className="flex flex-col gap-3 border-b border-gray-200 pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 items-center justify-center border-2 border-[#caa12a]">
                              <FileText
                                size={15}
                                className="text-[#caa12a]"
                              />
                            </span>

                            <div>
                              <p className="text-sm font-bold">
                                {docItem.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {docItem.type || "Document"}
                              </p>
                            </div>
                          </div>

                          <div className="text-sm font-bold text-[#c28f00]">
                            View | Save
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="border border-gray-300 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black">Progress Timeline</h3>

                  <div className="mt-6 space-y-5">
                    {clientData.timeline.length === 0 ? (
                      <div className="rounded border border-dashed border-gray-300 p-5 text-sm text-gray-500">
                        No progress started yet.
                      </div>
                    ) : (
                      clientData.timeline.map((item, index) => (
                        <div
                          key={`${item.phase}-${index}`}
                          className={`flex items-center gap-4 ${
                            item.status === "locked" ? "text-gray-500" : ""
                          }`}
                        >
                          {item.status === "locked" ? (
                            <span className="flex h-5 w-5 items-center justify-center bg-gray-300">
                              <Lock size={13} />
                            </span>
                          ) : (
                            <span className="h-5 w-5 bg-[#caa12a]" />
                          )}

                          <span
                            className={
                              item.status === "locked" ? "" : "font-bold"
                            }
                          >
                            {item.phase}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-8 border-l-4 border-[#caa12a] bg-[#f2efe4] p-4">
                    <p className="text-sm font-bold text-black">
                      Current Phase
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      {clientData.currentPhase}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Link
                  to="/my-vault"
                  className="bg-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
                >
                  My Vault
                </Link>

                <Link
                  to="/progress"
                  className="border border-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Progress
                </Link>

                <Link
                  to="/training"
                  className="border border-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Training
                </Link>

                <Link
                  to="/support"
                  className="border border-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Support
                </Link>

                {userRole === "admin" && (
                  <Link
                    to="/admin"
                    className="bg-black px-5 py-4 text-center text-sm font-black uppercase text-[#caa12a] transition hover:bg-[#caa12a] hover:text-black"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}