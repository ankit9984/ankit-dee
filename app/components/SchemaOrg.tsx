"use client";

import { usePathname } from 'next/navigation';

type SchemaOrgProps = {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: 'WebPage' | 'CollegeOrUniversity';
  collegeName?: string;
  address?: {
    street?: string;
    city?: string;
    pincode?: string;
    district?: string;
  };
};

export default function SchemaOrg({
  title,
  description,
  canonicalUrl,
  type = 'WebPage',
  collegeName,
  address,
}: SchemaOrgProps) {
  const pathname = usePathname();
  const url = canonicalUrl || `https://college-directory.vercel.app${pathname}`;

  let schema;

  if (type === 'CollegeOrUniversity') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'CollegeOrUniversity',
      name: collegeName,
      description,
      url,
      ...(address && {
        address: {
          '@type': 'PostalAddress',
          streetAddress: address.street,
          addressLocality: address.city,
          postalCode: address.pincode,
          addressRegion: address.district,
        },
      }),
    };
  } else {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
} 