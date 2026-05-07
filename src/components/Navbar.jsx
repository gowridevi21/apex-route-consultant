import { useState } from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Home", "/"],
    ["About", "/about"],
    ["Services", "/services"],
    ["Resources", "/resources"],
    ["Contact", "/contact"],
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <img
            src="/images/logo1.png"
            alt="Apex Logo"
            className="h-10 w-auto md:h-14"
          />

          <div className="leading-tight">
            <h1 className="text-sm font-extrabold tracking-widest text-white md:text-lg">
              A P E X
            </h1>
            <p className="text-[8px] tracking-wide text-[#D4AF37] md:text-[12px]">
              ROUTE CONSULTANT GROUP
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="border-b-2 border-transparent pb-2 text-sm font-black uppercase tracking-wide text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              {name}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden items-center gap-2 border border-[#D4AF37] px-5 py-2 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black md:flex"
        >
          <FaCalendarAlt />
          Book Consultation
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-[#D4AF37] md:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-black px-6 py-5 md:hidden">
          {links.map(([name, path]) => (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-black uppercase text-white"
            >
              {name}
            </Link>
          ))}

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center gap-2 bg-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-black"
          >
            <FaCalendarAlt />
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  );
}