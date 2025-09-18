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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  RefreshCw,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { contactFormSchema } from "@/lib/schemas/contact";
import { z } from "zod";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: [
      "info@dbhl-enterprises.com",
      "support@dbhl-enterprises.com",
      "sales@dbhl-enterprises.com",
    ],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 4:00 PM",
      "Sunday: Closed",
    ],
  },
];

interface CaptchaData {
  question: string;
  options: number[];
  timestamp: number;
  hash: string;
}

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    department: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaData, setCaptchaData] = useState<CaptchaData | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState<number | null>(null);
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);

  // Load CAPTCHA on component mount
  useEffect(() => {
    loadCaptcha();
  }, []);

  const loadCaptcha = async () => {
    setIsCaptchaLoading(true);
    try {
      const response = await fetch("/api/captcha");
      if (response.ok) {
        const data = await response.json();
        setCaptchaData(data);
        setCaptchaAnswer(null);
        // Clear any previous CAPTCHA error
        if (errors.captcha) {
          setErrors((prev) => ({ ...prev, captcha: "" }));
        }
      } else {
        throw new Error("Failed to load CAPTCHA");
      }
    } catch (error) {
      console.error("Error loading CAPTCHA:", error);
      setErrors((prev) => ({
        ...prev,
        captcha: "Failed to load verification. Please refresh the page.",
      }));
    } finally {
      setIsCaptchaLoading(false);
    }
  };

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

  const handleCaptchaAnswer = (answer: number) => {
    setCaptchaAnswer(answer);
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }));
    }
  };

  const validateForm = () => {
    try {
      // Validate CAPTCHA first
      if (!captchaAnswer || !captchaData) {
        setErrors({ captcha: "Please complete the verification challenge" });
        return false;
      }

      // Validate form data with Zod schema
      contactFormSchema.parse({
        ...formData,
        captchaAnswer,
        captchaTimestamp: captchaData.timestamp,
        captchaHash: captchaData.hash,
      });

      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaAnswer,
          captchaTimestamp: captchaData?.timestamp,
          captchaHash: captchaData?.hash,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          department: "",
        });
        setCaptchaAnswer(null);
        setCaptchaData(null);
      } else {
        setErrors({
          general: result.error || "Failed to send message. Please try again.",
        });
        // Reload CAPTCHA after failed attempt
        if (result.error?.includes("CAPTCHA")) {
          loadCaptcha();
        }
      }
    } catch (error) {
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for contacting DBHL Enterprises. We've received your
              message and will get back to you within 24 hours. You should also
              receive a confirmation email shortly.
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our products or services? We're here to help.
              Reach out to our team and we'll get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <info.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {errors.general && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          className={errors.name ? "border-red-500" : ""}
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          className={errors.email ? "border-red-500" : ""}
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your company"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                        {errors.company && (
                          <p className="text-sm text-red-500">
                            {errors.company}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) =>
                          handleSelectChange("department", value)
                        }
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          className={errors.department ? "border-red-500" : ""}
                        >
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.department && (
                        <p className="text-sm text-red-500">
                          {errors.department}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        className={errors.subject ? "border-red-500" : ""}
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        className={errors.message ? "border-red-500" : ""}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      />
                      <div className="flex justify-between items-center">
                        {errors.message && (
                          <p className="text-sm text-red-500">
                            {errors.message}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 ml-auto">
                          {formData.message.length}/2000
                        </p>
                      </div>
                    </div>

                    {/* Dynamic CAPTCHA */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Verification *
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={loadCaptcha}
                          disabled={isCaptchaLoading || isSubmitting}
                        >
                          <RefreshCw
                            className={`w-4 h-4 mr-1 ${isCaptchaLoading ? "animate-spin" : ""}`}
                          />
                          New Challenge
                        </Button>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        {isCaptchaLoading ? (
                          <div className="text-center py-4">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Loading verification...
                            </p>
                          </div>
                        ) : captchaData ? (
                          <>
                            <p className="text-sm mb-3 text-center font-medium">
                              {captchaData.question}
                            </p>
                            <div className="flex justify-center gap-2 flex-wrap">
                              {captchaData.options.map((option) => (
                                <Button
                                  key={option}
                                  type="button"
                                  variant={
                                    captchaAnswer === option
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  onClick={() => handleCaptchaAnswer(option)}
                                  disabled={isSubmitting}
                                  className="min-w-[50px]"
                                >
                                  {option}
                                </Button>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-red-600 mb-2">
                              Failed to load verification
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={loadCaptcha}
                            >
                              Try Again
                            </Button>
                          </div>
                        )}
                      </div>
                      {errors.captcha && (
                        <p className="text-sm text-red-500">{errors.captcha}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={
                        isSubmitting || !captchaData || captchaAnswer === null
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Why Contact Us?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Expert Support</h4>
                      <p className="text-sm text-gray-600">
                        Get help from our technical experts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Fast Response</h4>
                      <p className="text-sm text-gray-600">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Personalized Solutions</h4>
                      <p className="text-sm text-gray-600">
                        Tailored to your specific needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Email Confirmation</h4>
                      <p className="text-sm text-gray-600">
                        Receive immediate confirmation of your inquiry
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link
                    href="/products"
                    className="block text-sm text-primary hover:underline"
                  >
                    Browse Products →
                  </Link>
                  <Link
                    href="/distributor-login"
                    className="block text-sm text-primary hover:underline"
                  >
                    Distributor Login →
                  </Link>
                  <Link
                    href="/about"
                    className="block text-sm text-primary hover:underline"
                  >
                    About Us →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
