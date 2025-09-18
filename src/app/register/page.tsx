import { RegisterClient } from "@/components/register/RegisterClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Distributor Registration - DBHL Enterprises | Join Our Partner Network",
  description:
    "Apply to become a DBHL Enterprises distributor and unlock exclusive benefits. Join our trusted network of partners with competitive pricing, territory protection, and dedicated support.",
  keywords: [
    "distributor registration",
    "DBHL distributor application",
    "become a distributor",
    "partner network",
    "distributor partnership",
    "wholesale networking products",
    "distributor benefits",
    "exclusive pricing",
    "territory protection",
    "business partnership",
    "distributor onboarding",
    "reseller application",
  ],
  authors: [{ name: "DBHL Enterprises" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dbhl-enterprises.com/register",
    title:
      "Distributor Registration - DBHL Enterprises | Join Our Partner Network",
    description:
      "Apply to become a DBHL distributor and unlock exclusive benefits, competitive pricing, and dedicated support. Join our trusted partner network today.",
    siteName: "DBHL Enterprises",
    images: [
      {
        url: "/distributor-registration-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DBHL Enterprises Distributor Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join DBHL Enterprises Partner Network",
    description:
      "Apply for distributor partnership with exclusive benefits and dedicated support.",
  },
  alternates: {
    canonical: "https://dbhl-enterprises.com/register",
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
