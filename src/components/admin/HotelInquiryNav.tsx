"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { CaretDown, EnvelopeSimple } from "@phosphor-icons/react";
import { INQUIRY_CATEGORIES, inquiryCategoryHref } from "@/lib/inquiry-categories";

export default function HotelInquiryNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const active = pathname === "/admin/inquiries" || pathname.startsWith("/admin/inquiries/");
  const [open, setOpen] = useState(active);
  const id = useId();
  useEffect(() => { setOpen(active); }, [pathname, active]);

  return <div className="admin-inquiry-nav">
    <div className="admin-inquiry-nav-heading">
      <Link href="/admin/inquiries" className="admin-nav-link" aria-current={pathname === "/admin/inquiries" ? "page" : undefined} onClick={onNavigate}>
        <EnvelopeSimple size={17} aria-hidden="true" /><span>Hotel inquiries</span>
      </Link>
      <button className="admin-inquiry-toggle" aria-label={open ? "Collapse inquiry categories" : "Expand inquiry categories"} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><CaretDown size={13} aria-hidden="true" /></button>
    </div>
    <div id={id} className="admin-inquiry-submenu" hidden={!open}>
      {INQUIRY_CATEGORIES.map((category) => <Link key={category.value} href={inquiryCategoryHref(category.value)} className="admin-nav-link" aria-current={pathname === inquiryCategoryHref(category.value) ? "page" : undefined} onClick={onNavigate}>{category.label}</Link>)}
    </div>
  </div>;
}
