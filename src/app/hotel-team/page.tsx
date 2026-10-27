import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";
import { HOTEL_TEAM_AUTHOR, HOTEL_TEAM_PATH } from "@/lib/article-editorial";
import { generatePageMetadata } from "@/lib/seo-utils";

const description = "About the Royal Phuket City Hotel Team byline, the hotel's official guides, and contacts for accommodation, dining, weddings and meetings in Phuket Town.";

export const metadata = generatePageMetadata({
  title: "Royal Phuket City Hotel Team",
  description,
  path: HOTEL_TEAM_PATH,
  ogImage: "/images/HOTEL WEBSITE/RPC-Main-Image.jpg",
});

export default function HotelTeamPage() {
  return (
    <article className="bg-white pt-32 pb-20 md:pt-40">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${SITE_CONFIG.url}${HOTEL_TEAM_PATH}#profile`,
        url: `${SITE_CONFIG.url}${HOTEL_TEAM_PATH}`,
        name: HOTEL_TEAM_AUTHOR.name,
        description,
        mainEntity: {
          ...HOTEL_TEAM_AUTHOR,
          description: "The organizational byline used for articles on the Royal Phuket City Hotel website.",
          parentOrganization: { "@id": `${SITE_CONFIG.url}/#hotel` },
        },
      }} />
      <div className="container mx-auto px-6 max-w-4xl">
        <p className="label-accent text-[--color-accent] mb-4">About our hotel guides</p>
        <h1 className="font-heading text-4xl md:text-5xl mb-6">{HOTEL_TEAM_AUTHOR.name}</h1>
        <p className="text-lg text-[--color-text-secondary] leading-relaxed mb-8">
          Royal Phuket City Hotel Team is the organizational byline used on this hotel website.
          Our articles introduce the hotel and help visitors plan accommodation, dining,
          celebrations and time in Phuket Town. This profile connects those guides with
          the hotel&apos;s services and official contact details.
        </p>
        <figure className="mb-12">
          <Image
            src="/images/HOTEL WEBSITE/RPC-Main-Image.jpg"
            alt="Royal Phuket City Hotel and surrounding Phuket Town streets at dusk"
            width={2489}
            height={1217}
            sizes="(max-width: 896px) 100vw, 896px"
            className="w-full h-auto"
          />
          <figcaption className="mt-3 text-sm text-[--color-text-secondary]">
            Royal Phuket City Hotel in Phuket Town, from the hotel&apos;s existing property photo collection.
          </figcaption>
        </figure>
        <div className="space-y-10 text-[--color-text-secondary] leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl text-[--color-text-primary] mb-4">The hotel behind the guides</h2>
            <p>
              Royal Phuket City Hotel is located at {HOTEL_INFO.address}. The hotel offers
              rooms and suites, restaurants, an outdoor swimming pool, fitness facilities,
              and venues for weddings, meetings and events. These services provide the
              context for the accommodation and event-planning information on this website.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-2xl text-[--color-text-primary] mb-4">Find details for your visit</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li><Link href="/rooms-suites" className="underline underline-offset-4">Rooms and suites</Link>: photographs, room layouts and accommodation options.</li>
              <li><Link href="/dining" className="underline underline-offset-4">Dining</Link> and <Link href="/facilities" className="underline underline-offset-4">facilities</Link>: the hotel&apos;s restaurants and services for your stay.</li>
              <li><Link href="/wedding-venues" className="underline underline-offset-4">Wedding venues</Link>: celebration options and contact details for the wedding team.</li>
              <li><Link href="/meeting-events" className="underline underline-offset-4">Meetings and events</Link>: room configurations and enquiries for your event.</li>
              <li><Link href="/download-fact-sheets" className="underline underline-offset-4">Hotel fact sheets</Link>: downloadable hotel and meeting information.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-heading text-2xl text-[--color-text-primary] mb-4">Editorial contact</h2>
            <p>
              For content questions, corrections or review requests, contact John Calvin at{" "}
              <a href="mailto:marketing@royalphuketcity.com" className="underline underline-offset-4">marketing@royalphuketcity.com</a>.
              Please include the relevant article link and the details you would like reviewed.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-2xl text-[--color-text-primary] mb-4">Hotel enquiries</h2>
            <p>
              For room availability, current offers, opening hours or an event requirement,
              confirm the details with the hotel before making your plans. You can also{" "}
              <Link href="/contact" className="underline underline-offset-4">contact the hotel</Link> for help with your visit.
            </p>
            <p className="mt-4">
              Telephone: <a href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`} className="underline underline-offset-4">{HOTEL_INFO.phone}</a><br />
              Reservations: <a href={`mailto:${HOTEL_INFO.email}`} className="underline underline-offset-4">{HOTEL_INFO.email}</a>
            </p>
          </section>
          <p><Link href="/blog" className="underline underline-offset-4">Explore the hotel&apos;s articles and guides</Link></p>
        </div>
      </div>
    </article>
  );
}
