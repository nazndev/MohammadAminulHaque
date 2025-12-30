import { Typography, Card, Timeline, Tag } from 'antd';
import { BankOutlined, GlobalOutlined, RocketOutlined } from '@ant-design/icons';
import { generateSEOMetadata } from '@/components/SEO';

const { Title, Paragraph } = Typography;

export const metadata = generateSEOMetadata({
  title: 'Professional Experience - Mohammad Aminul Haque',
  description: 'Professional experience of Mohammad Aminul Haque: 19+ years in banking, fintech, strategy, transformation, and wealth management. Experience at Standard Chartered Bank, BRAC Bank, Renoir Consulting, and leading fintech transformation.',
  url: '/experience',
});

export default function ExperiencePage() {
  const experiences = [
    {
      period: 'Current',
      title: 'Executive Director, Transformation & Strategy',
      company: 'Fintech Consulting Firm',
      location: 'Sydney, Australia',
      icon: <RocketOutlined />,
      achievements: [
        'Design strategy and drive digital transformation projects for clients',
        'Management and optimisation of deposit and lending products',
        'Lead digitisation and transformation initiatives to enhance customer experience',
        'Design Product Program Guide (PPG), Business Requirement Document (BRD) & Software Requirements Specification (SRS)',
        'Developed strategy and drive transformation for new ways of working',
        'Optimized mobile finance platform portfolio by launching innovative products',
        'Acquired 62 million customers and processing $80M+ daily digital payment transactions',
        'Launched Bangladesh\'s first Digital KYC & customer onboarding system',
        'Delivered 15% cost optimization target',
      ],
    },
    {
      period: 'Sep 2012 – June 2019',
      title: 'Project Manager, South East Asia',
      company: 'Renoir Consulting Ltd',
      location: 'Brunei, Malaysia, Indonesia, Philippines',
      icon: <GlobalOutlined />,
      achievements: [
        'Led Digital transformation project for Bank Mandiri (Indonesia) - 11.6% productivity improvement',
        'Installed Management Control System for Carmon Copper Corporation - USD 9M cost savings (200% of target)',
        'Achieved USD 6.29M in benefits for LBC (leading logistics company in Philippines)',
        'Reduced headcount by 20% and minimised production costs for Polytron (Indonesia)',
        'Led change management project for Brunei Shell Petroleum - 10.5% reduction in non-productive time',
        'Improved PM:CM ratio from 10:90 to 43:57 at Brunei Liquefied Natural Gas',
        'Improved Management Control System for British Petroleum in Indonesia - 59% improvement of wrench time',
      ],
    },
    {
      period: 'Jan 2009 – Dec 2011',
      title: 'Manager',
      company: 'BRAC Bank PLC',
      location: 'Bangladesh',
      icon: <BankOutlined />,
      achievements: [
        'Drove Customer Value Propositions and set product roadmaps',
        'Launched customer centric deposit and liability products - 150% target achievement',
        'Achieved 160% growth of deposit portfolio and 150% growth of business lending portfolio',
        'Achieved 125% Net Interest Income and 140% Non-Interest Income target',
        'Increased Net Interest Margin from 2.5% to 4% by implementing slab-based interest rate',
      ],
    },
    {
      period: 'Jan 2008 – Dec 2008',
      title: 'Assistant Manager, Operational Risk, Wealth Management',
      company: 'Standard Chartered Bank',
      location: 'Bangladesh',
      icon: <BankOutlined />,
      achievements: [
        'Acted as 1st line of assurance in Operational Risk Management and Assurance (ORMA) framework',
        'In Charge of KYC project of SCB',
        'Introduced new processes which reduced operational losses by 30%',
      ],
    },
    {
      period: 'June 2006 – Dec 2007',
      title: 'Associate Priority Banker, Wealth Management',
      company: 'Standard Chartered Bank',
      location: 'Bangladesh',
      icon: <BankOutlined />,
      achievements: [
        'Achieved 300% CASA portfolio growth',
        'Achieved A1 Rating (Highest Rating for performance and Value)',
        'Awarded by Group Chief Executive and Chairman of Standard Chartered Bank for outstanding portfolio growth',
      ],
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
          Professional Experience
        </Title>
        <Paragraph style={{ fontSize: '1.125rem', color: '#5a6c7d', maxWidth: '700px', margin: '0 auto' }}>
          19+ years of cross-regional experience in Banking, Fintech, Strategy, Transformation & Wealth Management
        </Paragraph>
      </div>

      <Timeline
        mode="left"
        items={experiences.map((exp, index) => ({
          dot: <div style={{ fontSize: '24px', color: '#1e3a8a' }}>{exp.icon}</div>,
          children: (
            <Card
              style={{
                marginBottom: '32px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <Title level={3} style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '1.25rem' }}>
                    {exp.title}
                  </Title>
                  <Paragraph style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontWeight: 600, fontSize: '1rem' }}>
                    {exp.company}
                  </Paragraph>
                  <Paragraph style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.938rem' }}>
                    {exp.location}
                  </Paragraph>
                </div>
                <Tag color="blue" style={{ fontSize: '0.938rem', padding: '4px 12px' }}>
                  {exp.period}
                </Tag>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#5a6c7d' }}>
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} style={{ marginBottom: '8px', lineHeight: 1.7 }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </Card>
          ),
        }))}
      />
    </div>
  );
}

