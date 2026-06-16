import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { ArrowLeft, FileText, LogOut, Plus } from "lucide-react";

export default function AdminFiles() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    clientId: "",
    name: "",
    type: "",
    category: "01 - Agreements & Receipts",
    url: "",
  });

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

      const adminSnap = await getDoc(doc(db, "users", user.uid));
      const adminData = adminSnap.data();
      const adminRole = adminData?.role || adminData?.documents?.role;

      if (adminRole !== "admin") {
        navigate("/dashboard");
        return;
      }

      const usersSnap = await getDocs(collection(db, "users"));

      const clientList = usersSnap.docs.map((userDoc) => {
        const data = userDoc.data();

        return {
          id: userDoc.id,
          fullName:
            (data.fullName || data.documents?.fullName || "Client")
              .split("|")[0]
              .trim(),
          email: data.email || data.documents?.email || "",
          role: data.role || data.documents?.role || "client",
        };
      });

      setClients(clientList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const handleAddFile = async (e) => {
    e.preventDefault();

    if (!form.clientId) {
      alert("Please select a client.");
      return;
    }

    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", form.clientId),
        {
          documents: arrayUnion({
            name: form.name,
            type: form.type || "Document",
            category: form.category,
            url: form.url,
            createdAt: new Date().toISOString(),
          }),
        },
        { merge: true }
      );

      alert("File added to client vault.");

      setForm({
        clientId: "",
        name: "",
        type: "",
        category: "01 - Agreements & Receipts",
        url: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add file.");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading file manager...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-8 text-black md:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-black uppercase tracking-wide text-[#D4AF37]">
              Apex Admin Portal
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
              Admin File Manager
            </h1>

            <p className="mt-3 text-white/70">
              Add PDF, Google Drive, invoice, agreement, or training links to a
              client vault.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 border border-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-black uppercase text-white hover:bg-white hover:text-black"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <form
          onSubmit={handleAddFile}
          className="rounded-md border border-[#D4AF37]/30 bg-white p-6 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <FileText className="text-[#caa12a]" size={28} />
            <h2 className="text-2xl font-black text-black">
              Add File to Client Vault
            </h2>
          </div>

          <div className="mt-6 grid gap-5">
            <select
              required
              value={form.clientId}
              onChange={(e) => setForm({ ...form, clientId: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.fullName} — {client.email}
                </option>
              ))}
            </select>

            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="File Name, example: Mentorship Agreement.pdf"
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
            />

            <input
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              placeholder="File Type, example: Agreement, Invoice, Training PDF"
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <input
              required
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="Paste PDF / Google Drive / Stan / Invoice Link"
              className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
            />

            <button
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 bg-[#caa12a] px-6 py-4 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white disabled:opacity-60"
            >
              <Plus size={18} />
              {saving ? "Adding..." : "Add File"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}