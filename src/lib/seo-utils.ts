import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageSEOOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/images/og-image.jpg",
  noIndex = false,
}: PageSEOOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_CONFIG.name}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [ogImage],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

export function generateRoomMetadata(
  room: {
    name: string;
    slug: string;
    description: string[];
    category: string;
  }
): Metadata {
  const description = `${room.name} at Royal Phuket City Hotel. ${room.description[0].slice(0, 120)}...`;
  
  return generatePageMetadata({
    title: `${room.name}${room.category !== room.name ? ` - ${room.category}` : ""}`,
    description: description.length > 160 ? description.slice(0, 157) + "..." : description,
    path: `/${room.slug}`,
  });
}
