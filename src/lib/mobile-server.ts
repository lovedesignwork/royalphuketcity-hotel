import { headers } from "next/headers";
import { isMobileAppAlias, isMobileAppPath, isMobileHost } from "@/lib/mobile";

export async function getMobileFlags(): Promise<{
  isApp: boolean;
  isHost: boolean;
  prefix: "" | "/m";
}> {
  const headerStore = await headers();
  const flagged = headerStore.get("x-mobile-app") === "1";
  const pathname = headerStore.get("x-pathname") || "";
  const host = headerStore.get("host") || "";
  const isHost = headerStore.get("x-mobile-host") === "1" || isMobileHost(host);
  const isApp =
    flagged ||
    isHost ||
    isMobileAppPath(pathname) ||
    isMobileAppAlias(pathname);
  return { isApp, isHost, prefix: isHost ? "" : "/m" };
}
