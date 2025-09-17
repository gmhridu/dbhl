import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Cable,
  Shield,
  Zap,
} from "lucide-react";
import Image from "next/image";

const footerNavigation = {
  Products: [
    { name: "Bulk Cables", href: "/products?category=cables" },
    { name: "Patch Cords", href: "/products?category=patch-cords" },
    { name: "Adapters", href: "/products?category=adapters" },
    { name: "Connectors", href: "/products?category=connectors" },
    { name: "Fiber Solutions", href: "/products?category=fiber" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Distributor Login", href: "/distributor-login" },
    { name: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const getYear = () => new Date().getFullYear();
  const currentYear = getYear();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="/logo2.webp"
              alt="DBHL Enterprises Logo"
              width={120}
              height={120}
              priority={true}
              loading="eager"
              className="mb-2"
            />
            <p className="text-gray-300 mb-6 max-w-sm">
              Specializing in networking & telecommunication solutions built on
              quality, honesty, and trust.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {footerNavigation.Products.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerNavigation.Company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center text-sm text-gray-400">
                <Shield className="h-4 w-4 mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Building2 className="h-4 w-4 mr-1" />
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Zap className="h-4 w-4 mr-1" />
                <span>Fast Delivery</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>
                &copy; {currentYear} DBHL Enterprises. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
