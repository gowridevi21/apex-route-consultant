import { useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Receipt,
  TrendingUp,
  UploadCloud,
  User,
  Video,
  X,
} from "lucide-react";

export default function PortalLayout({
  activePage,
  children,
  handleLogout,
  showAdmin = false,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {sidebarLinks.map(([name, path, Icon]) => (
            <Link
              key={name}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`mb-3 flex items-center gap-3 px-5 py-4 text-sm font-black uppercase transition ${
                name === activePage
                  ? "bg-[#caa12a] text-black"
                  : "text-black hover:bg-[#d8cfae]"
              }`}
            >
              <Icon size={18} />
              {name}
            </Link>
          ))}

          {showAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="mb-3 flex items-center gap-3 bg-black px-5 py-4 text-sm font-black uppercase text-[#caa12a] transition hover:bg-[#caa12a] hover:text-black"
            >
              <LogOut size={18} />
              Admin
            </Link>
          )}
        </aside>

        <div className="bg-[#f7f7f7] p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}