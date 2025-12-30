import { Typography, Card, List, Tag } from 'antd';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { generateSEOMetadata } from '@/components/SEO';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export const metadata = generateSEOMetadata({
  title: 'Research & Publications - Mohammad Aminul Haque',
  description: 'Research publications by Mohammad Aminul Haque on Islamic Finance, Sukuk bonds, and capital markets. Internationally published researcher in Islamic Finance and Capital Markets.',
  url: '/research',
});

export default function ResearchPage() {
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
            marginBottom: '32px',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '12px',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <Tag color="blue" style={{ marginBottom: '16px', fontSize: '0.875rem', padding: '4px 12px' }}>
              {pub.category}
            </Tag>
            <Title level={2} style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '1.5rem' }}>
              {pub.title}
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '16px' }}>
              <strong>Authors:</strong> {pub.authors}
            </Paragraph>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '16px' }}>
              <strong>Journal:</strong> {pub.journal}
            </Paragraph>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '16px' }}>
              <strong>Publisher:</strong> {pub.publisher}
            </Paragraph>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '16px' }}>
              <strong>Year:</strong> {pub.year} | <strong>Volume:</strong> {pub.volume}
            </Paragraph>
          </div>

          <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#5a6c7d', marginBottom: '24px' }}>
            {pub.description}
          </Paragraph>

          <div style={{ 
            padding: '16px', 
            background: '#f0f9ff', 
            borderRadius: '8px', 
            marginBottom: '24px',
            borderLeft: '4px solid #1e3a8a'
          }}>
            <Paragraph style={{ margin: 0, color: '#0369a1', fontWeight: 600 }}>
              {pub.impact}
            </Paragraph>
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
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
        }}
      >
        <Title level={3} style={{ color: '#1e293b', marginBottom: '16px' }}>
          Research Impact
        </Title>
        <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#5a6c7d' }}>
          Mohammad Aminul Haque's research on Islamic bonds has made significant contributions to the fields of finance, banking, and Islamic capital markets. The findings challenge long-standing assumptions that Sukuk merely replicate conventional bonds, demonstrating instead that investor behaviour, risk perception, and wealth effects differ materially between the two instruments.
        </Paragraph>
        <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#5a6c7d', marginTop: '16px' }}>
          The research is widely recognised for its rigorous empirical analysis and global relevance, contributing to resolving long-running debates on whether Islamic financial instruments offer genuine diversification and resilience advantages. The paper continues to be cited by scholars and practitioners worldwide, reinforcing its lasting impact on global financial research.
        </Paragraph>
      </Card>
    </div>
  );
}

