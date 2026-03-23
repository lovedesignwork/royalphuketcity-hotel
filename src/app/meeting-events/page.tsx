import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection, SectionHeading, CTABanner } from "@/components";

export const metadata: Metadata = {
  title: "Meeting & Events",
  description:
    "Host successful meetings and events at Royal Phuket City Hotel. 9 versatile meeting rooms, state-of-the-art AV equipment, and dedicated event planning support.",
};

const meetingRooms = [
  {
    name: "Grand Ballroom",
    size: "800 sqm",
    ceiling: "6m",
    theater: 500,
    classroom: 300,
    banquet: 400,
    ushape: 80,
    boardroom: 60,
  },
  {
    name: "Phuket Room",
    size: "200 sqm",
    ceiling: "4m",
    theater: 150,
    classroom: 80,
    banquet: 100,
    ushape: 40,
    boardroom: 30,
  },
  {
    name: "Andaman Room",
    size: "150 sqm",
    ceiling: "3.5m",
    theater: 100,
    classroom: 60,
    banquet: 80,
    ushape: 30,
    boardroom: 24,
  },
  {
    name: "Pearl Room",
    size: "100 sqm",
    ceiling: "3.5m",
    theater: 70,
    classroom: 40,
    banquet: 50,
    ushape: 24,
    boardroom: 20,
  },
  {
    name: "Coral Room",
    size: "80 sqm",
    ceiling: "3m",
    theater: 50,
    classroom: 30,
    banquet: 40,
    ushape: 20,
    boardroom: 16,
  },
  {
    name: "Jade Room",
    size: "60 sqm",
    ceiling: "3m",
    theater: 40,
    classroom: 24,
    banquet: 30,
    ushape: 16,
    boardroom: 14,
  },
  {
    name: "Ruby Room",
    size: "50 sqm",
    ceiling: "3m",
    theater: 30,
    classroom: 18,
    banquet: null,
    ushape: 14,
    boardroom: 12,
  },
  {
    name: "Sapphire Room",
    size: "40 sqm",
    ceiling: "3m",
    theater: 25,
    classroom: 15,
    banquet: null,
    ushape: 12,
    boardroom: 10,
  },
  {
    name: "Executive Boardroom",
    size: "35 sqm",
    ceiling: "3m",
    theater: null,
    classroom: null,
    banquet: null,
    ushape: null,
    boardroom: 12,
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
        title="Meeting & Events"
        subtitle="MICE Facilities"
        description="Where business meets excellence"
        image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="MICE at Royal Phuket City"
                title="Elevate Your Next Event"
                align="left"
              />
              <div className="space-y-4 text-[--color-text-secondary]">
                <p>
                  Royal Phuket City Hotel offers 9 versatile meeting rooms and
                  11 total banquet and meeting spaces, making us the premier
                  MICE destination in Phuket Old Town.
                </p>
                <p>
                  From intimate board meetings to large-scale conferences and
                  exhibitions, our flexible spaces, cutting-edge technology, and
                  experienced event team ensure every gathering is a success.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">9</p>
                  <p className="label-accent mt-1">Meeting Rooms</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    800
                  </p>
                  <p className="label-accent mt-1">sqm Grand Ballroom</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    500+
                  </p>
                  <p className="label-accent mt-1">Max Capacity</p>
                </div>
                <div>
                  <p className="font-heading text-3xl text-[--color-accent]">
                    350
                  </p>
                  <p className="label-accent mt-1">Parking Spaces</p>
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

      {/* Services */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Event Services"
            title="Everything You Need"
            subtitle="Comprehensive support to ensure your event runs flawlessly."
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

      {/* Meeting Room Capacities */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Venue Specifications"
            title="Meeting Room Capacities"
            subtitle="Find the perfect space for your event."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="hairline-border-b">
                  <th className="text-left py-4 px-4 label-accent">Room</th>
                  <th className="text-center py-4 px-4 label-accent">Size</th>
                  <th className="text-center py-4 px-4 label-accent">
                    Ceiling
                  </th>
                  <th className="text-center py-4 px-4 label-accent">
                    Theater
                  </th>
                  <th className="text-center py-4 px-4 label-accent">
                    Classroom
                  </th>
                  <th className="text-center py-4 px-4 label-accent">
                    Banquet
                  </th>
                  <th className="text-center py-4 px-4 label-accent">
                    U-Shape
                  </th>
                  <th className="text-center py-4 px-4 label-accent">
                    Boardroom
                  </th>
                </tr>
              </thead>
              <tbody>
                {meetingRooms.map((room) => (
                  <tr key={room.name} className="hairline-border-b">
                    <td className="py-4 px-4 font-medium">{room.name}</td>
                    <td className="py-4 px-4 text-center text-[--color-text-secondary]">
                      {room.size}
                    </td>
                    <td className="py-4 px-4 text-center text-[--color-text-secondary]">
                      {room.ceiling}
                    </td>
                    <td className="py-4 px-4 text-center text-[--color-text-secondary]">
                      {room.theater || "—"}
                    </td>
                    <td className="py-4 px-4 text-center text-[--color-text-secondary]">
                      {room.classroom || "—"}
                    </td>
                    <td className="py-4 px-4 text-center text-[--color-text-secondary]">
                      {room.banquet || "—"}
                    </td>
                    <td className="py-4 px-4 text-center text-[--color-text-secondary]">
                      {room.ushape || "—"}
                    </td>
                    <td className="py-4 px-4 text-center text-[--color-text-secondary]">
                      {room.boardroom || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Request Proposal */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading
            label="Get Started"
            title="Request a Proposal"
            subtitle="Let our events team help you plan the perfect meeting or event."
          />
          <Link href="/contact" className="btn-primary">
            Contact Our Events Team
          </Link>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Host Your Next Event With Us"
        subtitle="Experience the Royal Phuket City Difference"
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
      />
    </>
  );
}
