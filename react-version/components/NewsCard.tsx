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
    Research: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
    Achievement: { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
    Award: { bg: '#fef3c7', text: '#92400e', border: '#fbbf24' },
    Media: { bg: '#f3e8ff', text: '#6b21a8', border: '#a855f7' },
    Event: { bg: '#cffafe', text: '#0e7490', border: '#06b6d4' },
    Partnership: { bg: '#fed7aa', text: '#9a3412', border: '#fb923c' },
    Recognition: { bg: '#fce7f3', text: '#9f1239', border: '#f472b6' },
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
        style={{
          height: '100%',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
        }}
        hoverable
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.transform = 'translateX(0)';
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
              background: '#eff6ff',
              color: '#1e40af',
              border: '1px solid #3b82f6',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <CalendarOutlined style={{ fontSize: '0.75rem' }} />
              {date}
            </span>
          </div>
          <Title level={3} style={{ margin: '0 0 12px 0', color: '#1e293b', fontSize: '1.375rem', lineHeight: 1.3 }}>
            {article.title}
          </Title>
        </div>
        
        <Paragraph style={{ fontSize: '1rem', lineHeight: 1.7, color: '#5a6c7d', marginBottom: '16px' }}>
          {article.excerpt}
        </Paragraph>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #e2e8f0',
          marginTop: 'auto',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <LinkOutlined style={{ 
              color: '#1e3a8a', 
              fontSize: '0.875rem',
            }} />
            <Text
              style={{
                color: '#1e3a8a',
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
                color: '#64748b',
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
