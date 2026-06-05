import { Link } from "react-router";
import {
  FileText,
  TrendingUp,
  CalendarCheck,
  MessageSquare,
  Download,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function Dashboard() {
  const clientName = "Client";

  const documents = [
    {
      title: "Mentorship Agreement.pdf",
      category: "Agreements",
      status: "Available",
    },
    {
      title: "Operations Setup Checklist.pdf",
      category: "Systems",
      status: "Available",
    },
    {
      title: "Apex Money System.pdf",
      category: "Money Tools",
      status: "Available",
    },
    {
      title: "Progress Report.pdf",
      category: "Progress",
      status: "Available",
    },
  ];

  const progress = [
    ["Phase 1", "Complete"],
    ["Phase 2", "Active"],
    ["Phase 3", "Locked"],
  ];

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="font-black uppercase text-[#D4AF37]">
            Apex Client Command Center
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase md:text-6xl">
            Welcome back,{" "}
            <span className="text-[#D4AF37]">{clientName}</span>
          </h1>

          <p className="mt-4 max-w-3xl text-white/70">
            Your purchases, progress reports, action steps, resources, and
            support are organized in one place.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid gap-5 md:grid-cols-4">
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <FileText className="text-[#D4AF37]" size={34} />
            <p className="mt-5 text-sm uppercase text-white/60">
              Purchased Systems
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">4 Files</h2>
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <TrendingUp className="text-[#D4AF37]" size={34} />
            <p className="mt-5 text-sm uppercase text-white/60">
              Progress Score
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              62% Complete
            </h2>
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <CalendarCheck className="text-[#D4AF37]" size={34} />
            <p className="mt-5 text-sm uppercase text-white/60">Next Step</p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Book Weekly Call
            </h2>
          </div>

          <div className="rounded-md border border-white/10 bg-white/[0.04] p-6">
            <MessageSquare className="text-[#D4AF37]" size={34} />
            <p className="mt-5 text-sm uppercase text-white/60">Support</p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Contact Apex
            </h2>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* DOCUMENT VAULT */}
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-black uppercase text-[#D4AF37]">
                  Client Vault
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase text-white">
                  Recent Purchased Documents
                </h2>
              </div>

              <Link
                to="/my-vault"
                className="border border-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
              >
                View All
              </Link>
            </div>

            <div className="mt-8 space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.title}
                  className="flex flex-col gap-4 rounded border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-1 text-[#D4AF37]" size={22} />

                    <div>
                      <h3 className="font-bold text-white">{doc.title}</h3>
                      <p className="mt-1 text-sm text-white/60">
                        {doc.category} • {doc.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="text-sm font-black uppercase text-[#D4AF37]">
                      View
                    </button>

                    <button className="inline-flex items-center gap-1 text-sm font-black uppercase text-[#D4AF37]">
                      <Download size={15} />
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROGRESS TIMELINE */}
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-8">
            <p className="font-black uppercase text-[#D4AF37]">
              Progress Timeline
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase text-white">
              Program Status
            </h2>

            <div className="mt-8 space-y-5">
              {progress.map(([phase, status]) => (
                <div
                  key={phase}
                  className="flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <div className="flex items-center gap-3">
                    {status === "Locked" ? (
                      <Lock className="text-white/40" size={20} />
                    ) : (
                      <CheckCircle className="text-[#D4AF37]" size={20} />
                    )}

                    <span className="font-bold text-white">{phase}</span>
                  </div>

                  <span
                    className={
                      status === "Locked"
                        ? "text-sm font-bold text-white/40"
                        : "text-sm font-bold text-[#D4AF37]"
                    }
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded bg-black/40 p-5">
              <p className="text-sm leading-relaxed text-white/70">
                Current Phase:{" "}
                <span className="font-bold text-[#D4AF37]">
                  Phase 2 - Operational Training Dashboard
                </span>
              </p>

              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Next milestone: Complete insurance quote, load board training,
                and compliance folder setup.
              </p>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Link
            to="/my-vault"
            className="rounded-md border border-white/10 bg-white/[0.04] p-6 text-center font-black uppercase text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            My Vault
          </Link>

          <Link
            to="/progress"
            className="rounded-md border border-white/10 bg-white/[0.04] p-6 text-center font-black uppercase text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            Progress
          </Link>

          <Link
            to="/training"
            className="rounded-md border border-white/10 bg-white/[0.04] p-6 text-center font-black uppercase text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            Training
          </Link>

          <Link
            to="/support"
            className="rounded-md border border-white/10 bg-white/[0.04] p-6 text-center font-black uppercase text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            Support
          </Link>
        </div>
      </section>
    </main>
  );
}