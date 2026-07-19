import type { Metadata } from "next";
import { Sidebar } from "../_components/sidebar";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "HQ",
  robots: { index: false, follow: false },
};

// The admin always reads the live store — never a build-time snapshot.
export const dynamic = "force-dynamic";

export default function HqAppLayout({ children }: { children: React.ReactNode }) {
  const viewSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000");

  return (
    <div className="flex min-h-[100dvh] flex-col bg-night text-text md:flex-row">
      <Sidebar viewSiteUrl={viewSiteUrl} />
      <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 md:h-[100dvh] md:overflow-y-auto md:px-10 md:py-9">
        <div className="mx-auto max-w-[880px]">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
