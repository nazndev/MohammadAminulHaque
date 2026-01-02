'use client';

import { Typography, Button, Row, Col, Card, Divider } from 'antd';
import { LinkedinOutlined, ArrowRightOutlined, BankOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';
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
      
      {/* Hero Section - Sophisticated Dark Crystal */}
      <section
        id="home"
        style={{
          background: `
            linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.85) 50%, rgba(15, 23, 42, 0.95) 100%),
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(30, 58, 138, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%, 800px 800px, 600px 600px, 500px 500px',
          backgroundPosition: 'center, 20% 50%, 80% 80%, 40% 20%',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 24px 60px',
          marginTop: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements - Financial Theme */}
        <div
          className="hero-float"
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '60px',
            height: '60px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '12px',
            border: '2px solid rgba(59, 130, 246, 0.2)',
            backdropFilter: 'blur(10px)',
            opacity: 0.6,
          }}
        />
        <div
          className="hero-float-reverse"
          style={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            width: '40px',
            height: '40px',
            background: 'rgba(30, 58, 138, 0.15)',
            borderRadius: '50%',
            border: '2px solid rgba(30, 58, 138, 0.3)',
            backdropFilter: 'blur(10px)',
            opacity: 0.5,
          }}
        />
        <div
          className="hero-pulse"
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: '80px',
            height: '80px',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '16px',
            border: '2px solid rgba(99, 102, 241, 0.2)',
            backdropFilter: 'blur(10px)',
            transform: 'rotate(45deg)',
          }}
        />
        <div
          className="hero-float"
          style={{
            position: 'absolute',
            bottom: '30%',
            right: '10%',
            width: '50px',
            height: '50px',
            background: 'rgba(59, 130, 246, 0.12)',
            borderRadius: '8px',
            border: '2px solid rgba(59, 130, 246, 0.25)',
            backdropFilter: 'blur(10px)',
            opacity: 0.7,
            transform: 'rotate(-45deg)',
          }}
        />
        
        {/* Content */}
        <div style={{ maxWidth: '900px', textAlign: 'center', width: '100%', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Title
            level={1}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              marginBottom: '24px',
              color: '#ffffff',
              lineHeight: 1.2,
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            Mohammad Aminul Haque
          </Title>
          <Title
            level={2}
            className="animated-subtitle"
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 400,
              marginBottom: '32px',
              lineHeight: 1.5,
              textShadow: '0 1px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            Senior Banker, Fintech & Finance Expert
          </Title>
          <Paragraph
            style={{
              fontSize: '1.125rem',
              marginBottom: '48px',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.8,
              maxWidth: '700px',
              margin: '0 auto 48px',
              textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <strong style={{ color: '#ffffff' }}>Mohammad Aminul Haque</strong> is a Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with <strong style={{ color: '#ffffff' }}>19+ years of cross-regional experience</strong> in Banking, Fintech, Strategy, Transformation & Wealth Management. Internationally published researcher in <strong style={{ color: '#ffffff' }}>Islamic Finance and Capital Markets</strong>, Mohammad Aminul Haque has led transformation projects for Fortune 500 companies across Australia, Singapore, Brunei, Indonesia, Malaysia, Philippines and South Asia.
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
                background: '#fdba12 !important',
                borderColor: '#fdba12',
                color: '#0d244f !important',
                boxShadow: '0 4px 12px rgba(253, 186, 18, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fbbf24';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(253, 186, 18, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fdba12';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(253, 186, 18, 0.3)';
              }}
            >
              View Latest News & Research
            </Button>
          </a>
        </div>
      </section>

      {/* About Section - Dark Sophisticated */}
      <section
        id="about"
        className="section-animate section-dark-1"
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.9) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title
              level={2}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              About
            </Title>
            <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: '3px' }} />
          </div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <Card
              className="card-hover glass-card"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '20px' }}>
                <strong style={{ color: '#ffffff' }}>Mohammad Aminul Haque</strong> is a Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience along with Management Consultancy in Fortune 500 companies in Australia, Singapore, Brunei, Indonesia, Malaysia, Philippines and South Asia.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '20px' }}>
                Currently based in Sydney on Global Talent PR, he brings expertise in banking, strategy execution, customer experience, and transformation of business and customer outcomes. Apart from his outstanding banking career in Standard Chartered Bank and BRAC Bank, he also led transformation, change management, productivity improvement and cost optimization projects for Bank Mandiri (Indonesia), Brunei Shell, BP Indonesia while working as management consultant for Renoir Consulting.
              </Paragraph>
              <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: 'rgba(255, 255, 255, 0.9)', marginBottom: '20px' }}>
                He led a transformation project to shape one of Asia's fastest growing fintech from scratch to 62M+ registered users and $80M+ daily transactions through implementing new ways of working and by uplifting revenue with minimized risk.
              </Paragraph>
              <Divider style={{ margin: '32px 0', borderColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <div>
                  <Title level={5} style={{ color: '#ffffff', marginBottom: '12px', fontSize: '1rem', fontWeight: 600 }}>
                    Education
                  </Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontSize: '0.95rem' }}>
                    MBA (Finance) from University of Nottingham (2012)<br />
                    BBA (Finance & Accounting) from North South University, Bangladesh (2005)<br />
                    CGPA 3.97/4.0 and Gold Medal
                  </Paragraph>
                </div>
                <div>
                  <Title level={5} style={{ color: '#ffffff', marginBottom: '12px', fontSize: '1rem', fontWeight: 600 }}>
                    Research
                  </Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', margin: 0, fontSize: '0.95rem' }}>
                    Co-authored a highly cited research paper on Islamic Bonds (Sukuk) vs Conventional Bonds published in Borsa Istanbul Review (ScienceDirect, Elsevier), one of the highest cited publications in Islamic Bond research.
                  </Paragraph>
                </div>
              </div>
              <div style={{ marginTop: '32px', textAlign: 'center' }}>
                <Link href="/about" style={{ textDecoration: 'none' }}>
                  <Button
                    type="primary"
                    style={{
                      background: '#fdba12 !important',
                      borderColor: '#fdba12',
                      color: '#0d244f !important',
                      fontWeight: 600,
                      padding: '0 24px',
                      height: '40px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(253, 186, 18, 0.3)',
                    }}
                  >
                    Learn More About Me →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Preview Section - Dark Sophisticated */}
      <section
        id="experience"
        className="section-animate section-dark-2"
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title
              level={2}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Professional Experience
            </Title>
            <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: '3px' }} />
            <Paragraph style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              19+ years of cross-regional experience in Banking, Fintech, Strategy, Transformation & Wealth Management
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                className="card-hover glass-card"
                style={{
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '0.813rem', 
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      display: 'inline-block',
                    }}>
                      Current
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <BankOutlined style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.9)' }} />
                    <Title level={4} style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem' }}>
                      Executive Director, Transformation & Strategy
                    </Title>
                  </div>
                  <Paragraph style={{ margin: '4px 0 0 0', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.938rem' }}>
                    Fintech Consulting Firm • Sydney, Australia
                  </Paragraph>
                </div>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.938rem', marginBottom: '16px' }}>
                  Leading digital transformation projects, managing deposit and lending products, and driving fintech innovation. Achieved 62M+ registered users and $80M+ daily transactions.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                className="card-hover glass-card"
                style={{
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '0.813rem', 
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      background: 'rgba(59, 130, 246, 0.2)',
                      color: '#60a5fa',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                      display: 'inline-block',
                    }}>
                      Sep 2012 – June 2019
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <BankOutlined style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.9)' }} />
                    <Title level={4} style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem' }}>
                      Project Manager, South East Asia
                    </Title>
                  </div>
                  <Paragraph style={{ margin: '4px 0 0 0', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.938rem' }}>
                    Renoir Consulting Ltd • Multiple Countries
                  </Paragraph>
                </div>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.938rem', marginBottom: '16px' }}>
                  Led transformation projects for Fortune 500 companies including Bank Mandiri, Brunei Shell, and BP Indonesia. Achieved USD 9M cost savings and 11.6% productivity improvements.
                </Paragraph>
              </Card>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/experience" style={{ textDecoration: 'none' }}>
              <Button
                type="primary"
                style={{
                  background: '#fdba12 !important',
                  borderColor: '#fdba12',
                  color: '#0d244f !important',
                  fontWeight: 600,
                  padding: '0 24px',
                  fontSize: '1rem',
                  height: '40px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(253, 186, 18, 0.3)',
                }}
              >
                View Full Experience →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Preview Section - Dark Sophisticated */}
      <section
        id="research"
        className="section-animate section-dark-3"
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.92) 50%, rgba(15, 23, 42, 0.98) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title
              level={2}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Research & Publications
            </Title>
            <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: '3px' }} />
            <Paragraph style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              Internationally published research in Islamic Finance and Capital Markets
            </Paragraph>
          </div>

          <Card
            className="card-hover glass-card"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              maxWidth: '900px',
              margin: '0 auto',
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ 
                  fontSize: '0.813rem', 
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#60a5fa',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  display: 'inline-block',
                }}>
                  Research
                </span>
                <span style={{ 
                  fontSize: '0.813rem', 
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#818cf8',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  display: 'inline-block',
                }}>
                  2013
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <BookOutlined style={{ fontSize: '24px', color: 'rgba(255, 255, 255, 0.9)', marginTop: '4px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <Title level={4} style={{ margin: '0 0 12px 0', color: '#ffffff', fontSize: '1.25rem', lineHeight: 1.4 }}>
                    Are Islamic Bonds Different from Conventional Bonds? International Evidence from Capital Market Tests
                  </Title>
                  <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.938rem', marginBottom: '12px' }}>
                    <strong style={{ color: '#ffffff' }}>Authors:</strong> Nafis Alam, M. Kabir Hassan, Mohammad Aminul Haque<br />
                    <strong style={{ color: '#ffffff' }}>Journal:</strong> Borsa Istanbul Review (Elsevier, ScienceDirect)<br />
                    <strong style={{ color: '#ffffff' }}>Volume:</strong> 13, Issue 3
                  </Paragraph>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.938rem', marginBottom: '16px' }}>
                  This high-impact research paper examines the fundamental differences between Islamic bonds (Sukuk) and conventional bonds in global capital markets. The study analyzes 166 bond issuances across multiple international markets.
                </Paragraph>
                <div style={{ 
                  padding: '12px 16px', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}>
                  <Paragraph style={{ margin: 0, color: '#ffffff', fontWeight: 600, fontSize: '0.938rem' }}>
                    One of the highest cited publications in Islamic Bond research
                  </Paragraph>
                </div>
                </div>
              </div>
            </div>
          </Card>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/research" style={{ textDecoration: 'none' }}>
              <Button
                type="primary"
                style={{
                  background: '#fdba12 !important',
                  borderColor: '#fdba12',
                  color: '#0d244f !important',
                  fontWeight: 600,
                  padding: '0 24px',
                  fontSize: '1rem',
                  height: '40px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(253, 186, 18, 0.3)',
                }}
              >
                View Full Research →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Preview Section - Dark Sophisticated */}
      <section
        id="achievements"
        className="section-animate section-dark-2"
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title
              level={2}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Achievements & Awards
            </Title>
            <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: '3px' }} />
            <Paragraph style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
              Recognitions, awards, and achievements in banking, fintech, and finance
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <Card
                className="card-hover glass-card"
                style={{
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.813rem', 
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    background: 'rgba(251, 191, 36, 0.2)',
                    color: '#fbbf24',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    display: 'inline-block',
                  }}>
                    Award
                  </span>
                  <span style={{ 
                    fontSize: '0.813rem', 
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    display: 'inline-block',
                  }}>
                    2022
                  </span>
                </div>
                <TrophyOutlined style={{ fontSize: '32px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '12px' }} />
                <Title level={4} style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '1.125rem' }}>
                  Best DFS Innovative Award
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', margin: 0 }}>
                  Dubai Financial Services
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                className="card-hover glass-card"
                style={{
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.813rem', 
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    background: 'rgba(251, 191, 36, 0.2)',
                    color: '#fbbf24',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    display: 'inline-block',
                  }}>
                    Award
                  </span>
                  <span style={{ 
                    fontSize: '0.813rem', 
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    display: 'inline-block',
                  }}>
                    2021
                  </span>
                </div>
                <TrophyOutlined style={{ fontSize: '32px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '12px' }} />
                <Title level={4} style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '1.125rem' }}>
                  Mastercard Excellence Award
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', margin: 0 }}>
                  Mastercard
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                className="card-hover glass-card"
                style={{
                  height: '100%',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.813rem', 
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    display: 'inline-block',
                  }}>
                    Achievement
                  </span>
                  <span style={{ 
                    fontSize: '0.813rem', 
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    background: 'rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    display: 'inline-block',
                  }}>
                    2020
                  </span>
                </div>
                <TrophyOutlined style={{ fontSize: '32px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '12px' }} />
                <Title level={4} style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '1.125rem' }}>
                  62M+ Users & $80M+ Daily Transactions
                </Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', margin: 0 }}>
                  Fintech Transformation
                </Paragraph>
              </Card>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/achievements" style={{ textDecoration: 'none' }}>
              <Button
                type="primary"
                style={{
                  background: '#fdba12 !important',
                  borderColor: '#fdba12',
                  color: '#0d244f !important',
                  fontWeight: 600,
                  padding: '0 24px',
                  fontSize: '1rem',
                  height: '40px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(253, 186, 18, 0.3)',
                }}
              >
                View All Achievements →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section - Dark Sophisticated */}
      <section
        id="news"
        className="section-animate section-dark-1"
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.9) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title
              level={2}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Latest News & Updates
            </Title>
            <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: '3px' }} />
            <Paragraph style={{ fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
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

      {/* Contact Section - Dark Sophisticated */}
      <section
        id="contact"
        className="section-animate section-dark-2"
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
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
                background: '#fdba12 !important',
                borderColor: '#fdba12',
                color: '#0d244f !important',
                boxShadow: '0 4px 12px rgba(253, 186, 18, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fbbf24';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(253, 186, 18, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fdba12';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(253, 186, 18, 0.3)';
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
