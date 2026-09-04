import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ebookies.store"),
  title: { default: "eBookies.store | Digital Bookstore", template: "%s | eBookies.store" },
  description: "Discover and buy ebooks across exam prep, business, fiction and self-growth with secure digital delivery.",
  openGraph: { title: "eBookies.store", description: "Read. Own. Repeat.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full">{children}<Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" /></body></html>;
}
