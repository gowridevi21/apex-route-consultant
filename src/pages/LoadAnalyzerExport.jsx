import {
  Download,
  Mail,
  Printer,
  Save,
  BarChart3,
  FileText,
} from "lucide-react";
import { useLocation } from "react-router";

export default function LoadAnalyzerExport() {
  const location = useLocation();

  const report = location.state?.report || {
    loadScore: "No Data",
    brokerRate: "$0.00",
    targetAskRate: "$0.00",
    expectedProfit: "$0.00",
    revenuePerMile: "$0.00",
    loadedMiles: "0",
    deadheadMiles: "0",
    fuelCost: "$0.00",
    breakEvenRate: "$0.00",
    netMargin: "0%",
    counterOffer:
      "No analyzer data was passed. Please return to the Load Analyzer page, enter load details, and export again.",
  };

  const counterOffer = report.counterOffer;

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleEmailReport = () => {
    const subject = encodeURIComponent("Load Analyzer Report");
    const body = encodeURIComponent(
      `Hello Apex Team,

I would like to share my Load Analyzer report.

Load Score: ${report.loadScore}
Broker Rate: ${report.brokerRate}
Target Ask Rate: ${report.targetAskRate}
Expected Profit: ${report.expectedProfit}
Revenue Per Mile: ${report.revenuePerMile}
Loaded Miles: ${report.loadedMiles}
Deadhead Miles: ${report.deadheadMiles}
Fuel Cost: ${report.fuelCost}
Break-Even Rate: ${report.breakEvenRate}
Net Margin: ${report.netMargin}

Counter Offer:
${counterOffer}

Thank you.`
    );

    window.location.href = `mailto:ceo@apexrouteconsulting.com?subject=${subject}&body=${body}`;
  };

  const handleSaveToClientFolder = () => {
    alert(
      "Save to Client Folder will be connected to the client portal soon. For now, please export the report as PDF and upload it to the client vault."
    );
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-6 text-white md:px-8">
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
              <h1 className="text-4xl font-black uppercase text-white">
                Universal Load Analyzer
              </h1>

              <p className="mt-2 font-semibold uppercase tracking-wider text-[#D4AF37]">
                Professional Export Report
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <button
              onClick={handleExportPdf}
              className="inline-flex items-center gap-2 bg-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-white"
            >
              <Download size={18} />
              Export PDF
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border border-[#D4AF37] px-5 py-3 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
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

        <div className="my-10 h-px bg-[#D4AF37]/30"></div>

        {/* KPI DASHBOARD */}
        <section>
          <div className="flex items-center gap-3">
            <BarChart3 className="text-[#D4AF37]" size={28} />
            <h2 className="text-2xl font-black uppercase">KPI Dashboard</h2>
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
                <p className="mt-3 text-2xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="my-10 h-px bg-[#D4AF37]/30"></div>

        {/* COUNTER OFFER */}
        <section className="rounded-md border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6">
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

        <div className="my-10 h-px bg-[#D4AF37]/30"></div>

        {/* EXPORT FEATURES */}
        <section className="print:hidden">
          <h2 className="text-2xl font-black uppercase text-white">
            Export Features
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-4">
            <button
              onClick={handleExportPdf}
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              <Download size={18} />
              Save as PDF
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              <Printer size={18} />
              Print Report
            </button>

            <button
              onClick={handleEmailReport}
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              <Mail size={18} />
              Email Report
            </button>

            <button
              onClick={handleSaveToClientFolder}
              className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] px-5 py-4 text-sm font-black uppercase text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              <Save size={18} />
              Save to Client Folder
            </button>
          </div>
        </section>

        <div className="my-10 h-px bg-[#D4AF37]/30"></div>

        {/* BRANDING INFO */}
        <section className="rounded border border-white/10 bg-white/[0.04] p-6">
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