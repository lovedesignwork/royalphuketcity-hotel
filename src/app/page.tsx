import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  HeroSection,
  SectionHeading,
  RoomCard,
  RestaurantCard,
  TestimonialSlider,
  CTABanner,
  AnnouncementSection,
  BlogSection,
} from "@/components";
import PhotoSlider from "@/components/PhotoSlider";
import { ROOMS, RESTAURANTS, HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Royal Phuket City Hotel | Luxury 4-Star Hotel in Phuket Old Town",
  description:
    "Experience luxury at Royal Phuket City Hotel, a premier 4-star hotel in Phuket Old Town. 251 elegant rooms, rooftop dining, 9 meeting rooms, and world-class facilities.",
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: "Royal Phuket City Hotel | Luxury 4-Star Hotel in Phuket Old Town",
    description:
      "Experience luxury at Royal Phuket City Hotel, a premier 4-star hotel in Phuket Old Town. 251 elegant rooms, rooftop dining, and world-class facilities.",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Phuket City Hotel - Luxury Hotel in Phuket Old Town",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Phuket City Hotel | Luxury 4-Star Hotel in Phuket Old Town",
    description:
      "Experience luxury at Royal Phuket City Hotel, a premier 4-star hotel in Phuket Old Town.",
    images: ["/images/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Heritage Hospitality at Its Finest"
        subtitle="Royal Phuket City Hotel"
        description="Effortless Comfort, Exceptional Location"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        showReserveButton
        height="full"
      />

      {/* Special Announcement / Promotion Section */}
      <AnnouncementSection />

      {/* Hotel Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <SectionHeading
                label="Welcome"
                title="Experience Luxury in the Heart of Phuket"
                align="left"
              />
              <div className="space-y-4 text-[--color-text-secondary]">
                <p>
                  The Best Hotel Location in Phuket Old Town is on us! The Royal Phuket City Hotel is your perfect choice for a Phuket Old Town Hotel, offering guests a complete and unforgettable stay in the heart of this vibrant destination.
                </p>
                <p>
                  As a leading 4-star Phuket Old Town Hotel, we provide comfortable, sophisticated, and luxurious accommodation — ideal for friends exploring the city, couples on a romantic getaway, or business travelers seeking convenience and style.
                </p>
                <p>
                  With 9 versatile meeting rooms, the Royal Phuket City Hotel stands out as a top venue in Phuket Old Town for business meetings, conferences, and private events. Whether you&apos;re here for leisure or business, experience all the charm and excitement of Phuket Old Town from our perfectly located hotel.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-10 hairline-border-t">
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.totalRooms}
                  </p>
                  <p className="label-accent mt-1">Rooms</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.totalRestaurants}
                  </p>
                  <p className="label-accent mt-1">Restaurants</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.meetingRooms}
                  </p>
                  <p className="label-accent mt-1">Meeting Rooms</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.parkingSpaces}
                  </p>
                  <p className="label-accent mt-1">Parking</p>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] img-hover">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
                    alt="Hotel lobby"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square img-hover">
                  <Image
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop"
                    alt="Hotel pool"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square img-hover">
                  <Image
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
                    alt="Hotel room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] img-hover">
                  <Image
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                    alt="Hotel dining"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Photo Slider */}
      <PhotoSlider />

      {/* USP Section - Best of 4-Stars Hotel */}
      <section className="py-24 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left - Overlapping Images */}
            <div className="relative h-[480px] md:h-[520px]">
              {/* Background image - building */}
              <div className="absolute left-0 bottom-0 w-[58%] aspect-[3/4] z-10">
                <Image
                  src="https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?q=80&w=1974&auto=format&fit=crop"
                  alt="Phuket Old Town"
                  fill
                  className="object-cover shadow-xl"
                  sizes="30vw"
                />
              </div>
              {/* Foreground image - couple */}
              <div className="absolute right-0 top-0 w-[65%] aspect-[3/4] z-20 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2069&auto=format&fit=crop"
                  alt="Guests at Royal Phuket City Hotel"
                  fill
                  className="object-cover"
                  sizes="35vw"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <p className="label-accent text-[--color-accent] mb-3">
                The Best of 4-Stars Hotel in
              </p>
              <h2 className="font-heading text-[47px] text-[--color-text-primary] mb-6 leading-none">
                Phuket Old Town
              </h2>
              <p className="text-[--color-text-secondary] leading-relaxed mb-10 max-w-lg">
                The Royal Phuket City Hotel, a leading Phuket Old Town Hotel, boasts an enviable location in a peaceful area, just 5 minutes from the city centre where you will be able to enjoy a host of very different options from stylish boutiques to local markets.
              </p>

              {/* USP List */}
              <div className="space-y-7">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: "Best Location",
                    description: "Our hotel location is of the best in Phuket Old Town.",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    ),
                    title: "Best Facilities on the Hotel",
                    description: "Massage & Spa, Gym, Swimming Pool & Atrium Lounge.",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: "International Breakfast",
                    description: "Best of breakfast selection with local Thai and international dishes.",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    ),
                    title: "The Venues",
                    description: "Meet & Celebrate your events at our hotel. We offer variety size of private function space for any size of events.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-5">
                    {/* Icon */}
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-[#8B7355] text-[#8B7355]">
                      {item.icon}
                    </div>
                    {/* Text */}
                    <div>
                      <h3 className="font-heading text-lg text-[--color-text-primary] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[--color-text-secondary] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Rooms Section */}
      {/* Gold separator with heart */}
      <div className="relative flex items-center justify-center py-2 bg-white">
        <div className="absolute top-1/2 flex items-center justify-center" style={{left: 'calc((100% - 1488px) / 2)', width: '1488px'}}>
          <div className="w-full h-[2px] bg-[#8B7355]" />
        </div>
        <div className="relative z-10 bg-white px-4">
          <svg className="w-6 h-6 text-[#8B7355]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        </div>
      </div>

      {/* Rooms Section */}
      <section className="py-24 md:py-32 bg-[--color-surface]">
        <div className="container mx-auto px-6">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="label-accent text-[--color-accent] block mb-3">
                Accommodations
              </span>
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-[#8B7355]" />
                <h2 className="font-heading text-4xl md:text-5xl">Rooms & Suites</h2>
              </div>
            </div>
            <p className="text-[--color-text-secondary] max-w-sm text-sm leading-relaxed md:text-right">
              Experience refined elegance in our thoughtfully designed accommodations,
              each crafted for your comfort with stunning views of Phuket.
            </p>
          </div>

          {/* Cards — portrait ratio */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[ROOMS[0], ROOMS[2], ROOMS[5]].map((room) => (
              <RoomCard key={room.slug} {...room} />
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/rooms-suites" className="btn-outline">
              Explore All Accommodations
            </Link>
          </div>
        </div>
      </section>

      {/* Meetings & Events Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          {/* 10px white space + 1px gold border frame */}
          <div className="outline outline-[10px] outline-white border border-[#8B7355] p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left — Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
                    alt="Meetings & Events at Royal Phuket City Hotel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Gold border offset frame */}
                <div className="absolute -bottom-5 -right-5 w-3/4 h-3/4 border border-[#8B7355] -z-10" />
              </div>

              {/* Right — Content */}
              <div>
                <span className="label-accent text-[--color-accent] block mb-4">
                  MICE &amp; Corporate
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-[#8B7355] flex-shrink-0" />
                  <h2 className="font-heading text-4xl md:text-5xl leading-tight">
                    Meetings &amp; Events
                  </h2>
                </div>
                <p className="text-[--color-text-secondary] leading-relaxed mb-10">
                  Host your next meeting, conference, or corporate event in one of our 9 versatile venues. With state-of-the-art AV equipment, dedicated event planners, and customised catering, we ensure every gathering is a seamless success.
                </p>

                {/* Key stats */}
                <div className="grid grid-cols-3 gap-6 pb-10 mb-10 border-b border-[--color-border]">
                  {[
                    { value: "9", label: "Meeting Rooms" },
                    { value: "500+", label: "Max Capacity" },
                    { value: "800", label: "sqm Ballroom" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-3xl text-[#8B7355]">{stat.value}</p>
                      <p className="label-accent text-[10px] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link href="/meeting-events" className="inline-flex items-center gap-3 group">
                  <span className="text-[#8B7355] text-[11px] tracking-[0.2em] uppercase font-medium relative">
                    Explore Venues
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-[#8B7355]/30 group-hover:bg-[#8B7355] transition-colors duration-300" />
                  </span>
                  <svg className="w-4 h-4 text-[#8B7355] transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Wedding Venues Section */}
      <section className="bg-[#FAF8F5] py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-16">
            <span className="label-accent text-[--color-accent] block mb-4 tracking-[0.25em]">
              Celebrations
            </span>
            <div className="flex items-center justify-center gap-5 mb-5">
              <div className="h-px w-16 bg-[#8B7355]" />
              <h2 className="font-heading text-5xl md:text-6xl">
                Wedding Venues
              </h2>
              <div className="h-px w-16 bg-[#8B7355]" />
            </div>
            <p className="text-[--color-text-secondary] max-w-lg mx-auto leading-relaxed">
              Where love stories become timeless memories. Our dedicated wedding team crafts every detail to absolute perfection.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">

            {/* Left — Large portrait image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                  alt="Wedding ceremony"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
              {/* Gold frame offset */}
              <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 border border-[#8B7355] -z-10" />
            </div>

            {/* Center — Stacked two images */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <div className="relative flex-1 min-h-[220px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
                  alt="Wedding reception"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative flex-1 min-h-[220px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop"
                  alt="Wedding details"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>

            {/* Right — USPs */}
            <div className="lg:col-span-4 flex flex-col justify-center pl-0 lg:pl-8">
              <p className="text-[--color-text-secondary] leading-relaxed mb-8 text-sm">
                From intimate ceremonies to grand celebrations, every detail is crafted with care. Our 27+ years of experience ensure your day is nothing short of magical.
              </p>

              <div className="space-y-5">
                {[
                  "27+ years of professional wedding experience",
                  "Elegant high ceilings with gorgeous chandeliers",
                  "On-site banquet, catering, tech & security teams",
                  "Décor for any color palette and floor plan",
                  "Dance floor customized to your needs",
                  "Spacious private Bridal Suite with en-suite",
                  "Over 350 parking spaces for guests",
                ].map((usp) => (
                  <div key={usp} className="flex items-start gap-4">
                    <div className="w-5 h-px bg-[#8B7355] mt-2.5 flex-shrink-0" />
                    <p className="text-sm text-[--color-text-secondary] leading-relaxed">{usp}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[--color-border] flex flex-wrap gap-4">
                <Link href="/wedding-venues" className="btn-primary">
                  Explore Venues
                </Link>
                <Link href="/contact" className="btn-outline">
                  Request Proposal
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom — 3 venue cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: "Grand Ballroom", capacity: "Up to 500 guests", size: "800 sqm", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" },
              { name: "Rooftop Terrace", capacity: "Up to 150 guests", size: "19th Floor", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop" },
              { name: "Garden Pavilion", capacity: "Up to 200 guests", size: "Outdoor", image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop" },
            ].map((venue) => (
              <div key={venue.name} className="group relative aspect-[16/9] overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="w-6 h-px bg-[#8B7355] mb-3" />
                  <p className="font-heading text-white text-xl mb-1">{venue.name}</p>
                  <div className="flex items-center gap-3 text-[10px] text-white/60 tracking-wider uppercase">
                    <span>{venue.capacity}</span>
                    <span className="text-[#8B7355]">·</span>
                    <span>{venue.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Dining Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="label-accent text-[--color-accent] block mb-3">
              Culinary Experiences
            </span>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#8B7355]" />
              <h2 className="font-heading text-4xl md:text-5xl">Dining</h2>
              <div className="h-px w-12 bg-[#8B7355]" />
            </div>
            <p className="text-[--color-text-secondary] max-w-xl mx-auto text-base leading-relaxed">
              From authentic Cantonese cuisine to rooftop cocktails with panoramic views,
              discover our five distinctive venues.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {RESTAURANTS.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Comfort, Elegance, and Ocean Views"
        subtitle="Book Your Stay"
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Facilities Preview */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Hotel Amenities"
            title="Facilities & Services"
            subtitle="Everything you need for a perfect stay, from our rooftop pool to our state-of-the-art fitness center."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Swimming Pool", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
              { name: "Fitness Center", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
              { name: "Spa & Wellness", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
              { name: "Meeting Rooms", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
              { name: "Rooftop Bar", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { name: "Smart Bus", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
              { name: "EV Charger", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { name: "Concierge", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
            ].map((facility) => (
              <div
                key={facility.name}
                className="text-center p-6 hairline-border hover:border-[--color-accent] transition-colors group"
              >
                <svg
                  className="w-8 h-8 mx-auto mb-4 text-[--color-accent]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={facility.icon}
                  />
                </svg>
                <p className="label-accent group-hover:text-[--color-accent] transition-colors">
                  {facility.name}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/facilities" className="btn-outline">
              View All Facilities
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Testimonials */}
      <TestimonialSlider />
    </>
  );
}
