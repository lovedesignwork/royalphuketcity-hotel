"use client";

import { useState } from "react";
import Image from "next/image";

const galleryImages = [
  // Row 1
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/14.March.2025 Thananya and Apinut Royal Phuket City-1725_resize.jpg", alt: "Wedding ceremony" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/14.March.2025 Thananya and Apinut Royal Phuket City-3988_resize.jpg", alt: "Wedding reception" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/14.March.2025 Thananya and Apinut Royal Phuket City-5388_resize.jpg", alt: "Wedding ballroom" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/14.March.2025 Thananya and Apinut Royal Phuket City-6625_resize.jpg", alt: "Wedding couple" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/2024.12.19 WD Cin-Ong Royal-10365_resize.jpg", alt: "Wedding decorations" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/2024.12.19 WD Cin-Ong Royal-10468_resize.jpg", alt: "Wedding celebration" },
  // Row 2
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/2024.12.19 WD Cin-Ong Royal-8363_resize.jpg", alt: "Wedding dance" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/2024.12.19 WD Cin-Ong Royal-8404_resize.jpg", alt: "Wedding flowers" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/2024.12.19 WD Cin-Ong Royal-8434_resize.jpg", alt: "Wedding table setting" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0001_resize.jpg", alt: "Wedding venue" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0003_resize.jpg", alt: "Wedding guests" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0007_resize.jpg", alt: "Wedding rings" },
  // Row 3
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0029_resize.jpg", alt: "Wedding bouquet" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0108_resize.jpg", alt: "Wedding party" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0159_resize.jpg", alt: "Wedding toast" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0163_resize.jpg", alt: "Wedding dinner" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/28 July 2022_0169_resize.jpg", alt: "Wedding moments" },
  { src: "/images/HOTEL WEBSITE/Wedding/AllGallery/line_oa_chat_240912_092740_resize.jpg", alt: "Wedding celebration" },
];

export default function WeddingGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      <section className="bg-white">
        {/* Section Title */}
        <div className="text-center py-16 md:py-20">
          <p className="text-[--color-accent] uppercase tracking-widest text-sm mb-4">
            Cherished Moments
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary]">
            Celebrating Love at Royal Phuket City
          </h2>
        </div>
        
        <div className="grid grid-cols-6 gap-[2px]">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:ring-inset"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 16.66vw, 16.66vw"
                quality={100}
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10 p-2"
            aria-label="Previous image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10 p-2"
            aria-label="Next image"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4 md:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={100}
              unoptimized
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-wide">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}
