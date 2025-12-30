import { NewsArticle } from '@/types';
import newsDataRaw from '@/data/news-data.json';

const newsData = newsDataRaw as NewsArticle[];

export function getAllNewsArticles(): NewsArticle[] {
  return newsData as NewsArticle[];
}

export function getNewsArticleByUrl(url: string): NewsArticle | undefined {
  const articles = getAllNewsArticles();
  return articles.find(article => article.url === url);
}

export function getNewsArticleById(id: number): NewsArticle | undefined {
  const articles = getAllNewsArticles();
  return articles.find(article => article.id === id);
}

export function getLatestNewsArticles(limit?: number): NewsArticle[] {
  const articles = getAllNewsArticles();
  // Sort by date (newest first)
  const sorted = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return limit ? sorted.slice(0, limit) : sorted;
}

