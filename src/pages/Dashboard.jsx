import { Link } from "react-router";
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

export default function Dashboard() {
  const documents = [
    {
      name: "Mentorship Agreement.pdf",
      type: "Agreement",
    },
    {
      name: "Operations Setup Checklist.pdf",
      type: "Checklist",
    },
    {
      name: "Apex Money System.pdf",
      type: "Money System",
    },
    {
      name: "Progress Report.pdf",
      type: "Progress",
    },
  ];

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

  return (
    <main className="min-h-screen bg-[#050505] px-4 pb-16 pt-28 text-black md:px-8">
      <section className="mx-auto max-w-7xl">
        {/* PAGE INTRO */}
        <div className="mb-8">
          <p className="font-black uppercase tracking-wide text-[#D4AF37]">
            Apex Client Portal
          </p>

          <h1 className="mt-2 text-3xl font-black uppercase text-white md:text-5xl">
            Apex Client Command Center
          </h1>

          <p className="mt-3 max-w-3xl text-white/70">
            Your purchases, progress reports, action steps, training resources, uploads, invoices, and support are organized in one secure place.
          </p>
        </div>

        {/* PORTAL BOX */}
        <div className="overflow-hidden rounded-md border border-[#D4AF37]/30 bg-white shadow-2xl">
          {/* TOP BAR */}
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
              <Link to="/signin" className="hover:text-[#D4AF37]">
                Logout
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-[260px_1fr]">
            {/* SIDEBAR */}
            <aside className="bg-[#eee9dc] p-5">
              {sidebarLinks.map(([name, path, Icon], index) => (
                <Link
                  key={name}
                  to={path}
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
            </aside>

            {/* CONTENT */}
            <div className="bg-[#f7f7f7] p-6 md:p-8">
              <h2 className="text-3xl font-black text-black">
                Welcome back, Client Name
              </h2>

              <p className="mt-3 text-gray-600">
                Your purchases, progress reports, action steps, and resources
                are organized here.
              </p>

              {/* CARDS */}
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Purchased Systems
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#c28f00]">
                    4 files
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Progress Score
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#c28f00]">
                    62% complete
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-500">
                    Next Step
                  </p>
                  <p className="mt-2 text-2xl font-black text-[#c28f00]">
                    Book weekly call
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
                {/* DOCUMENTS */}
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
                    {documents.map((doc) => (
                      <div
                        key={doc.name}
                        className="flex flex-col gap-3 border-b border-gray-200 pb-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center border-2 border-[#caa12a]">
                            <FileText size={15} className="text-[#caa12a]" />
                          </span>

                          <div>
                            <p className="text-sm font-bold">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.type}</p>
                          </div>
                        </div>

                        <div className="text-sm font-bold text-[#c28f00]">
                          View | Save
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="border border-gray-300 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black">Progress Timeline</h3>

                  <div className="mt-6 space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="h-5 w-5 bg-[#caa12a]"></span>
                      <span className="font-bold">Phase 1 - Complete</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="h-5 w-5 bg-[#caa12a]"></span>
                      <span className="font-bold">Phase 2 - Active</span>
                    </div>

                    <div className="flex items-center gap-4 text-gray-500">
                      <span className="flex h-5 w-5 items-center justify-center bg-gray-300">
                        <Lock size={13} />
                      </span>
                      <span>Phase 3 - Locked</span>
                    </div>
                  </div>

                  <div className="mt-8 border-l-4 border-[#caa12a] bg-[#f2efe4] p-4">
                    <p className="text-sm font-bold text-black">
                      Current Phase
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      Phase 2 - Operational Training Dashboard
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="mt-8 grid gap-4 md:grid-cols-4">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}