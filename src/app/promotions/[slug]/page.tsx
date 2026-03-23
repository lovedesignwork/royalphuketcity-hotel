import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Breadcrumbs } from "@/components";

interface Announcement {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  image_alt?: string;
  internal_slug: string;
  button_text: string;
}

async function getAnnouncement(slug: string): Promise<Announcement | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/announcements/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.announcement;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const announcement = await getAnnouncement(slug);

  if (!announcement) {
    return {
      title: "Promotion Not Found | Royal Phuket City Hotel",
    };
  }

  return {
    title: `${announcement.title} | Royal Phuket City Hotel`,
    description: announcement.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/promotions/${announcement.internal_slug}`,
    },
    openGraph: {
      title: `${announcement.title} | Royal Phuket City Hotel`,
      description: announcement.description,
      url: `${SITE_CONFIG.url}/promotions/${announcement.internal_slug}`,
      siteName: SITE_CONFIG.name,
      images: announcement.image
        ? [
            {
              url: announcement.image,
              width: 1200,
              height: 630,
              alt: announcement.image_alt || announcement.title,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function PromotionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const announcement = await getAnnouncement(slug);

  if (!announcement) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        {announcement.image ? (
          <>
            <Image
              src={announcement.image}
              alt={announcement.image_alt || announcement.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44]" />
        )}
        <div className="relative z-10 container mx-auto px-6 pb-12">
          {announcement.subtitle && (
            <span className="inline-block px-4 py-1.5 bg-[#8B7355] text-white text-sm font-medium rounded-full mb-4">
              {announcement.subtitle}
            </span>
          )}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl">
            {announcement.title}
          </h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Promotions", href: "/promotions" },
              { label: announcement.title, href: `/promotions/${announcement.internal_slug}` },
            ]}
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-p:text-gray-700">
              <p className="text-xl text-gray-600 leading-relaxed">
                {announcement.description}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-[#8B7355]/5 rounded-2xl p-8 text-center">
                <h3 className="font-heading text-2xl text-gray-900 mb-4">
                  Ready to Book?
                </h3>
                <p className="text-gray-600 mb-6">
                  Contact our reservations team to take advantage of this special offer.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#6d5a43] transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/rooms-suites"
                    className="px-8 py-3 border border-[#8B7355] text-[#8B7355] rounded-lg hover:bg-[#8B7355]/10 transition-colors"
                  >
                    View Rooms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
