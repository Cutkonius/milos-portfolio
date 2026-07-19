"use client";

// Admin nav uses full-page <a> loads on purpose: the proxy rewrites clean
// subdomain paths onto /hq/*, and full loads keep that boundary simple.
/* eslint-disable @next/next/no-html-link-for-pages */

import { usePathname } from "next/navigation";
import { LogoutButton } from "./logout-button";
import { Icon, type IconName } from "./icons";

type NavItem = { href: string; label: string; icon: IconName };

const NAV: { section: string | null; items: NavItem[] }[] = [
  { section: null, items: [{ href: "/", label: "Dashboard", icon: "dashboard" }] },
  {
    section: "Content",
    items: [
      { href: "/projects", label: "Projects", icon: "projects" },
      { href: "/services", label: "Services", icon: "services" },
      { href: "/process", label: "Process", icon: "process" },
    ],
  },
  {
    section: "Pages",
    items: [
      { href: "/hero", label: "Hero", icon: "hero" },
      { href: "/about", label: "About", icon: "about" },
      { href: "/contact", label: "Contact", icon: "contact" },
      { href: "/nav", label: "Navigation", icon: "nav" },
    ],
  },
  {
    section: "Site",
    items: [
      { href: "/media", label: "Media", icon: "media" },
      { href: "/history", label: "History", icon: "history" },
      { href: "/settings", label: "Settings", icon: "settings" },
    ],
  },
];

export function Sidebar({ viewSiteUrl }: { viewSiteUrl: string }) {
  const raw = usePathname() || "/";
  const path = raw === "/hq" ? "/" : raw.startsWith("/hq/") ? raw.slice(3) : raw;
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <aside className="flex w-full flex-col gap-6 border-b border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-xl md:h-[100dvh] md:w-[240px] md:shrink-0 md:border-b-0 md:border-r md:p-5">
      <a href="/" className="flex items-center gap-2.5 px-1">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber text-[16px] font-bold text-[#1c1206] shadow-[0_0_20px_-4px_rgba(245,169,78,0.7)]">
          H
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-text">HQ</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-amber-soft/80">
            Command center
          </span>
        </span>
      </a>

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
        {NAV.map((group, i) => (
          <div key={i} className="flex flex-col gap-1">
            {group.section && (
              <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-text/30">
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors duration-150 ${
                    active
                      ? "bg-white/[0.07] text-text"
                      : "text-text/55 hover:bg-white/[0.04] hover:text-text/90"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-amber shadow-[0_0_10px_rgba(245,169,78,0.7)]"
                    />
                  )}
                  <Icon
                    name={item.icon}
                    className={
                      active ? "text-amber" : "text-text/40 transition-colors group-hover:text-text/70"
                    }
                  />
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-1 border-t border-white/[0.07] pt-4">
        <a
          href={viewSiteUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-text/55 transition-colors hover:bg-white/[0.04] hover:text-text/90"
        >
          <Icon name="nav" className="text-text/40" />
          View site ↗
        </a>
        <LogoutButton className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-text/55 transition-colors hover:bg-white/[0.04] hover:text-text/90" />
      </div>
    </aside>
  );
}
