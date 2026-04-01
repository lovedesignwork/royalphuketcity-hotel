"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ReserveButton from "./ReserveButton";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  buttonVariant?: "primary" | "outline" | "white";
  tall?: boolean;
}

export default function CTABanner({
  title,
  subtitle,
  description,
  image,
  buttonVariant = "white",
  tall = false,
}: CTABannerProps) {
  return (
    <section className={`relative ${tall ? "py-32 md:py-[350px] lg:py-[430px]" : "py-24 md:py-32"}`}>
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className={`object-cover ${tall ? "object-top" : ""}`}
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className={`relative container mx-auto px-6 ${tall ? "md:-mt-[150px]" : ""}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white max-w-3xl text-center mx-auto"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
            {title}
          </h2>

          {description && (
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              {description}
            </p>
          )}

          <ReserveButton variant={buttonVariant} size="large" />
        </motion.div>
      </div>
    </section>
  );
}
