export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  url: string;
  category: string;
}

export interface SiteConfig {
  baseUrl: string;
  environment: 'development' | 'production';
}

