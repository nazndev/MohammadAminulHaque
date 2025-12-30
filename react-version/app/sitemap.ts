import { MetadataRoute } from 'next';
import { getAllNewsArticles } from '@/lib/news';
import { config } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllNewsArticles();
  
  const newsUrls = articles.map((article) => ({
    url: `${config.baseUrl}${article.url}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${config.baseUrl}/#news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...newsUrls,
  ];
}

