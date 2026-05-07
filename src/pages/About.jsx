import {
  Award,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";

export default function About() {
  return (
    <main className="bg-[#050505]">
      {/* HERO */}
      <section className="relative min-h-[520px] bg-[url('/images/twotrucktree.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20"></div>

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-8 pt-28">
          <div className="max-w-2xl">
            <p className="mb-4 font-black uppercase text-[#D4AF37]">
              About Us
            </p>

            <h1 className="heading-xl uppercase text-white">
              Built by Carriers.
              <br />
              <span className="text-[#D4AF37]">For Carriers.</span>
            </h1>

            <p className="mt-6 subtext">
              Apex Route Consultant Group was founded by carriers who’ve lived
              the grind. We know the challenges because we’ve faced them
              ourselves.
            </p>

            <Link
              to="/contact"
              className="mt-8 inline-block border border-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl gap-16 border-b border-white/10 px-8 py-16 md:grid-cols-2">
        <div>
          <p className="font-black uppercase text-[#D4AF37]">Our Story</p>

          <h2 className="mt-4 text-4xl font-black uppercase leading-tight text-white">
            From the Driver’s Seat
            <br />
            to <span className="text-[#D4AF37]">Your Success.</span>
          </h2>

          <p className="mt-6 leading-relaxed text-white/75">
            We built Apex Route Consultant Group with one goal in mind: to help
            carriers run smarter, more profitable businesses.
          </p>

          <p className="mt-5 leading-relaxed text-white/75">
            After years on the road and behind the wheel, we saw the gaps in the
            industry — routes that didn’t make sense, loads that left money on
            the table, and operations that could be running smoother.
          </p>

          <p className="mt-5 leading-relaxed text-white/75">
            Now, we use that real-world experience to give carriers the
            strategies, tools, and support they need to succeed.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-block border border-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
          >
            Meet Our Team
          </Link>
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.05] p-10">
          {[
            [Award, "Real Experience", "We’ve been in the seat. We understand the daily challenges carriers face."],
            [Target, "Proven Strategies", "Our strategies are tested in the real world and built for real results."],
            [TrendingUp, "Measurable Results", "We focus on what matters — more profit, less stress, and long-term growth."],
            [Handshake, "Carrier First", "Everything we do is designed to help carriers win."],
          ].map(([Icon, title, text]) => (
            <div
              key={title}
              className="flex gap-6 border-b border-white/10 py-6 last:border-b-0"
            >
              <Icon className="min-w-10 text-[#D4AF37]" size={42} />
              <div>
                <h3 className="font-black uppercase text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl border-b border-white/10 px-8 py-16 text-center">
        <p className="font-black uppercase text-[#D4AF37]">Our Values</p>

        <h2 className="mt-3 text-4xl font-black uppercase text-white">
          The Principles That <span className="text-[#D4AF37]">Drive Us</span>
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {[
            [ShieldCheck, "Integrity", "We do what’s right, always. Honesty and transparency are the foundation of everything we do."],
            [Users, "Accountability", "We take ownership of our work and deliver on our promises because your success is our success."],
            [Lightbulb, "Innovation", "We’re always looking for better ways to solve problems and help carriers stay ahead."],
            [Award, "Commitment", "We’re committed to helping carriers build stronger businesses and better futures."],
          ].map(([Icon, title, text]) => (
            <div key={title} className="border-r border-white/20 px-6 last:border-r-0">
              <Icon className="mx-auto mb-5 text-[#D4AF37]" size={44} />
              <h3 className="font-black uppercase text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[url('/images/ytratio.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-8 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase text-white">
              Let’s Build Your Next Successful Mile.
            </h2>
            <p className="mt-3 text-white/80">
              Book a free consultation and see how the right strategy can change
              your whole business.
            </p>
          </div>

        <Link
          to="/contact"
          className="bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black flex items-center gap-2"
        >
          <FaCalendarAlt size={16} />
          Book Consultation
        </Link>
        </div>
      </section>
    </main>
  );
}