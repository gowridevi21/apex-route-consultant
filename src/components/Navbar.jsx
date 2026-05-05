import { Link } from "react-router";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <Link to="/">
          <img src="/images/logo1.png" alt="Apex Route" className="h-12" />
        </Link>

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
              className="border-b-2 border-transparent pb-2 text-sm font-black uppercase tracking-wide text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              {name}
            </Link>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden border border-[#D4AF37] px-7 py-4 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black md:block"
        >
          Book Consultation
        </Link>
      </nav>
    </header>
  );
}