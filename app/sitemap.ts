import { MetadataRoute } from 'next';
import { collegeData } from '@/data/colleges';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://college-directory.vercel.app'; // Replace with your actual domain when deployed

  // Create college detail pages
  const collegeUrls = collegeData.map((college) => {
    return {
      url: `${baseUrl}/college/${encodeURIComponent(college.collegeName)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...collegeUrls];
} 