import GuestChatForm from "@/components/mobile/GuestChatForm";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Message the front desk",
  "/chat",
  "Message the front desk at Royal Phuket City Hotel."
);

export default function MobileChatPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Send a note to the front desk with your room number so the team can contact you. For urgent requests, please call the front desk.
      </p>
      <GuestChatForm />
    </div>
  );
}
