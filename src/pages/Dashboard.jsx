import { Link } from "react-router";

export default function Dashboard() {
  const documents = [
    "Mentorship Agreement.pdf",
    "Operations Setup Checklist.pdf",
    "Apex Money System.pdf",
    "Progress Report.pdf",
  ];

  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-32 text-black">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-black">Apex Client Command Center</h1>

        <p className="mt-3 max-w-4xl text-lg">
          Your purchases, progress reports, action steps and resources are
          organized here.
        </p>

        <div className="mt-8 overflow-hidden border border-gray-300">
          {/* TOP BAR */}
          <div className="flex items-center justify-between bg-[#0b1118] px-8 py-5 text-white">
            <h2 className="text-xl font-black uppercase">
              Apex Client Portal
            </h2>

            <div className="text-sm">
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

          <div className="grid md:grid-cols-[230px_1fr]">
            {/* SIDEBAR */}
            <aside className="bg-[#eee9dc] p-5">
              {[
                ["Dashboard", "/dashboard"],
                ["My Purchases", "/my-vault"],
                ["Progress", "/progress"],
                ["Training", "/training"],
                ["Invoices", "/invoices"],
                ["Messages", "/support"],
              ].map(([name, path], index) => (
                <Link
                  key={name}
                  to={path}
                  className={`mb-3 block px-5 py-4 text-sm font-bold ${
                    index === 0
                      ? "bg-[#caa12a] text-black"
                      : "text-black hover:bg-[#d8cfae]"
                  }`}
                >
                  {name}
                </Link>
              ))}
            </aside>

            {/* CONTENT */}
            <div className="bg-[#f7f7f7] p-8">
              <h2 className="text-3xl font-black">
                Welcome back, Client Name
              </h2>

              <p className="mt-3 text-gray-600">
                Your purchases, progress reports, action steps and resources are
                organized here.
              </p>

              {/* CARDS */}
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                <div className="border border-gray-300 bg-white p-5">
                  <p className="font-black">Purchased Systems</p>
                  <p className="mt-2 text-xl font-black text-[#c28f00]">
                    4 files
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5">
                  <p className="font-black">Progress Score</p>
                  <p className="mt-2 text-xl font-black text-[#c28f00]">
                    62% complete
                  </p>
                </div>

                <div className="border border-gray-300 bg-white p-5">
                  <p className="font-black">Next Step</p>
                  <p className="mt-2 text-xl font-black text-[#c28f00]">
                    Book weekly call
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
                {/* DOCUMENTS */}
                <div className="border border-gray-300 bg-white p-6">
                  <h3 className="text-xl font-black">
                    Recent Purchased Documents
                  </h3>

                  <div className="mt-5 space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-6 w-6 border-2 border-[#caa12a]"></span>
                          <span className="text-sm">{doc}</span>
                        </div>

                        <div className="text-sm font-bold text-[#c28f00]">
                          View | Save
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="border border-gray-300 bg-white p-6">
                  <h3 className="text-xl font-black">Progress Timeline</h3>

                  <div className="mt-6 space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="h-5 w-5 bg-[#caa12a]"></span>
                      <span>Phase 1 - Complete</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="h-5 w-5 bg-[#caa12a]"></span>
                      <span>Phase 2 - Active</span>
                    </div>

                    <div className="flex items-center gap-4 text-gray-500">
                      <span className="h-5 w-5 bg-gray-300"></span>
                      <span>Phase 3 - Locked</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="mt-8 grid gap-4 md:grid-cols-4">
                <Link
                  to="/my-vault"
                  className="bg-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black"
                >
                  My Vault
                </Link>

                <Link
                  to="/progress"
                  className="border border-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black"
                >
                  Progress
                </Link>

                <Link
                  to="/training"
                  className="border border-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black"
                >
                  Training
                </Link>

                <Link
                  to="/support"
                  className="border border-[#caa12a] px-5 py-4 text-center text-sm font-black uppercase text-black"
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