'use client';

import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface OrganizationStructuredDataProps {
  // Add any props if needed
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface WebSiteStructuredDataProps {
  // Add any props if needed
}

export function OrganizationStructuredData({}: OrganizationStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DBHL Enterprises",
      "url": "https://dbhl-enterprises.com",
      "logo": "https://dbhl-enterprises.com/logo.png",
      "description": "Specializing in networking & telecommunication solutions built on quality, honesty, and trust.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Tech Park Drive, Suite 100",
        "addressLocality": "San Jose",
        "addressRegion": "CA",
        "postalCode": "95110",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "email": "info@dbhl-enterprises.com"
      },
      "sameAs": [
        "https://www.linkedin.com/company/dbhl-enterprises",
        "https://twitter.com/dbhl_enterprises"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export function WebSiteStructuredData({}: WebSiteStructuredDataProps) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "DBHL Enterprises",
      "url": "https://dbhl-enterprises.com",
      "description": "Specializing in networking & telecommunication solutions built on quality, honesty, and trust.",
      "publisher": {
        "@type": "Organization",
        "name": "DBHL Enterprises",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dbhl-enterprises.com/logo.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://dbhl-enterprises.com/products?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}