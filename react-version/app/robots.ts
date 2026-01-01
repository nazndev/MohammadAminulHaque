import { MetadataRoute } from 'next';
import { config } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: [
      `${config.baseUrl}/sitemap.xml`,
      `${config.baseUrl}/news-sitemap/`,
    ],
  };
}

