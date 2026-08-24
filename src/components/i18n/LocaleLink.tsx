"use client";

import Link, { type LinkProps } from "next/link";
import { localizeHref } from "@/lib/i18n/path";
import { useLocale } from "./LocaleProvider";

type LocaleLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    href: string;
  };

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();
  return <Link href={localizeHref(href, locale)} {...props} />;
}
