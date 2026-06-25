import { HOTEL_INFO, EXTERNAL_LINKS, SITE_CONFIG } from "@/lib/constants";

// Reusable JSON-LD component for any schema type
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// WebSite schema with SearchAction (enables sitelinks searchbox)
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Organization schema (referenced by other schemas)
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: HOTEL_INFO.name,
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}/images/rpc-icon.svg`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HotelJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
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
    priceRange: "$$$$",
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
    ],
    numberOfRooms: HOTEL_INFO.totalRooms,
    checkinTime: "14:00",
    checkoutTime: "12:00",
    sameAs: [
      EXTERNAL_LINKS.facebook,
      EXTERNAL_LINKS.instagram,
      EXTERNAL_LINKS.tripadvisor,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface RestaurantJsonLdProps {
  name: string;
  description: string;
  cuisine: string;
  url: string;
}

export function RestaurantJsonLd({
  name,
  description,
  cuisine,
  url,
}: RestaurantJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    servesCuisine: cuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: "154 Phang-Nga Road, Talad Yai",
      addressLocality: "Muang",
      addressRegion: "Phuket",
      postalCode: "83000",
      addressCountry: "TH",
    },
    telephone: HOTEL_INFO.phone,
    parentOrganization: {
      "@type": "Hotel",
      name: HOTEL_INFO.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQJsonLdProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
    name,
    description,
    image,
    url: `${SITE_CONFIG.url}${url}`,
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
      value: parseInt(floorSize),
      unitCode: "MTK",
    },
    amenityFeature: amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    })),
    containedInPlace: {
      "@type": "Hotel",
      name: HOTEL_INFO.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
    name,
    description,
    image,
    url: `${SITE_CONFIG.url}${url}`,
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
      "@type": "Hotel",
      name: HOTEL_INFO.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
    headline: title,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    image: image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: HOTEL_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/rpc-icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
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
  // Extract numeric price from string like "From ฿2,200 / 2 nights"
  const numericPrice = price.replace(/[^0-9]/g, "") || "0";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    image: image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`,
    price: numericPrice,
    priceCurrency,
    validFrom,
    validThrough,
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Hotel",
      name: HOTEL_INFO.name,
      url: SITE_CONFIG.url,
    },
    itemOffered: {
      "@type": "LodgingReservation",
      name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
