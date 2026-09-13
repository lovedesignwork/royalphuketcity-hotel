import type { Metadata } from "next";
import { marcellus, inter, notoSansThai } from "@/lib/fonts";
import { SITE_CONFIG } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import DesktopSiteChrome from "@/components/DesktopSiteChrome";
import { HotelJsonLd, WebSiteJsonLd, OrganizationJsonLd } from "@/components/JsonLd";
import { AnalyticsProvider } from "@/components/Analytics";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { getInnerPathname, getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/messages";
import { SHOW_LANGUAGE_SWITCHER } from "@/lib/i18n/config";
import { getPageAlternates } from "@/lib/seo-utils";
import { getMobileFlags } from "@/lib/mobile-server";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const path = await getInnerPathname();
  const alternates = getPageAlternates(path, locale);
  const index = locale !== "th" || SHOW_LANGUAGE_SWITCHER;
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

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
      ...(SHOW_LANGUAGE_SWITCHER ? {
        alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      } : {}),
      url: alternates?.canonical as string,
      // Next inherits the final page title/description when these are omitted.
      images: [
        {
          url: "/images/og-image.jpg",
          width: 2489,
          height: 1217,
          alt: t.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      // Let Next populate this card from the current page's Open Graph data.
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates,
    ...(googleVerification && {
      verification: { google: googleVerification },
    }),
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
