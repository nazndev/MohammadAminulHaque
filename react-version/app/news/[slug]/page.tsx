import { notFound } from 'next/navigation';
import { Typography, Tag, Button } from 'antd';
import { ArrowLeftOutlined, LinkOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import { getAllNewsArticles, getNewsArticleByUrl } from '@/lib/news';
import { generateSEOMetadata, generateStructuredData } from '@/components/SEO';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = getAllNewsArticles();
  return articles.map((article) => {
    // Extract slug from URL (e.g., "/news/slug-name" -> "slug-name")
    const slug = article.url.startsWith('/news/') 
      ? article.url.replace('/news/', '')
      : article.url.replace(/^\//, ''); // Remove leading slash if present
    return { slug };
  });
}

export async function generateMetadata({ params }: PageProps) {
  const article = getNewsArticleByUrl(`/news/${params.slug}`);
  
  if (!article) {
    return {};
  }

  return generateSEOMetadata({
    title: article.title,
    description: article.excerpt,
    url: article.url,
    image: article.image,
    type: 'article',
    publishedTime: article.date,
  });
}

export default function NewsArticlePage({ params }: PageProps) {
  const { Title, Paragraph } = Typography;
  const article = getNewsArticleByUrl(`/news/${params.slug}`);

  if (!article) {
    notFound();
  }

  const date = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  const categoryColors: Record<string, string> = {
    Research: 'blue',
    Achievement: 'green',
    Award: 'gold',
    Media: 'purple',
    Event: 'cyan',
    Partnership: 'orange',
    Recognition: 'magenta',
  };

  const articleSchema = generateStructuredData('NewsArticle', article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '48px 24px' }}>
        <Link href="/#news">
          <Button
            icon={<ArrowLeftOutlined />}
            style={{ marginBottom: '32px' }}
          >
            Back to News
          </Button>
        </Link>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ color: '#94a3b8' }}>Published: {date}</span>
            <Tag color={categoryColors[article.category] || 'default'} style={{ fontWeight: 600 }}>
              {article.category}
            </Tag>
          </div>
          <Title
            level={1}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#1e293b',
              marginBottom: '24px',
            }}
          >
            {article.title}
          </Title>
        </div>

        <div style={{ marginBottom: '48px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image
            src={article.image}
            alt={article.title}
            width={800}
            height={400}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        <div style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#475569' }}>
          {article.content.split('\n').map((paragraph, index) => (
            <Paragraph key={index} style={{ marginBottom: '24px', color: '#475569' }}>
              {paragraph}
            </Paragraph>
          ))}
        </div>

        {/* Link to Original Source */}
        {article.sourceUrl && (
          <div style={{
            marginTop: '48px',
            padding: '24px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <LinkOutlined style={{ color: '#1e3a8a', fontSize: '1.25rem' }} />
              <Title level={4} style={{ margin: 0, color: '#1e293b' }}>
                Original Source
              </Title>
            </div>
            <Paragraph style={{ marginBottom: '16px', color: '#64748b' }}>
              Read the original article on the source website:
            </Paragraph>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1e3a8a',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '12px 24px',
                background: '#ffffff',
                border: '1px solid #1e3a8a',
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1e3a8a';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#1e3a8a';
              }}
            >
              <span>View Original Article</span>
              <span style={{ fontSize: '0.875rem' }}>↗</span>
            </a>
          </div>
        )}
      </div>
    </>
  );
}

