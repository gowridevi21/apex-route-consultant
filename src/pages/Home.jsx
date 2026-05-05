import {
  ClipboardCheck,
  Clock,
  DollarSign,
  Route,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  const benefits = [
    [TrendingUp, "Maximize Profit", "Increase revenue and reduce deadhead."],
    [Shield, "Reduce Risk", "Stay compliant and protect your business."],
    [Clock, "Save Time", "Streamline operations and load planning."],
    [Users, "Real Support", "Access real carriers who understand."],
  ];

  const services = [
    [Route, "Route & Lane Strategy", "Find the most profitable lanes and build efficient routes that maximize your miles."],
    [DollarSign, "Financial Consulting", "Improve cash flow, lower costs, and increase your bottom line."],
    [ClipboardCheck, "Compliance Support", "Stay DOT compliant and audit-ready with expert guidance."],
    [Users, "Dispatch & Operations", "Optimize load planning, reduce downtime, and run a smoother operation."],
  ];

  return (
    <main className="bg-[#050505]">
      {/* HERO */}
      <section className="relative min-h-[760px] bg-[url('/images/truck2.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/20"></div>

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-8 pt-28">
          <div className="max-w-3xl">
            <p className="mb-5 font-black uppercase tracking-wide text-[#D4AF37]">
              Freight Consulting Built
            </p>

            <h1 className="heading-xl uppercase text-white">
              By Carriers.
              <br />
              <span className="text-[#D4AF37]">For Carriers.</span>
            </h1>

            <p className="mt-7 text-2xl font-semibold text-white">
              Real Strategies. Real Experience.
              <br />
              Real Results.
            </p>

            <div className="mt-9 flex gap-5">
              <Link
                to="/contact"
                className="bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white"
              >
                Book Consultation
              </Link>

              <Link
                to="/services"
                className="border border-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-white hover:bg-[#D4AF37] hover:text-black"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto grid max-w-7xl gap-8 border-b border-white/10 px-8 py-12 md:grid-cols-4">
        {benefits.map(([Icon, title, text]) => (
          <div key={title} className="border-r border-white/20 text-center last:border-r-0">
            <Icon className="mx-auto mb-4 text-[#D4AF37]" size={44} />
            <h3 className="font-black uppercase text-white">{title}</h3>
            <p className="mx-auto mt-2 max-w-[180px] text-sm text-white/70">{text}</p>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section className="mx-auto grid max-w-7xl gap-14 border-b border-white/10 px-8 py-16 md:grid-cols-2">
        <div>
          <p className="font-black uppercase text-[#D4AF37]">About Us</p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
            We’ve Been in the Seat.
            <br />
            <span className="text-[#D4AF37]">Now We’re in Your Corner.</span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Apex Route Consultant Group was founded by carriers who’ve lived the
            grind. We know the challenges because we’ve faced them ourselves.
            Now, we help carriers across the country build stronger, more
            profitable businesses.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-block border border-[#D4AF37] px-7 py-4 text-sm font-black uppercase text-white hover:bg-[#D4AF37] hover:text-black"
          >
            Learn More About Us
          </Link>
        </div>

        <img
          src="/images/twotrucks.jpg"
          alt="Apex trucks"
          className="h-[360px] w-full rounded-lg object-cover"
        />
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl border-b border-white/10 px-8 py-16 text-center">
        <p className="font-black uppercase text-[#D4AF37]">Our Services</p>

        <h2 className="mt-3 text-4xl font-black text-white">
          Solutions That Drive Results
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {services.map(([Icon, title, text]) => (
            <div
              key={title}
              className="rounded-md border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#D4AF37]"
            >
              <Icon className="mx-auto mb-5 text-[#D4AF37]" size={54} />
              <h3 className="text-lg font-black uppercase text-white">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{text}</p>
              <div className="mx-auto mt-7 h-[2px] w-24 bg-[#D4AF37]"></div>
            </div>
          ))}
        </div>

        <Link
          to="/services"
          className="mt-8 inline-block border border-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-white hover:bg-[#D4AF37] hover:text-black"
        >
          View All Services
        </Link>
      </section>

      {/* CTA */}
      <section className="relative bg-[url('/images/truck1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20"></div>

        <div className="relative mx-auto max-w-7xl px-8 py-16">
          <p className="font-black uppercase text-[#D4AF37]">Ready to Level Up?</p>

          <h2 className="mt-3 text-5xl font-black leading-tight text-white">
            Let’s Build Your
            <br />
            <span className="text-[#D4AF37]">Next Successful Mile.</span>
          </h2>

          <p className="mt-5 max-w-xl subtext">
            Book a free consultation and see how the right strategy can change
            your whole business.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-block bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white"
          >
            Book Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}