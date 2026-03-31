"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ReserveButton from "./ReserveButton";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  showReserveButton?: boolean;
  height?: "full" | "large" | "medium";
  overlay?: "dark" | "medium" | "light";
  subtitleSize?: "default" | "large";
}

export default function HeroSection({
  title,
  subtitle,
  description,
  image,
  showReserveButton = false,
  height = "full",
  overlay = "medium",
  subtitleSize = "default",
}: HeroSectionProps) {
  const heightClasses = {
    full: "h-screen",
    large: "h-[85vh]",
    medium: "h-[60vh]",
  };

  const overlayClasses = {
    dark: "bg-black/50",
    medium: "bg-black/30",
    light: "bg-black/20",
  };

  return (
    <section className={`relative ${heightClasses[height]} min-h-[500px]`}>
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {subtitle && (
              <p className={`text-white mb-4 drop-shadow-lg ${subtitleSize === "large" ? "text-2xl tracking-wide uppercase" : "text-[19px] tracking-[0.15em] uppercase"}`}>{subtitle}</p>
            )}

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-6 max-w-4xl mx-auto whitespace-pre-line drop-shadow-lg">
              {title}
            </h1>

            {description && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-lg">
                {description}
              </p>
            )}

            {showReserveButton && <ReserveButton variant="white" />}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {height === "full" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/80 rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
