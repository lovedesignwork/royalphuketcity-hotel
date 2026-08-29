import type { Metadata } from "next";
import { marcellus, inter, notoSansThai } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import DesktopSiteChrome from "@/components/DesktopSiteChrome";
import { HotelJsonLd, LocalBusinessJsonLd, WebSiteJsonLd, OrganizationJsonLd } from "@/components/JsonLd";
import { AnalyticsProvider } from "@/components/Analytics";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { getInnerPathname, getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/messages";
import { localizeHref } from "@/lib/i18n/path";
import { getMobileFlags } from "@/lib/mobile-server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const path = await getInnerPathname();
  const enUrl = new URL(path, SITE_CONFIG.url).toString();
  const thUrl = new URL(localizeHref(path, "th"), SITE_CONFIG.url).toString();

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: t.meta.titleDefault,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    applicationName: SITE_CONFIG.name,
    keywords:
      locale === "th"
        ? [
            "โรงแรมรอยัล ภูเก็ต ซิตี้",
            "โรงแรมภูเก็ต",
            "โรงแรมเมืองเก่าภูเก็ต",
            "โรงแรม 4 ดาว ภูเก็ต",
            "ที่พักภูเก็ตทาวน์",
            "งานแต่งงานภูเก็ต",
            "ห้องประชุมภูเก็ต",
          ]
        : [
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
      locale: locale === "th" ? "th_TH" : "en_US",
      alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      url: locale === "th" ? thUrl : enUrl,
      title: t.meta.titleDefault,
      description: t.meta.description,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.titleDefault,
      description: t.meta.description,
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
      canonical: locale === "th" ? thUrl : enUrl,
      languages: {
        en: enUrl,
        th: thUrl,
        "x-default": enUrl,
      },
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const { isApp } = await getMobileFlags();

  return (
    <html
      lang={locale}
      className={`${marcellus.variable} ${inter.variable} ${notoSansThai.variable} ${
        locale === "th" ? notoSansThai.className : ""
      }`}
    >
      <head>
        {!isApp && (
          <>
            <WebSiteJsonLd />
            <OrganizationJsonLd />
            <HotelJsonLd />
            <LocalBusinessJsonLd />
          </>
        )}
      </head>
      <body className={isApp ? "antialiased mobile-app-body" : "antialiased"}>
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <AnalyticsProvider>
            <DesktopSiteChrome
              header={isApp ? null : <Header />}
              footer={isApp ? null : <Footer />}
              cookie={isApp ? null : <CookieConsent />}
            >
              {children}
            </DesktopSiteChrome>
          </AnalyticsProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
