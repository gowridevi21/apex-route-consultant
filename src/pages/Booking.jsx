import { useState } from "react";
//import { Link } from "react-router";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  CreditCard,
  Mail,
  Phone,
  Truck,
} from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";

const consultationTypes = [
  {
    id: "quick",
    title: "Quick Strategy Call",
    time: "15 Minutes",
    price: "Free",
    description: "Free qualification call to understand client goals and see if they are a fit.",
    features: [
      "Free qualification call",
      "Understand client goals",
      "Discuss business fit",
      "Next-step guidance",
    ],
    paymentLink: "",
  },
  {
    id: "operations",
    title: "Operations Growth Consultation",
    time: "45 Minutes",
    price: "$149",
    description: "Route strategy, dispatch systems, profitability review, and scaling guidance.",
    features: [
      "Route strategy",
      "Dispatch systems",
      "Profitability review",
      "Equipment scaling guidance",
    ],
    paymentLink: "PASTE_STRIPE_OR_SQUARE_LINK_HERE",
  },
  {
    id: "premium",
    title: "Premium Business Buildout Session",
    time: "90 Minutes",
    price: "$349",
    description: "High-level consulting for systems, compliance, operations, and growth strategy.",
    features: [
      "Business systems",
      "Scaling roadmap",
      "Compliance setup",
      "Operations structure",
      "Growth strategy",
    ],
    paymentLink: "PASTE_STRIPE_OR_SQUARE_LINK_HERE",
  },
];

export default function Booking() {
  const [selectedType, setSelectedType] = useState(consultationTypes[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedType.id === "quick") {
      setSubmitted(true);
      return;
    }

    window.open(selectedType.paymentLink, "_blank");
    setSubmitted(true);
  };

  return (
    <main className="bg-[#050505] text-white">
      {/* HERO */}
      <section className="relative min-h-[520px] bg-[url('/images/truck2.PNG')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>

        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-6 pt-28 md:px-8">
          <div className="max-w-4xl">
            <p className="font-black uppercase text-[#D4AF37]">
              Book a Consultation
            </p>

            <h1 className="mt-4 text-4xl font-black uppercase leading-tight md:text-7xl">
              Build Smarter.
              <br />
              <span className="text-[#D4AF37]">Scale Stronger.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Choose the right consultation level and tell us about your trucking
              business. Our team will review your request and contact you shortly.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Phone size={18} className="text-[#D4AF37]" />
                603-713-7917
              </div>

              <div className="flex items-center gap-2 text-white/80">
                <Mail size={18} className="text-[#D4AF37]" />
                ceo@apexrouteconsulting.com
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSULTATION TYPES */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="text-center">
          <p className="font-black uppercase text-[#D4AF37]">
            Choose Your Consultation
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase md:text-5xl">
            Select the Right <span className="text-[#D4AF37]">Option</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {consultationTypes.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedType(item)}
              className={`rounded-md border p-7 text-left transition duration-300 hover:-translate-y-1 ${
                selectedType.id === item.id
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-white/10 bg-white/[0.04] hover:border-[#D4AF37]"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                  <CalendarDays size={24} />
                </div>

                <p className="text-2xl font-black text-[#D4AF37]">
                  {item.price}
                </p>
              </div>

              <h3 className="mt-5 text-2xl font-black uppercase">
                {item.title}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm font-bold uppercase text-white/70">
                <Clock size={16} className="text-[#D4AF37]" />
                {item.time}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {item.description}
              </p>

              <ul className="mt-5 space-y-3">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-white/75"
                  >
                    <CheckCircle size={16} className="text-[#D4AF37]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-white/10 bg-white/[0.04] p-8"
        >
          <p className="font-black uppercase text-[#D4AF37]">
            Intake Form
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase">
            Tell Us About <span className="text-[#D4AF37]">Your Business</span>
          </h2>

          <input
            type="hidden"
            name="consultationType"
            value={`${selectedType.title} - ${selectedType.time} - ${selectedType.price}`}
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              name="fullName"
              placeholder="Full Name"
              required
              className="input-style"
            />

            <input
              name="companyName"
              placeholder="Company Name"
              required
              className="input-style"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="input-style"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              required
              className="input-style"
            />

            <input
              name="mcDot"
              placeholder="MC/DOT Number (Optional)"
              className="input-style"
            />

            <input
              name="equipmentType"
              placeholder="Equipment Type"
              required
              className="input-style"
            />

            <input
              name="monthlyRevenue"
              placeholder="Current Monthly Revenue"
              required
              className="input-style"
            />

            <input
              name="bestTime"
              placeholder="Best Time To Contact"
              required
              className="input-style"
            />
          </div>

          <textarea
            name="helpNeeded"
            placeholder="What help do you need?"
            required
            className="mt-4 h-36 w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
          />

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black transition hover:bg-white"
          >
            {selectedType.id === "quick" ? (
              <>
                <FaCalendarAlt />
                Submit Free Booking Request
              </>
            ) : (
              <>
                <CreditCard size={18} />
                Continue To Payment
              </>
            )}
          </button>

          {submitted && (
            <p className="mt-5 rounded border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 text-sm text-white">
              Thank you for booking with Apex Route Consultant Group. Your
              consultation request has been received and our team will contact
              you shortly.
            </p>
          )}

          <p className="mt-4 text-xs text-white/60">
            🔒 Your information is secure and will never be shared.
          </p>
        </form>

        {/* SUMMARY */}
        <div className="rounded-md border border-white/10 bg-white/[0.04] p-8">
          <p className="font-black uppercase text-[#D4AF37]">
            Selected Consultation
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase">
            {selectedType.title}
          </h2>

          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-3">
              <Clock className="text-[#D4AF37]" />
              <span>{selectedType.time}</span>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="text-[#D4AF37]" />
              <span>{selectedType.description}</span>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="text-[#D4AF37]" />
              <span className="font-black">{selectedType.price}</span>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <h3 className="font-black uppercase text-white">
              After Submission
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>• Company receives your consultation request.</li>
              <li>• Client receives pending confirmation email.</li>
              <li>• Team reviews your request.</li>
              <li>• Approved or cancelled confirmation is sent later.</li>
            </ul>
          </div>

          <div className="mt-8 rounded bg-black/50 p-5">
            <p className="text-sm leading-relaxed text-white/70">
              Paid consultation payments should be connected using Stripe or
              Square payment links. Replace the placeholder payment links inside
              this file after the company provides them.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}