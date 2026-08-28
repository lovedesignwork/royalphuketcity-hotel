import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "@/components/ContactForm";
import { EXTERNAL_LINKS, HOTEL_INFO } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Contact",
  "/contact",
  "Call, email, or write to Royal Phuket City Hotel."
);

const telHref = `tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`;

export default function MobileContactPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Reach the hotel desk, or send a note and we will reply.
      </p>

      <div className="space-y-2">
        <a
          href={telHref}
          className="flex min-h-14 items-center gap-3 rounded-[16px] bg-[var(--m-card)] px-4"
        >
          <Phone size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
          <span>
            <span className="block font-medium">Call</span>
            <span className="block text-sm text-[var(--m-muted)]">{HOTEL_INFO.phone}</span>
          </span>
        </a>
        <a
          href={`mailto:${HOTEL_INFO.email}`}
          className="flex min-h-14 items-center gap-3 rounded-[16px] bg-[var(--m-card)] px-4"
        >
          <EnvelopeSimple size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
          <span>
            <span className="block font-medium">Email</span>
            <span className="block text-sm text-[var(--m-muted)]">{HOTEL_INFO.email}</span>
          </span>
        </a>
        <a
          href={EXTERNAL_LINKS.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center gap-3 rounded-[16px] bg-[var(--m-card)] px-4"
        >
          <MapPin size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
          <span>
            <span className="block font-medium">Find us</span>
            <span className="block text-sm text-[var(--m-muted)]">{HOTEL_INFO.address}</span>
          </span>
        </a>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-heading text-xl">Send a message</h2>
        <ContactForm />
      </div>
    </div>
  );
}
