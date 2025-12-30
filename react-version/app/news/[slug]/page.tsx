import { notFound } from 'next/navigation';
import { Typography, Tag, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
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
  return articles.map((article) => ({
    slug: article.url.replace('/news/', ''),
  }));
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
              color: '#e2e8f0',
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

        <div style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#94a3b8' }}>
          {article.content.split('\n').map((paragraph, index) => (
            <Paragraph key={index} style={{ marginBottom: '24px' }}>
              {paragraph}
            </Paragraph>
          ))}
        </div>
      </div>
    </>
  );
}

