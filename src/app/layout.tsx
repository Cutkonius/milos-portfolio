import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const switzer = localFont({
  variable: "--font-switzer",
  src: [
    { path: "../fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/switzer-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Miloš Novaković — built in daylight, sold after dark",
  description:
    "Websites designed and built with AI at unfair speed, then marketed long after everyone goes to bed: email flows, SEO, the occasional ad.",
  openGraph: {
    title: "Miloš Novaković — built in daylight, sold after dark",
    description:
      "Websites built with AI at unfair speed, marketed while you sleep.",
    siteName: "Miloš Novaković",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
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
