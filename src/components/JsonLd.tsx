import { HOTEL_INFO, EXTERNAL_LINKS, SITE_CONFIG } from "@/lib/constants";
import { promotionExpiry } from "@/lib/promotion-validity";

const HOTEL_ID = `${SITE_CONFIG.url}/#hotel`;

function absoluteUrl(path: string) {
  return new URL(path, SITE_CONFIG.url).href;
}

// Escape HTML delimiters so content cannot terminate the script element.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

// Describe only the site's available features; there is no public search endpoint.
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": HOTEL_ID,
    },
    inLanguage: "en-US",
  };

  return <JsonLd data={schema} />;
}

// The hotel is also the publisher; shared IDs describe a single business entity.
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": HOTEL_ID,
    name: HOTEL_INFO.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/Logo-Royal-Phuket-City-Black.png"),
    },
    sameAs: [
      EXTERNAL_LINKS.facebook,
      EXTERNAL_LINKS.instagram,
      EXTERNAL_LINKS.tripadvisor,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: HOTEL_INFO.phone,
      contactType: "reservations",
      email: HOTEL_INFO.email,
      availableLanguage: ["English", "Thai"],
    },
  };

  return <JsonLd data={schema} />;
}

export function HotelJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": HOTEL_ID,
    name: HOTEL_INFO.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "154 Phang-Nga Road, Talad Yai",
      addressLocality: "Muang",
      addressRegion: "Phuket",
      postalCode: "83000",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 7.882943,
      longitude: 98.394902,
    },
    telephone: HOTEL_INFO.phone,
    email: HOTEL_INFO.email,
    starRating: {
      "@type": "Rating",
      ratingValue: HOTEL_INFO.starRating,
    },
    hasMap: EXTERNAL_LINKS.googleMaps,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool" },
      { "@type": "LocationFeatureSpecification", name: "Fitness Center" },
      { "@type": "LocationFeatureSpecification", name: "Spa" },
      { "@type": "LocationFeatureSpecification", name: "Restaurant" },
      { "@type": "LocationFeatureSpecification", name: "Bar" },
      { "@type": "LocationFeatureSpecification", name: "Room Service" },
      { "@type": "LocationFeatureSpecification", name: "Meeting Rooms" },
      { "@type": "LocationFeatureSpecification", name: "EV Charging" },
    ].map((amenity) => ({ ...amenity, value: true })),
    numberOfRooms: HOTEL_INFO.totalRooms,
    checkinTime: "14:00:00+07:00",
    checkoutTime: "12:00:00+07:00",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      EXTERNAL_LINKS.facebook,
      EXTERNAL_LINKS.instagram,
      EXTERNAL_LINKS.tripadvisor,
    ],
  };

  return <JsonLd data={schema} />;
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": HOTEL_ID,
    name: HOTEL_INFO.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: HOTEL_INFO.phone,
    email: HOTEL_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "154 Phang-Nga Road, Talad Yai",
      addressLocality: "Muang",
      addressRegion: "Phuket",
      postalCode: "83000",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 7.882943,
      longitude: 98.394902,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return <JsonLd data={schema} />;
}

interface RestaurantJsonLdProps {
  name: string;
  description: string;
  cuisine: string;
  url: string;
  image?: string;
  telephone?: string;
}

export function RestaurantJsonLd({
  name,
  description,
  cuisine,
  url,
  image,
  telephone = HOTEL_INFO.phone,
}: RestaurantJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${absoluteUrl(url)}#restaurant`,
    name,
    description,
    url: absoluteUrl(url),
    image: image ? absoluteUrl(image) : undefined,
    servesCuisine: cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: "154 Phang-Nga Road, Talad Yai",
      addressLocality: "Muang",
      addressRegion: "Phuket",
      postalCode: "83000",
      addressCountry: "TH",
    },
    telephone,
    parentOrganization: {
      "@id": HOTEL_ID,
    },
    containedInPlace: { "@id": HOTEL_ID },
  };

  return <JsonLd data={schema} />;
}

interface BreadcrumbJsonLdProps {
  items: {
    name: string;
    url: string;
  }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };

  return <JsonLd data={schema} />;
}

interface FAQJsonLdProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  if (!faqs.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

interface HotelRoomJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  bedType: string;
  occupancy: number;
  floorSize: string;
  amenities: string[];
}

export function HotelRoomJsonLd({
  name,
  description,
  image,
  url,
  bedType,
  occupancy,
  floorSize,
  amenities,
}: HotelRoomJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `${absoluteUrl(url)}#room`,
    name,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(url),
    bed: {
      "@type": "BedDetails",
      typeOfBed: bedType,
    },
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: occupancy,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: parseFloat(floorSize),
      unitCode: "MTK",
    },
    amenityFeature: amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
    containedInPlace: {
      "@id": HOTEL_ID,
    },
  };

  return <JsonLd data={schema} />;
}

interface EventVenueJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  maximumAttendeeCapacity: number;
}

export function EventVenueJsonLd({
  name,
  description,
  image,
  url,
  maximumAttendeeCapacity,
}: EventVenueJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "@id": `${absoluteUrl(url)}#venue`,
    name,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(url),
    maximumAttendeeCapacity,
    address: {
      "@type": "PostalAddress",
      streetAddress: "154 Phang-Nga Road, Talad Yai",
      addressLocality: "Muang",
      addressRegion: "Phuket",
      postalCode: "83000",
      addressCountry: "TH",
    },
    containedInPlace: {
      "@id": HOTEL_ID,
    },
  };

  return <JsonLd data={schema} />;
}

// Article/BlogPosting schema for blog posts
interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = "Royal Phuket City Hotel",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(url)}#article`,
    headline: title,
    description,
    url: absoluteUrl(url),
    image: absoluteUrl(image),
    datePublished,
    dateModified,
    author: authorName === HOTEL_INFO.name
      ? { "@type": "Organization", "@id": HOTEL_ID, name: authorName }
      : { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      "@id": HOTEL_ID,
      name: HOTEL_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/Logo-Royal-Phuket-City-Black.png"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(url),
    },
  };

  return <JsonLd data={schema} />;
}

// Offer schema for promotions
interface OfferJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  price: string;
  priceCurrency?: string;
  validFrom: string;
  validThrough: string;
}

export function OfferJsonLd({
  name,
  description,
  url,
  image,
  price,
  priceCurrency = "THB",
  validFrom,
  validThrough,
}: OfferJsonLdProps) {
  // Extract only a currency amount, never a duration, room count or discount.
  const amountPattern = "(\\d+(?:,\\d{3})*(?:\\.\\d{1,2})?)";
  const currencyMarker = priceCurrency === "THB" ? "(?:THB|฿)" : priceCurrency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const amount = price.match(new RegExp(`${currencyMarker}\\s*${amountPattern}`, "i"))
    ?? price.trim().match(new RegExp(`^${amountPattern}$`));
  const numericPrice = amount ? Number(amount[1].replace(/,/g, "")) : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${absoluteUrl(url)}#offer`,
    name,
    description,
    url: absoluteUrl(url),
    image: absoluteUrl(image),
    price: numericPrice,
    priceCurrency: numericPrice === undefined ? undefined : priceCurrency,
    validFrom: /^\d{4}-\d{2}-\d{2}$/.test(validFrom) ? `${validFrom}T00:00:00+07:00` : validFrom,
    validThrough: promotionExpiry(validThrough),
    seller: {
      "@id": HOTEL_ID,
    },
    itemOffered: {
      "@type": "Service",
      name,
      provider: { "@id": HOTEL_ID },
    },
  };

  return <JsonLd data={schema} />;
}
