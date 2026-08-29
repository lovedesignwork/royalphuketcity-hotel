"use client";

import { usePathname } from "next/navigation";
import { isMobileAppAlias, isMobileAppPath, isMobileHost } from "@/lib/mobile";

function hideDesktopChrome(pathname: string): boolean {
  if (isMobileAppPath(pathname) || isMobileAppAlias(pathname)) return true;
  if (typeof window !== "undefined" && isMobileHost(window.location.host)) {
    return true;
  }
  return false;
}

export default function DesktopSiteChrome({
  children,
  header,
  footer,
  cookie,
}: {
  children: React.ReactNode;
  header: React.ReactNode | null;
  footer: React.ReactNode | null;
  cookie: React.ReactNode | null;
}) {
  const pathname = usePathname();

  if (hideDesktopChrome(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
      {cookie}
    </>
  );
}
