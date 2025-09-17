import Link from "next/link";
import { Phone, Mail, MapPin, Building2, Cable, Shield, Zap } from "lucide-react";

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
  Support: [
    { name: "Technical Support", href: "/contact" },
    { name: "Product Documentation", href: "/contact" },
    { name: "Warranty Information", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">DBHL</span>
              <span className="text-sm text-gray-400 ml-1">Enterprises</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              Specializing in networking & telecommunication solutions built on quality, honesty, and trust.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>123 Tech Park Drive, Suite 100<br />San Jose, CA 95110</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>info@dbhl-enterprises.com</span>
              </div>
            </div>
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

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {footerNavigation.Support.map((item) => (
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
              <span>&copy; 2024 DBHL Enterprises. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}