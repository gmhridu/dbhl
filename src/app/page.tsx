import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cable,
  Shield,
  Zap,
  Building2,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Network,
  Layers,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Premium Quality Products",
    description:
      "Our networking and telecommunication solutions are built to last with the highest quality standards.",
    icon: Shield,
  },
  {
    title: "Fast Delivery",
    description:
      "Get your products quickly with our efficient supply chain and delivery network.",
    icon: Zap,
  },
  {
    title: "Enterprise Solutions",
    description:
      "Scalable solutions for businesses of all sizes, from startups to large enterprises.",
    icon: Building2,
  },
  {
    title: "Expert Support",
    description:
      "Our team of experts is always ready to help you with technical support and guidance.",
    icon: Users,
  },
];

const productCategories = [
  {
    name: "Bulk Cables",
    description:
      "High-quality networking cables for all your infrastructure needs",
    icon: Cable,
    href: "/products?category=cables",
  },
  {
    name: "Patch Cords",
    description: "Reliable patch cords for seamless network connections",
    icon: Cable,
    href: "/products?category=patch-cords",
  },
  {
    name: "Adapters & Connectors",
    description: "Comprehensive range of adapters and connectors",
    icon: Cable,
    href: "/products?category=adapters",
  },
  {
    name: "Fiber Solutions",
    description: "Advanced fiber optic solutions for high-speed connectivity",
    icon: Cable,
    href: "/products?category=fiber",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Award className="w-4 h-4 mr-2" />
                Trusted by Industry Leaders
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Networking & Telecommunication
                <span className="text-primary block">Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Built on quality, honesty, and trust. DBHL Enterprises provides
                premium networking products and telecommunication solutions for
                businesses worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Cable className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Bulk Cables</h3>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Quality Assured</h3>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Fast Delivery</h3>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Building2 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h3 className="font-semibold">Enterprise Grade</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DBHL Fiber Systems Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                DBHL Fiber Systems
              </h2>
              <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                The DBHL line of fiber optic systems delivers outstanding
                performance, reliability, and scalability, supporting everything
                from large multi-purpose venues and high-density data centers to
                small business cabling upgrades.
              </p>
              <p className="text-lg text-blue-100 mb-8">
                Our wide product range includes bulk cables, patch cords,
                adapters, connectors, pigtails, fiber panels, pre-terminated
                solutions, PON, MTP, high-density systems, and a full selection
                of tools and accessories.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/products?category=fiber">
                  Explore Fiber Solutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white/20 rounded-lg">
                    <Network className="h-10 w-10 text-white mx-auto mb-3" />
                    <h3 className="font-semibold text-white text-sm">
                      High-Density Systems
                    </h3>
                  </div>
                  <div className="text-center p-6 bg-white/20 rounded-lg">
                    <Cable className="h-10 w-10 text-white mx-auto mb-3" />
                    <h3 className="font-semibold text-white text-sm">
                      Bulk Cables
                    </h3>
                  </div>
                  <div className="text-center p-6 bg-white/20 rounded-lg">
                    <Layers className="h-10 w-10 text-white mx-auto mb-3" />
                    <h3 className="font-semibold text-white text-sm">
                      Pre-terminated
                    </h3>
                  </div>
                  <div className="text-center p-6 bg-white/20 rounded-lg">
                    <Shield className="h-10 w-10 text-white mx-auto mb-3" />
                    <h3 className="font-semibold text-white text-sm">
                      PON & MTP
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DBHL Enterprises?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with exceptional service to deliver
              solutions that drive your business forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fibre To The Home Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Fibre To The Home
              </h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Whether you are looking for advise on connection for a single
                dwelling or an apartment block servicing 100's of homes, we can
                help you right from the design stage of a system through to
                installation and if you require bespoke products to make this
                happen.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-green-100">
                  <CheckCircle className="h-5 w-5 mr-3 text-white" />
                  <span>Single Dwelling Solutions</span>
                </div>
                <div className="flex items-center text-green-100">
                  <CheckCircle className="h-5 w-5 mr-3 text-white" />
                  <span>Apartment Block Services</span>
                </div>
                <div className="flex items-center text-green-100">
                  <CheckCircle className="h-5 w-5 mr-3 text-white" />
                  <span>Custom Design Services</span>
                </div>
                <div className="flex items-center text-green-100">
                  <CheckCircle className="h-5 w-5 mr-3 text-white" />
                  <span>Installation Support</span>
                </div>
              </div>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Get FTTH Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <HomeIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Connected Homes
                  </h3>
                  <p className="text-gray-600">From design to installation</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Building2 className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium">Design</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Cable className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium">Install</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Network className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium">Connect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive range of networking and telecommunication products
              to meet all your infrastructure needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    {category.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link href={category.href}>
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fiber Optics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <Network className="h-20 w-20 text-blue-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Premium Quality</h4>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Ruggedized</h4>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Fiber Optics
              </h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  DBHL supplies fiber optic solutions across the U.S. We
                  manufacture premium-quality fiber optic products and can
                  provide ruggedized and armored jackets to shield and protect
                  your cables.
                </p>
                <p className="text-lg leading-relaxed">
                  We deliver complete network solutions through a flexible
                  package of custom services and products, including pigtails,
                  connectors, patch panels, accessories, and enclosures.
                </p>
                <p className="text-lg leading-relaxed">
                  From standard installations to high-security data centers, we
                  offer reliable fiber optic connections—ranging from Expanded
                  Beam Connectors to lockable, tamper-proof network jacks and
                  patch leads designed to prevent unauthorized use of vacant
                  ports.
                </p>
                <p className="text-lg leading-relaxed">
                  Please contact us with any questions or if you need a solution
                  not listed on our site.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" asChild>
                  <Link href="/products?category=fiber">
                    View Fiber Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact for Custom Solutions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Network Infrastructure?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join hundreds of satisfied customers who trust DBHL Enterprises for
            their networking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="" asChild>
              <Link href="/distributor-login">Distributor Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-600">
              Our commitment to excellence has earned us the trust of businesses
              worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              "Quality Certified",
              "ISO 9001:2015",
              "Fast Shipping",
              "24/7 Support",
            ].map((item, index) => (
              <div key={index} className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
