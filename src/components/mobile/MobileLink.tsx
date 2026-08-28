"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { mobileHref } from "@/lib/mobile";
import { useMobilePrefix } from "./MobileAppProvider";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export default function MobileLink({ href, ...props }: Props) {
  const prefix = useMobilePrefix();
  return <Link href={mobileHref(href, prefix)} {...props} />;
}
