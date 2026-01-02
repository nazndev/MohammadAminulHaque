import { NextResponse } from 'next/server';
import { getAllNewsArticles } from '@/lib/news';
import { config } from '@/lib/config';

export async function GET() {
  const articles = getAllNewsArticles();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${articles
    .map(
      (article) => `
  <url>
    <loc>${config.baseUrl}${article.url}</loc>
    <lastmod>${new Date(article.date).toISOString().split('T')[0]}</lastmod>
    <news:news>
      <news:publication>
        <news:name>Mohammad Aminul Haque</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.date).toISOString().split('T')[0]}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>Mohammad Aminul Haque, Banking, Fintech, Islamic Finance, ${article.category}</news:keywords>
    </news:news>
  </url>
  `
    )
    .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
