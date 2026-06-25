import type { Metadata } from "next";
import { marcellus, inter } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { HotelJsonLd, LocalBusinessJsonLd, WebSiteJsonLd, OrganizationJsonLd } from "@/components/JsonLd";
import { AnalyticsProvider } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Luxury 4-Star Hotel in Phuket Old Town`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [
    "Royal Phuket City Hotel",
    "Phuket hotel",
    "Phuket Old Town hotel",
    "luxury hotel Phuket",
    "4-star hotel Thailand",
    "Phuket accommodation",
    "hotel near Phuket Old Town",
    "Phuket wedding venue",
    "Phuket meeting rooms",
    "rooftop restaurant Phuket",
  ],
  authors: [{ name: "Royal Phuket City Hotel", url: SITE_CONFIG.url }],
  creator: "Royal Phuket City Hotel",
  publisher: "Royal Phuket City Hotel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | Luxury 4-Star Hotel in Phuket Old Town`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Phuket City Hotel - Luxury 4-Star Hotel in Phuket Old Town",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Luxury 4-Star Hotel in Phuket Old Town`,
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
    canonical: "/",
  },
  verification: {
    google: "google-site-verification-code",
  },
  icons: {
    icon: "/images/rpc-icon.svg",
    shortcut: "/images/rpc-icon.svg",
    apple: "/images/rpc-icon.svg",
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${inter.variable}`}>
      <head>
        <WebSiteJsonLd />
        <OrganizationJsonLd />
        <HotelJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className="antialiased">
        <AnalyticsProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
