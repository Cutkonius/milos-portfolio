"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useSiteConfig } from "@/components/site-config";
import { toast } from "@/components/ui/toast";

/**
 * Boots the Cal.com embed once. The confirmation waits for the modal to
 * close so it is never hidden behind Cal's backdrop.
 */
export function CalProvider() {
  const { calNamespace } = useSiteConfig();
  useEffect(() => {
    let cancelled = false;
    let booked = false;
    (async () => {
      const cal = await getCalApi({ namespace: calNamespace });
      if (cancelled) return;
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#f2b33d" },
          light: { "cal-brand": "#173fae" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          booked = true;
        },
      });
      cal("on", {
        action: "__closeIframe",
        callback: () => {
          if (!booked) return;
          booked = false;
          toast("Booked. You just made my day.");
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [calNamespace]);

  return null;
}
