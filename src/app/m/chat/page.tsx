import GuestChatForm from "@/components/mobile/GuestChatForm";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Live chat",
  "/chat",
  "Message the front desk at Royal Phuket City Hotel."
);

export default function MobileChatPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Message the front desk. The team sees new chats at the desk and replies by email or phone.
      </p>
      <GuestChatForm />
    </div>
  );
}
