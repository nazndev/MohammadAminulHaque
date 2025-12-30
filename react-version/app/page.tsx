'use client';

import { Typography, Button, Row, Col, Card, Divider } from 'antd';
import { LinkedinOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import NewsCard from '@/components/NewsCard';
import { getLatestNewsArticles } from '@/lib/news';
import { generateStructuredData } from '@/components/SEO';
import { config } from '@/lib/config';

export default function HomePage() {
  const { Title, Paragraph } = Typography;
  const newsArticles = getLatestNewsArticles(15);
  
  const baseUrl = config.baseUrl;
  const newsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'News & Updates - Mohammad Aminul Haque',
    description: 'Latest news and updates about Mohammad Aminul Haque',
    url: `${baseUrl}/#news`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: newsArticles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: generateStructuredData('NewsArticle', article),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      
      {/* Hero Section - Clean & Modern */}
      <section
        id="home"
        style={{
          background: 'linear-gradient(to bottom, #f5f7fa 0%, #ffffff 100%)',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 80px',
        }}
      >
        <div style={{ maxWidth: '900px', textAlign: 'center' }}>
          <Title
            level={1}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              marginBottom: '24px',
              color: '#2c3e50',
              lineHeight: 1.2,
            }}
          >
            Mohammad Aminul Haque
          </Title>
          <Title
            level={2}
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 400,
              marginBottom: '32px',
              color: '#5a6c7d',
              lineHeight: 1.5,
            }}
          >
            Senior Banker, Fintech & Finance Expert
          </Title>
          <Paragraph
            style={{
              fontSize: '1.125rem',
              marginBottom: '48px',
              color: '#5a6c7d',
              lineHeight: 1.8,
              maxWidth: '700px',
              margin: '0 auto 48px',
            }}
          >
            19+ years of cross-regional experience in Banking, Fintech, Strategy, Transformation & Wealth Management.
            Internationally published researcher in Islamic Finance and Capital Markets.
          </Paragraph>
          <a href="#news" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              style={{
                height: '52px',
                padding: '0 32px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: '#1e3a8a', // Royal blue
                borderColor: '#1e3a8a',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
              }}
            >
              View Latest News & Research
            </Button>
          </a>
        </div>
      </section>

      {/* About Section - Clean Layout */}
      <section
        id="about"
        style={{
          padding: '100px 24px',
          background: '#fafafa',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Title
              level={2}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#1e293b',
              }}
            >
              About
            </Title>
            <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: '#1e3a8a', borderWidth: '3px' }} />
          </div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Card
              style={{
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '12px',
              }}
            >
              <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#5a6c7d', marginBottom: '20px' }}>
                <strong style={{ color: '#2c3e50' }}>Mohammad Aminul Haque</strong> is a Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience along with Management Consultancy in Fortune 500 companies in Australia, Singapore, Brunei, Indonesia, Malaysia, Philippines and South Asia.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#5a6c7d', marginBottom: '20px' }}>
                Currently based in Sydney on Global Talent PR, he brings expertise in banking, strategy execution, customer experience, and transformation of business and customer outcomes. Apart from his outstanding banking career in Standard Chartered Bank and BRAC Bank, he also led transformation, change management, productivity improvement and cost optimization projects for Bank Mandiri (Indonesia), Brunei Shell, BP Indonesia while working as management consultant for Renoir Consulting.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#5a6c7d', marginBottom: '20px' }}>
                He led a transformation project to shape one of Asia's fastest growing fintech from scratch to 62M+ registered users and $80M+ daily transactions through implementing new ways of working and by uplifting revenue with minimized risk.
              </Paragraph>
              <Divider style={{ margin: '32px 0' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <div>
                  <Title level={5} style={{ color: '#2c3e50', marginBottom: '12px', fontSize: '1rem', fontWeight: 600 }}>
                    Education
                  </Title>
                  <Paragraph style={{ color: '#5a6c7d', margin: 0, fontSize: '0.95rem' }}>
                    MBA (Finance) from University of Nottingham (2012)<br />
                    BBA (Finance & Accounting) from North South University, Bangladesh (2005)<br />
                    CGPA 3.97/4.0 and Gold Medal
                  </Paragraph>
                </div>
                <div>
                  <Title level={5} style={{ color: '#2c3e50', marginBottom: '12px', fontSize: '1rem', fontWeight: 600 }}>
                    Research
                  </Title>
                  <Paragraph style={{ color: '#5a6c7d', margin: 0, fontSize: '0.95rem' }}>
                    Co-authored a highly cited research paper on Islamic Bonds (Sukuk) vs Conventional Bonds published in Borsa Istanbul Review (ScienceDirect, Elsevier), one of the highest cited publications in Islamic Bond research.
                  </Paragraph>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* News Section - Clean Grid */}
      <section
        id="news"
        style={{
          padding: '100px 24px',
          background: '#ffffff',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <Title
              level={2}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#1e293b',
              }}
            >
              Latest News & Updates
            </Title>
            <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: '#1e3a8a', borderWidth: '3px' }} />
            <Paragraph style={{ fontSize: '1.125rem', color: '#5a6c7d', maxWidth: '600px', margin: '0 auto' }}>
              Stay updated with the latest news, research publications, and professional achievements
            </Paragraph>
          </div>
          
          <Row gutter={[24, 24]}>
            {newsArticles.map((article) => (
              <Col xs={24} sm={24} md={12} lg={8} key={article.id}>
                <NewsCard article={article} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact Section - Sophisticated Navy */}
      <section
        id="contact"
        style={{
          padding: '100px 24px',
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #1e3a8a 100%)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '24px',
              color: '#ffffff',
            }}
          >
            Get In Touch
          </Title>
            <Paragraph
            style={{
              fontSize: '1.125rem',
              marginBottom: '48px',
              color: '#e8eaed',
              lineHeight: 1.7,
            }}
          >
            For inquiries and professional connections, please reach out through LinkedIn.
          </Paragraph>
          <a
            href="https://www.linkedin.com/in/mohammad-aminul-haque-32989215"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            <Button
              type="primary"
              size="large"
              icon={<LinkedinOutlined />}
              style={{
                height: '52px',
                padding: '0 32px',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '8px',
                background: 'rgba(30, 58, 138, 0.9)', // Royal blue with slight transparency
                border: '1px solid rgba(30, 58, 138, 1)',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              Connect on LinkedIn
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
