"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

export interface SelectOption { value: string; label: string; disabled?: boolean }

/** Shared admin select: keyboard navigation, disabled options, and an unclipped menu. */
export function StyledSelect({ label, value, onChange, options, disabled = false, name }: {
  label: string; value: string; onChange: (value: string) => void;
  options: SelectOption[]; disabled?: boolean; name?: string;
}) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, maxHeight: 240 });
  const selected = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect) return;
      const below = window.innerHeight - rect.bottom - 12;
      const height = Math.min(240, options.length * 40 + 8);
      const above = below < height && rect.top > below;
      const maxHeight = Math.max(40, Math.min(height, above ? rect.top - 12 : below));
      setPosition({ top: above ? rect.top - maxHeight - 4 : rect.bottom + 4,
        left: Math.max(8, Math.min(rect.left, window.innerWidth - rect.width - 8)), width: rect.width, maxHeight });
    };
    reposition();
    const outside = (event: PointerEvent) => {
      if (!trigger.current?.contains(event.target as Node) && !list.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const show = () => {
    setActive(selected >= 0 && !options[selected].disabled ? selected : options.findIndex((option) => !option.disabled));
    setOpen(true);
  };
  const choose = (index: number) => {
    if (!options[index] || options[index].disabled) return;
    onChange(options[index].value);
    setOpen(false);
    trigger.current?.focus();
  };
  const keydown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Tab" || event.key === "Escape") { setOpen(false); return; }
    const enabled = options.map((option, i) => option.disabled ? -1 : i).filter((i) => i >= 0);
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      if (!open) { show(); return; }
      if (event.key === "Enter" || event.key === " ") { choose(active); return; }
      const current = enabled.indexOf(active);
      const next = event.key === "Home" ? 0 : event.key === "End" ? enabled.length - 1
        : (current + (event.key === "ArrowDown" ? 1 : -1) + enabled.length) % enabled.length;
      setActive(enabled[next] ?? -1);
    } else if (event.key.length === 1) {
      const next = options.findIndex((option) => !option.disabled && option.label.toLowerCase().startsWith(event.key.toLowerCase()));
      if (next >= 0) { event.preventDefault(); setActive(next); setOpen(true); }
    }
  };

  return <div className="min-w-40">
    <label id={`${id}-label`} className="mb-1.5 block text-xs font-medium text-gray-600">{label}</label>
    <button ref={trigger} type="button" role="combobox" aria-labelledby={`${id}-label`}
      aria-expanded={open} aria-controls={open ? `${id}-list` : undefined} aria-haspopup="listbox"
      aria-activedescendant={open && active >= 0 ? `${id}-${active}` : undefined} disabled={disabled}
      onClick={() => open ? setOpen(false) : show()} onKeyDown={keydown} onBlur={() => setOpen(false)}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-900 hover:border-[#8B7355] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B7355] disabled:cursor-not-allowed disabled:opacity-50">
      <span>{options[selected]?.label || "Select"}</span>
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m7 10 5 5 5-5" /></svg>
    </button>
    {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
    {open && !disabled && createPortal(<ul ref={list} id={`${id}-list`} role="listbox" aria-labelledby={`${id}-label`}
      style={position} className="fixed z-[10050] overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 text-sm text-gray-900 shadow-lg">
      {options.map((option, i) => <li id={`${id}-${i}`} key={option.value} role="option"
        aria-selected={option.value === value} aria-disabled={option.disabled || undefined}
        onPointerDown={(event) => event.preventDefault()} onClick={() => choose(i)}
        onPointerMove={() => !option.disabled && setActive(i)}
        className={`px-3 py-2.5 ${option.disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer"} ${active === i ? "bg-[#8B7355]/10" : ""} ${option.value === value ? "font-semibold text-[#705C42]" : ""}`}>
        {option.label}
      </li>)}
    </ul>, document.body)}
  </div>;
}
