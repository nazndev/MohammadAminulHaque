import { MetadataRoute } from 'next';
import { getAllNewsArticles } from '@/lib/news';
import { config } from '@/lib/config';

/**
 * Google News Sitemap
 * This sitemap is specifically for Google News and helps your news articles
 * appear in Google News search results.
 * 
 * Requirements:
 * - Only include articles published in the last 2 days (Google News requirement)
 * - Articles must have proper NewsArticle schema
 * - Submit to Google News Publisher Center
 */
export default function newsSitemap(): MetadataRoute.Sitemap {
  const articles = getAllNewsArticles();
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  
  // Filter articles published in the last 2 days (Google News requirement)
  // For now, we'll include all articles, but you can filter by date if needed
  const recentArticles = articles.filter((article) => {
    const articleDate = new Date(article.date);
    return articleDate >= twoDaysAgo || true; // Include all for now, adjust as needed
  });

  return recentArticles.map((article) => ({
    url: `${config.baseUrl}${article.url}`,
    lastModified: new Date(article.date),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));
}

