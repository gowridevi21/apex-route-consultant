import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone } from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";

const SERVICE_ID = "service_5vyb6vb";
const COMPANY_TEMPLATE_ID = "template_c1lco2k";
const CUSTOMER_TEMPLATE_ID = "template_hwroov8";
const PUBLIC_KEY = "R82-i7Mc5PSHOL3Yi";

const consultationTypes = [
  {
    id: "quick",
    title: "Quick Strategy Call",
    time: "15 Minutes",
    price: "Free",
  },
];

export default function Booking() {
  const [selectedType] = useState(consultationTypes[0]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    const form = e.target;
    const formData = new FormData(form);

    const fullName = formData.get("fullName");
    const email = formData.get("email");

    const templateParams = {
      consultationType: `${selectedType.title} - ${selectedType.time} - ${selectedType.price}`,
      fullName,
      companyName: formData.get("companyName"),
      email,
      phone: formData.get("phone"),
      mcDot: formData.get("mcDot") || "Not provided",
      equipmentType: formData.get("equipmentType"),
      monthlyRevenue: formData.get("monthlyRevenue"),
      bestTime: formData.get("bestTime"),
      helpNeeded: formData.get("helpNeeded"),

      // Extra EmailJS fields
      name: fullName,
      from_name: fullName,
      user_name: fullName,
      user_email: email,
      to_email: email,
      reply_to: email,
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        COMPANY_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      await emailjs.send(
        SERVICE_ID,
        CUSTOMER_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      alert(error?.text || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] text-white">
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
              Tell us about your trucking business. Our team will review your
              request and contact you shortly.
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

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-16 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-white/10 bg-white/[0.04] p-8"
        >
          <p className="font-black uppercase text-[#D4AF37]">
            Consultation Intake Form
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase">
            Tell Us About <span className="text-[#D4AF37]">Your Business</span>
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input name="fullName" placeholder="Full Name" required className="input-style" />
            <input name="companyName" placeholder="Company Name" required className="input-style" />
            <input type="email" name="email" placeholder="Email Address" required className="input-style" />
            <input name="phone" placeholder="Phone Number" required className="input-style" />
            <input name="mcDot" placeholder="MC/DOT Number (Optional)" className="input-style" />
            <input name="equipmentType" placeholder="Equipment Type" required className="input-style" />
            <input name="monthlyRevenue" placeholder="Current Monthly Revenue" required className="input-style" />
            <input name="bestTime" placeholder="Best Time To Contact" required className="input-style" />
          </div>

          <textarea
            name="helpNeeded"
            placeholder="What Help Do You Need?"
            required
            className="mt-4 h-36 w-full rounded border border-white/10 bg-black/60 p-4 text-white outline-none focus:border-[#D4AF37]"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#D4AF37] px-8 py-4 text-sm font-black uppercase text-black transition hover:bg-white disabled:opacity-60"
          >
            <FaCalendarAlt />
            {loading ? "Submitting..." : "Submit Consultation Request"}
          </button>

          {submitted && (
            <div className="mt-5 rounded border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-5">
              <p className="font-bold text-[#D4AF37]">
                ✓ Request Submitted Successfully
              </p>
              <p className="mt-2 text-sm text-white/80">
                Your consultation request has been received. A pending
                confirmation email has been sent to your inbox.
              </p>
            </div>
          )}

          <p className="mt-4 text-xs text-white/60">
            🔒 Your information is secure and will never be shared.
          </p>
        </form>

        <div className="rounded-md border border-white/10 bg-white/[0.04] p-8">
          <p className="font-black uppercase text-[#D4AF37]">
            What Happens Next?
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase">
            Consultation Process
          </h2>

          <ul className="mt-6 space-y-4 text-white/75">
            <li>✅ Company receives consultation request</li>
            <li>✅ Customer receives pending confirmation email</li>
            <li>✅ Team reviews request</li>
            <li>✅ Customer gets approved/cancelled email later</li>
          </ul>

          <div className="mt-8 rounded bg-black/40 p-5">
            <p className="text-sm leading-relaxed text-white/70">
              Our team reviews each request carefully to ensure the right
              consultation path for your business needs.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}