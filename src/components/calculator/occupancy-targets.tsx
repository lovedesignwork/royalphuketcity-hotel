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
  onChange: (v: number) => void;
  color?: string;
}

function SliderField({ label, value, min, max, step, onChange, color = "#8B7355" }: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
        <span
          className="text-sm font-bold px-2.5 py-0.5 rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {value}%
        </span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute left-0 top-0 h-2 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
          style={{ left: `calc(${pct}% - 8px)`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-400">{min}%</span>
        <span className="text-[10px] text-gray-400">{max}%</span>
      </div>
    </div>
  );
}

export default function OccupancyTargets({ inputs, onChange }: Props) {
  const gap = inputs.targetOcc - inputs.currentOcc;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Occupancy Targets</h2>
        <p className="text-sm text-gray-500">Set your current baseline and campaign goal.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SliderField
          label="Current Occupancy"
          value={inputs.currentOcc}
          min={5}
          max={95}
          step={1}
          onChange={(v) => onChange({ currentOcc: Math.min(v, inputs.targetOcc - 1) })}
          color="#6B7280"
        />
        <SliderField
          label="Target Occupancy"
          value={inputs.targetOcc}
          min={5}
          max={100}
          step={1}
          onChange={(v) => onChange({ targetOcc: Math.max(v, inputs.currentOcc + 1) })}
          color="#8B7355"
        />
      </div>

      {gap > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
          <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>
            You need to lift occupancy by <strong>{gap} percentage points</strong> — from {inputs.currentOcc}% to {inputs.targetOcc}%.
          </span>
        </div>
      )}
    </div>
  );
}
