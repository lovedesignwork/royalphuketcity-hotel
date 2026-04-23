"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ReserveButton from "./ReserveButton";
import SparkleOverlay from "./SparkleOverlay";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  showReserveButton?: boolean;
  height?: "full" | "large" | "medium" | "small";
  overlay?: "dark" | "medium" | "light";
  subtitleSize?: "default" | "large";
  showSparkles?: boolean;
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
  showSparkles = false,
}: HeroSectionProps) {
  const heightClasses = {
    full: "h-screen md:h-[75vh]",
    large: "h-[85vh]",
    medium: "h-[60vh]",
    small: "h-[35vh]",
  };

  const overlayClasses = {
    dark: "bg-black/50",
    medium: "bg-black/30",
    light: "bg-black/20",
  };

  const innerWrapperClass =
    height === "full"
      ? "pt-[120px] md:pt-[180px] md:pb-[300px]"
      : "pt-24 md:pt-28 lg:pt-[7.5rem] pb-6 md:pb-8";

  const titleClass =
    height === "small"
      ? "font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-3 sm:mb-4 max-w-4xl mx-auto whitespace-pre-line leading-tight"
      : height === "medium"
        ? "font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal mb-5 max-w-4xl mx-auto whitespace-pre-line"
        : "font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal mb-6 max-w-4xl mx-auto whitespace-pre-line";

  return (
    <section className={`relative ${heightClasses[height]} ${height === "small" ? "min-h-[300px] md:min-h-[320px]" : "min-h-[500px]"}`}>
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

      {/* Sparkle Effect */}
      {showSparkles && <SparkleOverlay />}

      {/* Content: homepage uses extra pb to lift copy; other heights get top padding so nothing sits under the sticky header. */}
      <div className={`relative h-full flex items-center justify-center ${innerWrapperClass}`}>
        <div className="container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {subtitle && (
              <p
                className={`text-white ${
                  height === "small" ? "mb-2 text-xs sm:text-sm tracking-[0.12em] uppercase" : "mb-4"
                } ${height !== "small" && subtitleSize === "large" ? "text-2xl tracking-wide uppercase" : ""} ${height !== "small" && subtitleSize !== "large" ? "text-[19px] tracking-[0.15em] uppercase" : ""}`}
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)" }}
              >
                {subtitle}
              </p>
            )}

            <h1 className={titleClass} style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.5)" }}>
              {title}
            </h1>

            {description && (
              <p
                className={`text-white/90 max-w-2xl mx-auto ${
                  height === "small" ? "text-sm sm:text-base md:text-lg mb-4 md:mb-6" : "text-lg md:text-xl mb-8"
                }`}
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)" }}
              >
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
