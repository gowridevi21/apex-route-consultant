import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  FileText,
  Folder,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  User,
  Video,
  Download,
} from "lucide-react";

export default function MyVault() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState("Client");
  const [documents, setDocuments] = useState([]);

  const categories = [
    "01 - Agreements & Receipts",
    "02 - Mentorship Program",
    "03 - Operations Setup & Systems",
    "04 - Dispatch / Broker / Load Systems",
    "05 - Money System / Startup Cost Tools",
    "06 - Progress Reports",
    "07 - Client Uploads",
    "08 - Bonus Resources",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));

      if (userSnap.exists()) {
        const data = userSnap.data();

        const cleanName = (data.fullName || user.displayName || "Client")
          .split("|")[0]
          .trim();

        setClientName(cleanName);
        setDocuments(data.documents || []);
      } else {
        const cleanName = (user.displayName || "Client")
          .split("|")[0]
          .trim();

        setClientName(cleanName);
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

  const getDocumentsByCategory = (category) => {
    return documents.filter((docItem) => docItem.category === category);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading vault...</p>
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
            My Vault
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Your purchased PDFs, reports, agreements, uploads, invoices, and bonus resources are organized by category.
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
                    name === "My Vault"
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
                {clientName}'s Vault
              </h2>

              <p className="mt-3 text-gray-600">
                Every client only sees the files assigned to their account.
              </p>

              <div className="mt-8 grid gap-5">
                {categories.map((category) => {
                  const categoryDocs = getDocumentsByCategory(category);

                  return (
                    <div
                      key={category}
                      className="border border-gray-300 bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center bg-[#f2efe4]">
                            <Folder size={22} className="text-[#caa12a]" />
                          </span>

                          <div>
                            <h3 className="font-black text-black">
                              {category}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {categoryDocs.length} file
                              {categoryDocs.length === 1 ? "" : "s"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        {categoryDocs.length === 0 ? (
                          <div className="rounded border border-dashed border-gray-300 p-5 text-sm text-gray-500">
                            No files added to this category yet.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {categoryDocs.map((docItem, index) => (
                              <div
                                key={`${docItem.name}-${index}`}
                                className="flex flex-col gap-3 border-b border-gray-200 pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-[#caa12a]">
                                    <FileText
                                      size={16}
                                      className="text-[#caa12a]"
                                    />
                                  </span>

                                  <div>
                                    <p className="text-sm font-black text-black">
                                      {docItem.name || "Untitled Document"}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                      {docItem.type || "Document"}
                                    </p>

                                    {docItem.createdAt && (
                                      <p className="mt-1 text-xs text-gray-400">
                                        Saved:{" "}
                                        {new Date(
                                          docItem.createdAt
                                        ).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                  {docItem.url ? (
                                    <a
                                      href={docItem.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 bg-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black transition hover:bg-black hover:text-white"
                                    >
                                      View
                                    </a>
                                  ) : (
                                    <button className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 text-xs font-black uppercase text-gray-500">
                                      View
                                    </button>
                                  )}

                                  {docItem.url ? (
                                    <a
                                      href={docItem.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 border border-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black transition hover:bg-[#caa12a]"
                                    >
                                      <Download size={14} />
                                      Download
                                    </a>
                                  ) : (
                                    <button className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2 text-xs font-black uppercase text-gray-400">
                                      <Download size={14} />
                                      Download
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded border border-[#caa12a]/40 bg-[#f2efe4] p-5">
                <p className="text-sm font-bold text-black">
                  Note: Only documents assigned to your account are visible here.
                  Paid resources should not be shared publicly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}