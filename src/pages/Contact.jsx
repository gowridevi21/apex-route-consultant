import {
  CalendarDays,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

export default function Contact() {
  return (
    <main className="bg-[#050505]">
      {/* HERO */}
      <section className="relative min-h-[560px] bg-[url('/images/truck2.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20"></div>

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-8 pt-28">
          <div className="max-w-3xl">
            <p className="font-black uppercase text-[#D4AF37]">Contact Us</p>

            <h1 className="mt-4 text-5xl font-black uppercase leading-tight text-white md:text-7xl">
              Let’s Build Your
              <br />
              <span className="text-[#D4AF37]">
                Next Successful Mile.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Have a question or ready to take your business to the next level?
              We’re here to help.
            </p>

            <div className="mt-10 grid max-w-3xl gap-8 md:grid-cols-3">
              {[
                [
                  Headphones,
                  "Real People",
                  "Talk to a real expert who understands your business.",
                ],
                [
                  Clock,
                  "Fast Response",
                  "We respond quickly because your time matters.",
                ],
                [
                  ShieldCheck,
                  "Trusted by Carriers",
                  "Built by carriers, for carriers — backed by results.",
                ],
              ].map(([Icon, title, text]) => (
                <div key={title}>
                  <Icon className="mb-4 text-[#D4AF37]" size={38} />
                  <h3 className="font-black uppercase text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT AREA */}
      <section className="mx-auto grid max-w-7xl gap-6 px-8 py-16 md:grid-cols-[1.2fr_0.9fr]">
        <form className="rounded-md border border-white/10 bg-white/[0.03] p-8">
          <p className="font-black uppercase text-[#D4AF37]">
            Send Us a Message
          </p>

          <h2 className="mt-3 text-3xl font-black text-white">
            We’d Love to Hear From You
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              className="w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
              placeholder="Full Name"
            />
            <input
              className="w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
              placeholder="Email Address"
            />
            <input
              className="w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
              placeholder="Phone Number"
            />
            <input
              className="w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
              placeholder="Company Name (Optional)"
            />
          </div>

          <input
            className="mt-4 w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
            placeholder="Subject"
          />

          <textarea
            className="mt-4 h-36 w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
            placeholder="How can we help you?"
          />

          <button
            type="button"
            className="mt-5 bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white"
          >
            Send Message
          </button>

          <p className="mt-4 text-xs text-white/60">
            🔒 Your information is secure and will never be shared.
          </p>
        </form>

        <div className="rounded-md border border-white/10 bg-white/[0.03]">
          <div className="p-8">
            <p className="font-black uppercase text-[#D4AF37]">Get in Touch</p>

            <h2 className="mt-3 text-3xl font-black text-white">
              Contact Information
            </h2>

            <div className="mt-8 space-y-7">
              <div className="flex gap-5">
                <Phone className="text-[#D4AF37]" size={34} />
                <div>
                  <h3 className="font-black text-white">Phone</h3>
                  <p className="text-white/75">603-713-7917</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Mail className="text-[#D4AF37]" size={34} />
                <div>
                  <h3 className="font-black text-white">Email</h3>
                  <p className="text-white/75">
                    Ceo@apexrouteconsulting.com
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <MapPin className="text-[#D4AF37]" size={34} />
                <div>
                  <h3 className="font-black text-white">Service Area</h3>
                  <p className="text-white/75">Serving Carriers Nationwide</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock className="text-[#D4AF37]" size={34} />
                <div>
                  <h3 className="font-black text-white">Business Hours</h3>
                  <p className="text-white/75">
                    Monday – Friday | 8:00 AM – 6:00 PM CST
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-8">
            <p className="font-black uppercase text-[#D4AF37]">Follow Us</p>
            <div className="mt-5 flex gap-4">
              {["f", "◎", "▶", "in"].map((item) => (
                <span
                  key={item}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 font-black text-[#D4AF37]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[url('/images/truck1.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-8 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-6">
            <CalendarDays className="min-w-14 text-[#D4AF37]" size={56} />
            <div>
              <p className="font-black uppercase text-[#D4AF37]">
                Book a Consultation
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-2 text-white/75">
                Schedule a free consultation and see how the right strategy can
                change your whole business.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="border border-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-white hover:bg-[#D4AF37] hover:text-black"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}