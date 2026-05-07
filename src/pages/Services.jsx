import {
  ClipboardCheck,
  DollarSign,
  Route,
  Truck,
} from "lucide-react";
import { Link } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";
export default function Services() {
  const services = [
    [Route, "Route & Lane Strategy", "We analyze market data to find the most profitable lanes and build efficient routes that maximize your miles."],
    [DollarSign, "Financial Consulting", "Improve cash flow, lower costs, and increase your bottom line with proven financial strategies."],
    [ClipboardCheck, "Compliance Support", "Stay DOT compliant and audit-ready with our expert guidance and documentation support."],
    [Truck, "Dispatch & Operations", "Optimize load planning, reduce downtime, and run a smoother, more efficient operation."],
  ];

  const process = [
    ["1", "Discover", "We learn about your business, goals, and challenges to identify opportunities."],
    ["2", "Strategize", "We develop a customized plan tailored to your operation and objectives."],
    ["3", "Implement", "We put the plan into action with tools, support, and clear execution steps."],
    ["4", "Grow", "We track results, optimize performance, and help you scale with confidence."],
  ];

  return (
    <main className="bg-[#050505]">
      <section className="relative min-h-[430px] bg-[url('/images/rtruck.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20"></div>

        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-8 pt-28">
          <div className="max-w-2xl">
            <p className="font-black uppercase text-[#D4AF37]">Services</p>

            <h1 className="mt-4 text-5xl font-black uppercase leading-tight text-white md:text-7xl">
              Solutions That
              <br />
              <span className="text-[#D4AF37]">Drive Results.</span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-white/80">
              Strategic consulting and hands-on support to help carriers run
              smarter, more profitable businesses.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-8 py-16 text-center">
        <p className="font-black uppercase text-[#D4AF37]">Our Services</p>

        <h2 className="mt-3 text-4xl font-black text-white">
          How We Help Carriers Win
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {services.map(([Icon, title, text]) => (
            <div
              key={title}
              className="rounded-md border border-white/10 bg-white/[0.04] p-8 transition hover:border-[#D4AF37]"
            >
              <Icon className="mx-auto mb-5 text-[#D4AF37]" size={56} />
              <h3 className="text-lg font-black uppercase text-white">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{text}</p>

              <Link
                to="/contact"
                className="mt-7 inline-block text-sm font-black uppercase text-[#D4AF37]"
              >
                Learn More ›
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-8 py-16 text-center">
        <p className="font-black uppercase text-[#D4AF37]">Our Process</p>

        <h2 className="mt-3 text-4xl font-black text-white">
          A Proven Process That Delivers
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {process.map(([num, title, text]) => (
            <div key={num} className="relative px-5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37] text-2xl font-black text-[#D4AF37]">
                {num}
              </div>

              <h3 className="mt-5 font-black uppercase text-white">{title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-[url('/images/truck2.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>

        <div className="relative mx-auto max-w-7xl px-8 py-16">
          <h2 className="text-4xl font-black uppercase text-white">
            Ready to Take <span className="text-[#D4AF37]">Your Business</span>{" "}
            Further?
          </h2>

          <p className="mt-4 max-w-xl text-lg text-white/80">
            Book a free consultation and see how the right strategy can change
            your whole business.
          </p>

          <Link
            to="/contact"
            className="mt-12 inline-flex items-center gap-3 bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white transition"
          >
          <FaCalendarAlt />
            Book Your Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}