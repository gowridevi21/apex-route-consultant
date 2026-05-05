import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black px-8 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
        <div>
          <img src="/images/logo1.png" alt="Apex Route" className="h-14" />
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Freight consulting built by carriers, for carriers. Helping you run
            smarter, earn more, and grow stronger.
          </p>
        </div>

        <div>
          <h3 className="font-black uppercase text-[#D4AF37]">Quick Links</h3>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <Link to="/" className="block hover:text-[#D4AF37]">Home</Link>
            <Link to="/about" className="block hover:text-[#D4AF37]">About</Link>
            <Link to="/services" className="block hover:text-[#D4AF37]">Services</Link>
            <Link to="/resources" className="block hover:text-[#D4AF37]">Resources</Link>
            <Link to="/contact" className="block hover:text-[#D4AF37]">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black uppercase text-[#D4AF37]">Services</h3>
          <p className="mt-4 space-y-2 text-sm leading-8 text-white/70">
            Route & Lane Strategy<br />
            Financial Consulting<br />
            Compliance Support<br />
            Dispatch & Operations
          </p>
        </div>

        <div>
          <h3 className="font-black uppercase text-[#D4AF37]">Contact Us</h3>
          <p className="mt-4 flex gap-3 text-sm text-white/70">
            <Phone size={17} className="text-[#D4AF37]" /> 603-713-7917
          </p>
          <p className="mt-4 flex gap-3 text-sm text-white/70">
            <Mail size={17} className="text-[#D4AF37]" /> Ceo@apexrouteconsulting.com
          </p>
          <p className="mt-4 flex gap-3 text-sm text-white/70">
            <MapPin size={17} className="text-[#D4AF37]" /> Serving Carriers Nationwide
          </p>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-white/50">
        © 2026 Apex Route Consultant Group. All Rights Reserved.
      </p>
    </footer>
  );
}