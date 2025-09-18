"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Eye,
  EyeOff,
  Building2,
  Lock,
  Mail,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  User,
  Phone,
  Globe,
  UserPlus,
  Award,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export function RegisterClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    country: "",
    annualRevenue: "",
    yearsInBusiness: "",
    businessDescription: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactName) {
      newErrors.contactName = "Contact name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.businessType) {
      newErrors.businessType = "Business type is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.businessDescription) {
      newErrors.businessDescription = "Business description is required";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          website: formData.website || null,
          businessType: formData.businessType,
          country: formData.country,
          annualRevenue: formData.annualRevenue || null,
          yearsInBusiness: formData.yearsInBusiness || null,
          businessDescription: formData.businessDescription,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ email: data.error });
        } else if (response.status === 400) {
          setErrors({ general: data.error });
        } else {
          setErrors({ general: "Registration failed. Please try again." });
        }
        return;
      }

      // Registration successful
      setErrors({});
      setIsSuccess(true);

      // Reset form
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        businessType: "",
        country: "",
        annualRevenue: "",
        yearsInBusiness: "",
        businessDescription: "",
        password: "",
        confirmPassword: "",
      });
      setAgreeToTerms(false);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">Application Submitted!</h2>
              <p className="text-muted-foreground">
                Thank you for your interest in becoming a DBHL distributor. Your
                application has been submitted successfully and is now pending
                review.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold text-sm mb-2">
                  What happens next?
                </h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Our team will review your application</li>
                  <li>• You'll receive an email within 2-5 business days</li>
                  <li>
                    • Once approved, you'll get access to your distributor
                    portal
                  </li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsSuccess(false)}
                  className="flex-1"
                >
                  Submit Another Application
                </Button>
                <Link href="/distributor-login" className="flex-1">
                  <Button className="w-full">Already have an account?</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info */}
          <div className="space-y-8 lg:sticky lg:top-8">
            <div>
              <Link href="/" className="flex items-center mb-8">
                <span className="text-3xl font-bold text-primary">DBHL</span>
                <span className="text-sm text-muted-foreground ml-1">
                  Enterprises
                </span>
              </Link>

              <Badge variant="secondary" className="mb-4">
                <UserPlus className="w-4 h-4 mr-2" />
                Distributor Registration
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Join Our Partner
                <span className="text-primary block">Network</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Apply to become a DBHL distributor and unlock exclusive
                benefits, competitive pricing, and dedicated support for your
                business growth.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Exclusive Partnership
                  </h3>
                  <p className="text-gray-600">
                    Join our elite network of trusted distributors worldwide
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Competitive Margins
                  </h3>
                  <p className="text-gray-600">
                    Access attractive distributor pricing and volume discounts
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Business Support
                  </h3>
                  <p className="text-gray-600">
                    Get marketing materials, training, and technical assistance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Territory Protection
                  </h3>
                  <p className="text-gray-600">
                    Secure your market with exclusive territory rights
                  </p>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="pt-8 border-t">
              <h3 className="font-semibold text-lg mb-4">
                Application Process
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                    1
                  </div>
                  <span className="text-sm">Submit application form</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                    2
                  </div>
                  <span className="text-sm text-gray-600">
                    Review & verification (2-5 days)
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                    3
                  </div>
                  <span className="text-sm text-gray-600">
                    Welcome & onboarding
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">
                  Distributor Application
                </CardTitle>
                <CardDescription>
                  Please provide your business details to apply for distributor
                  partnership
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {errors.general && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.general}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      Company Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Your company name"
                            className={`pl-10 ${errors.companyName ? "border-red-500" : ""}`}
                            value={formData.companyName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.companyName && (
                          <p className="text-sm text-red-500">
                            {errors.companyName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Person *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="contactName"
                            name="contactName"
                            placeholder="Full name"
                            className={`pl-10 ${errors.contactName ? "border-red-500" : ""}`}
                            value={formData.contactName}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.contactName && (
                          <p className="text-sm text-red-500">
                            {errors.contactName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Business Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="business@company.com"
                            className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Company Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          name="website"
                          type="url"
                          placeholder="https://www.yourcompany.com"
                          className="pl-10"
                          value={formData.website}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      Business Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) =>
                            handleSelectChange("businessType", value)
                          }
                        >
                          <SelectTrigger
                            className={
                              errors.businessType ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retailer">Retailer</SelectItem>
                            <SelectItem value="wholesaler">
                              Wholesaler
                            </SelectItem>
                            <SelectItem value="distributor">
                              Distributor
                            </SelectItem>
                            <SelectItem value="integrator">
                              System Integrator
                            </SelectItem>
                            <SelectItem value="consultant">
                              IT Consultant
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.businessType && (
                          <p className="text-sm text-red-500">
                            {errors.businessType}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) =>
                            handleSelectChange("country", value)
                          }
                        >
                          <SelectTrigger
                            className={errors.country ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="jp">Japan</SelectItem>
                            <SelectItem value="sg">Singapore</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <p className="text-sm text-red-500">
                            {errors.country}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="annualRevenue">Annual Revenue</Label>
                        <Select
                          value={formData.annualRevenue}
                          onValueChange={(value) =>
                            handleSelectChange("annualRevenue", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select revenue range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100k">
                              Under $100K
                            </SelectItem>
                            <SelectItem value="100k-500k">
                              $100K - $500K
                            </SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                            <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                            <SelectItem value="over-10m">Over $10M</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="yearsInBusiness">
                          Years in Business
                        </Label>
                        <Select
                          value={formData.yearsInBusiness}
                          onValueChange={(value) =>
                            handleSelectChange("yearsInBusiness", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select years" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-1">
                              Under 1 year
                            </SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="over-10">
                              Over 10 years
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessDescription">
                        Business Description *
                      </Label>
                      <Textarea
                        id="businessDescription"
                        name="businessDescription"
                        placeholder="Please describe your business, target markets, and why you want to become a DBHL distributor..."
                        className={`min-h-[100px] ${errors.businessDescription ? "border-red-500" : ""}`}
                        value={formData.businessDescription}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      {errors.businessDescription && (
                        <p className="text-sm text-red-500">
                          {errors.businessDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Account Security */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">
                      Account Security
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a secure password"
                          className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                          value={formData.password}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => {
                          setAgreeToTerms(checked as boolean);
                          if (errors.terms) {
                            setErrors((prev) => ({ ...prev, terms: "" }));
                          }
                        }}
                        className={errors.terms ? "border-red-500" : ""}
                      />
                      <div className="space-y-1 leading-none">
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-primary hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          By submitting this application, you consent to DBHL
                          processing your information and contacting you about
                          partnership opportunities.
                        </p>
                      </div>
                    </div>
                    {errors.terms && (
                      <p className="text-sm text-red-500">{errors.terms}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Submitting Application..."
                      : "Submit Application"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/distributor-login"
                      className="text-primary hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
