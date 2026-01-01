'use client';

import { Typography, Card, Timeline, Tag } from 'antd';
import { BankOutlined, GlobalOutlined, RocketOutlined } from '@ant-design/icons';

export default function ExperiencePage() {
  const { Title, Paragraph } = Typography;
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
        mode="start"
        style={{ paddingLeft: 0 }}
        items={experiences.map((exp, index) => ({
          icon: (
            <div style={{ 
              fontSize: '18px', 
              color: '#ffffff',
              background: '#1e3a8a',
              width: '36px',
              height: '48px',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(30, 58, 138, 0.2)',
              flexShrink: 0,
            }}>
              {exp.icon}
            </div>
          ),
          content: (
            <Card
              style={{
                marginBottom: '32px',
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <Title level={3} style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '1.375rem', lineHeight: 1.3 }}>
                    {exp.title}
                  </Title>
                  <Paragraph style={{ margin: '0 0 8px 0', color: '#1e3a8a', fontWeight: 600, fontSize: '1.063rem' }}>
                    {exp.company}
                  </Paragraph>
                  <Paragraph style={{ margin: 0, color: '#64748b', fontSize: '0.938rem' }}>
                    {exp.location}
                  </Paragraph>
                </div>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: '#64748b',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  paddingTop: '4px',
                }}>
                  {exp.period}
                </div>
              </div>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '24px', 
                color: '#475569',
                listStyle: 'none',
              }}>
                {exp.achievements.map((achievement, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      marginBottom: '12px', 
                      lineHeight: 1.7,
                      fontSize: '0.938rem',
                      position: 'relative',
                      paddingLeft: '20px',
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '8px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#1e3a8a',
                    }} />
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

