"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Grid,
  List,
  Cable,
  Shield,
  Star,
  ShoppingCart,
  Eye,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

// Mock product data - in a real app, this would come from the database
const mockProducts = [
  {
    id: "1",
    name: "CAT6 Bulk Cable - 1000ft",
    description:
      "High-quality CAT6 bulk cable for professional networking installations",
    price: 89.99,
    category: "cables",
    sku: "CAT6-BLK-1000",
    images: ["/product.jpg"],
    features: ["23AWG", "550MHz", "CMR Rated", "Blue"],
    isFeatured: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Fiber Optic Patch Cord - LC/LC",
    description: "Single-mode fiber optic patch cord with LC connectors",
    price: 24.99,
    category: "patch-cords",
    sku: "FO-PC-LC-LC-3M",
    images: ["/product.jpg"],
    features: ["Single-mode", "3 meters", "LC/LC", "OS2"],
    isFeatured: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    name: "RJ45 Adapter - Female to Female",
    description: "Compact RJ45 coupler for extending network connections",
    price: 4.99,
    category: "adapters",
    sku: "RJ45-ADAP-FF",
    images: ["/product.jpg"],
    features: ["Female/Female", "RJ45", "Gold Plated"],
    isFeatured: false,
    rating: 4.5,
    reviews: 56,
  },
  {
    id: "4",
    name: "Fiber Panel - 24 Port",
    description:
      "High-density fiber optic patch panel for organized cable management",
    price: 159.99,
    category: "fiber",
    sku: "FP-24P-1U",
    images: ["/product.jpg"],
    features: ["24 Port", "1U Rack", "LC/SC/ST", "Metal"],
    isFeatured: true,
    rating: 4.7,
    reviews: 67,
  },
  {
    id: "5",
    name: "CAT6 Patch Cord - 5ft Blue",
    description: "Molded CAT6 patch cord for reliable network connections",
    price: 8.99,
    category: "patch-cords",
    sku: "CAT6-PC-5FT-BL",
    images: ["/product.jpg"],
    features: ["5ft", "CAT6", "Molded", "Blue"],
    isFeatured: false,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: "6",
    name: "MTP Fiber Connector",
    description: "High-performance MTP connector for fiber optic networks",
    price: 34.99,
    category: "connectors",
    sku: "MTP-CONN-12F",
    images: ["/product.jpg"],
    features: ["12 Fiber", "MTP", "Single-mode", "Blue"],
    isFeatured: true,
    rating: 4.9,
    reviews: 45,
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "cables", label: "Bulk Cables" },
  { value: "patch-cords", label: "Patch Cords" },
  { value: "adapters", label: "Adapters" },
  { value: "connectors", label: "Connectors" },
  { value: "fiber", label: "Fiber Solutions" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name: A to Z" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
        );
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const ProductCard = ({ product }: { product: (typeof mockProducts)[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col p-0 rounded-md">
      {/* Image Section - full width, no padding */}
      <div className="relative w-full h-52 overflow-hidden">
        {product.images && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        )}
        {product.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
            <Star className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="flex-1 flex flex-col justify-between p-4">
        <div>
          <CardTitle className="text-lg line-clamp-2 mb-1">
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-2">{product.sku}</p>

          <CardDescription className="line-clamp-2 mb-3 text-sm">
            {product.description}
          </CardDescription>

          {/* Features */}
          <div className="flex flex-wrap gap-1 mb-3">
            {product.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {product.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{product.features.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Rating + Price + Actions */}
        <div className="mt-auto">
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductList = ({ product }: { product: (typeof mockProducts)[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <Cable className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.sku}</p>
              </div>
              {product.isFeatured && (
                <Badge className="bg-yellow-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-3">{product.description}</p>

            <div className="flex flex-wrap gap-1 mb-3">
              {product.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <span className="text-xl font-bold text-primary">
                  ${product.price}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our comprehensive range of networking and telecommunication
              solutions
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSortBy("featured");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductList key={product.id} product={product} />
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Finding the Right Product?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Our expert team is ready to help you find the perfect solution for
            your networking needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <a href="/contact">
                Contact Our Experts
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
              asChild
            >
              <a href="/distributor-login">Distributor Login</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
