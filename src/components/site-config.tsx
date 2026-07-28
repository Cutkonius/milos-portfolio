"use client";

import { createContext, useContext, type ReactNode } from "react";
import { CAL_LINK, EMAIL } from "@/lib/cal";

/** Cal.com's embed namespace is the event slug, the last path segment. */
function namespaceFromLink(link: string): string {
  return link.split("/").filter(Boolean).pop() || "call";
}

type SiteConfig = { calLink: string; calNamespace: string; email: string };

const SiteConfigContext = createContext<SiteConfig>({
  calLink: CAL_LINK,
  calNamespace: namespaceFromLink(CAL_LINK),
  email: EMAIL,
});

/** Feeds editable booking + contact settings to the client CTAs and Cal embed. */
export function SiteConfigProvider({
  calLink,
  email,
  children,
}: {
  calLink: string;
  email: string;
  children: ReactNode;
}) {
  return (
    <SiteConfigContext.Provider
      value={{ calLink, calNamespace: namespaceFromLink(calLink), email }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
