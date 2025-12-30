'use client';

import { Tag, Typography } from 'antd';
import { NewsArticle } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
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

  const categoryColors: Record<string, { bg: string; text: string }> = {
    Research: { bg: '#e0f2fe', text: '#0369a1' },
    Achievement: { bg: '#dcfce7', text: '#166534' },
    Award: { bg: '#fef3c7', text: '#92400e' },
    Media: { bg: '#f3e8ff', text: '#6b21a8' },
    Event: { bg: '#cffafe', text: '#0e7490' },
    Partnership: { bg: '#fed7aa', text: '#9a3412' },
    Recognition: { bg: '#fce7f3', text: '#9f1239' },
  };

  const isExternalLink = article.url.startsWith('http://') || article.url.startsWith('https://');
  
  // Extract domain name from URL for display
  const getDomainName = (url: string): string => {
    if (!isExternalLink) return 'Read Article';
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
      return 'External Link';
    }
  };

  const domainName = getDomainName(article.url);
  const categoryColor = categoryColors[article.category] || { bg: '#f1f5f9', text: '#475569' };

  const cardContent = (
    <div
      style={{
        height: '100%',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-6px)';
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        card.style.borderColor = '#1e3a8a';
        const img = card.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.08)';
        }
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        card.style.borderColor = '#e2e8f0';
        const img = card.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1)';
        }
      }}
    >
      {/* Image Section */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '200px', 
        overflow: 'hidden', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
        }}>
          <Tag 
            style={{ 
              margin: 0, 
              fontWeight: 600, 
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              border: 'none',
              background: categoryColor.bg,
              color: categoryColor.text,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {article.category}
          </Tag>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ 
        padding: '24px', 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Date */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          marginBottom: '16px',
          color: '#64748b',
          fontSize: '0.813rem',
        }}>
          <CalendarOutlined style={{ fontSize: '0.875rem' }} />
          <span style={{ fontWeight: 500 }}>{date}</span>
        </div>
        
        {/* Title */}
        <Title 
          level={4} 
          style={{ 
            color: '#1e293b', 
            marginBottom: '12px', 
            marginTop: 0,
            fontSize: '1.125rem', 
            fontWeight: 700, 
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '60px',
          }}
        >
          {article.title}
        </Title>
        
        {/* Excerpt */}
        <Paragraph
          ellipsis={{ rows: 3 }}
          style={{ 
            color: '#475569', 
            margin: 0, 
            marginBottom: '20px',
            lineHeight: '1.7', 
            fontSize: '0.938rem',
            flex: 1,
          }}
        >
          {article.excerpt}
        </Paragraph>
        
        {/* Link Section - Always Visible */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
            minWidth: 0,
          }}>
            <LinkOutlined style={{ 
              color: '#1e3a8a', 
              fontSize: '0.875rem',
              flexShrink: 0,
            }} />
            <Text
              ellipsis
              style={{
                color: '#1e3a8a',
                fontSize: '0.813rem',
                fontWeight: 500,
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={isExternalLink ? article.url : domainName}
            >
              {isExternalLink ? article.url : domainName}
            </Text>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#1e3a8a',
            fontSize: '0.875rem',
            fontWeight: 600,
            flexShrink: 0,
          }}>
            <span>{domainName}</span>
            {isExternalLink && (
              <span style={{ fontSize: '0.75rem' }}>↗</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (isExternalLink) {
    return (
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={article.url} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      {cardContent}
    </Link>
  );
}
