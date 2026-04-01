interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: "green" | "red" | "gold" | "none";
}

export default function MetricCard({ label, value, sub, highlight = "none" }: MetricCardProps) {
  const highlightClass =
    highlight === "green"
      ? "border-green-200 bg-green-50"
      : highlight === "red"
      ? "border-red-200 bg-red-50"
      : highlight === "gold"
      ? "border-[#8B7355]/30 bg-[#8B7355]/5"
      : "border-gray-200 bg-gray-50";

  const valueClass =
    highlight === "green"
      ? "text-green-700"
      : highlight === "red"
      ? "text-red-700"
      : highlight === "gold"
      ? "text-[#8B7355]"
      : "text-gray-900";

  return (
    <div className={`rounded-xl border p-4 ${highlightClass}`}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
