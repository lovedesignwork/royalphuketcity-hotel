import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection, SectionHeading, CTABanner } from "@/components";
import MICEPhotoSlider from "@/components/MICEPhotoSlider";
import EventInquiryForm from "@/components/EventInquiryForm";
import { SITE_CONFIG } from "@/lib/constants";
import { MICE_EVENT_TYPES, MICE_EVENT_TYPE_SLUGS } from "@/lib/mice-event-types-data";

export const metadata: Metadata = {
  title: "Meeting & Events",
  description:
    "Host successful meetings and events at Royal Phuket City Hotel. 9 versatile meeting rooms with state-of-the-art AV equipment and dedicated event planning support.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/meeting-events`,
  },
  openGraph: {
    title: "Meeting & Events | Royal Phuket City Hotel",
    description:
      "9 versatile meeting rooms with state-of-the-art AV equipment for conferences, seminars, and corporate events.",
    url: `${SITE_CONFIG.url}/meeting-events`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meeting & Events at Royal Phuket City Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meeting & Events | Royal Phuket City Hotel",
    description:
      "9 versatile meeting rooms with state-of-the-art AV equipment for your corporate events.",
    images: ["/images/og-image.jpg"],
  },
};

const meetingRooms = [
  {
    name: "Grand Ballroom",
    area: 1637,
    height: 6,
    classroom: 800,
    theater: 2300,
    ushape: null,
    boardroom: null,
    cocktail: 2000,
    banquetBuffet: 600,
    banquetSet: 1000,
  },
  {
    name: "Ballroom 1 & 2",
    area: 1023,
    height: 6,
    classroom: 450,
    theater: 1000,
    ushape: 120,
    boardroom: 120,
    cocktail: 1200,
    banquetBuffet: 350,
    banquetSet: 450,
  },
  {
    name: "Ballroom 1 & 4",
    area: 996,
    height: null,
    classroom: 400,
    theater: 900,
    ushape: null,
    boardroom: null,
    cocktail: 700,
    banquetBuffet: 350,
    banquetSet: 450,
  },
  {
    name: "Ballroom 2 & 3",
    area: 642,
    height: null,
    classroom: 200,
    theater: 400,
    ushape: 60,
    boardroom: 60,
    cocktail: 250,
    banquetBuffet: 200,
    banquetSet: 300,
  },
  {
    name: "Ballroom 1",
    area: 617,
    height: 6,
    classroom: 300,
    theater: 500,
    ushape: 60,
    boardroom: 60,
    cocktail: 250,
    banquetBuffet: 200,
    banquetSet: 250,
  },
  {
    name: "Ballroom 2",
    area: 405,
    height: 6,
    classroom: 140,
    theater: 300,
    ushape: 45,
    boardroom: 45,
    cocktail: 150,
    banquetBuffet: 170,
    banquetSet: 200,
  },
  {
    name: "Ballroom 3",
    area: 236,
    height: 3,
    classroom: null,
    theater: null,
    ushape: null,
    boardroom: null,
    cocktail: null,
    banquetBuffet: null,
    banquetSet: null,
  },
  {
    name: "Ballroom 4",
    area: 378,
    height: 3,
    classroom: null,
    theater: null,
    ushape: null,
    boardroom: null,
    cocktail: null,
    banquetBuffet: null,
    banquetSet: null,
  },
  {
    name: "Raya",
    area: 186,
    height: 3,
    classroom: 80,
    theater: 180,
    ushape: 40,
    boardroom: 40,
    cocktail: 100,
    banquetBuffet: 70,
    banquetSet: 90,
  },
  {
    name: "Hay",
    area: 109,
    height: 3,
    classroom: 30,
    theater: 40,
    ushape: 20,
    boardroom: 20,
    cocktail: 30,
    banquetBuffet: 30,
    banquetSet: 40,
  },
  {
    name: "Nakha",
    area: 70,
    height: 3,
    classroom: 20,
    theater: 30,
    ushape: 20,
    boardroom: 20,
    cocktail: 20,
    banquetBuffet: null,
    banquetSet: 30,
  },
  {
    name: "Hay - Nakha",
    area: 179,
    height: 3,
    classroom: 60,
    theater: 100,
    ushape: 40,
    boardroom: 40,
    cocktail: 70,
    banquetBuffet: 60,
    banquetSet: 70,
  },
  {
    name: "Bon",
    area: 66,
    height: 3,
    classroom: 20,
    theater: 40,
    ushape: 20,
    boardroom: 20,
    cocktail: 20,
    banquetBuffet: null,
    banquetSet: 30,
  },
  {
    name: "Maithon",
    area: 77,
    height: 3,
    classroom: 20,
    theater: 40,
    ushape: 20,
    boardroom: 20,
    cocktail: 20,
    banquetBuffet: null,
    banquetSet: 30,
  },
  {
    name: "Bon - Maithong",
    area: 142,
    height: 3,
    classroom: 60,
    theater: 80,
    ushape: 40,
    boardroom: 40,
    cocktail: 60,
    banquetBuffet: 50,
    banquetSet: 60,
  },
  {
    name: "Si-Rea",
    area: 26,
    height: 3,
    classroom: null,
    theater: null,
    ushape: null,
    boardroom: 10,
    cocktail: null,
    banquetBuffet: null,
    banquetSet: null,
  },
];

const services = [
  {
    title: "State-of-the-Art Technology",
    description:
      "HD projectors, LED walls, wireless presentation systems, and video conferencing capabilities in every room.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Dedicated Event Team",
    description:
      "Professional event coordinators to assist with every detail, from initial planning to on-site execution.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Catering Excellence",
    description:
      "Customized menus featuring Thai and international cuisine, coffee breaks, and themed dining experiences.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Flexible Configurations",
    description:
      "Versatile spaces that can be adapted for any event format, from boardroom meetings to large conferences.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
];

export default function MeetingEventsPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="All-In-One Venue for All Kinds of Events"
        subtitle="Meeting & Events"
        description="Flexible, elegant, and fully-equipped spaces for every kind of event."
        image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="From boardroom briefings to grand galas – we host it all."
                title="Phuket's Expansive Meetings & Events Destination"
                align="left"
              />
              <div className="space-y-4 text-[--color-text-secondary]">
                <p>
                  At Royal Phuket City Hotel, we provide more than just event space—we create experiences. As the largest venue in Southern Thailand, our hotel offers 9 fully equipped rooms, including a 1,637 sqm grand ballroom that can host up to 2,300 guests in theatre style or 1,100 in banquet format.
                </p>
                <p>
                  Whether it&apos;s a boardroom discussion or a multi-day conference, we offer customizable layouts, advanced audio-visual technology, and a dedicated planning team to make your event effortless and successful.
                </p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                <div className="relative p-6 bg-[--color-surface] border border-[#8B7355]/20 text-center group hover:border-[#8B7355]/40 transition-colors">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B7355]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B7355]" />
                  <p className="font-heading text-4xl text-[--color-accent] mb-1">9</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-[--color-text-secondary]">Meeting Rooms</p>
                </div>
                <div className="relative p-6 bg-[--color-surface] border border-[#8B7355]/20 text-center group hover:border-[#8B7355]/40 transition-colors">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B7355]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B7355]" />
                  <p className="font-heading text-4xl text-[--color-accent] mb-1">1,637</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-[--color-text-secondary]">sqm Ballroom</p>
                </div>
                <div className="relative p-6 bg-[--color-surface] border border-[#8B7355]/20 text-center group hover:border-[#8B7355]/40 transition-colors">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B7355]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B7355]" />
                  <p className="font-heading text-4xl text-[--color-accent] mb-1">2,300</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-[--color-text-secondary]">Max Capacity</p>
                </div>
                <div className="relative p-6 bg-[--color-surface] border border-[#8B7355]/20 text-center group hover:border-[#8B7355]/40 transition-colors">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B7355]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B7355]" />
                  <p className="font-heading text-4xl text-[--color-accent] mb-1">350+</p>
                  <p className="text-xs tracking-[0.15em] uppercase text-[--color-text-secondary]">Parking Spaces</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] img-hover">
              <Image
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
                alt="Conference room"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Request a Proposal */}
      <section className="py-16 md:py-20 bg-[#8B7355]/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p className="label-accent text-[#8B7355] mb-2">Request a Proposal</p>
              <h3 className="font-heading text-2xl md:text-3xl text-[--color-text-primary] mb-2">
                Contact Our Events Team
              </h3>
              <p className="text-[--color-text-secondary]">
                Let our events team help you plan the perfect meeting or event.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#event-inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Inquiry for Event
              </Link>
              <Link 
                href="/download-fact-sheets" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#8B7355]/30 text-[--color-text-primary] font-medium tracking-wide uppercase text-sm hover:bg-[#8B7355]/10 hover:border-[#8B7355]/50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Fact Sheet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Slider */}
      <MICEPhotoSlider />

      {/* Services */}
      <section className="py-20 md:py-28 bg-[#8B7355]/10">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Customizable Space & Fully-Equipped"
            title="Phuket's Premier Venue Destination"
            subtitle="Whether you're planning a product launch, annual conference, training session, or gala dinner, we tailor every detail to fit your vision. Our experienced team works closely with you to deliver an event that meets your goals and exceeds expectations."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white hairline-border rounded-full">
                  <svg
                    className="w-8 h-8 text-[--color-accent]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={service.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-xl mb-3">{service.title}</h3>
                <p className="text-sm text-[--color-text-secondary]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certified Excellence */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          {/* Double Stroke Container - White outer, Gold inner */}
          <div className="outline outline-[12px] outline-white border-2 border-[#8B7355] bg-white p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/conference-speaker.png"
                  alt="Conference speaker presentation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div>
                <p className="label-accent text-[--color-accent] mb-3">A New Standard for Meetings in Phuket</p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary] mb-6">
                  Certified Excellence
                </h2>
                <p className="text-[--color-text-secondary] leading-relaxed mb-8">
                  Royal Phuket City Hotel is proud to be recognized as a certified <strong>MICE Venue by the Thailand Convention & Exhibition Bureau (TCEB)</strong>. With SHA and Green Hotel certifications, we are committed to providing a clean, safe, and environmentally responsible venue for your events.
                </p>

                {/* Certification Logos */}
                <div className="mb-10">
                  <Image
                    src="/images/certifications.png"
                    alt="Certifications - ASEAN MICE Venue, TCEB, Halal, Green Hotel, Safe Travels, SHA Plus"
                    width={500}
                    height={80}
                    className="h-16 md:h-20 w-auto object-contain"
                  />
                </div>

                {/* Why Choose Us */}
                <div>
                  <h3 className="font-heading text-xl text-[--color-text-primary] mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    {[
                      "Southern Thailand's largest indoor venue",
                      "27+ years of professional experience",
                      "SHA & Green Hotel certified",
                      "High-speed Wi-Fi, LED displays, and AV equipment",
                      "Flexible room configurations for 10 to 2,300 guests",
                      "On-site banquet, catering, tech, and security teams",
                      "Over 350 parking spaces for guests",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[--color-text-secondary]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Rooms Floor Plan */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Precision, Performance, Prestige"
            title="Meetings & Banquet Room Capacity"
          />
          
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-[--color-text-secondary] leading-relaxed">
              Meetings & Banquet Rooms at 2nd Floor are flexible to your conference and events depend from your capacity of guests. We can tailor made to any occasion and fulfill any requirement for a party of 10 to 2,300 guests with eleven banquets and meeting rooms. A big ballroom is suitable for your party, staff party and other celebrations. Our unique style is innovative, efficient and effective.
            </p>
            <p className="text-[--color-text-secondary] mt-4 font-medium">
              Find out the capacity and dimensions of our state-of-the-art meeting room and banquet halls.
            </p>
          </div>

          {/* Floor Plan Image */}
          <div className="relative w-full mb-16">
            <Image
              src="/images/meeting-rooms-floor-plan.png"
              alt="Meeting Rooms 2nd Floor Plan - Royal Phuket City Hotel"
              width={1920}
              height={960}
              className="w-full h-auto"
            />
          </div>

          {/* Meeting Room Capacities Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              {/* Header */}
              <thead>
                <tr className="bg-[#8B7355] text-white">
                  <th className="text-left py-4 px-4 text-sm font-normal">Name</th>
                  <th className="text-center py-4 px-4 text-sm font-normal">
                    <div>Area</div>
                    <div className="text-xs opacity-80">(Sq.m.)</div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-normal">
                    <div>Height</div>
                    <div className="text-xs opacity-80">(Sq.m.)</div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-normal">
                    <div>Classroom</div>
                    <div className="text-xs opacity-80">(Pax)</div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-normal">
                    <div>Theatre</div>
                    <div className="text-xs opacity-80">(Pax)</div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-normal">
                    <div>U-Shape</div>
                    <div className="text-xs opacity-80">(Pax)</div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-normal">
                    <div>Boardroom</div>
                    <div className="text-xs opacity-80">(Pax)</div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-normal">
                    <div>Cocktail</div>
                    <div className="text-xs opacity-80">(Pax)</div>
                  </th>
                  <th className="text-center py-4 px-2 text-sm font-normal border-l border-white/20" colSpan={2}>
                    <div>Banquet (Pax)</div>
                  </th>
                </tr>
                <tr className="bg-[#8B7355] text-white border-t border-white/20">
                  <th colSpan={8}></th>
                  <th className="text-center py-2 px-3 text-xs font-normal border-l border-white/20">Buffet</th>
                  <th className="text-center py-2 px-3 text-xs font-normal">Set Table</th>
                </tr>
              </thead>
              <tbody>
                {meetingRooms.map((room, index) => (
                  <tr 
                    key={room.name} 
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#faf9f7]'
                    }`}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-800">{room.name}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {room.area.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {room.height || "-"}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {room.classroom?.toLocaleString() || "-"}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {room.theater?.toLocaleString() || "-"}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {room.ushape || "-"}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {room.boardroom || "-"}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {room.cocktail?.toLocaleString() || "-"}
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-gray-600 border-l border-gray-200">
                      {room.banquetBuffet?.toLocaleString() || "-"}
                    </td>
                    <td className="py-3 px-3 text-center text-sm text-gray-600">
                      {room.banquetSet?.toLocaleString() || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Equipment & Services */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Crafted Events in a Custom Setting"
            title="Equipment & Services"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AV Equipment",
                description: "Full suite of audiovisual tools to support presentations and conferences.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                ),
              },
              {
                title: "Sound System",
                description: "High-quality sound system that ideal for large or small conferences.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                ),
              },
              {
                title: "Wired and Wireless Microphone",
                description: "Flexible microphone options to suit different room setups and speaker preferences.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                ),
              },
              {
                title: "LCD Panel Screen",
                description: "Sleek, high-resolution display panels for impactful visual presentations.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                ),
              },
              {
                title: "LCD Projector",
                description: "Bright and clear projection for slideshows, videos, and visual content.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h5.25v5.25H13.5V13.5z" />
                  </svg>
                ),
              },
              {
                title: "PA System Portable",
                description: "Mobile public address system perfect for dynamic event setups.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                  </svg>
                ),
              },
              {
                title: "Stage: Installed",
                description: "Permanent stage setup in our main ballroom for formal presentations or performances.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                ),
              },
              {
                title: "Stage: Portable",
                description: "Modular stage setup available to suit different layouts and venues.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
              },
              {
                title: "LED Display",
                description: "Large-format LED screen for high-impact visuals and vibrant video playback.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                ),
              },
              {
                title: "F&B and Banquet Service",
                description: "Full-service catering with custom menus and seamless banquet coordination.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m18-4.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "AV Technician",
                description: "On-site technical support to ensure smooth audio-visual operations throughout your event.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>
                ),
              },
              {
                title: "Photographer",
                description: "Professional photography service to capture key moments of your event.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                ),
              },
              {
                title: "Special Guard",
                description: "Additional security personnel available for VIP events or private functions.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                title: "Computers",
                description: "Workstations available for administrative tasks.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                ),
              },
              {
                title: "Printers",
                description: "On-site printing services for documents, name tags, or presentation materials.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                  </svg>
                ),
              },
              {
                title: "High-speed Internet Access",
                description: "Fast and reliable internet, available via wired or wireless connection.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                  </svg>
                ),
              },
              {
                title: "Meeting Room",
                description: "All meeting rooms are equipped with both wired and wireless connectivity for your convenience.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                ),
              },
            ].map((service) => (
              <div key={service.title} className="flex gap-4 bg-white p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-[#8B7355]">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-heading text-lg text-[--color-text-primary] mb-1">{service.title}</h3>
                  <p className="text-sm text-[--color-text-secondary] leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Meeting Layout - Sub-section */}
          <div className="mt-20 pt-16 border-t border-[#8B7355]/20">
            <SectionHeading
              label="The Perfect Setting for Big Decisions"
              title="Meeting Layout"
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {/* U-Shape Layout */}
              <div className="flex flex-col items-center bg-white border border-[#8B7355]/20 p-6 hover:border-[#8B7355]/50 transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-[#2a2a2a]" viewBox="0 0 64 64" fill="currentColor">
                    <rect x="8" y="8" width="8" height="48" />
                    <rect x="8" y="48" width="48" height="8" />
                    <rect x="48" y="8" width="8" height="48" />
                    <rect x="16" y="16" width="4" height="4" fill="white" />
                    <rect x="16" y="24" width="4" height="4" fill="white" />
                    <rect x="16" y="32" width="4" height="4" fill="white" />
                    <rect x="16" y="40" width="4" height="4" fill="white" />
                    <rect x="44" y="16" width="4" height="4" fill="white" />
                    <rect x="44" y="24" width="4" height="4" fill="white" />
                    <rect x="44" y="32" width="4" height="4" fill="white" />
                    <rect x="44" y="40" width="4" height="4" fill="white" />
                  </svg>
                </div>
                <p className="text-sm text-[--color-text-secondary] italic">U-Shape Layout</p>
              </div>

              {/* Classroom Layout */}
              <div className="flex flex-col items-center bg-white border border-[#8B7355]/20 p-6 hover:border-[#8B7355]/50 transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-[#2a2a2a]" viewBox="0 0 64 64" fill="currentColor">
                    <rect x="24" y="4" width="16" height="8" />
                    <rect x="8" y="16" width="12" height="6" />
                    <rect x="26" y="16" width="12" height="6" />
                    <rect x="44" y="16" width="12" height="6" />
                    <rect x="8" y="26" width="12" height="6" />
                    <rect x="26" y="26" width="12" height="6" />
                    <rect x="44" y="26" width="12" height="6" />
                    <rect x="8" y="36" width="12" height="6" />
                    <rect x="26" y="36" width="12" height="6" />
                    <rect x="44" y="36" width="12" height="6" />
                    <rect x="8" y="46" width="12" height="6" />
                    <rect x="26" y="46" width="12" height="6" />
                    <rect x="44" y="46" width="12" height="6" />
                    <rect x="8" y="56" width="12" height="6" />
                    <rect x="26" y="56" width="12" height="6" />
                    <rect x="44" y="56" width="12" height="6" />
                  </svg>
                </div>
                <p className="text-sm text-[--color-text-secondary] italic">Classroom Layout</p>
              </div>

              {/* Theatre Layout */}
              <div className="flex flex-col items-center bg-white border border-[#8B7355]/20 p-6 hover:border-[#8B7355]/50 transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-[#2a2a2a]" viewBox="0 0 64 64" fill="currentColor">
                    <rect x="4" y="8" width="8" height="6" />
                    <rect x="14" y="8" width="8" height="6" />
                    <rect x="24" y="8" width="8" height="6" />
                    <rect x="34" y="8" width="8" height="6" />
                    <rect x="44" y="8" width="8" height="6" />
                    <rect x="54" y="8" width="8" height="6" />
                    <rect x="4" y="18" width="8" height="6" />
                    <rect x="14" y="18" width="8" height="6" />
                    <rect x="24" y="18" width="8" height="6" />
                    <rect x="34" y="18" width="8" height="6" />
                    <rect x="44" y="18" width="8" height="6" />
                    <rect x="54" y="18" width="8" height="6" />
                    <rect x="4" y="28" width="8" height="6" />
                    <rect x="14" y="28" width="8" height="6" />
                    <rect x="24" y="28" width="8" height="6" />
                    <rect x="34" y="28" width="8" height="6" />
                    <rect x="44" y="28" width="8" height="6" />
                    <rect x="54" y="28" width="8" height="6" />
                    <rect x="4" y="38" width="8" height="6" />
                    <rect x="14" y="38" width="8" height="6" />
                    <rect x="24" y="38" width="8" height="6" />
                    <rect x="34" y="38" width="8" height="6" />
                    <rect x="44" y="38" width="8" height="6" />
                    <rect x="54" y="38" width="8" height="6" />
                    <rect x="4" y="48" width="8" height="6" />
                    <rect x="14" y="48" width="8" height="6" />
                    <rect x="24" y="48" width="8" height="6" />
                    <rect x="34" y="48" width="8" height="6" />
                    <rect x="44" y="48" width="8" height="6" />
                    <rect x="54" y="48" width="8" height="6" />
                  </svg>
                </div>
                <p className="text-sm text-[--color-text-secondary] italic">Theatre Layout</p>
              </div>

              {/* Round Table Layout */}
              <div className="flex flex-col items-center bg-white border border-[#8B7355]/20 p-6 hover:border-[#8B7355]/50 transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-[#2a2a2a]" viewBox="0 0 64 64" fill="currentColor">
                    <circle cx="32" cy="32" r="16" />
                    <rect x="30" y="4" width="4" height="8" />
                    <rect x="30" y="52" width="4" height="8" />
                    <rect x="4" y="30" width="8" height="4" />
                    <rect x="52" y="30" width="8" height="4" />
                    <rect x="10" y="10" width="6" height="6" transform="rotate(45 13 13)" />
                    <rect x="48" y="10" width="6" height="6" transform="rotate(45 51 13)" />
                    <rect x="10" y="48" width="6" height="6" transform="rotate(45 13 51)" />
                    <rect x="48" y="48" width="6" height="6" transform="rotate(45 51 51)" />
                  </svg>
                </div>
                <p className="text-sm text-[--color-text-secondary] italic">Round Table Layout</p>
              </div>

              {/* Boardroom Layout */}
              <div className="flex flex-col items-center bg-white border border-[#8B7355]/20 p-6 hover:border-[#8B7355]/50 transition-colors">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                  <svg className="w-16 h-16 md:w-20 md:h-20 text-[#2a2a2a]" viewBox="0 0 64 64" fill="currentColor">
                    <rect x="12" y="16" width="40" height="32" />
                    <rect x="4" y="20" width="6" height="6" />
                    <rect x="4" y="30" width="6" height="6" />
                    <rect x="4" y="40" width="6" height="6" />
                    <rect x="54" y="20" width="6" height="6" />
                    <rect x="54" y="30" width="6" height="6" />
                    <rect x="54" y="40" width="6" height="6" />
                    <rect x="18" y="8" width="6" height="6" />
                    <rect x="30" y="8" width="6" height="6" />
                    <rect x="42" y="8" width="6" height="6" />
                    <rect x="18" y="50" width="6" height="6" />
                    <rect x="30" y="50" width="6" height="6" />
                    <rect x="42" y="50" width="6" height="6" />
                  </svg>
                </div>
                <p className="text-sm text-[--color-text-secondary] italic">Boardroom Layout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Tailored for Every Occasion"
            title="Event Types We Host"
            subtitle="From corporate conferences to entertainment shows, we have the experience and facilities to make your event successful."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MICE_EVENT_TYPE_SLUGS.slice(0, 12).map((slug) => {
              const event = MICE_EVENT_TYPES[slug];
              return (
                <Link
                  key={slug}
                  href={`/meeting-events/${slug}`}
                  className="group block"
                >
                  <article className="relative h-full overflow-hidden border-[3px] border-transparent hover:border-[#8B7355] transition-colors">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={event.heroImage}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-[#8B7355] text-sm uppercase tracking-widest mb-2">
                          {event.label}
                        </p>
                        <h3 className="font-heading text-2xl md:text-3xl mb-3">
                          {event.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-2">
                          {event.subtitle}
                        </p>
                        <span className="inline-flex items-center gap-2 text-sm text-[#8B7355] group-hover:gap-3 transition-all">
                          Learn More
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Inquiry Form */}
      <EventInquiryForm />

      {/* Wedding Venue CTA */}
      <section className="relative py-24 md:py-32">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
          alt="Wedding venue"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-6">
          <div className="text-center text-white max-w-3xl mx-auto">
            <p className="label-accent text-[#8B7355] mb-4">Planning a Wedding?</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
              Discover Our Wedding Venues
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              With 27+ years of professional wedding experience, elegant venues with gorgeous chandeliers, and dedicated planning teams, we make your special day truly unforgettable.
            </p>
            <Link
              href="/wedding-venues"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
            >
              Explore Wedding Venues
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
