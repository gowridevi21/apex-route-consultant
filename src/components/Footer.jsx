import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black px-8 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
        
        {/* LOGO + TEXT + SOCIAL */}
        <div className="flex flex-col items-start gap-4">
          <img
            src="/images/logo2.png"  // match your file exactly
            alt="Apex Route"
            className="h-16 w-auto"
          />

          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            Freight consulting built by carriers, for carriers. Helping you run
            smarter, earn more, and grow stronger.
          </p>

          <div className="mt-4 flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
              <FaFacebookF size={18} />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
              <FaInstagram size={18} />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
              <FaYoutube size={18} />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
              <FaLinkedinIn size={18} />
            </a>

            <a href="https://tiktok.com" target="_blank" rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition">
              <FaTiktok size={18} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
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

        {/* SERVICES */}
        <div>
          <h3 className="font-black uppercase text-[#D4AF37]">Services</h3>
          <p className="mt-4 text-sm leading-8 text-white/70">
            Route & Lane Strategy<br />
            Financial Consulting<br />
            Compliance Support<br />
            Dispatch & Operations
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-black uppercase text-[#D4AF37]">Contact Us</h3>

          <p className="mt-4 flex items-center gap-3 text-sm text-white/70">
            <Phone size={17} className="text-[#D4AF37]" />
            603-713-7917
          </p>

          <p className="mt-4 flex items-center gap-3 text-sm text-white/70">
            <Mail size={17} className="text-[#D4AF37]" />
            ceo@apexrouteconsulting.com
          </p>

          <p className="mt-4 flex items-center gap-3 text-sm text-white/70">
            <MapPin size={17} className="text-[#D4AF37]" />
            Serving Carriers Nationwide
          </p>
        </div>
      </div>

      {/*  COPYRIGHT */}
      <p className="mt-6 text-center text-xs text-white/50">
        © 2026 Apex Route Consultant Group. All Rights Reserved.
      </p>
    </footer>
  );
}