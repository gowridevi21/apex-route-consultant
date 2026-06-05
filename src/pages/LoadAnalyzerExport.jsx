import {
  Download,
  Mail,
  Printer,
  Save,
  BarChart3,
  FileText,
} from "lucide-react";

export default function LoadAnalyzerExport() {
  const report = {
    loadScore: "Elite",
    brokerRate: "$1,850",
    targetAskRate: "$2,150",
    expectedProfit: "$684",
    revenuePerMile: "$3.42",
    loadedMiles: "540",
    deadheadMiles: "42",
    fuelCost: "$312",
    breakEvenRate: "$2.18",
    netMargin: "31.8%",
  };

  const handlePrint = () => {
    window.print();
  };

  const counterOffer =
    "Hi, thank you for the offer. Based on the loaded miles, deadhead, fuel cost, and current profitability target, we would be able to move this load at $2,150. That rate allows us to cover operating costs and maintain a safe profit margin. Please let me know if we can get this approved.";

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white md:px-8">
      <section className="mx-auto max-w-6xl rounded-md border border-[#D4AF37]/30 bg-black p-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6 border-b border-[#D4AF37]/30 pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo1.png"
              alt="Apex Logo"
              className="h-14 w-auto"
            />

            <div>
              <p className="font-black uppercase text-[#D4AF37]">
                Apex Load Analyzer
              </p>

              <h1 className="text-3xl font-black uppercase text-white md:text-5xl">
                Export Summary
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-black hover:bg-white"
            >
              <Download size={18} />
              Export PDF
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border border-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              <Printer size={18} />
              Print
            </button>
          </div>
        </div>

        {/* EXECUTIVE SUMMARY */}
        <section className="mt-10">
          <div className="flex items-center gap-3">
            <FileText className="text-[#D4AF37]" size={28} />
            <h2 className="text-2xl font-black uppercase">
              Executive Summary
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-5">
            {[
              ["Load Score", report.loadScore],
              ["Broker Rate", report.brokerRate],
              ["Target Ask Rate", report.targetAskRate],
              ["Expected Profit", report.expectedProfit],
              ["Revenue Per Mile", report.revenuePerMile],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-xs font-black uppercase text-white/50">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-black text-[#D4AF37]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* KPI DASHBOARD */}
        <section className="mt-12">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-[#D4AF37]" size={28} />
            <h2 className="text-2xl font-black uppercase">
              KPI Dashboard
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-5">
            {[
              ["Loaded Miles", report.loadedMiles],
              ["Deadhead Miles", report.deadheadMiles],
              ["Fuel Cost", report.fuelCost],
              ["Break-Even Rate", report.breakEvenRate],
              ["Net Margin", report.netMargin],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="text-xs font-black uppercase text-white/50">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-black text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COUNTER OFFER */}
        <section className="mt-12 rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6">
          <p className="font-black uppercase text-[#D4AF37]">
            Auto Counter Offer
          </p>

          <h2 className="mt-2 text-2xl font-black uppercase text-white">
            Broker Counter Script
          </h2>

          <p className="mt-5 leading-relaxed text-white/80">
            {counterOffer}
          </p>
        </section>

        {/* EXPORT FEATURES */}
        <section className="mt-12 print:hidden">
          <h2 className="text-2xl font-black uppercase text-white">
            Export Features
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-4">
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              <Download size={18} />
              Save as PDF
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              <Printer size={18} />
              Print Report
            </button>

            <a
              href="mailto:ceo@apexrouteconsulting.com?subject=Load Analyzer Report"
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              <Mail size={18} />
              Email Report
            </a>

            <button className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
              <Save size={18} />
              Save to Client Folder
            </button>
          </div>
        </section>

        {/* BRANDING INFO */}
        <section className="mt-12 rounded border border-white/10 bg-white/[0.04] p-6">
          <p className="font-black uppercase text-[#D4AF37]">
            Company Branding
          </p>

          <p className="mt-3 text-white/70">
            Future upgrade: allow users to add company logo, business name,
            phone number, MC/DOT number, and company email so exported reports
            are fully branded.
          </p>
        </section>
      </section>
    </main>
  );
}