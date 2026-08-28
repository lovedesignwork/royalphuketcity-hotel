import StayFeedbackForm from "@/components/mobile/StayFeedbackForm";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Feedback",
  "/feedback",
  "Tell Royal Phuket City Hotel about your stay."
);

export default function MobileFeedbackPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <StayFeedbackForm />
    </div>
  );
}
