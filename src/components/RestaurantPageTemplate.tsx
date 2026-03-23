"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageGallery, ReserveButton } from "@/components";
import { RestaurantDetail } from "@/lib/restaurant-data";
import { RESTAURANTS } from "@/lib/constants";

interface RestaurantPageTemplateProps {
  restaurant: RestaurantDetail;
}

export default function RestaurantPageTemplate({
  restaurant,
}: RestaurantPageTemplateProps) {
  const otherRestaurants = RESTAURANTS.filter(
    (r) => r.slug !== restaurant.slug
  );

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={restaurant.images[0].src}
          alt={restaurant.images[0].alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="label-accent text-white/80 block mb-4">
              {restaurant.cuisine} Cuisine
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl max-w-4xl">
              {restaurant.name}
            </h1>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-6 bg-[--color-surface] hairline-border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="label-accent text-[--color-text-secondary] mb-1">
                Location
              </p>
              <p className="font-heading text-lg">{restaurant.floor}</p>
            </div>
            <div className="text-center">
              <p className="label-accent text-[--color-text-secondary] mb-1">
                Hours
              </p>
              <p className="font-heading text-lg">{restaurant.hours}</p>
            </div>
            {restaurant.phone && (
              <div className="text-center">
                <p className="label-accent text-[--color-text-secondary] mb-1">
                  Reservations
                </p>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="font-heading text-lg text-[--color-accent] hover:underline"
                >
                  {restaurant.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-heading text-3xl mb-6">The Experience</h2>
              <div className="space-y-4 text-[--color-text-secondary]">
                {restaurant.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl mb-6">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurant.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 p-4 bg-[--color-surface] hairline-border"
                  >
                    <svg
                      className="w-5 h-5 text-[--color-accent] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl text-center mb-12">Gallery</h2>
          <ImageGallery images={restaurant.images} columns={4} />
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">
            Make a Reservation
          </h2>
          <p className="text-[--color-text-secondary] mb-8 max-w-xl mx-auto">
            For reservations or special requests, please contact us directly or
            book your stay to enjoy our exceptional dining experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                className="btn-outline"
              >
                Call to Reserve
              </a>
            )}
            <ReserveButton />
          </div>
        </div>
      </section>

      {/* Other Restaurants */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl text-center mb-12">
            Explore Other Venues
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherRestaurants.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="group relative aspect-[16/9] img-hover"
              >
                <Image
                  src={other.image}
                  alt={other.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="label-accent text-white/80 block mb-2">
                      {other.cuisine}
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl">
                      {other.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
