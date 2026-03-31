import type { Metadata } from "next";
import { marcellus, inter } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HotelJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { AnalyticsProvider } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Luxury Hotel in Phuket Old Town`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  keywords: [
    "Royal Phuket City Hotel",
    "Phuket hotel",
    "Phuket Old Town hotel",
    "luxury hotel Phuket",
    "4-star hotel Thailand",
    "Phuket accommodation",
    "hotel near Phuket Old Town",
  ],
  authors: [{ name: "Royal Phuket City Hotel" }],
  creator: "Royal Phuket City Hotel",
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Phuket City Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: "/images/rpc-icon.svg",
    shortcut: "/images/rpc-icon.svg",
    apple: "/images/rpc-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${inter.variable}`}>
      <head>
        <HotelJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className="antialiased">
        <AnalyticsProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
