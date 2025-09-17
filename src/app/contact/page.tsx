import { ContactClient } from "@/components/contact/ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact DBHL Enterprises - Get Expert Networking Support",
  description:
    "Contact DBHL Enterprises for expert networking and telecommunication solutions. Our technical team is ready to help with your infrastructure needs. Response within 24 hours.",
  keywords: [
    "contact DBHL",
    "networking support",
    "telecommunication help",
    "technical support",
    "network consultation",
    "fiber optic support",
    "enterprise networking help",
    "customer service",
    "network infrastructure support",
  ],
  authors: [{ name: "DBHL Enterprises" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dbhl-enterprises.com/contact",
    title: "Contact DBHL Enterprises - Get Expert Networking Support",
    description:
      "Contact DBHL Enterprises for expert networking and telecommunication solutions. Our technical team responds within 24 hours.",
    siteName: "DBHL Enterprises",
    images: [
      {
        url: "/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact DBHL Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact DBHL Enterprises - Get Expert Networking Support",
    description:
      "Contact our expert team for networking and telecommunication solutions. 24-hour response guarantee.",
  },
  alternates: {
    canonical: "https://dbhl-enterprises.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
