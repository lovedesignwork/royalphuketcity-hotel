"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function SparkleOverlay() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 50; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.size}px rgba(255, 255, 255, 0.3)`,
          }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0],
            scale: [0, 1, 0.8, 1.2, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional golden sparkles */}
      {sparkles.slice(0, 20).map((sparkle) => (
        <motion.div
          key={`gold-${sparkle.id}`}
          className="absolute"
          style={{
            left: `${(sparkle.x + 30) % 100}%`,
            top: `${(sparkle.y + 20) % 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0.3, 0.8, 0],
            scale: [0, 1, 0.6, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration + 1,
            delay: sparkle.delay + 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={sparkle.size * 3}
            height={sparkle.size * 3}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="#D4AF37"
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
