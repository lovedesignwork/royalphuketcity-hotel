import MetricCard from "./metric-card";
import { GapMetrics } from "@/types/calculator";
import { formatNumber } from "@/lib/format";

interface Props {
  gap: GapMetrics;
}

export default function GapDisplay({ gap }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">The Gap</h2>
        <p className="text-sm text-gray-500">How many extra room nights you need to fill to hit your target.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricCard
          label="Current rooms/night"
          value={formatNumber(gap.currentPerNight)}
          sub="at current occupancy"
        />
        <MetricCard
          label="Target rooms/night"
          value={formatNumber(gap.targetPerNight)}
          sub="at target occupancy"
          highlight="gold"
        />
        <MetricCard
          label="Extra rooms needed/night"
          value={formatNumber(gap.extraPerNight)}
          sub="additional per day"
          highlight={gap.extraPerNight > 0 ? "red" : "none"}
        />
        <MetricCard
          label="Total extra room nights"
          value={formatNumber(gap.gapTotal)}
          sub="over full campaign"
          highlight={gap.gapTotal > 0 ? "red" : "none"}
        />
      </div>
    </div>
  );
}
