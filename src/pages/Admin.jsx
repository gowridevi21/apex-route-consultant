import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  FileText,
  //LayoutDashboard,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  //User,
  Users,
  ShieldCheck,
  LogOut,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const adminSnap = await getDoc(doc(db, "users", user.uid));

      if (!adminSnap.exists()) {
        navigate("/dashboard");
        return;
      }

      const adminData = adminSnap.data();
    const adminRole = adminData.role || adminData.documents?.role;

if (adminRole !== "admin") {
  navigate("/dashboard");
  return;
      }

      const cleanName = (adminData.fullName || user.displayName || "Admin")
        .split("|")[0]
        .trim();

      setAdminName(cleanName);

      const usersSnap = await getDocs(collection(db, "users"));

      const clientList = usersSnap.docs.map((userDoc) => {
        const data = userDoc.data();

        return {
          id: userDoc.id,
          fullName: (data.fullName || "Client").split("|")[0].trim(),
          email: data.email || "",
          phone: data.phone || "",
          role: data.role || data.documents?.role || "client",
          progress: data.progress || 0,
          currentPhase: data.currentPhase || "Not started",
          nextStep: data.nextStep || "No action assigned yet",
          purchases: data.purchases || [],
          documents: data.documents || [],
          training: data.training || [],
          uploads: data.uploads || [],
          invoices: data.invoices || [],
          supportTickets: data.supportTickets || [],
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

  const totalDocuments = clients.reduce(
    (sum, client) => sum + client.documents.length,
    0
  );

  const totalTraining = clients.reduce(
    (sum, client) => sum + client.training.length,
    0
  );

  const totalUploads = clients.reduce(
    (sum, client) => sum + client.uploads.length,
    0
  );

  const totalInvoices = clients.reduce(
    (sum, client) => sum + client.invoices.length,
    0
  );

  const totalTickets = clients.reduce(
    (sum, client) => sum + client.supportTickets.length,
    0
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading admin dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-8 text-black md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-black uppercase tracking-wide text-[#D4AF37]">
              Apex Admin Portal
            </p>

            <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 max-w-3xl text-white/70">
              Welcome back, {adminName}. Manage clients, progress, documents,
              uploads, invoices, and support requests.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
          <StatCard icon={Users} label="Clients" value={clients.length} />
          <StatCard icon={FileText} label="Documents" value={totalDocuments} />
          <StatCard icon={UploadCloud} label="Uploads" value={totalUploads} />
          <StatCard icon={TrendingUp} label="Training" value={totalTraining} />
          <StatCard icon={Receipt} label="Invoices" value={totalInvoices} />
          <StatCard icon={MessageSquare} label="Tickets" value={totalTickets} />
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
  <Link
    to="/admin/files"
    className="w-56 bg-[#caa12a] px-6 py-3 text-center text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
  >
    File Manager
  </Link>

  <Link
    to="/admin/support"
    className="w-56 bg-[#caa12a] px-6 py-3 text-center text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
  >
    Support Center
  </Link>

  <Link
    to="/admin/uploads"
    className="w-56 bg-[#caa12a] px-6 py-3 text-center text-sm font-black uppercase text-black transition hover:bg-black hover:text-white"
  >
    Upload Review
  </Link>
</div>

        <div className="mt-8 overflow-hidden rounded-md border border-[#D4AF37]/30 bg-white shadow-2xl">
          <div className="flex flex-col gap-4 bg-[#0b1118] px-6 py-5 text-white md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#D4AF37]" size={28} />
              <h2 className="text-xl font-black uppercase">
                Client Management
              </h2>
            </div>

            <Link
              to="/dashboard"
              className="text-sm font-black uppercase text-[#D4AF37]"
            >
              View Client Portal
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead className="bg-[#eee9dc]">
                <tr>
                  <th className="p-4 font-black uppercase">Client</th>
                  <th className="p-4 font-black uppercase">Email</th>
                  <th className="p-4 font-black uppercase">Role</th>
                  <th className="p-4 font-black uppercase">Progress</th>
                  <th className="p-4 font-black uppercase">Current Phase</th>
                  <th className="p-4 font-black uppercase">Docs</th>
                  <th className="p-4 font-black uppercase">Uploads</th>
                  <th className="p-4 font-black uppercase">Tickets</th>
                  <th className="p-4 font-black uppercase">Action</th>
                </tr>
              </thead>

              <tbody>
                {clients.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="p-8 text-center text-sm text-gray-500"
                    >
                      No clients found.
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="p-4 font-black text-black">
                        {client.fullName}
                      </td>

                      <td className="p-4 text-gray-600">{client.email}</td>

                      <td className="p-4">
                        <span
                          className={`rounded px-3 py-1 text-xs font-black uppercase ${
                            client.role === "admin"
                              ? "bg-[#f2efe4] text-[#c28f00]"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {client.role}
                        </span>
                      </td>

                      <td className="p-4 font-black text-[#c28f00]">
                        {client.progress}%
                      </td>

                      <td className="p-4 text-gray-600">
                        {client.currentPhase}
                      </td>

                      <td className="p-4 font-bold">
                        {client.documents.length}
                      </td>

                      <td className="p-4 font-bold">{client.uploads.length}</td>

                      <td className="p-4 font-bold">
                        {client.supportTickets.length}
                      </td>

                      <td className="p-4">
                        <Link
                          to={`/admin/client/${client.id}`}
                          className="font-black uppercase text-[#c28f00]"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 rounded border border-[#D4AF37]/30 bg-[#111] p-5 text-white">
          <p className="text-sm font-bold text-white/80">
            Phase 1 Admin Dashboard: view clients and summary data. Next step is
            building the individual client management page where Apex can update
            progress, assign documents, add invoices, and review support tickets.
          </p>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md border border-[#D4AF37]/30 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <Icon className="text-[#caa12a]" size={26} />

        <p className="text-3xl font-black text-black">{value}</p>
      </div>

      <p className="mt-3 text-sm font-black uppercase text-gray-500">
        {label}
      </p>
    </div>
  );
}