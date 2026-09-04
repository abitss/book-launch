import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ebookiee.store"),
  title: { default: "eBookiee.store | Good books. Brighter you.", template: "%s | eBookiee.store" },
  description: "Discover digital books across exam prep, business, fiction and self-growth with secure Razorpay checkout and verified digital delivery.",
  openGraph: {
    title: "eBookiee.store",
    description: "Good books. Brighter you. Discover digital reads with secure checkout and simple delivery.",
    type: "website",
    siteName: "eBookiee.store"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full">{children}<Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" /></body></html>;
}
