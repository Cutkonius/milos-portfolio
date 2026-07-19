import type { Metadata } from "next";
import { Sidebar } from "../_components/sidebar";
import { PublishBar } from "../_components/publish-bar";
import { Toaster } from "@/components/ui/toast";
import { hasUnpublishedChanges } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "HQ",
  robots: { index: false, follow: false },
};

// The admin always reads the live store — never a build-time snapshot.
export const dynamic = "force-dynamic";

export default async function HqAppLayout({ children }: { children: React.ReactNode }) {
  const viewSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000");
  const hasChanges = await hasUnpublishedChanges();

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-[#07090d] text-text md:flex-row">
      {/* Night-shift backdrop: amber glow low on the horizon, blue night beyond. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(900px_520px_at_16%_-10%,rgba(245,169,78,0.10),transparent_60%),radial-gradient(820px_560px_at_105%_108%,rgba(91,140,255,0.10),transparent_60%)]"
      />

      <Sidebar viewSiteUrl={viewSiteUrl} />

      <div className="flex min-w-0 flex-1 flex-col md:h-[100dvh]">
        <div className="sticky top-0 z-20">
          <PublishBar hasChanges={hasChanges} />
        </div>
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 md:overflow-y-auto md:px-12 md:py-10">
          <div className="mx-auto max-w-[880px]">{children}</div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
