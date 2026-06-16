import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ArrowLeft, LogOut, MessageSquare, Save } from "lucide-react";

export default function AdminSupport() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

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

      const allTickets = [];

      usersSnap.docs.forEach((userDoc) => {
        const data = userDoc.data();
        const clientName = (
          data.fullName ||
          data.documents?.fullName ||
          "Client"
        )
          .split("|")[0]
          .trim();

        const clientTickets = data.supportTickets || [];

        clientTickets.forEach((ticket, index) => {
          allTickets.push({
            ...ticket,
            ticketIndex: index,
            clientId: userDoc.id,
            clientName,
            clientEmail: data.email || data.documents?.email || "",
          });
        });
      });

      setTickets(allTickets);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  const updateTicketStatus = async (ticketToUpdate, newStatus) => {
    const userRef = doc(db, "users", ticketToUpdate.clientId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();
    const currentTickets = data.supportTickets || [];

    const updatedTickets = currentTickets.map((ticket, index) => {
      if (index === ticketToUpdate.ticketIndex) {
        return {
          ...ticket,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        };
      }

      return ticket;
    });

    await updateDoc(userRef, {
      supportTickets: updatedTickets,
    });

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.clientId === ticketToUpdate.clientId &&
        ticket.ticketIndex === ticketToUpdate.ticketIndex
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );

    alert("Ticket status updated.");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-4 pt-8 text-white md:px-8">
        <p className="text-[#D4AF37]">Loading support center...</p>
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
              Admin Support Center
            </h1>

            <p className="mt-3 text-white/70">
              View and manage support requests submitted by clients.
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

        <div className="rounded-md border border-[#D4AF37]/30 bg-white p-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-[#caa12a]" size={28} />
            <h2 className="text-2xl font-black text-black">
              Support Tickets
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            {tickets.length === 0 ? (
              <div className="rounded border border-dashed border-gray-300 p-6 text-sm text-gray-500">
                No support tickets found.
              </div>
            ) : (
              tickets.map((ticket, index) => (
                <div
                  key={`${ticket.clientId}-${ticket.ticketIndex}-${index}`}
                  className="border border-gray-300 bg-[#f7f7f7] p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-lg font-black text-black">
                        {ticket.subject || "Support Request"}
                      </p>

                      <p className="mt-2 text-sm text-gray-600">
                        {ticket.message || "No message added."}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm md:grid-cols-2">
                        <p>
                          <span className="font-black">Client:</span>{" "}
                          {ticket.clientName}
                        </p>

                        <p>
                          <span className="font-black">Email:</span>{" "}
                          {ticket.clientEmail || "Not provided"}
                        </p>

                        <p>
                          <span className="font-black">Priority:</span>{" "}
                          {ticket.priority || "Medium"}
                        </p>

                        <p>
                          <span className="font-black">Status:</span>{" "}
                          {ticket.status || "Open"}
                        </p>

                        {ticket.createdAt && (
                          <p>
                            <span className="font-black">Submitted:</span>{" "}
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateTicketStatus(ticket, "Open")}
                        className="border border-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black hover:bg-[#caa12a]"
                      >
                        Open
                      </button>

                      <button
                        onClick={() =>
                          updateTicketStatus(ticket, "In Progress")
                        }
                        className="border border-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black hover:bg-[#caa12a]"
                      >
                        In Progress
                      </button>

                      <button
                        onClick={() => updateTicketStatus(ticket, "Closed")}
                        className="inline-flex items-center gap-2 bg-[#caa12a] px-4 py-2 text-xs font-black uppercase text-black hover:bg-black hover:text-white"
                      >
                        <Save size={14} />
                        Closed
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}