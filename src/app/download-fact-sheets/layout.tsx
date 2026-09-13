import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generatePageMetadata({
  title: "Hotel Brochures & Fact Sheets",
  description:
    "Explore Royal Phuket City Hotel fact sheets and presentations. Request brochures to plan hotel stays, meetings and events in Phuket Town.",
  path: "/download-fact-sheets",
});

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
