import { CalculatorInputs } from "@/types/calculator";

interface Props {
  inputs: CalculatorInputs;
  onChange: (updates: Partial<CalculatorInputs>) => void;
}

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  accentColor?: "gray" | "gold";
}

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  accentColor = "gold",
}: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const color = accentColor === "gold" ? "#8B7355" : "#6B7280";

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label
          htmlFor={id}
          className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          {label}
        </label>
        <span
          className="text-sm font-bold px-2.5 py-0.5 rounded-full text-white min-w-[48px] text-center"
          style={{ backgroundColor: color }}
        >
          {value}%
        </span>
      </div>

      {/* Track wrapper */}
      <div className="relative flex items-center h-6">
        {/* Background track */}
        <div className="absolute inset-x-0 h-2 bg-gray-200 rounded-full pointer-events-none" />
        {/* Filled track */}
        <div
          className="absolute left-0 h-2 rounded-full pointer-events-none"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        {/* Native input — full size, transparent, sits on top */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          style={
            {
              "--thumb-color": color,
            } as React.CSSProperties
          }
          className="kpi-slider relative w-full h-6 cursor-pointer appearance-none bg-transparent"
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
      {/* Slider thumb styles — scoped via class */}
      <style>{`
        .kpi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--thumb-color);
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          cursor: pointer;
          margin-top: -4px;
        }
        .kpi-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--thumb-color);
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          cursor: pointer;
        }
        .kpi-slider::-webkit-slider-runnable-track {
          height: 8px;
          background: transparent;
          border-radius: 4px;
        }
        .kpi-slider::-moz-range-track {
          height: 8px;
          background: transparent;
          border-radius: 4px;
        }
        .kpi-slider:focus {
          outline: none;
        }
        .kpi-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(139,115,85,0.25);
        }
      `}</style>

      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Occupancy Targets</h2>
        <p className="text-sm text-gray-500">Set your current baseline and campaign goal.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SliderField
          id="current-occ"
          label="Current Occupancy"
          value={inputs.currentOcc}
          min={5}
          max={95}
          step={1}
          onChange={(v) => onChange({ currentOcc: Math.min(v, inputs.targetOcc - 1) })}
          accentColor="gray"
        />
        <SliderField
          id="target-occ"
          label="Target Occupancy"
          value={inputs.targetOcc}
          min={5}
          max={100}
          step={1}
          onChange={(v) => onChange({ targetOcc: Math.max(v, inputs.currentOcc + 1) })}
          accentColor="gold"
        />
      </div>

      {gap > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
          <svg
            className="w-4 h-4 text-amber-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span>
            You need to lift occupancy by{" "}
            <strong>{gap} percentage points</strong> — from {inputs.currentOcc}% to{" "}
            {inputs.targetOcc}%.
          </span>
        </div>
      )}
    </div>
  );
}
