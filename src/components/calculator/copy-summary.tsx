"use client";

import { useState } from "react";
import { CalculatorInputs, CalculatorOutputs } from "@/types/calculator";
import { formatTHB, formatPercent, formatNumber, formatROAS } from "@/lib/format";

interface Props {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
}

export default function CopySummary({ inputs, outputs }: Props) {
  const [copied, setCopied] = useState(false);

  function buildSummary(): string {
    const { gap, results, targetMet } = outputs;
    const verdict = targetMet
      ? `Target met — projected ${formatPercent(results.projectedOcc)}, revenue ${formatTHB(results.additionalRevenue)}`
      : `Target NOT met — projected ${formatPercent(results.projectedOcc)}, ${Math.abs(results.gapVsTarget).toLocaleString()} room nights short`;

    return [
      `RPC Low Season Occupancy KPI (${inputs.campaignMonths}-month campaign)`,
      `Current occupancy: ${formatPercent(inputs.currentOcc)}`,
      `Target occupancy: ${formatPercent(inputs.targetOcc)}`,
      `Total rooms: ${inputs.totalRooms}`,
      `---`,
      `Extra rooms needed per night: ${formatNumber(gap.extraPerNight)}`,
      `Total extra room nights needed: ${formatNumber(gap.gapTotal)}`,
      `---`,
      `Room nights from ads: ${formatNumber(results.adNights)}`,
      `Room nights from OTA + organic: ${formatNumber(results.organicNights)}`,
      `Total extra room nights: ${formatNumber(results.totalExtraNights)}`,
      `Projected occupancy: ${formatPercent(results.projectedOcc)}`,
      `Total ad spend: ${formatTHB(results.totalAdSpend)}`,
      `Additional revenue: ${formatTHB(results.additionalRevenue)}`,
      `ROAS: ${formatROAS(results.roas)}`,
      `Verdict: ${verdict}`,
    ].join("\n");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = buildSummary();
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        copied
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
      }`}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy Summary
        </>
      )}
    </button>
  );
}
