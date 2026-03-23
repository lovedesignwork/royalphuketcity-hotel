"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "An exceptional stay in the heart of Phuket Old Town. The rooftop views are breathtaking, and the staff made us feel like royalty.",
    author: "Sarah M.",
    location: "London, UK",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Perfect blend of heritage charm and modern luxury. The Yan Long restaurant served the best dim sum we've ever had.",
    author: "James & Linda T.",
    location: "Sydney, Australia",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Outstanding location for exploring the old town. The hotel's attention to detail and service exceeded all expectations.",
    author: "Tanaka H.",
    location: "Tokyo, Japan",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "A landmark hotel that perfectly captures the essence of Phuket. The TWIST rooftop bar is a must-visit for sunset views.",
    author: "Michael R.",
    location: "New York, USA",
    rating: 5,
  },
];

import Image from "next/image";

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        alt="Royal Phuket City Hotel"
        fill
        className="object-cover"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="label-accent text-white/50 block mb-3">
            Guest Reviews
          </span>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-[#8B7355]" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white">
              What Our Guests Say
            </h2>
            <div className="h-px w-10 bg-[#8B7355]" />
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#8B7355]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-white mb-8 leading-relaxed">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </blockquote>

              {/* Gold divider */}
              <div className="w-8 h-[2px] bg-[#8B7355] mx-auto mb-6" />

              {/* Author */}
              <div>
                <p className="font-medium text-white">
                  {testimonials[currentIndex].author}
                </p>
                <p className="text-sm text-white/50 mt-1">
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors rounded-full"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-5 h-1.5 bg-[#8B7355]"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors rounded-full"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
