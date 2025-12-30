import { Typography, Card, Row, Col, Divider, Timeline } from 'antd';
import { generateSEOMetadata } from '@/components/SEO';
import { generateBreadcrumbSchema } from '@/lib/breadcrumb-schema';

const { Title, Paragraph } = Typography;

export const metadata = generateSEOMetadata({
  title: 'About Mohammad Aminul Haque - Senior Banker & Fintech Expert',
  description: 'Learn about Mohammad Aminul Haque, a Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience in Banking, Fintech, Strategy, Transformation & Wealth Management.',
  url: '/about',
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema('/about');

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
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
          About Mohammad Aminul Haque
        </Title>
        <Divider style={{ margin: '24px auto', maxWidth: '80px', borderColor: '#1e3a8a', borderWidth: '3px' }} />
      </div>

      <Card
        style={{
          marginBottom: '48px',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
        }}
      >
        <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#5a6c7d', marginBottom: '24px' }}>
          <strong style={{ color: '#2c3e50' }}>Mohammad Aminul Haque</strong> is a Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience along with Management Consultancy in Fortune 500 companies in Australia, Singapore, Brunei, Indonesia, Malaysia, Philippines and South Asia.
        </Paragraph>
        <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#5a6c7d', marginBottom: '24px' }}>
          Currently based in Sydney on Global Talent PR, he brings expertise in banking, strategy execution, customer experience, and transformation of business and customer outcomes. Apart from his outstanding banking career in Standard Chartered Bank and BRAC Bank, he also led transformation, change management, productivity improvement and cost optimization projects for Bank Mandiri (Indonesia), Brunei Shell, BP Indonesia while working as management consultant for Renoir Consulting.
        </Paragraph>
        <Paragraph style={{ fontSize: '1.125rem', lineHeight: 1.9, color: '#5a6c7d', marginBottom: '24px' }}>
          He led a transformation project to shape one of Asia's fastest growing fintech from scratch to 62M+ registered users and $80M+ daily transactions through implementing new ways of working and by uplifting revenue with minimized risk. He launched Bangladesh's first Digital KYC & customer onboarding system, Islamic Finance, Savings and Payment products, and G2P distribution model for 40M+ beneficiaries.
        </Paragraph>
      </Card>

      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        <Col xs={24} md={12}>
          <Card
            title={<Title level={3} style={{ margin: 0, color: '#1e293b' }}>Education</Title>}
            style={{
              height: '100%',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '12px',
            }}
          >
            <Timeline
              items={[
                {
                  children: (
                    <div>
                      <Title level={5} style={{ margin: 0, color: '#2c3e50' }}>MBA (Finance)</Title>
                      <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                        University of Nottingham, 2012
                      </Paragraph>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <Title level={5} style={{ margin: 0, color: '#2c3e50' }}>BBA (Finance & Accounting)</Title>
                      <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                        North South University, Bangladesh, 2005
                        <br />
                        CGPA 3.97/4.0 and Gold Medal
                      </Paragraph>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={<Title level={3} style={{ margin: 0, color: '#1e293b' }}>Research & Publications</Title>}
            style={{
              height: '100%',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '12px',
            }}
          >
            <Paragraph style={{ fontSize: '1rem', lineHeight: 1.8, color: '#5a6c7d' }}>
              Co-authored a highly cited research paper on <strong>Islamic Bonds (Sukuk) vs Conventional Bonds</strong> published in <strong>Borsa Istanbul Review</strong> (ScienceDirect, Elsevier), one of the highest cited publications in Islamic Bond research.
            </Paragraph>
            <Paragraph style={{ fontSize: '1rem', lineHeight: 1.8, color: '#5a6c7d', marginTop: '16px' }}>
              The research, titled "Are Islamic Bonds Different from Conventional Bonds? International Evidence from Capital Market Tests," analyzes 166 bond issuances across multiple international markets and provides rare, data-driven insights into how stock markets react differently to Sukuk and conventional bond announcements.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Card
        title={<Title level={2} style={{ margin: 0, color: '#1e293b' }}>Professional Expertise</Title>}
        style={{
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
              <Title level={5} style={{ margin: 0, color: '#1e3a8a' }}>Banking & Finance</Title>
              <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                19+ years in retail and corporate banking
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
              <Title level={5} style={{ margin: 0, color: '#1e3a8a' }}>Fintech & Digital</Title>
              <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                Led transformation to 62M+ users
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
              <Title level={5} style={{ margin: 0, color: '#1e3a8a' }}>Strategy & Transformation</Title>
              <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                Fortune 500 consulting experience
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
              <Title level={5} style={{ margin: 0, color: '#1e3a8a' }}>Islamic Finance</Title>
              <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                Internationally published researcher
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
              <Title level={5} style={{ margin: 0, color: '#1e3a8a' }}>Wealth Management</Title>
              <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                Portfolio and strategy expertise
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
              <Title level={5} style={{ margin: 0, color: '#1e3a8a' }}>Change Management</Title>
              <Paragraph style={{ margin: '8px 0 0 0', color: '#5a6c7d' }}>
                Productivity and cost optimization
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
    </>
  );
}

