import CookieConsent from "@/components/CookieConsent";
import BottomTabBar from "./BottomTabBar";
import MobileHeader from "./MobileHeader";

export default function MobileAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mobile-app">
      <div className="mobile-app-frame">
        <MobileHeader />
        <main>{children}</main>
        <BottomTabBar />
        <CookieConsent />
      </div>
    </div>
  );
}
