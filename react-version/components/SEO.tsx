import { Metadata } from 'next';
import { config } from '@/lib/config';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

export function generateSEOMetadata({
  title,
  description,
  url = '',
  image,
  type = 'website',
  publishedTime,
  author = 'Mohammad Aminul Haque'
}: SEOProps): Metadata {
  const fullUrl = `${config.baseUrl}${url}`;
  const ogImage = image || `${config.baseUrl}/og-image.jpg`;

  return {
    title: `${title} | Mohammad Aminul Haque`,
    description,
    keywords: [
      'Mohammad Aminul Haque',
      'Aminul Haque',
      'banking',
      'fintech',
      'Islamic finance',
      'Sukuk',
      'transformation',
      'wealth management',
      'strategy',
      'finance researcher'
    ],
    authors: [{ name: author }],
    openGraph: {
      type,
      url: fullUrl,
      title,
      description,
      images: [{ url: ogImage }],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

export function generateStructuredData(type: 'Person' | 'WebSite' | 'NewsArticle', data: any) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Person':
      return {
        ...baseSchema,
        name: 'Mohammad Aminul Haque',
        url: config.baseUrl,
        sameAs: [
          'https://www.linkedin.com/in/mohammad-aminul-haque-32989215'
        ],
        jobTitle: 'Executive Director, Transformation & Strategy',
        description: data.description || 'Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience.',
      };
    
    case 'WebSite':
      return {
        ...baseSchema,
        name: 'Mohammad Aminul Haque',
        url: config.baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${config.baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
    
    case 'NewsArticle':
      return {
        ...baseSchema,
        headline: data.title,
        datePublished: data.date,
        dateModified: data.date,
        description: data.excerpt,
        image: data.image,
        url: `${config.baseUrl}${data.url}`,
        author: {
          '@type': 'Person',
          name: 'Mohammad Aminul Haque',
          sameAs: 'https://www.linkedin.com/in/mohammad-aminul-haque-32989215',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Mohammad Aminul Haque',
          logo: {
            '@type': 'ImageObject',
            url: `${config.baseUrl}/logo.png`,
          },
        },
      };
    
    default:
      return baseSchema;
  }
}

