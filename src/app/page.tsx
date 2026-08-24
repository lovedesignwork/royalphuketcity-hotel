import Image from "next/image";
import {
  HeroSection,
  SectionHeading,
  RoomCard,
  RestaurantCard,
  TestimonialSlider,
  CTABanner,
  AnnouncementSection,
} from "@/components";
import PhotoSlider from "@/components/PhotoSlider";
import { HOTEL_INFO } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/messages";
import { getLocalizedRestaurants, getLocalizedRooms } from "@/lib/i18n/localized-data";
import { localizeHref } from "@/lib/i18n/path";
import LocaleHomeLink from "@/components/FooterLink";

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const rooms = getLocalizedRooms(locale);
  const restaurants = getLocalizedRestaurants(locale);
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={t.home.heroTitle}
        subtitle={t.home.heroSubtitle}
        image="/images/HOTEL WEBSITE/RPC-Main-Image.jpg"
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
                label={t.home.welcomeLabel}
                title={t.home.welcomeTitle}
                align="left"
              />
              <div className="space-y-4 text-[--color-text-secondary]">
                <p>{t.home.welcomeP1}</p>
                <p>{t.home.welcomeP2}</p>
                <p>{t.home.welcomeP3}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-10 hairline-border-t">
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.totalRooms}
                  </p>
                  <p className="label-accent mt-1">{t.home.statRooms}</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.totalRestaurants}
                  </p>
                  <p className="label-accent mt-1">{t.home.statRestaurants}</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.meetingRooms}
                  </p>
                  <p className="label-accent mt-1">{t.home.statMeeting}</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    {HOTEL_INFO.parkingSpaces}
                  </p>
                  <p className="label-accent mt-1">{t.home.statParking}</p>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] img-hover">
                  <Image
                    src="/images/HOTEL WEBSITE/RPCH 027.jpg"
                    alt="Luxury Room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={100}
                    unoptimized
                  />
                </div>
                <div className="relative aspect-square img-hover">
                  <Image
                    src="/images/HOTEL WEBSITE/RPC LS ROOM 47.jpg"
                    alt="Room Lifestyle"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square img-hover">
                  <Image
                    src="/images/HOTEL WEBSITE/RPC LS ROOM 53.jpg"
                    alt="Hotel Room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] img-hover">
                  <Image
                    src="/images/HOTEL WEBSITE/RPC LS ROOM 19.jpg"
                    alt="Royal Phuket City Hotel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={100}
                    unoptimized
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
                  src="/images/Hotel-Ext.jpg"
                  alt="Royal Phuket City Hotel Exterior"
                  fill
                  className="object-cover shadow-xl"
                  sizes="30vw"
                />
              </div>
              {/* Foreground image - Old Town */}
              <div className="absolute right-0 top-0 w-[65%] aspect-[3/4] z-20 shadow-2xl">
                <Image
                  src="/images/HOTEL WEBSITE/HKT Old Town.jpg"
                  alt="Phuket Old Town"
                  fill
                  className="object-cover"
                  sizes="35vw"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <p className="label-accent text-[--color-accent] mb-3">
                {t.home.uspEyebrow}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[47px] text-[--color-text-primary] mb-6 leading-none">
                {t.home.uspTitle}
              </h2>
                <p className="text-[--color-text-secondary] leading-relaxed mb-10 max-w-lg">
                  {t.home.uspLead}
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
                    title: t.home.uspLocationTitle,
                    description: t.home.uspLocationBody,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    ),
                    title: t.home.uspFacilitiesTitle,
                    description: t.home.uspFacilitiesBody,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    title: t.home.uspBreakfastTitle,
                    description: t.home.uspBreakfastBody,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    ),
                    title: t.home.uspVenuesTitle,
                    description: t.home.uspVenuesBody,
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
      {/* Gold separator with rotating icon */}
      <div className="relative flex items-center justify-center py-2 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-6 right-6 h-px bg-[#8B7355]" />
        <div className="relative z-10 bg-white px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/rpc-icon.svg" alt="" className="w-9 h-9 animate-spin-slow" aria-hidden="true" />
        </div>
      </div>

      {/* Rooms Section */}
      <section className="py-24 md:py-32 bg-[--color-surface]">
        <div className="container mx-auto px-6">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="label-accent text-[--color-accent] block mb-3">
                {t.home.roomsLabel}
              </span>
              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-[#8B7355]" />
                <h2 className="font-heading text-4xl md:text-5xl">{t.home.roomsTitle}</h2>
              </div>
            </div>
            <p className="text-[--color-text-secondary] max-w-sm text-sm leading-relaxed md:text-right">
              {t.home.roomsLead}
            </p>
          </div>

          {/* Cards — portrait ratio */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[rooms[0], rooms[2], rooms[5]].map((room) => (
              <RoomCard key={room.slug} {...room} />
            ))}
          </div>

          <div className="text-center mt-14">
            <LocaleHomeLink href={localizeHref("/rooms-suites", locale)} className="btn-outline">
              {t.common.exploreRooms}
            </LocaleHomeLink>
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
                    src="/images/HOTEL WEBSITE/Ballroom.jpg"
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
                  {t.home.miceLabel}
                </span>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-[#8B7355] flex-shrink-0" />
                  <h2 className="font-heading text-4xl md:text-5xl leading-tight">
                    {t.home.miceTitle}
                  </h2>
                </div>
                <p className="text-[--color-text-secondary] leading-relaxed mb-10">
                  {t.home.miceBody}
                </p>

                {/* Key stats */}
                <div className="grid grid-cols-3 gap-6 pb-10 mb-10 border-b border-[--color-border]">
                  {[
                    { value: "9", label: t.home.miceRooms },
                    { value: "500+", label: t.home.miceCapacity },
                    { value: "800", label: t.home.miceBallroom },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="font-heading text-3xl text-[#8B7355]">{stat.value}</p>
                      <p className="label-accent text-[10px] sm:text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <LocaleHomeLink href={localizeHref("/meeting-events", locale)} className="inline-flex items-center gap-3 group">
                  <span className="text-[#8B7355] text-[11px] tracking-[0.2em] uppercase font-medium relative">
                    {t.common.exploreVenues}
                    <span className="absolute left-0 -bottom-0.5 w-full h-px bg-[#8B7355]/30 group-hover:bg-[#8B7355] transition-colors duration-300" />
                  </span>
                  <svg className="w-4 h-4 text-[#8B7355] transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </LocaleHomeLink>
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
              {t.home.weddingLabel}
            </span>
            <div className="flex items-center justify-center gap-5 mb-5">
              <div className="h-px w-16 bg-[#8B7355]" />
              <h2 className="font-heading text-5xl md:text-6xl">
                {t.home.weddingTitle}
              </h2>
              <div className="h-px w-16 bg-[#8B7355]" />
            </div>
            <p className="text-[--color-text-secondary] max-w-lg mx-auto leading-relaxed">
              {t.home.weddingLead}
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">

            {/* Left — Large portrait image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Wedd.jpg"
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
                  src="/images/HOTEL WEBSITE/Wedding/Resize/line_oa_chat_240912_092740_resize.jpg"
                  alt="Wedding reception"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="relative flex-1 min-h-[220px] overflow-hidden">
                <Image
                  src="/images/HOTEL WEBSITE/Wedding/Resize/line_oa_chat_240912_092809_resize.jpg"
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
                {t.home.weddingBody}
              </p>

              <div className="space-y-5">
                {t.home.weddingUsps.map((usp) => (
                  <div key={usp} className="flex items-start gap-4">
                    <div className="w-5 h-px bg-[#8B7355] mt-2.5 flex-shrink-0" />
                    <p className="text-sm text-[--color-text-secondary] leading-relaxed">{usp}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[--color-border] flex flex-wrap gap-4">
                <LocaleHomeLink href={localizeHref("/wedding-venues", locale)} className="btn-primary">
                  {t.common.exploreVenues}
                </LocaleHomeLink>
                <LocaleHomeLink href={localizeHref("/contact", locale)} className="btn-outline">
                  {t.common.requestProposal}
                </LocaleHomeLink>
              </div>
            </div>

          </div>

          {/* Bottom — 3 venue cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: t.home.venueBallroom, capacity: t.home.guestsUpTo.replace("{n}", "2,300"), size: "1,637 Sq.m", image: "/images/HOTEL WEBSITE/Wedding/Resize/MTT1996_resize.jpg" },
              { name: t.home.venueTwist, capacity: t.home.guestsUpTo.replace("{n}", "150"), size: t.home.indoorOutdoor, image: "/images/HOTEL WEBSITE/Restaurant/_DSC0516 copy_resize.jpg" },
              { name: t.home.venueYanLong, capacity: t.home.guestsUpTo.replace("{n}", "200"), size: t.home.indoor, image: "/images/HOTEL WEBSITE/Restaurant/Yan Long 008_resize.jpg" },
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
              {t.home.diningLabel}
            </span>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#8B7355]" />
              <h2 className="font-heading text-4xl md:text-5xl">{t.home.diningTitle}</h2>
              <div className="h-px w-12 bg-[#8B7355]" />
            </div>
            <p className="text-[--color-text-secondary] max-w-xl mx-auto text-base leading-relaxed">
              {t.home.diningLead}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title={t.home.ctaTitle}
        description={t.home.ctaBody}
        image="/images/HOTEL WEBSITE/RPC-Pool-Wall-scaled.jpg"
        tall
      />

      {/* Facilities Preview */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="label-accent text-[--color-accent] block mb-3">
              {t.home.facilitiesLabel}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl mb-4">
              {t.home.facilitiesTitle}
            </h2>
            <p className="text-[--color-text-secondary] max-w-2xl mx-auto">
              {t.home.facilitiesLead}
            </p>
          </div>

          {/* Facilities Grid - Vertical Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { 
                name: t.home.facPool, 
                image: "/images/HOTEL WEBSITE/RPCH 033.jpg",
                description: t.home.facPoolDesc
              },
              { 
                name: t.home.facGym, 
                image: "/images/HOTEL WEBSITE/RPCH 032.jpg",
                description: t.home.facGymDesc
              },
              { 
                name: t.home.facSpa, 
                image: "/images/HOTEL WEBSITE/Royal SPa 020.jpg",
                description: t.home.facSpaDesc
              },
              { 
                name: t.home.facMeeting, 
                image: "/images/HOTEL WEBSITE/Banquet-Royal-Phuket-City-1.jpg",
                description: t.home.facMeetingDesc
              },
              { 
                name: t.home.facBar, 
                image: "/images/HOTEL WEBSITE/Restaurant/TWIST Rooftop 030.jpg",
                description: t.home.facBarDesc
              },
              { 
                name: t.home.facBus, 
                image: "/images/HOTEL WEBSITE/Smart-Bus.jpeg",
                description: t.home.facBusDesc
              },
              { 
                name: t.home.facLobby, 
                image: "/images/HOTEL WEBSITE/RPCH 028.jpg",
                description: t.home.facLobbyDesc
              },
              { 
                name: t.home.facPark, 
                image: "/images/HOTEL WEBSITE/RPC-CAR-PARK-1.jpg",
                description: t.home.facParkDesc
              },
            ].map((facility) => (
              <div
                key={facility.name}
                className="group relative overflow-hidden bg-white"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="font-heading text-white text-lg md:text-xl mb-1">
                      {facility.name}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm tracking-wide">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <LocaleHomeLink href={localizeHref("/facilities", locale)} className="btn-outline">
              {t.common.viewAllFacilities}
            </LocaleHomeLink>
          </div>
        </div>
      </section>

      {/* Blog Section - hidden, uncomment to show */}
      {/* <BlogSection /> */}

      {/* Testimonials */}
      <TestimonialSlider />
    </>
  );
}
