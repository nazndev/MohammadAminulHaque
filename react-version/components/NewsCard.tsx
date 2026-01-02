'use client';

import { Typography, Card } from 'antd';
import { NewsArticle } from '@/types';
import Link from 'next/link';
import { CalendarOutlined, LinkOutlined } from '@ant-design/icons';
import React from 'react';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  const { Title, Paragraph, Text } = Typography;
  const date = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    Research: { bg: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.4)' },
    Achievement: { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981', border: 'rgba(16, 185, 129, 0.4)' },
    Award: { bg: 'rgba(251, 191, 36, 0.2)', text: '#fbbf24', border: 'rgba(251, 191, 36, 0.4)' },
    Media: { bg: 'rgba(168, 85, 247, 0.2)', text: '#a855f7', border: 'rgba(168, 85, 247, 0.4)' },
    Event: { bg: 'rgba(6, 182, 212, 0.2)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.4)' },
    Partnership: { bg: 'rgba(251, 146, 60, 0.2)', text: '#fb923c', border: 'rgba(251, 146, 60, 0.4)' },
    Recognition: { bg: 'rgba(244, 114, 182, 0.2)', text: '#f472b6', border: 'rgba(244, 114, 182, 0.4)' },
  };


  // Extract domain name from sourceUrl for display (if available)
  const getDomainName = (url?: string): string => {
    if (!url) return 'Read Article';
    try {
      const urlObj = new URL(url);
      let domain = urlObj.hostname.replace('www.', '');
      // Format common domains
      if (domain.includes('youtube.com')) return 'YouTube';
      if (domain.includes('sciencedirect.com')) return 'ScienceDirect';
      if (domain.includes('thedailystar.net')) return 'The Daily Star';
      if (domain.includes('dhakatribune.com')) return 'Dhaka Tribune';
      if (domain.includes('newagebd.net')) return 'New Age';
      if (domain.includes('tbsnews.net')) return 'TBS News';
      if (domain.includes('bangladeshpost.net')) return 'Bangladesh Post';
      if (domain.includes('btabloid.com')) return 'Business Tabloid';
      if (domain.includes('banginews.com')) return 'Bangi News';
      if (domain.includes('thefinancialexpress.com.bd')) return 'The Financial Express';
      return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch {
      return 'Read Article';
    }
  };

  const sourceDomain = getDomainName(article.sourceUrl);
  
  // Link to original source URL if available, otherwise use internal URL
  const linkUrl = article.sourceUrl || article.url;
  const isExternal = linkUrl.startsWith('http');

  const cardContent = (
    <Card
        className="card-hover glass-card"
        style={{
          height: '100%',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
        hoverable
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
          e.currentTarget.style.transform = 'translateY(-8px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ 
              fontSize: '0.813rem', 
              padding: '4px 12px',
              borderRadius: '12px',
              fontWeight: 600,
              background: categoryColors[article.category]?.bg || '#f1f5f9',
              color: categoryColors[article.category]?.text || '#475569',
              border: `1px solid ${categoryColors[article.category]?.border || '#e2e8f0'}`,
              display: 'inline-block',
            }}>
              {article.category}
            </span>
            <span style={{ 
              fontSize: '0.813rem', 
              padding: '4px 12px',
              borderRadius: '12px',
              fontWeight: 600,
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#60a5fa',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <CalendarOutlined style={{ fontSize: '0.75rem' }} />
              {date}
            </span>
          </div>
          <Title level={3} style={{ margin: '0 0 12px 0', color: '#ffffff', fontSize: '1.375rem', lineHeight: 1.3 }}>
            {article.title}
          </Title>
        </div>
        
        <Paragraph style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '16px' }}>
          {article.excerpt}
        </Paragraph>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: 'auto',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <LinkOutlined style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '0.875rem',
            }} />
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Read Article →
            </Text>
          </div>
          {article.sourceUrl && (
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.813rem',
                fontWeight: 500,
              }}
            >
              {sourceDomain}
            </Text>
          )}
        </div>
      </Card>
  );

  // Use regular <a> tag for external links, Next.js Link for internal
  if (isExternal) {
    return (
      <a 
        href={linkUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={linkUrl} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {cardContent}
    </Link>
  );
}
