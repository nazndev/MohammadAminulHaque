import { MetadataRoute } from 'next';
import { getAllNewsArticles } from '@/lib/news';
import { config } from '@/lib/config';

export default function newsNewsitemap(): MetadataRoute.Sitemap {
  const articles = getAllNewsArticles();
  
  return articles.map((article) => ({
    url: `${config.baseUrl}${article.url}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));
}
