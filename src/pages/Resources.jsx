import { BarChart3, BookOpen, FileText, PlaySquare } from "lucide-react";
import { Link } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";

export default function Resources() {
  const resources = [
    [
      BookOpen,
      "Industry Guides",
      "In-depth guides to help you navigate the trucking and logistics industry.",
    ],
    [
      BarChart3,
      "Business Tips",
      "Practical tips to increase profitability and run a more efficient operation.",
    ],
    [
      PlaySquare,
      "Videos & Trainings",
      "Watch training and tutorials on routing, dispatching, and business growth.",
    ],
    [
      FileText,
      "Tools & Templates",
      "Download free tools and templates to streamline your business.",
    ],
  ];

  return (
    <main className="bg-[#050505]">
      {/* HERO */}
      <section className="relative min-h-[430px] bg-[url('/images/sunsettruck.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25"></div>

        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-8 pt-28">
          <div className="max-w-3xl">
            <p className="font-black uppercase text-[#D4AF37]">Resources</p>

            <h1 className="mt-4 text-5xl font-black uppercase leading-tight text-white md:text-7xl">
              Tools, Tips &
              <br />
              <span className="text-[#D4AF37]">Insights</span>
              <br />
              To Help You
              <br />
              <span className="text-[#D4AF37]">Succeed</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Explore free resources designed to help carriers make smarter,
              more profitable, and more efficient business decisions.
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCE CARDS */}
      <section className="mx-auto max-w-7xl border-b border-white/10 px-8 py-16">
        <div className="grid gap-5 md:grid-cols-4">
          {resources.map(([Icon, title, text]) => (
            <div
              key={title}
              className="rounded-md border border-white/10 bg-white/[0.04] p-8 text-center transition hover:border-[#D4AF37]"
            >
              <Icon className="mx-auto mb-6 text-[#D4AF37]" size={58} />

              <h3 className="text-lg font-black uppercase text-white">
                {title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {text}
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-block text-sm font-black uppercase text-[#D4AF37]"
              >
                Read More ›
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* PERSONALIZED HELP */}
      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="flex flex-col gap-6 rounded-md border border-white/10 bg-white/[0.04] p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase text-white">
              Need <span className="text-[#D4AF37]">Personalized Help?</span>
            </h2>

            <p className="mt-3 text-white/75">
              Let’s schedule a consultation and create your roadmap to success.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black hover:bg-white transition"
          >
            <FaCalendarAlt />
            Book Your Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}