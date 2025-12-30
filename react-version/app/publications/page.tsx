import { Typography, Card, List, Tag, Button } from 'antd';
import { BookOutlined, LinkOutlined, DownloadOutlined } from '@ant-design/icons';
import { generateSEOMetadata } from '@/components/SEO';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export const metadata = generateSEOMetadata({
  title: 'Publications - Mohammad Aminul Haque',
  description: 'Research publications by Mohammad Aminul Haque on Islamic Finance, Sukuk bonds, and capital markets. Published in Borsa Istanbul Review, ScienceDirect, Elsevier.',
  url: '/publications',
});

export default function PublicationsPage() {
  const publications = [
    {
      title: 'Are Islamic Bonds Different from Conventional Bonds? International Evidence from Capital Market Tests',
      authors: ['Nafis Alam', 'M. Kabir Hassan', 'Mohammad Aminul Haque'],
      journal: 'Borsa Istanbul Review',
      publisher: 'Elsevier, ScienceDirect',
      year: '2013',
      volume: 'Volume 13, Issue 3',
      month: 'September',
      url: 'https://www.sciencedirect.com/science/article/pii/S2214845013000112',
      description: 'This high-impact research paper examines the fundamental differences between Islamic bonds (Sukuk) and conventional bonds in global capital markets. The study analyzes 166 bond issuances across multiple international markets over nearly a decade, including periods before, during, and after the global financial crisis.',
      keyFindings: [
        'Islamic bonds are perceived differently by financial markets, particularly during periods of financial stress',
        'Investor behaviour, risk perception, and wealth effects differ materially between Sukuk and conventional bonds',
        'The findings challenge long-standing assumptions that Sukuk merely replicate conventional bonds',
        'Provides evidence that Islamic financial instruments offer genuine diversification and resilience advantages',
      ],
      impact: 'One of the highest cited publications in Islamic Bond research',
      category: 'Research',
      citations: 'Highly cited',
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
          Publications
        </Title>
        <Paragraph style={{ fontSize: '1.125rem', color: '#5a6c7d', maxWidth: '700px', margin: '0 auto' }}>
          Research publications by Mohammad Aminul Haque in Islamic Finance and Capital Markets
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
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <Tag color="blue" style={{ fontSize: '0.875rem', padding: '4px 12px' }}>
                {pub.category}
              </Tag>
              <Tag color="green" style={{ fontSize: '0.875rem', padding: '4px 12px' }}>
                {pub.citations}
              </Tag>
            </div>
            <Title level={2} style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '1.5rem' }}>
              {pub.title}
            </Title>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '12px' }}>
              <strong>Authors:</strong> {pub.authors.join(', ')}
            </Paragraph>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '12px' }}>
              <strong>Journal:</strong> {pub.journal}
            </Paragraph>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '12px' }}>
              <strong>Publisher:</strong> {pub.publisher}
            </Paragraph>
            <Paragraph style={{ fontSize: '1rem', color: '#5a6c7d', marginBottom: '16px' }}>
              <strong>Published:</strong> {pub.month} {pub.year} | <strong>Volume:</strong> {pub.volume}
            </Paragraph>
          </div>

          <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#5a6c7d', marginBottom: '24px' }}>
            {pub.description}
          </Paragraph>

          <Card
            style={{
              marginBottom: '24px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
          >
            <Title level={4} style={{ color: '#1e293b', marginBottom: '16px' }}>
              Key Findings
            </Title>
            <List
              dataSource={pub.keyFindings}
              renderItem={(item) => (
                <List.Item style={{ border: 'none', padding: '8px 0' }}>
                  <span style={{ color: '#5a6c7d' }}>• {item}</span>
                </List.Item>
              )}
            />
          </Card>

          <div style={{ 
            padding: '16px', 
            background: '#f0f9ff', 
            borderRadius: '8px', 
            marginBottom: '24px',
            borderLeft: '4px solid #1e3a8a'
          }}>
            <Paragraph style={{ margin: 0, color: '#0369a1', fontWeight: 600, fontSize: '1rem' }}>
              {pub.impact}
            </Paragraph>
          </div>

          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              type="primary"
              icon={<LinkOutlined />}
              size="large"
              style={{
                background: '#1e3a8a',
                borderColor: '#1e3a8a',
              }}
            >
              View on ScienceDirect
            </Button>
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
          Research Impact & Recognition
        </Title>
        <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#5a6c7d', marginBottom: '16px' }}>
          Mohammad Aminul Haque's research on Islamic bonds has made significant contributions to the fields of finance, banking, and Islamic capital markets. The research provides rare, data-driven insights into how stock markets react differently to Sukuk and conventional bond announcements under varying economic conditions.
        </Paragraph>
        <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#5a6c7d', marginTop: '16px' }}>
          Industry experts and academics have highlighted the paper for its relevance to banks, policymakers, institutional investors, and regulators, especially as Islamic finance continues to grow globally as an alternative financing system. The research continues to be cited by scholars and practitioners worldwide, reinforcing its lasting impact on global financial research.
        </Paragraph>
      </Card>
    </div>
  );
}

