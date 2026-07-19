"use client";

// Admin nav uses full-page <a> loads on purpose: the proxy rewrites clean
// subdomain paths onto /hq/*, and full loads keep that boundary simple and
// robust (no client-side RSC navigation across the rewrite).
/* eslint-disable @next/next/no-html-link-for-pages */

import { usePathname } from "next/navigation";
import { LogoutButton } from "./logout-button";

const NAV: { section: string | null; items: { href: string; label: string }[] }[] = [
  { section: null, items: [{ href: "/", label: "Dashboard" }] },
  {
    section: "Content",
    items: [
      { href: "/projects", label: "Projects" },
      { href: "/services", label: "Services" },
      { href: "/process", label: "Process" },
    ],
  },
  {
    section: "Pages",
    items: [
      { href: "/hero", label: "Hero" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/nav", label: "Navigation" },
    ],
  },
  {
    section: "Site",
    items: [
      { href: "/media", label: "Media" },
      { href: "/settings", label: "Settings" },
    ],
  },
];

export function Sidebar({ viewSiteUrl }: { viewSiteUrl: string }) {
  // The proxy rewrites clean subdomain paths onto /hq/*; normalise either form.
  const raw = usePathname() || "/";
  const path = raw === "/hq" ? "/" : raw.startsWith("/hq/") ? raw.slice(3) : raw;

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <aside className="flex w-full flex-col gap-6 border-b border-white/[0.08] bg-[#0a0c12] p-4 md:h-[100dvh] md:w-[236px] md:shrink-0 md:border-b-0 md:border-r md:p-5">
      <a href="/" className="flex items-center gap-2.5 px-1">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber text-[15px] font-bold text-[#1c1206]">
          H
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-text">HQ</span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-text/40">Command center</span>
        </span>
      </a>

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
        {NAV.map((group, i) => (
          <div key={i} className="flex flex-col gap-1">
            {group.section && (
              <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text/30">
                {group.section}
              </div>
            )}
            {group.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                  isActive(item.href)
                    ? "bg-white/[0.08] font-medium text-text"
                    : "text-text/60 hover:bg-white/[0.04] hover:text-text/90"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-4">
        <a
          href={viewSiteUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg px-3 py-2 text-sm text-text/60 transition-colors hover:bg-white/[0.04] hover:text-text/90"
        >
          View site ↗
        </a>
        <LogoutButton className="rounded-lg px-3 py-2 text-left text-sm text-text/60 transition-colors hover:bg-white/[0.04] hover:text-text/90" />
      </div>
    </aside>
  );
}
