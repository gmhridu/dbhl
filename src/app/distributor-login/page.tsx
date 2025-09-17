import { LoginClient } from "@/components/login/LoginClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Distributor Login - DBHL Enterprises | Secure Portal Access",
  description:
    "Secure login portal for DBHL Enterprises distributors. Access exclusive pricing, real-time inventory, and dedicated support. Join our trusted network of partners worldwide.",
  keywords: [
    "distributor login",
    "DBHL distributor portal",
    "secure access",
    "distributor pricing",
    "wholesale networking products",
    "partner portal",
    "distributor dashboard",
    "exclusive pricing",
    "bulk orders",
    "reseller login",
  ],
  authors: [{ name: "DBHL Enterprises" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dbhl-enterprises.com/distributor-login",
    title: "Distributor Login - DBHL Enterprises | Secure Portal Access",
    description:
      "Secure distributor portal with exclusive pricing and real-time inventory. Join our trusted network of partners.",
    siteName: "DBHL Enterprises",
    images: [
      {
        url: "/distributor-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DBHL Enterprises Distributor Portal",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Distributor Login - DBHL Enterprises",
    description:
      "Secure portal for distributors with exclusive pricing and dedicated support.",
  },
  alternates: {
    canonical: "https://dbhl-enterprises.com/distributor-login",
  },
};

export default function DistributorLogin() {
  return <LoginClient />;
}
