import { CalculatorInputs } from "@/types/calculator";

interface Props {
  inputs: CalculatorInputs;
  onChange: (updates: Partial<CalculatorInputs>) => void;
}

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}

function SliderField({ label, value, min, max, step, suffix, onChange }: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
        <span className="text-sm font-bold px-2.5 py-0.5 rounded-full bg-[#8B7355] text-white min-w-[48px] text-center">
          {value}{suffix}
        </span>
      </div>
      <div className="relative flex items-center h-6">
        <div className="absolute inset-x-0 h-2 bg-gray-200 rounded-full pointer-events-none" />
        <div
          className="absolute left-0 h-2 rounded-full bg-[#8B7355] pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          style={{ "--thumb-color": "#8B7355" } as React.CSSProperties}
          className="kpi-slider relative w-full h-6 cursor-pointer appearance-none bg-transparent"
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-400">{min}{suffix}</span>
        <span className="text-[10px] text-gray-400">{max}{suffix}</span>
      </div>
    </div>
  );
}

export default function BudgetInputs({ inputs, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Budget & Channel</h2>
        <p className="text-sm text-gray-500">Define your paid media budget, conversion assumptions, and organic room nights.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Monthly Budget */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Monthly Ad Budget (THB)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">฿</span>
            <input
              type="number"
              min={0}
              step={5000}
              value={inputs.monthlyBudget}
              onChange={(e) => onChange({ monthlyBudget: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355]"
            />
          </div>
        </div>

        {/* Cost Per Lead */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Cost Per Lead (THB)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">฿</span>
            <input
              type="number"
              min={1}
              step={10}
              value={inputs.costPerLead}
              onChange={(e) => onChange({ costPerLead: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-full pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355]"
            />
          </div>
        </div>

        {/* Avg Nights */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Avg Nights per Booking
          </label>
          <input
            type="number"
            min={1}
            max={14}
            step={1}
            value={inputs.avgNights}
            onChange={(e) => onChange({ avgNights: Math.min(14, Math.max(1, parseInt(e.target.value) || 1)) })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355]"
          />
        </div>

        {/* Organic Monthly */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            OTA + Organic Room Nights/Month
          </label>
          <input
            type="number"
            min={0}
            step={50}
            value={inputs.organicMonthly}
            onChange={(e) => onChange({ organicMonthly: Math.max(0, parseInt(e.target.value) || 0) })}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 focus:border-[#8B7355]"
          />
          <p className="text-[10px] text-gray-400 mt-1">Room nights from OTA, direct & walk-in (no ad spend)</p>
        </div>
      </div>

      {/* Conversion Rate Slider */}
      <SliderField
        label="Lead → Booking Conversion Rate"
        value={inputs.conversionRate}
        min={1}
        max={40}
        step={1}
        suffix="%"
        onChange={(v) => onChange({ conversionRate: v })}
      />

      {/* Budget summary hint */}
      {inputs.monthlyBudget > 0 && inputs.costPerLead > 0 && (
        <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ฿{inputs.monthlyBudget.toLocaleString()} ÷ ฿{inputs.costPerLead} CPL ={" "}
          <strong className="text-gray-700">{Math.floor(inputs.monthlyBudget / inputs.costPerLead).toLocaleString()} leads/month</strong>
          {" "}× {inputs.conversionRate}% conversion ={" "}
          <strong className="text-gray-700">{Math.round(Math.floor(inputs.monthlyBudget / inputs.costPerLead) * (inputs.conversionRate / 100)).toLocaleString()} bookings/month</strong>
        </div>
      )}
    </div>
  );
}
