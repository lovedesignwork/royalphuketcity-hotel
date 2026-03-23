"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  theme = "light",
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  const colorClasses = {
    light: {
      label: "text-[--color-text-secondary]",
      title: "text-[--color-text-primary]",
      subtitle: "text-[--color-text-secondary]",
    },
    dark: {
      label: "text-white/70",
      title: "text-white",
      subtitle: "text-white/80",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mb-12 ${alignmentClasses[align]}`}
    >
      {label && (
        <span className={`label-accent ${colorClasses[theme].label} block mb-3`}>
          {label}
        </span>
      )}

      <h2
        className={`font-heading text-3xl md:text-4xl lg:text-5xl ${colorClasses[theme].title}`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-lg ${colorClasses[theme].subtitle} max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
