export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  url: string; // Internal URL on your website
  sourceUrl?: string; // Original external source URL (if applicable)
  category: string;
}

export interface SiteConfig {
  baseUrl: string;
  environment: 'development' | 'production';
}

