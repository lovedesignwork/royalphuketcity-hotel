import { HOTEL_INFO, EXTERNAL_LINKS, SITE_CONFIG } from "@/lib/constants";

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
