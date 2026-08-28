"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";

type MobilePrefix = "" | "/m";

const MobileAppContext = createContext<{ prefix: MobilePrefix }>({
  prefix: "/m",
});

export function MobileAppProvider({
  prefix,
  children,
}: {
  prefix: MobilePrefix;
  children: React.ReactNode;
}) {
  return (
    <MobileAppContext.Provider value={{ prefix }}>
      {children}
    </MobileAppContext.Provider>
  );
}

export function useMobilePrefix(): MobilePrefix {
  const pathname = usePathname();
  const { prefix } = useContext(MobileAppContext);
  if (pathname === "/m" || pathname.startsWith("/m/")) return "/m";
  return prefix || "/m";
}
