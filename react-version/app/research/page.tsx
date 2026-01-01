'use client';

import { Typography, Card, List, Tag } from 'antd';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function ResearchPage() {
  const { Title, Paragraph } = Typography;
  const publications = [
    {
      title: 'Are Islamic Bonds Different from Conventional Bonds? International Evidence from Capital Market Tests',
      authors: 'Nafis Alam, M. Kabir Hassan, Mohammad Aminul Haque',
      journal: 'Borsa Istanbul Review',
      publisher: 'Elsevier, ScienceDirect',
      year: '2013',
      volume: 'Volume 13, Issue 3',
      url: 'https://www.sciencedirect.com/science/article/pii/S2214845013000112',
      description: 'This high-impact research paper examines the fundamental differences between Islamic bonds (Sukuk) and conventional bonds in global capital markets. The study analyzes 166 bond issuances across multiple international markets over nearly a decade, including periods before, during, and after the global financial crisis.',
      impact: 'One of the highest cited publications in Islamic Bond research',
      category: 'Research',
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', background: '#ffffff' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <Title
          level={1}
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            marginBottom: '16px',
            color: '#1e293b',
          }}
        >
          Research & Publications
        </Title>
        <Paragraph style={{ fontSize: '1.125rem', color: '#5a6c7d', maxWidth: '700px', margin: '0 auto' }}>
          Internationally published research in Islamic Finance and Capital Markets by Mohammad Aminul Haque
        </Paragraph>
      </div>

      {publications.map((pub, index) => (
        <Card
          key={index}
          style={{
            marginBottom: '48px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            borderRadius: '16px',
            transition: 'all 0.3s ease',
          }}
          hoverable
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <BookOutlined style={{ fontSize: '20px', color: '#1e3a8a' }} />
              <span style={{ 
                fontSize: '0.813rem', 
                color: '#64748b',
                fontWeight: 500,
              }}>
                {pub.category}
              </span>
            </div>
            <Title level={2} style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '1.75rem', lineHeight: 1.4 }}>
              {pub.title}
            </Title>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '16px',
              marginBottom: '24px',
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '12px',
            }}>
              <div>
                <div style={{ fontSize: '0.813rem', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Authors</div>
                <div style={{ fontSize: '0.938rem', color: '#1e293b', fontWeight: 500 }}>{pub.authors}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.813rem', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Journal</div>
                <div style={{ fontSize: '0.938rem', color: '#1e293b', fontWeight: 500 }}>{pub.journal}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.813rem', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Publisher</div>
                <div style={{ fontSize: '0.938rem', color: '#1e293b', fontWeight: 500 }}>{pub.publisher}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.813rem', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>Year & Volume</div>
                <div style={{ fontSize: '0.938rem', color: '#1e293b', fontWeight: 500 }}>{pub.year} | {pub.volume}</div>
              </div>
            </div>
          </div>

          <Paragraph style={{ fontSize: '1.063rem', lineHeight: 1.8, color: '#475569', marginBottom: '24px' }}>
            {pub.description}
          </Paragraph>

          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
            borderRadius: '12px', 
            marginBottom: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '4px', 
                height: '24px', 
                background: '#1e3a8a', 
                borderRadius: '2px' 
              }} />
              <Paragraph style={{ margin: 0, color: '#1e293b', fontWeight: 600, fontSize: '1rem' }}>
                {pub.impact}
              </Paragraph>
            </div>
          </div>

          <a
            href={pub.url}
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
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1e3a8a';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#1e3a8a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.color = '#1e3a8a';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <LinkOutlined />
            <span>View on ScienceDirect</span>
          </a>
        </Card>
      ))}

      <Card
        style={{
          marginTop: '48px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          borderRadius: '16px',
          background: '#ffffff',
        }}
      >
        <Title level={3} style={{ color: '#1e293b', marginBottom: '20px', fontSize: '1.5rem' }}>
          Research Impact
        </Title>
        <Paragraph style={{ fontSize: '1.063rem', lineHeight: 1.8, color: '#475569', marginBottom: '16px' }}>
          Mohammad Aminul Haque's research on Islamic bonds has made significant contributions to the fields of finance, banking, and Islamic capital markets. The findings challenge long-standing assumptions that Sukuk merely replicate conventional bonds, demonstrating instead that investor behaviour, risk perception, and wealth effects differ materially between the two instruments.
        </Paragraph>
        <Paragraph style={{ fontSize: '1.063rem', lineHeight: 1.8, color: '#475569' }}>
          The research is widely recognised for its rigorous empirical analysis and global relevance, contributing to resolving long-running debates on whether Islamic financial instruments offer genuine diversification and resilience advantages. The paper continues to be cited by scholars and practitioners worldwide, reinforcing its lasting impact on global financial research.
        </Paragraph>
      </Card>
    </div>
  );
}

