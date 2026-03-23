"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ReserveButton from "./ReserveButton";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  image: string;
  buttonVariant?: "primary" | "outline" | "white";
}

export default function CTABanner({
  title,
  subtitle,
  image,
  buttonVariant = "white",
}: CTABannerProps) {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white max-w-3xl mx-auto"
        >
          {subtitle && (
            <p className="label-accent text-white/80 mb-4">{subtitle}</p>
          )}

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-8">
            {title}
          </h2>

          <ReserveButton variant={buttonVariant} size="large" />
        </motion.div>
      </div>
    </section>
  );
}
