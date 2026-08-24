"use client";

import { EXTERNAL_LINKS } from "@/lib/constants";
import { useLocale } from "@/components/i18n/LocaleProvider";

interface ReserveButtonProps {
  variant?: "primary" | "outline" | "white";
  size?: "default" | "large";
  className?: string;
}

export default function ReserveButton({
  variant = "primary",
  size = "default",
  className = "",
}: ReserveButtonProps) {
  const { locale, t } = useLocale();
  const isThai = locale === "th";

  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300";
  const tracking = isThai ? "" : "tracking-[0.15em] uppercase";

  const sizeClasses = {
    default: "px-6 py-3 text-xs",
    large: "px-8 py-4 text-sm",
  };

  const variantClasses = {
    primary: "bg-[--color-accent] text-white hover:bg-[--color-accent-hover]",
    outline:
      "border border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-white",
    white:
      "border border-white text-white hover:bg-[--color-accent] hover:border-[--color-accent] hover:text-white drop-shadow-lg",
  };

  return (
    <a
      href={EXTERNAL_LINKS.booking}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${tracking} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {t.common.reserve}
    </a>
  );
}
