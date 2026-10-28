"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowSquareOut, CalendarBlank, ChartBar, ChatCircleText, DownloadSimple, EnvelopeSimple, GearSix, House, List, Megaphone, SignOut, Users, Calculator, X } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase/client";
import HotelInquiryNav from "@/components/admin/HotelInquiryNav";
import { INQUIRY_CATEGORIES } from "@/lib/inquiry-categories";
import "./admin.css";

const groups = [
  { label: "Workspace", links: [
    { href: "/admin", label: "Overview", icon: House },
    { href: "/admin/analytics", label: "Analytics", icon: ChartBar },
    { href: "/admin/inquiries", label: "Hotel inquiries", icon: EnvelopeSimple },
  ] },
  ...[{ slug: "yanlong", label: "Yan Long" }, { slug: "twist", label: "TWIST" }, { slug: "spa", label: "Royal Wellness Spa" }].map((brand) => ({
    label: brand.label,
    links: [
      { href: `/admin/${brand.slug}/reservations`, label: "Reservations", icon: CalendarBlank },
      { href: `/admin/${brand.slug}/inquiries`, label: "Inquiries", icon: ChatCircleText },
    ],
  })),
  { label: "Manage", links: [
    { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { href: "/admin/downloads", label: "Downloads", icon: DownloadSimple },
    { href: "/admin/campaign/kpi-calculator", label: "KPI calculator", icon: Calculator },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: GearSix },
  ] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: "superadmin" | "admin" } | null>(null);
  useEffect(() => { setMobileNavOpen(false); }, [pathname]);
  useEffect(() => {
    if (mobileNavOpen) menuRef.current?.showModal();
    else menuRef.current?.close();
  }, [mobileNavOpen]);
  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 900px)");
    const close = () => { if (breakpoint.matches) setMobileNavOpen(false); };
    breakpoint.addEventListener("change", close);
    return () => breakpoint.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    if (pathname === "/admin/login") return;
    let cancelled = false;
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data } = await supabase.from("admin_users").select("email, role").eq("id", user.id).maybeSingle();
      if (!cancelled && data) setCurrentUser({ email: data.email, role: data.role });
    })();
    return () => { cancelled = true; };
  }, [pathname]);
  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  if (pathname === "/admin/login") return <>{children}</>;
  const activeGroup = groups.find((group) => group.links.some((link) => link.href === pathname || (link.href !== "/admin" && pathname.startsWith(`${link.href}/`))));
  const category = pathname.startsWith("/admin/inquiries/") ? INQUIRY_CATEGORIES.find((item) => pathname === `/admin/inquiries/${item.value}`) : undefined;
  const activePage = category ? `${category.label} inquiries` : activeGroup?.links.find((link) => link.href === pathname || (link.href !== "/admin" && pathname.startsWith(`${link.href}/`)))?.label ?? "Admin";
  const navigation = <>
    <Link href="/admin" className="admin-brand" aria-label="Royal Phuket City overview"><Image src="/images/logo.svg" alt="Royal Phuket City Hotel" width={842} height={340} className="admin-brand-logo" /></Link>
    <nav className="admin-nav" aria-label="Administration">
      {groups.map((group) => <div className="admin-nav-group" key={group.label}><p className="admin-nav-label">{group.label}</p>{group.links.map(({ href, label, icon: Icon }) => {
        if (href === "/admin/inquiries") return <HotelInquiryNav key={href} onNavigate={() => setMobileNavOpen(false)} />;
        const active = pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));
        return <Link key={href} href={href} className="admin-nav-link" aria-current={active ? "page" : undefined}><Icon size={17} aria-hidden="true" /><span>{label}</span></Link>;
      })}</div>)}
    </nav>
    <div className="admin-sidebar-bottom">
      <a className="admin-nav-link" href="https://analytics.google.com" target="_blank" rel="noopener noreferrer"><ChartBar size={17} aria-hidden="true" />Google Analytics<ArrowSquareOut size={13} className="admin-external" aria-hidden="true" /></a>
      <Link className="admin-nav-link" href="/" target="_blank" rel="noopener noreferrer"><ArrowSquareOut size={17} aria-hidden="true" />View website</Link>
      {currentUser && <div className="admin-account"><span className="admin-avatar" aria-hidden="true">{currentUser.email.slice(0, 1).toUpperCase()}</span><div><span title={currentUser.email}>{currentUser.email}</span><small>{currentUser.role === "superadmin" ? "Superadmin" : "Admin"}</small></div><button className="admin-icon-button" onClick={handleLogout} aria-label="Sign out" title="Sign out"><SignOut size={18} /></button></div>}
    </div>
  </>;
  return <div className="admin-shell">
    <a className="admin-skip" href="#admin-content">Skip to content</a>
    <aside id="admin-navigation" className="admin-sidebar">{navigation}</aside>
    <dialog ref={menuRef} id="admin-menu" className="admin-mobile-menu" aria-label="Admin navigation" onClose={() => setMobileNavOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setMobileNavOpen(false); }}>
      <div className="admin-mobile-inner"><button className="admin-icon-button admin-menu-close" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X size={20} /></button>{navigation}</div>
    </dialog>
    <div className="admin-workspace">
      <header className="admin-topbar"><div className="admin-breadcrumb"><button className="admin-icon-button admin-menu-toggle" aria-label="Open navigation" aria-controls="admin-menu" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(true)}><List size={21} /></button><span>{activeGroup?.label ?? "Workspace"}</span><span aria-hidden="true">/</span><strong>{activePage}</strong></div><span className="admin-date">{new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Bangkok" })}<span>Bangkok</span></span></header>
      <main id="admin-content" className="admin-sheet" tabIndex={-1}>{children}</main>
    </div>
  </div>;
}
