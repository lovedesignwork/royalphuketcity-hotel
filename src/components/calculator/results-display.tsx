import MetricCard from "./metric-card";
import { ResultMetrics } from "@/types/calculator";
import { formatNumber, formatTHB, formatPercent, formatROAS } from "@/lib/format";

interface Props {
  results: ResultMetrics;
  targetMet: boolean;
}

export default function ResultsDisplay({ results, targetMet }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Projected Results</h2>
        <p className="text-sm text-gray-500">What your budget + organic can achieve over the campaign period.</p>
      </div>

      {/* Row 1 — 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard
          label="Room nights from ads"
          value={formatNumber(results.adNights)}
          sub="paid campaign contribution"
        />
        <MetricCard
          label="Room nights OTA + organic"
          value={formatNumber(results.organicNights)}
          sub="no direct ad spend"
        />
        <MetricCard
          label="Total extra room nights"
          value={formatNumber(results.totalExtraNights)}
          sub="ads + organic combined"
          highlight="gold"
        />
      </div>

      {/* Row 2 — 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard
          label="Projected occupancy"
          value={formatPercent(results.projectedOcc)}
          sub="estimated end of campaign"
          highlight={targetMet ? "green" : "red"}
        />
        <MetricCard
          label="Total ad spend"
          value={formatTHB(results.totalAdSpend)}
          sub="full campaign budget"
        />
        <MetricCard
          label="Additional revenue"
          value={formatTHB(results.additionalRevenue)}
          sub="extra room nights × ADR"
          highlight="green"
        />
      </div>

      {/* Bottom row — 2 cards */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="ROAS"
          value={formatROAS(results.roas)}
          sub="return on ad spend (room revenue)"
          highlight={results.roas >= 3 ? "green" : results.roas >= 1.5 ? "none" : "red"}
        />
        <MetricCard
          label="Gap vs target"
          value={`${results.gapVsTarget >= 0 ? "+" : ""}${formatNumber(results.gapVsTarget)} nights`}
          sub={results.gapVsTarget >= 0 ? "surplus — target achievable" : "shortfall — target not met"}
          highlight={results.gapVsTarget >= 0 ? "green" : "red"}
        />
      </div>
    </div>
  );
}
