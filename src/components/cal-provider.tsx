"use client";

import { useEffect } from "react";
import { useSiteConfig } from "@/components/site-config";
import { toast } from "@/components/ui/toast";

const CAL_OPEN_EVENT = "portfolio:cal-open";
const CAL_PREPARE_EVENT = "portfolio:cal-prepare";

type CalOpenDetail = {
  trigger: HTMLElement;
  calLink: string;
  href: string;
};

type CalApi = (
  action: "ui" | "on" | "off" | "modal",
  options: Record<string, unknown>
) => void;

type WindowWithCal = Window & { Cal?: { version?: string } };

/** Returns true when a mounted provider accepted the request. */
export function requestCalOpen(trigger: HTMLElement, calLink: string, href: string): boolean {
  if (typeof window === "undefined") return false;
  const event = new CustomEvent<CalOpenDetail>(CAL_OPEN_EVENT, {
    cancelable: true,
    detail: { trigger, calLink, href },
  });
  return !window.dispatchEvent(event);
}

/** Start loading only after clear user intent (hover or keyboard focus). */
export function requestCalPrepare() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CAL_PREPARE_EVENT));
}

/**
 * Lazily boots the Cal.com embed on intent. Real anchor hrefs remain usable
 * without JavaScript, and failures fall through to the direct booking page.
 */
export function CalProvider() {
  const { calNamespace } = useSiteConfig();
  useEffect(() => {
    let disposed = false;
    let configured = false;
    let booked = false;
    let opening = false;
    let fallingBack = false;
    let closeHandled = true;
    let lastTrigger: HTMLElement | null = null;
    let lastHref = "";
    let lastScrollY = 0;
    let runtimeTimer = 0;
    let focusTimer = 0;
    let apiPromise: Promise<CalApi> | null = null;
    let modalBox: Element | null = null;

    const restoreFocus = () => {
      window.clearTimeout(focusTimer);
      // The custom element moves focus out of its hidden shadow-root control
      // after dispatching `close`, so return focus after that cleanup finishes.
      focusTimer = window.setTimeout(() => {
        lastTrigger?.focus({ preventScroll: true });
        window.dispatchEvent(
          new CustomEvent("portfolio:scroll-to", {
            detail: { top: lastScrollY, immediate: true },
          })
        );
      }, 80);
    };

    const openDirect = (href: string) => {
      if (disposed || fallingBack) return;
      fallingBack = true;
      toast("Calendar unavailable. Opening Cal.com directly…");
      window.location.assign(href);
    };

    const onBookingSuccessful = () => {
      if (!disposed) booked = true;
    };

    const onClose = () => {
      if (disposed || closeHandled) return;
      closeHandled = true;
      if (booked) toast("Booked. You just made my day.");
      booked = false;
      restoreFocus();
    };

    const onLinkFailed = () => openDirect(lastHref);

    const bindModalClose = () => {
      const nextModalBox = document.querySelector("cal-modal-box");
      if (!nextModalBox || nextModalBox === modalBox) return;
      modalBox?.removeEventListener("close", onClose);
      modalBox = nextModalBox;
      modalBox.addEventListener("close", onClose);
    };

    // The Cal element is appended asynchronously after the API call. Observe
    // that one DOM insertion so its own close button receives the same focus
    // restoration as an iframe-initiated close.
    const modalObserver = new MutationObserver(bindModalClose);
    modalObserver.observe(document.body, { childList: true });

    const configure = (cal: CalApi) => {
      if (configured) return;
      configured = true;
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
        action: "bookingSuccessfulV2",
        callback: onBookingSuccessful,
      });
      cal("on", {
        action: "__closeIframe",
        callback: onClose,
      });
      cal("on", { action: "linkFailed", callback: onLinkFailed });
    };

    const loadCal = () => {
      if (!apiPromise) {
        apiPromise = import("@calcom/embed-react")
          .then(async ({ getCalApi }) => {
            const cal = (await getCalApi({ namespace: calNamespace })) as CalApi;
            if (disposed) throw new Error("cal_provider_disposed");
            configure(cal);
            return cal;
          })
          .catch((error) => {
            apiPromise = null;
            throw error;
          });
      }
      return apiPromise;
    };

    const waitForRuntime = (timeoutMs = 8000) =>
      new Promise<void>((resolve, reject) => {
        const started = Date.now();
        const check = () => {
          if (disposed) return reject(new Error("cal_provider_disposed"));
          if ((window as WindowWithCal).Cal?.version) return resolve();
          if (Date.now() - started >= timeoutMs) return reject(new Error("cal_runtime_timeout"));
          runtimeTimer = window.setTimeout(check, 100);
        };
        check();
      });

    const openCal = async ({ trigger, calLink, href }: CalOpenDetail) => {
      if (opening) return;
      opening = true;
      fallingBack = false;
      closeHandled = false;
      lastTrigger = trigger;
      lastHref = href;
      lastScrollY = window.scrollY;
      try {
        const cal = await loadCal();
        cal("modal", {
          calLink,
          config: { layout: "month_view", theme: "dark" },
        });
        bindModalClose();
        await waitForRuntime();
      } catch {
        openDirect(href);
      } finally {
        opening = false;
      }
    };

    const onPrepare = () => {
      void loadCal().catch(() => {});
    };

    const onOpen = (event: Event) => {
      const request = event as CustomEvent<CalOpenDetail>;
      // A repeat activation while the embed is still loading keeps the anchor's
      // native navigation instead of swallowing the user's escape hatch.
      if (!request.detail || opening) return;
      event.preventDefault();
      void openCal(request.detail);
    };

    window.addEventListener(CAL_PREPARE_EVENT, onPrepare);
    window.addEventListener(CAL_OPEN_EVENT, onOpen);

    return () => {
      disposed = true;
      window.clearTimeout(runtimeTimer);
      window.clearTimeout(focusTimer);
      modalObserver.disconnect();
      modalBox?.removeEventListener("close", onClose);
      window.removeEventListener(CAL_PREPARE_EVENT, onPrepare);
      window.removeEventListener(CAL_OPEN_EVENT, onOpen);
      if (apiPromise) {
        void apiPromise
          .then((cal) => {
            cal("off", { action: "bookingSuccessfulV2", callback: onBookingSuccessful });
            cal("off", { action: "__closeIframe", callback: onClose });
            cal("off", { action: "linkFailed", callback: onLinkFailed });
          })
          .catch(() => {});
      }
    };
  }, [calNamespace]);

  return null;
}
