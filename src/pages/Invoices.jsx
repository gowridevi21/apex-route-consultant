import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  User,
  Menu,
  X,
  Video,
  DollarSign,
} from "lucide-react";

export default function Invoices() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));

      if (userSnap.exists()) {
        const data = userSnap.data();
        setInvoices(data.invoices || []);
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
        <p className="text-[#D4AF37]">Loading invoices...</p>
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
            Invoices & Receipts
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            View paid invoices, open balances, receipts, and payment links.
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
                    name === "Invoices"
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
                Billing Overview
              </h2>

              <p className="mt-3 text-gray-600">
                Receipts, invoice PDFs, and payment links assigned by Apex will
                appear here.
              </p>

              {invoices.length === 0 ? (
                <div className="mt-8 rounded border border-dashed border-gray-300 bg-white p-8 text-center">
                  <DollarSign className="mx-auto text-[#caa12a]" size={52} />

                  <h3 className="mt-4 text-xl font-black text-black">
                    No invoices yet
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">
                    Once Apex uploads receipts, invoices, or payment links to
                    your account, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="mt-8 overflow-x-auto border border-gray-300 bg-white shadow-sm">
                  <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                    <thead className="bg-[#0b1118] text-white">
                      <tr>
                        <th className="p-4 font-black uppercase">
                          Invoice #
                        </th>
                        <th className="p-4 font-black uppercase">Service</th>
                        <th className="p-4 font-black uppercase">Amount</th>
                        <th className="p-4 font-black uppercase">Due Date</th>
                        <th className="p-4 font-black uppercase">Status</th>
                        <th className="p-4 font-black uppercase">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoices.map((invoice, index) => (
                        <tr
                          key={`${invoice.invoiceNumber}-${index}`}
                          className="border-b border-gray-200 last:border-b-0"
                        >
                          <td className="p-4 font-bold">
                            {invoice.invoiceNumber || `INV-${index + 1}`}
                          </td>
                          <td className="p-4">
                            {invoice.service || "Apex Service"}
                          </td>
                          <td className="p-4 font-black text-[#c28f00]">
                            {invoice.amount || "$0.00"}
                          </td>
                          <td className="p-4">
                            {invoice.dueDate || "Not assigned"}
                          </td>
                          <td className="p-4">
                            <span
                              className={`rounded px-3 py-1 text-xs font-black uppercase ${
                                invoice.status === "Paid"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {invoice.status || "Pending"}
                            </span>
                          </td>
                          <td className="p-4">
                            {invoice.url ? (
                              <a
                                href={invoice.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-black uppercase text-[#c28f00]"
                              >
                                View
                              </a>
                            ) : invoice.paymentLink ? (
                              <a
                                href={invoice.paymentLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-black uppercase text-[#c28f00]"
                              >
                                Pay
                              </a>
                            ) : (
                              <span className="font-bold text-gray-400">
                                No Link
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-8 rounded border border-[#caa12a]/40 bg-[#f2efe4] p-5">
                <p className="text-sm font-bold text-black">
                  Invoice PDFs and receipts are only visible to the client they
                  are assigned to.
                </p>
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