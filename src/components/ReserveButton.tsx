import { EXTERNAL_LINKS } from "@/lib/constants";

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
  const baseClasses =
    "inline-flex items-center justify-center font-medium tracking-[0.15em] uppercase transition-all duration-300";

  const sizeClasses = {
    default: "px-6 py-3 text-xs",
    large: "px-8 py-4 text-sm",
  };

  const variantClasses = {
    primary: "bg-[--color-accent] text-white hover:bg-[--color-accent-hover]",
    outline:
      "border border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent] hover:text-white",
    white:
      "border border-white text-white hover:bg-white hover:text-[--color-text-primary]",
  };

  return (
    <a
      href={EXTERNAL_LINKS.booking}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      Reserve Now
    </a>
  );
}
