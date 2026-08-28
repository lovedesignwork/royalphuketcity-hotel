import { Suspense } from "react";
import { mobileMetadata } from "@/lib/mobile";
import SpaBookingForm from "@/components/mobile/SpaBookingForm";

export const metadata = mobileMetadata(
  "Book spa",
  "/spa/book",
  "Reserve a Royal Wellness Spa treatment during your stay."
);

export default function MobileSpaBookPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <Suspense fallback={<p className="text-sm text-[var(--m-muted)]">Loading booking form...</p>}>
        <SpaBookingForm />
      </Suspense>
    </div>
  );
}
