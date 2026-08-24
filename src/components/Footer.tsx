import { HOTEL_INFO, EXTERNAL_LINKS } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/messages";
import { localizeHref } from "@/lib/i18n/path";
import LocaleFooterLink from "./FooterLink";

const seoHrefs = {
  phuketHotel1: [
    "/phuket-old-town-hotel",
    "/4-star-hotel-phuket",
    "/luxury-hotel-phuket-city",
    "/best-hotel-phuket-town",
    "/phuket-city-center-hotel",
  ],
  phuketHotel2: [
    "/budget-friendly-hotel-phuket",
    "/family-hotel-phuket",
    "/business-hotel-phuket",
    "/hotel-with-pool-phuket-town",
    "/heritage-hotel-phuket",
  ],
  whereToGo: [
    "/things-to-do-phuket-old-town",
    "/phuket-sunday-walking-street",
    "/sino-portuguese-architecture-phuket",
    "/best-cafes-phuket-town",
    "/phuket-night-market-guide",
  ],
  wedding: [
    "/wedding-venues",
    "/wedding-venues",
    "/wedding-venues",
    "/wedding-venues/thai-wedding",
    "/wedding-venues/chinese-wedding",
  ],
  mice: [
    "/meeting-events/corporate-conference",
    "/meeting-events/seminar-workshop",
    "/meeting-events/product-launch",
    "/meeting-events/gala-dinner-award",
    "/meeting-events/exhibition-trade-show",
  ],
  restaurant: [
    "/yan-long-chinese-restaurant",
    "/yan-long-chinese-restaurant",
    "/dining",
    "/twist-rooftop-restaurant-bar",
    "/yan-long-chinese-restaurant",
  ],
};

const seoLabelsEn = {
  phuketHotel1: [
    "Phuket Old Town Hotel",
    "4-Star Hotel in Phuket",
    "Luxury Hotel Phuket City",
    "Best Hotel Near Phuket Town",
    "Phuket City Center Hotel",
  ],
  phuketHotel2: [
    "Budget Friendly Hotel Phuket",
    "Family Hotel in Phuket",
    "Business Hotel Phuket",
    "Hotel with Pool Phuket Town",
    "Heritage Hotel Phuket",
  ],
  whereToGo: [
    "Things to Do in Phuket Old Town",
    "Phuket Sunday Walking Street",
    "Sino-Portuguese Architecture Phuket",
    "Best Cafes in Phuket Town",
    "Phuket Night Market Guide",
  ],
  wedding: [
    "Wedding Venue Phuket City",
    "Ballroom Wedding Phuket",
    "Grand Wedding Hall Thailand",
    "Thai Wedding Ceremony Venue",
    "Chinese Wedding Banquet Phuket",
  ],
  mice: [
    "Corporate Conference Phuket",
    "Seminar & Workshop Venue",
    "Product Launch Phuket",
    "Gala Dinner Venue",
    "Exhibition Hall Phuket",
  ],
  restaurant: [
    "Chinese Restaurant Phuket",
    "Dim Sum Phuket Town",
    "Best Restaurant in Phuket City",
    "Rooftop Bar Phuket Town",
    "Cantonese Food Phuket",
  ],
};

const seoLabelsTh = {
  phuketHotel1: [
    "โรงแรมเมืองเก่าภูเก็ต",
    "โรงแรม 4 ดาวในภูเก็ต",
    "โรงแรมหรูกลางเมืองภูเก็ต",
    "โรงแรมใกล้ภูเก็ตทาวน์",
    "โรงแรมใจกลางเมืองภูเก็ต",
  ],
  phuketHotel2: [
    "โรงแรมภูเก็ตราคาย่อมเยา",
    "โรงแรมครอบครัวภูเก็ต",
    "โรงแรมธุรกิจภูเก็ต",
    "โรงแรมมีสระว่ายน้ำภูเก็ตทาวน์",
    "โรงแรมสไตล์มรดกภูเก็ต",
  ],
  whereToGo: [
    "เที่ยวเมืองเก่าภูเก็ต",
    "ถนนคนเดินวันอาทิตย์ภูเก็ต",
    "สถาปัตยกรรมชิโนโปรตุกีส",
    "คาเฟ่ในภูเก็ตทาวน์",
    "ตลาดกลางคืนภูเก็ต",
  ],
  wedding: [
    "สถานที่แต่งงานภูเก็ตเมือง",
    "งานแต่งบอลรูมภูเก็ต",
    "ห้องจัดงานแต่งใหญ่",
    "สถานที่พิธีแต่งงานไทย",
    "งานเลี้ยงแต่งงานจีนภูเก็ต",
  ],
  mice: [
    "สัมมนาองค์กรภูเก็ต",
    "สถานที่สัมมนาและเวิร์กช็อป",
    "งานเปิดตัวสินค้าภูเก็ต",
    "สถานที่จัดกาล่าดินเนอร์",
    "ห้องจัดงานแสดงสินค้าภูเก็ต",
  ],
  restaurant: [
    "ร้านอาหารจีนภูเก็ต",
    "ติ่มซำภูเก็ตทาวน์",
    "ร้านอาหารในเมืองภูเก็ต",
    "รูฟท็อปบาร์ภูเก็ตทาวน์",
    "อาหารกวางตุ้งภูเก็ต",
  ],
};

export default async function Footer() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const isThai = locale === "th";
  const labels = isThai ? seoLabelsTh : seoLabelsEn;
  const headingClass = isThai
    ? "font-heading text-sm text-[--color-text-primary] mb-4 font-semibold"
    : "font-heading text-sm text-[--color-text-primary] mb-4 uppercase tracking-wider";
  const legalClass = isThai
    ? "text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
    : "text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors uppercase tracking-wider";

  const seoColumns = [
    { title: t.footer.seoHotel, hrefs: seoHrefs.phuketHotel1, texts: labels.phuketHotel1 },
    { title: t.footer.seoOldTown, hrefs: seoHrefs.phuketHotel2, texts: labels.phuketHotel2 },
    { title: t.footer.seoWhere, hrefs: seoHrefs.whereToGo, texts: labels.whereToGo },
    { title: t.footer.seoWedding, hrefs: seoHrefs.wedding, texts: labels.wedding },
    { title: t.footer.seoMice, hrefs: seoHrefs.mice, texts: labels.mice },
    { title: t.footer.seoRestaurant, hrefs: seoHrefs.restaurant, texts: labels.restaurant },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="bg-[--color-surface] border-b border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {seoColumns.map((column) => (
              <div key={column.title}>
                <h5 className={headingClass}>{column.title}</h5>
                <ul className="space-y-2">
                  {column.hrefs.map((href, index) => (
                    <li key={`${href}-${column.texts[index]}`}>
                      <LocaleFooterLink
                        href={localizeHref(href, locale)}
                        className="text-xs text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                      >
                        {column.texts[index]}
                      </LocaleFooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.svg"
              alt="Royal Phuket City Hotel"
              className="h-16 w-auto mb-6"
            />
            <p className="text-[--color-text-secondary] text-xs leading-relaxed">
              {t.footer.blurb}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-[23px] text-[--color-text-primary] mb-6">
              {t.footer.reachOut}
            </h4>
            <address className="not-italic space-y-4">
              <p className="text-sm text-[--color-text-secondary]">
                <span className="text-[--color-text-primary]">{t.footer.email}:</span>{" "}
                <a
                  href={`mailto:${HOTEL_INFO.email}`}
                  className="hover:text-[--color-accent] transition-colors"
                >
                  {HOTEL_INFO.email}
                </a>
              </p>
              <p className="text-sm text-[--color-text-secondary]">
                <span className="text-[--color-text-primary]">{t.footer.tel}:</span>{" "}
                <a
                  href={`tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`}
                  className="hover:text-[--color-accent] transition-colors"
                >
                  {HOTEL_INFO.phone}
                </a>
              </p>
              <div className="text-sm text-[--color-text-secondary] pt-2">
                <p>{t.footer.address1}</p>
                <p>{t.footer.address2}</p>
              </div>
              <p className="pt-2">
                <a
                  href={EXTERNAL_LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm text-[--color-text-secondary] hover:text-[--color-accent] transition-colors inline-flex items-center gap-2 border-b-2 border-[#8B7355] pb-1 ${
                    isThai ? "" : "uppercase tracking-wider"
                  }`}
                >
                  {t.footer.directions}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </a>
              </p>
            </address>
          </div>

          <div>
            <h4 className="font-heading text-[23px] text-[--color-text-primary] mb-6">
              {t.footer.connect}
            </h4>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-[--color-text-secondary] mr-2">{t.footer.stayConnected}:</span>
              <a
                href={EXTERNAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a
                href={EXTERNAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`mailto:${HOTEL_INFO.email}`}
                className="w-8 h-8 flex items-center justify-center text-[--color-text-secondary] hover:text-[--color-accent] transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>

            <a
              href={EXTERNAL_LINKS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 border border-[#8B7355] text-[#8B7355] text-sm hover:bg-[#8B7355] hover:text-white transition-colors ${
                isThai ? "" : "tracking-wider uppercase"
              }`}
            >
              {t.header.reserve}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[--color-text-secondary]">
              © {new Date().getFullYear()}. {t.footer.copyright}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
              <LocaleFooterLink href={localizeHref("/hotel-policy", locale)} className={legalClass}>
                {t.footer.hotelPolicy}
              </LocaleFooterLink>
              <LocaleFooterLink href={localizeHref("/terms-conditions", locale)} className={legalClass}>
                {t.footer.terms}
              </LocaleFooterLink>
              <LocaleFooterLink href={localizeHref("/privacy-policy", locale)} className={legalClass}>
                {t.footer.privacy}
              </LocaleFooterLink>
              <LocaleFooterLink href={localizeHref("/cookie-policy", locale)} className={legalClass}>
                {t.footer.cookies}
              </LocaleFooterLink>
              <LocaleFooterLink href={localizeHref("/disclaimer", locale)} className={legalClass}>
                {t.footer.disclaimer}
              </LocaleFooterLink>
              <LocaleFooterLink href={localizeHref("/accessibility", locale)} className={legalClass}>
                {t.footer.accessibility}
              </LocaleFooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
