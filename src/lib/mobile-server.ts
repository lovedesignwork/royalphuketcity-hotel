import { headers } from "next/headers";
import { isMobileAppPath } from "@/lib/mobile";

export async function getMobileFlags(): Promise<{
  isApp: boolean;
  isHost: boolean;
  prefix: "" | "/m";
}> {
  const headerStore = await headers();
  const flagged = headerStore.get("x-mobile-app") === "1";
  const pathname = headerStore.get("x-pathname") || "";
  const isApp = flagged || isMobileAppPath(pathname);
  const isHost = headerStore.get("x-mobile-host") === "1";
  return { isApp, isHost, prefix: isHost ? "" : "/m" };
}
