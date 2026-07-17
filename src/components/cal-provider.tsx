"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_NAMESPACE } from "@/lib/cal";
import { storm } from "@/lib/confetti";
import { toast } from "@/components/ui/toast";

/**
 * Boots the Cal.com embed once: dark theme, brand color, and the payoff.
 * The confetti fires immediately on booking (its canvas stacks above Cal's
 * modal backdrop); the toast waits for the modal to close so it isn't
 * hidden behind the backdrop.
 */
export function CalProvider() {
  useEffect(() => {
    let cancelled = false;
    let booked = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#5b8cff" },
          light: { "cal-brand": "#3b62c4" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          booked = true;
          storm();
        },
      });
      cal("on", {
        action: "__closeIframe",
        callback: () => {
          if (!booked) return;
          booked = false;
          toast("Booked. You just made my day.");
          storm();
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
