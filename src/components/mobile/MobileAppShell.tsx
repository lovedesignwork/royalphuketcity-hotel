import BottomTabBar from "./BottomTabBar";
import MobileAppBodyClass from "./MobileAppBodyClass";
import MobileHeader from "./MobileHeader";

export default function MobileAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mobile-app">
      <MobileAppBodyClass />
      <div className="mobile-app-frame">
        <MobileHeader />
        <main>{children}</main>
        <BottomTabBar />
      </div>
    </div>
  );
}
