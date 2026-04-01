import { CalculatorInputs } from "@/types/calculator";

interface Props {
  inputs: CalculatorInputs;
  onChange: (updates: Partial<CalculatorInputs>) => void;
}

const MONTH_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function HotelBaseline({ inputs, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Hotel Baseline</h2>
        <p className="text-sm text-gray-500">Core hotel parameters for the campaign period.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Rooms */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Total Rooms
          </label>
          <input
            type="number"
            min={1}
            value={inputs.totalRooms}
            onChange={(e) => onChange({ totalRooms: Math.max(1, parseInt(e.target.value) || 0) })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355]"
          />
        </div>

        {/* Campaign Duration */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Campaign Duration
          </label>
          <select
            value={inputs.campaignMonths}
            onChange={(e) => onChange({ campaignMonths: parseInt(e.target.value) })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355] bg-white"
          >
            {MONTH_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m} {m === 1 ? "month" : "months"}
              </option>
            ))}
          </select>
        </div>

        {/* ADR */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Avg Rate / Night (THB)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">฿</span>
            <input
              type="number"
              min={0}
              step={100}
              value={inputs.adr}
              onChange={(e) => onChange({ adr: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
