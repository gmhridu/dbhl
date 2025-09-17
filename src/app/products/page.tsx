import { ProductsClient } from "@/components/products/ProductsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Networking Products - DBHL Enterprises | Cables, Fiber, Connectors",
  description:
    "Browse DBHL Enterprises' comprehensive range of networking products including bulk cables, fiber optic solutions, patch cords, adapters, and connectors. Premium quality with fast delivery.",
  keywords: [
    "networking products",
    "bulk cables",
    "fiber optic products",
    "patch cords",
    "network adapters",
    "connectors",
    "telecommunication products",
    "enterprise networking",
    "network infrastructure",
    "MTP solutions",
    "pigtails",
    "patch panels",
    "fiber accessories",
  ],
  authors: [{ name: "DBHL Enterprises" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dbhl-enterprises.com/products",
    title: "Networking Products - DBHL Enterprises | Cables, Fiber, Connectors",
    description:
      "Browse our comprehensive range of premium networking products. From bulk cables to fiber optic solutions, find everything for your network infrastructure.",
    siteName: "DBHL Enterprises",
    images: [
      {
        url: "/products-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DBHL Enterprises Networking Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Networking Products - DBHL Enterprises",
    description:
      "Premium networking products including cables, fiber optics, and connectors. Quality guaranteed with fast delivery.",
  },
  alternates: {
    canonical: "https://dbhl-enterprises.com/products",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
