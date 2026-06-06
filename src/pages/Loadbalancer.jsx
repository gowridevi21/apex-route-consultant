import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, FileText, Settings, BarChart3 } from "lucide-react";

export default function LoadAnalyzer() {
  const [activeTab, setActiveTab] = useState("analyzer");

  const [inputs, setInputs] = useState({
    vehicleType: "26ft Box Truck",
    marketMode: "Tight",
    businessDays: 22,
    loadPay: 557.45,
    fuelSurcharge: 0,
    accessorials: 0,
    loadedMiles: 230,
    deadheadMiles: 10,
    fuelPrice: 3.5,
    desiredProfit: 100,
    driverPayMode: "Owner",
    driverCpm: 0.5,
    driverPercent: 20,
  });

  const presets = {
    mpg: 9,
    maintReserve: 0.25,
    tireReserve: 0.06,
    insuranceMonth: 998,
    truckPaymentMonth: 0,
    permitsMonth: 150,
    dispatchPercent: 3,
    avgMilesPerDay: 450,
    marketPremium: 10,
  };

  const totalRevenue =
    Number(inputs.loadPay) +
    Number(inputs.fuelSurcharge) +
    Number(inputs.accessorials);

  const totalMiles =
    Number(inputs.loadedMiles) + Number(inputs.deadheadMiles);

  const rateLoadedMile = totalRevenue / Number(inputs.loadedMiles);
  const rateAllMiles = totalRevenue / totalMiles;
  const fuelGallons = totalMiles / presets.mpg;
  const fuelCost = fuelGallons * Number(inputs.fuelPrice);
  const maintTire =
    totalMiles * (presets.maintReserve + presets.tireReserve);
  const fixedMonthlyCost =
    presets.insuranceMonth +
    presets.truckPaymentMonth +
    presets.permitsMonth;
  const fixedTripAllocation =
    fixedMonthlyCost / Number(inputs.businessDays);
  const dispatchCost = totalRevenue * (presets.dispatchPercent / 100);
  const totalTripCost =
    fuelCost + maintTire + fixedTripAllocation + dispatchCost;
  const netProfit = totalRevenue - totalTripCost;
  const profitMargin = (netProfit / totalRevenue) * 100;
  const targetAsk = totalTripCost + Number(inputs.desiredProfit);
  const walkAwayMinimum = totalTripCost;
  const quickBookCounter = targetAsk * 1.15;
  const marketCounter = targetAsk * 1.3;
  const premiumCounter = targetAsk * 1.5;

  const updateInput = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-8 text-white md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-black uppercase md:text-5xl">
            Universal Owner-Operator{" "}
            <span className="text-[#D4AF37]">Load Analyzer</span>
          </h1>
          <p className="mt-3 text-white/70">
            Pick a vehicle preset, enter a load, and calculate break-even,
            profit, counter rate, and profit curve.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTab("analyzer")}
            className={`px-5 py-3 text-sm font-black uppercase ${
              activeTab === "analyzer"
                ? "bg-[#D4AF37] text-black"
                : "border border-[#D4AF37] text-[#D4AF37]"
            }`}
          >
            Universal Analyzer
          </button>

          <button
            onClick={() => setActiveTab("instructions")}
            className={`px-5 py-3 text-sm font-black uppercase ${
              activeTab === "instructions"
                ? "bg-[#D4AF37] text-black"
                : "border border-[#D4AF37] text-[#D4AF37]"
            }`}
          >
            Instructions
          </button>

          <button
            onClick={() => setActiveTab("presets")}
            className={`px-5 py-3 text-sm font-black uppercase ${
              activeTab === "presets"
                ? "bg-[#D4AF37] text-black"
                : "border border-[#D4AF37] text-[#D4AF37]"
            }`}
          >
            Presets
          </button>
        </div>

        {activeTab === "analyzer" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
            <div className="rounded border border-[#D4AF37]/30 bg-white/[0.04] p-6">
              <h2 className="flex items-center gap-2 text-xl font-black uppercase text-[#D4AF37]">
                <FileText size={22} /> Load Inputs
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  ["vehicleType", "Vehicle Type"],
                  ["marketMode", "Market Mode"],
                  ["businessDays", "Business Days / Month"],
                  ["loadPay", "Load Pay / Linehaul ($)"],
                  ["fuelSurcharge", "Fuel Surcharge ($)"],
                  ["accessorials", "Accessorials ($)"],
                  ["loadedMiles", "Loaded Miles"],
                  ["deadheadMiles", "Deadhead Miles"],
                  ["fuelPrice", "Fuel Price ($/gal)"],
                  ["desiredProfit", "Desired Profit"],
                  ["driverPayMode", "Driver Pay Mode"],
                  ["driverCpm", "Driver CPM ($/mi)"],
                  ["driverPercent", "Driver % of Revenue"],
                ].map(([key, label]) => (
                  <div
                    key={key}
                    className="grid grid-cols-[1.2fr_1fr] items-center gap-3"
                  >
                    <label className="text-sm font-bold">{label}</label>
                    <input
                      value={inputs[key]}
                      onChange={(e) => updateInput(key, e.target.value)}
                      className="border border-[#D4AF37]/40 bg-black px-3 py-2 text-sm text-[#D4AF37] outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-[#D4AF37]/30 bg-white/[0.04] p-6">
              <h2 className="flex items-center gap-2 text-xl font-black uppercase text-[#D4AF37]">
                <BarChart3 size={22} /> Live KPIs
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  ["Total Revenue", `$${totalRevenue.toFixed(2)}`],
                  ["Total Miles", totalMiles.toFixed(0)],
                  ["Rate / Loaded Mile", `$${rateLoadedMile.toFixed(2)}`],
                  ["Rate / All Miles", `$${rateAllMiles.toFixed(2)}`],
                  ["Fuel Gallons Est.", fuelGallons.toFixed(1)],
                  ["Fuel Cost", `$${fuelCost.toFixed(2)}`],
                  ["Maint + Tire", `$${maintTire.toFixed(2)}`],
                  ["Fixed Monthly Cost", `$${fixedMonthlyCost.toFixed(2)}`],
                  ["Fixed Trip Allocation", `$${fixedTripAllocation.toFixed(2)}`],
                  ["Dispatch Cost", `$${dispatchCost.toFixed(2)}`],
                  ["Total Trip Cost", `$${totalTripCost.toFixed(2)}`],
                  ["Net Profit", `$${netProfit.toFixed(2)}`],
                  ["Profit Margin", `${profitMargin.toFixed(1)}%`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-white/10 pb-2 text-sm"
                  >
                    <span className="font-bold">{label}</span>
                    <span className="font-black text-[#D4AF37]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-[#D4AF37]/30 bg-white/[0.04] p-6">
              <h2 className="flex items-center gap-2 text-xl font-black uppercase text-[#D4AF37]">
                <Settings size={22} /> Preset / Cost Inputs
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  ["Preset MPG", presets.mpg],
                  ["Maint Reserve ($/mi)", `$${presets.maintReserve}`],
                  ["Tire Reserve ($/mi)", `$${presets.tireReserve}`],
                  ["Insurance / Month", `$${presets.insuranceMonth}`],
                  ["Truck Payment / Month", `$${presets.truckPaymentMonth}`],
                  ["Permits / Admin / Month", `$${presets.permitsMonth}`],
                  ["Dispatch / Factor %", `${presets.dispatchPercent}%`],
                  ["Avg Miles / Day", presets.avgMilesPerDay],
                  ["Market Premium %", `${presets.marketPremium}%`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-white/10 pb-2 text-sm"
                  >
                    <span className="font-bold">{label}</span>
                    <span className="font-black text-[#D4AF37]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-[#D4AF37]/30 bg-white/[0.04] p-6 lg:col-span-2">
              <h2 className="text-xl font-black uppercase text-[#D4AF37]">
                Load Analysis
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {[
                  ["Status", netProfit > 0 ? "PROFITABLE" : "DECLINE"],
                  ["Load Score", netProfit > 250 ? "ELITE" : netProfit > 0 ? "GOOD" : "DECLINE"],
                  ["Break-even Loaded Rate", `$${(totalTripCost / inputs.loadedMiles).toFixed(2)}`],
                  ["Break-even All-Mile Rate", `$${(totalTripCost / totalMiles).toFixed(2)}`],
                  ["Target Linehaul Ask", `$${targetAsk.toFixed(2)}`],
                  ["Profit at Smart Target", `$${Number(inputs.desiredProfit).toFixed(2)}`],
                  ["Walk-Away Minimum", `$${walkAwayMinimum.toFixed(2)}`],
                  ["Quick Book Counter", `$${quickBookCounter.toFixed(2)}`],
                  ["Market Counter", `$${marketCounter.toFixed(2)}`],
                  ["Premium Counter", `$${premiumCounter.toFixed(2)}`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border border-white/10 bg-black p-3 text-sm"
                  >
                    <span className="font-bold">{label}</span>
                    <span className="font-black text-[#D4AF37]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6">
              <h2 className="text-xl font-black uppercase text-[#D4AF37]">
                Export
              </h2>

              <p className="mt-3 text-sm text-white/70">
                Review the analysis, then export a professional summary report.
              </p>

<Link
  to="/load-analyzer-export"
  state={{
    report: {
      loadScore:
        netProfit > 250 ? "Elite" : netProfit > 0 ? "Good" : "Decline",
      brokerRate: `$${Number(inputs.loadPay).toFixed(2)}`,
      targetAskRate: `$${targetAsk.toFixed(2)}`,
      expectedProfit: `$${netProfit.toFixed(2)}`,
      revenuePerMile: `$${rateLoadedMile.toFixed(2)}`,
      loadedMiles: `${inputs.loadedMiles}`,
      deadheadMiles: `${inputs.deadheadMiles}`,
      fuelCost: `$${fuelCost.toFixed(2)}`,
      breakEvenRate: `$${(totalTripCost / totalMiles).toFixed(2)}`,
      netMargin: `${profitMargin.toFixed(1)}%`,
      counterOffer: `Hi, thank you for the offer. Based on the loaded miles, deadhead, fuel cost, and current profitability target, we would be able to move this load at $${targetAsk.toFixed(
        2
      )}. That rate allows us to cover operating costs and maintain a safe profit margin. Please let me know if we can get this approved.`,
    },
  }}
  className="mt-6 inline-flex w-full justify-center bg-[#D4AF37] px-6 py-4 text-sm font-black uppercase text-black hover:bg-white"
>
  Export Summary
</Link>
            </div>
          </div>
        )}

        {activeTab === "instructions" && (
          <div className="mt-8 rounded border border-[#D4AF37]/30 bg-white/[0.04] p-8">
            <h2 className="text-3xl font-black uppercase text-white">
              How to Use the Universal Load Analyzer
            </h2>

            <div className="mt-6 space-y-4 text-white/80">
              {[
                "Pick your vehicle: Choose the equipment that matches the load.",
                "Enter the load: Add revenue, loaded miles, deadhead miles, fuel surcharge, accessorials, and fuel price.",
                "Choose driver pay mode: Owner, CPM, or percentage of revenue.",
                "Read the KPIs: Review revenue, mileage, cost, profit, and margin.",
                "Read the Load Analysis: Check status, score, break-even, target pricing, and counter offers.",
                "Edit presets: Update operating assumptions to match the real business.",
              ].map((item) => (
                <p key={item} className="flex gap-3">
                  <CheckCircle className="mt-1 shrink-0 text-[#D4AF37]" size={18} />
                  {item}
                </p>
              ))}
            </div>

            <p className="mt-8 text-sm font-bold text-[#D4AF37]">
              Important Disclaimer: Results are based on the information entered
              into the analyzer. Users should verify fuel costs, maintenance,
              insurance, permits, driver pay, and all operating costs before
              booking or pricing decisions.
            </p>
          </div>
        )}

        {activeTab === "presets" && (
          <div className="mt-8 overflow-x-auto rounded border border-[#D4AF37]/30 bg-white/[0.04] p-6">
            <h2 className="text-3xl font-black uppercase text-white">
              Vehicle Presets
            </h2>

            <table className="mt-6 w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#D4AF37] text-black">
                  {[
                    "Vehicle Type",
                    "MPG",
                    "Maint $/mi",
                    "Tire $/mi",
                    "Insurance / mo",
                    "Truck Payment / mo",
                    "Permits/Admin / mo",
                    "Revenue-Based Fee %",
                    "Avg Miles / Day",
                    "Notes",
                  ].map((heading) => (
                    <th key={heading} className="border border-black/20 p-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {[
                  ["Sprinter Van", "20.0", "$0.10", "$0.03", "$700.00", "$1,000.00", "$100.00", "3.0%", "600", "Starter values only"],
                  ["26ft Box Truck", "9.0", "$0.25", "$0.06", "$998.00", "-", "$150.00", "3.0%", "450", "Ready to roll, twic card"],
                  ["Hotshot", "10.5", "$0.19", "$0.05", "$1,400.00", "$1,200.00", "$225.00", "5.0%", "500", "Starter values only"],
                  ["Dry Van Semi", "6.8", "$0.28", "$0.08", "$2,100.00", "$2,400.00", "$325.00", "4.0%", "550", "Starter values only"],
                ].map((row) => (
                  <tr key={row[0]} className="text-center text-white">
                    {row.map((cell) => (
                      <td key={cell} className="border border-[#D4AF37]/30 p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-5 text-sm font-bold text-[#D4AF37]">
              Edit any blue-number cells to match your real operation.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}