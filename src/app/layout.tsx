import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "DBHL Enterprises - Networking & Telecommunication Solutions",
  description: "Specializing in networking & telecommunication solutions built on quality, honesty, and trust. Bulk cables, patch cords, adapters, connectors, and fiber solutions.",
  keywords: ["networking", "telecommunication", "cables", "connectors", "fiber solutions", "patch cords", "adapters", "DBHL Enterprises"],
  authors: [{ name: "DBHL Enterprises" }],
  openGraph: {
    title: "DBHL Enterprises - Networking & Telecommunication Solutions",
    description: "Specializing in networking & telecommunication solutions built on quality, honesty, and trust.",
    url: "https://dbhl-enterprises.com",
    siteName: "DBHL Enterprises",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DBHL Enterprises - Networking & Telecommunication Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DBHL Enterprises - Networking & Telecommunication Solutions",
    description: "Specializing in networking & telecommunication solutions built on quality, honesty, and trust.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://dbhl-enterprises.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationStructuredData />
        <WebSiteStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
