import Image from "next/image";
import MobileLink from "./MobileLink";

type Props = {
  href: string;
  image: string;
  alt: string;
  title: string;
  subtitle?: string;
  meta?: string;
  className?: string;
  priority?: boolean;
};

export default function VisualCard({
  href,
  image,
  alt,
  title,
  subtitle,
  meta,
  className = "",
  priority = false,
}: Props) {
  return (
    <MobileLink
      href={href}
      className={`group relative block overflow-hidden rounded-[16px] ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 430px) 100vw, 430px"
        className="object-cover transition-transform duration-500 group-active:scale-[1.02]"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        {meta ? (
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-white/80">
            {meta}
          </p>
        ) : null}
        <h3 className="font-heading text-xl leading-tight">{title}</h3>
        {subtitle ? <p className="mt-1 text-sm text-white/85">{subtitle}</p> : null}
      </div>
    </MobileLink>
  );
}
