import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getContent } from "@/lib/cms/content";

const switzer = localFont({
  variable: "--font-switzer",
  src: [
    { path: "../fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer-700.woff2", weight: "700", style: "normal" },
  ],
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: site.metaTitle,
    description: site.metaDescription,
    openGraph: {
      title: site.ogTitle,
      description: site.ogDescription,
      siteName: site.siteName,
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${site.siteName} | built in daylight, useful after launch`,
        },
      ],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
    // Keep the site out of the index until it is launched from the CMS.
    robots: site.launched ? undefined : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#050713",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${switzer.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
