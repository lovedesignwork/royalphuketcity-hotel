import type { Viewport } from "next";
import { MobileAppProvider } from "@/components/mobile/MobileAppProvider";
import MobileAppShell from "@/components/mobile/MobileAppShell";
import { mobileRobots } from "@/lib/mobile";
import "./mobile.css";

export const metadata = {
  title: {
    default: "RPC Hotel",
    template: "%s | RPC Hotel",
  },
  description:
    "Guest guide for your stay at Royal Phuket City Hotel. Front desk, dining, and hotel services.",
  robots: mobileRobots,
  appleWebApp: {
    capable: true,
    title: "RPC Hotel",
    statusBarStyle: "black-translucent" as const,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#8B7355",
};

export default async function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileAppProvider prefix="/m">
      <MobileAppShell>{children}</MobileAppShell>
    </MobileAppProvider>
  );
}
