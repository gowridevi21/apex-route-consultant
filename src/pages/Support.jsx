import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
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
  Send,
  Clock,
} from "lucide-react";

export default function Support() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [clientName, setClientName] = useState("Client");
  const [tickets, setTickets] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    priority: "Medium",
    message: "",
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

        const cleanName = (data.fullName || user.displayName || "Client")
          .split("|")[0]
          .trim();

        setClientName(cleanName);
        setTickets(data.supportTickets || []);
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

  const handleSubmitTicket = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("Please sign in first.");
      return;
    }

    setSubmitting(true);

    try {
      const ticket = {
        subject: form.subject,
        priority: form.priority,
        message: form.message,
        status: "Open",
        createdAt: new Date().toISOString(),
      };

      await setDoc(
        doc(db, "users", user.uid),
        {
          supportTickets: arrayUnion(ticket),
        },
        { merge: true }
      );

      setTickets((prev) => [...prev, ticket]);

      setForm({
        subject: "",
        priority: "Medium",
        message: "",
      });

      alert("Support request submitted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to submit support request.");
    }

    setSubmitting(false);
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
        <p className="text-[#D4AF37]">Loading support...</p>
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
            Support
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Submit questions, requests, call notes, or support messages to Apex.
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
              <Link to="/support" className="text-[#D4AF37]">
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
                    name === "Support"
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
                Support Center
              </h2>

              <p className="mt-3 text-gray-600">
                Hi {clientName}, submit a request and Apex will review it.
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <form
                  onSubmit={handleSubmitTicket}
                  className="border border-gray-300 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-black">Submit Support Request</h3>

                  <div className="mt-5 space-y-4">
                    <input
                      required
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      placeholder="Subject"
                      className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
                    />

                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm({ ...form, priority: e.target.value })
                      }
                      className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>

                    <textarea
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Write your message here..."
                      rows="7"
                      className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#caa12a]"
                    ></textarea>

                    <button
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                    >
                      <Send size={16} />
                      {submitting ? "Submitting..." : "Submit Ticket"}
                    </button>
                  </div>
                </form>

                <div className="border border-gray-300 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black">Support Information</h3>

                  <div className="mt-5 space-y-4 text-sm">
                    <div>
                      <p className="font-black uppercase text-gray-500">
                        Business Hours
                      </p>
                      <p className="mt-1 font-bold text-black">
                        Monday - Friday
                      </p>
                      <p className="text-gray-600">9:00 AM - 5:00 PM EST</p>
                    </div>

                    <div>
                      <p className="font-black uppercase text-gray-500">
                        Email
                      </p>
                      <p className="mt-1 font-bold text-[#c28f00]">
                        ceo@apexrouteconsulting.com
                      </p>
                    </div>

                    <div>
                      <p className="font-black uppercase text-gray-500">
                        Response Time
                      </p>
                      <p className="mt-1 font-bold text-black">
                        Within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded border border-[#caa12a]/40 bg-[#f2efe4] p-4">
                    <p className="text-sm font-bold text-black">
                      For urgent scheduling or program questions, submit a High
                      priority ticket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border border-gray-300 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-black">Previous Tickets</h3>

                <div className="mt-5 space-y-3">
                  {tickets.length === 0 ? (
                    <div className="rounded border border-dashed border-gray-300 p-6 text-sm text-gray-500">
                      No support tickets found.
                    </div>
                  ) : (
                    tickets.map((ticket, index) => (
                      <div
                        key={`${ticket.subject}-${index}`}
                        className="border border-gray-200 p-4"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-black text-black">
                              {ticket.subject}
                            </p>

                            <p className="mt-1 text-sm text-gray-600">
                              {ticket.message}
                            </p>

                            {ticket.createdAt && (
                              <p className="mt-2 text-xs text-gray-400">
                                Submitted:{" "}
                                {new Date(
                                  ticket.createdAt
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span className="rounded bg-[#f2efe4] px-3 py-1 text-xs font-black uppercase text-[#c28f00]">
                              {ticket.priority}
                            </span>

                            <span className="inline-flex items-center gap-1 rounded bg-green-100 px-3 py-1 text-xs font-black uppercase text-green-600">
                              <Clock size={12} />
                              {ticket.status || "Open"}
                            </span>
                          </div>
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
                  to="/booking"
                  className="border border-[#caa12a] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-[#caa12a]"
                >
                  Book Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}