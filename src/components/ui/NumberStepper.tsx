"use client";

import { Minus, Plus } from "@phosphor-icons/react";

export function NumberStepper({ id, value, min, max, onChange, disabled = false }: {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}) {
  return <div className="grid grid-cols-[2.75rem_1fr_2.75rem] rounded-lg border border-gray-300 bg-white">
    <button type="button" className="grid min-h-11 place-items-center rounded-l-lg border-r border-gray-200 hover:bg-[#f3f1ed]"
      aria-label="Decrease number of guests" disabled={disabled || value <= min} onClick={() => onChange(value - 1)}>
      <Minus size={15} aria-hidden="true" />
    </button>
    <output id={id} className="grid place-items-center font-semibold" aria-live="polite">{value}</output>
    <button type="button" className="grid min-h-11 place-items-center rounded-r-lg border-l border-gray-200 hover:bg-[#f3f1ed]"
      aria-label="Increase number of guests" disabled={disabled || value >= max} onClick={() => onChange(value + 1)}>
      <Plus size={15} aria-hidden="true" />
    </button>
  </div>;
}
