import {
  CheckCircle,
  ClipboardCheck,
  MonitorSmartphone,
  Truck,
  Users,
  BarChart3,
  Palette,
} from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";
//import { Link } from "react-router";

export default function Services() {
  const services = [
    {
      icon: Users,
      title: "90-Day Mentorship Program",
      subtitle:
        "A structured 90-day mentorship for box truck and sprinter owners who want guidance, accountability, and step-by-step support building their transportation business.",
      price: null,
      items: [
        "Business setup guidance",
        "Load strategy",
        "Broker communication",
        "Dispatch education",
        "Revenue planning",
        "Weekly support/check-ins",
        "Operations improvement",
        "System & operations setup for free",
      ],
      cta: "Apply For Mentorship",
      link: "https://stan.store/Apexroute",
    },
    {
      icon: BarChart3,
      title: "Universal Load Analyzer",
      subtitle:
        "Professional freight pricing and profitability software that helps carriers calculate profitability, identify break-even points, and create smart counter offers before booking freight.",
      price: "$297",
      items: [
        "Profitability analysis",
        "Break-even calculations",
        "Quick book counter",
        "Target ask calculator",
        "Market counter pricing",
        "Premium counter pricing",
        "Load scoring system",
        "Deadhead & fuel cost tracking",
        "Box truck, sprinter, hotshot & semi support",
        "Editable business presets",
        "KPI dashboard overview",
        "Instructions tab included",
      ],
      cta: "Get The Load Analyzer",
      link: "https://stan.store/Apexroute", 
    },
    {
      icon: Palette,
      title: "Logo & Color Integration",
      subtitle:
        "Apex creates a custom logo and integrates a professional color palette that represents your brand and builds trust with your customers.",
      price: "$150",
      items: [
        "Custom logo design",
        "Unlimited revisions",
        "Color palette development",
        "Brand style guide",
        "Logo variations",
        "High-resolution files",
        "Commercial use license",
        "2-3 business day delivery",
      ],
      cta: "Get Your Logo & Colors Today",
      link: "https://stan.store/Apexroute",
    },
    {
      icon: ClipboardCheck,
      title: "Systems & Operations Setup",
      subtitle:
        "For carriers who need their business organized properly with the right documents, workflows, compliance structure, and operating systems.",
      price: null,
      items: [
        "Compliance folder setup",
        "Driver folder setup",
        "Invoice system",
        "Load tracking workflow",
        "Broker/carrier packet organization",
        "Email and document templates",
        "Business process structure",
      ],
      cta: "Apply For Systems Setup",
      link: "https://stan.store/Apexroute",
    },
    {
      icon: Truck,
      title: "Dispatching Support — 7% Per Load",
      subtitle:
        "Professional dispatch support for qualified carriers. Apex helps with load searching, broker communication, rate negotiation, and load planning.",
      price: null,
      items: [
        "Load search support",
        "Rate negotiation",
        "Broker communication",
        "Route planning",
        "Load confirmation support",
        "7% dispatch fee per booked load",
      ],
      cta: "Apply For Dispatch Support",
      link: "https://stan.store/Apexroute",
    },
    {
      icon: MonitorSmartphone,
      title: "Website & Business Brand Buildout",
      subtitle:
        "Premium trucking business website and branding setup for carriers, dispatch companies, consultants, and logistics businesses.",
      price: null,
      items: [
        "Website design",
        "Brand colors/logo integration",
        "Consultation booking funnel",
        "Contact forms",
        "Social media links",
        "Mobile optimization",
        "Domain connection",
        "Business credibility setup",
      ],
      cta: "Apply For Brand Buildout",
      link: "https://stan.store/Apexroute",
    },
  ];

  const process = [
    [
      "1",
      "Discover",
      "We learn about your business, goals, and challenges to identify the right service path.",
    ],
    [
      "2",
      "Structure",
      "We organize the strategy, systems, documents, and support needed for your operation.",
    ],
    [
      "3",
      "Implement",
      "We help put the plan into action with practical steps and clear execution support.",
    ],
    [
      "4",
      "Grow",
      "We help improve operations, increase confidence, and build toward long-term growth.",
    ],
  ];

  return (
    <main className="bg-[#050505]">
      {/* HERO */}
      <section className="relative min-h-[500px] bg-[url('/images/rtruck.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25"></div>

        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6 pt-28 md:px-8">
          <div className="max-w-4xl">
            <p className="font-black uppercase text-[#D4AF37]">Services</p>

            <h1 className="mt-4 text-4xl font-black uppercase leading-tight text-white md:text-7xl">
              Services Built for Carriers
              <br />
              <span className="text-[#D4AF37]">Ready to Grow</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">
              From mentorship to systems, dispatching, software tools, and
              professional branding, Apex Route Consultant Group helps
              transportation businesses build structure, increase revenue, and
              operate with confidence.
            </p>

            <a
              href="https://stan.store/Apexroute"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black transition hover:bg-white"
            >
              <FaCalendarAlt />
              Apply For Apex Mentorship
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl border-b border-white/10 px-6 py-16 md:px-8">
        <div className="text-center">
          <p className="font-black uppercase text-[#D4AF37]">Our Services</p>

          <h2 className="mt-3 text-3xl font-black uppercase text-white md:text-5xl">
            Premium Support for{" "}
            <span className="text-[#D4AF37]">Carrier Growth</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map(({ icon: Icon, title, subtitle, price, items, cta, link }) => (
            <div
              key={title}
              className="group rounded-md border border-white/10 bg-white/[0.04] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37] transition group-hover:bg-[#D4AF37] group-hover:text-black">
                  <Icon size={34} />
                </div>

                <div>
                  <h3 className="text-2xl font-black uppercase leading-tight text-white">
                    {title}
                  </h3>

                  {price && (
                    <p className="mt-3 text-4xl font-black text-[#D4AF37]">
                      {price}
                      <span className="ml-2 text-sm uppercase text-white/60">
                        one-time purchase
                      </span>
                    </p>
                  )}

                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    {subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-white/75">
                    <CheckCircle
                      size={17}
                      className="mt-0.5 shrink-0 text-[#D4AF37]"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
  href={link}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-8 inline-flex items-center gap-3 border border-[#D4AF37] px-6 py-3 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
>
  <FaCalendarAlt />
  {cta}
</a>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-7xl border-b border-white/10 px-6 py-16 text-center md:px-8">
        <p className="font-black uppercase text-[#D4AF37]">Our Process</p>

        <h2 className="mt-3 text-3xl font-black uppercase text-white md:text-5xl">
          A Proven Process That{" "}
          <span className="text-[#D4AF37]">Delivers</span>
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {process.map(([num, title, text]) => (
            <div key={num} className="relative px-5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37] text-2xl font-black text-[#D4AF37]">
                {num}
              </div>

              <h3 className="mt-5 font-black uppercase text-white">{title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[url('/images/twotruckssunset.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
          <div className="max-w-3xl">
            <p className="font-black uppercase text-[#D4AF37]">
              Ready to Build Structure?
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase text-white">
              Let’s Take{" "}
              <span className="text-[#D4AF37]">
                Your Carrier Business
              </span>{" "}
              Further.
            </h2>

            <p className="mt-4 max-w-xl text-lg text-white/80">
              Choose a consultation path and tell us what support your business
              needs.
            </p>

<a
  href="https://stan.store/Apexroute"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-10 inline-flex items-center gap-3 bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black transition hover:bg-white"
>
  <FaCalendarAlt />
  Get The Load Analyzer
</a>
          </div>
        </div>
      </section>
    </main>
  );
}