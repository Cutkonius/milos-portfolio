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
  const metadataBase = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://milosnovakovic.com"
  );
  const socialImageAlt =
    "Miloš Novaković — Build the website. Set up what happens next.";

  return {
    metadataBase,
    title: site.metaTitle,
    description: site.metaDescription,
    alternates: { canonical: "/" },
    authors: [{ name: site.siteName, url: "/" }],
    creator: site.siteName,
    publisher: site.siteName,
    openGraph: {
      title: site.ogTitle,
      description: site.ogDescription,
      url: "/",
      siteName: site.siteName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.ogTitle,
      description: site.ogDescription,
      images: [{ url: "/og.png", alt: socialImageAlt }],
    },
    // Match the server-only switch used by Proxy and robots.txt.
    robots:
      process.env.SITE_LAUNCHED === "true"
        ? { index: true, follow: true }
        : { index: false, follow: false, noarchive: true },
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
