import { Link } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        
        {/*  LOGO + TEXT */}
        <Link to="/" className="flex items-center gap-3">
          {/* Logo Image */}
          <img
            src="/images/logo1.png"  //  MUST match your file exactly
            alt="Apex Logo"
            className="h-15 w-auto"
          />

          {/* Text */}
          <div className="leading-tight">
            <h1 className="text-white font-extrabold text-lg tracking-widest">
              A  P  E  X
            </h1>
            <p className="text-[#D4AF37] text-[12px] tracking-wide">
              ROUTE CONSULTANT GROUP
            </p>
          </div>
        </Link>

        {/*  NAV LINKS */}
        <div className="hidden items-center gap-10 md:flex">
          {[
            ["Home", "/"],
            ["About", "/about"],
            ["Services", "/services"],
            ["Resources", "/resources"],
            ["Contact", "/contact"],
          ].map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="border-b-2 border-transparent pb-2 text-sm font-black uppercase tracking-wide text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
            >
              {name}
            </Link>
          ))}
        </div>

        {/*  BOOK CONSULTATION BUTTON */}
        <Link
          to="/contact"
          className="flex items-center gap-2 border border-[#D4AF37] px-5 py-2 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
        >
          <FaCalendarAlt />
          Book Consultation
        </Link>

      </nav>
    </header>
  );
}