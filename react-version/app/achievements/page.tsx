'use client';

import { Typography, Card, Row, Col, Tag, Timeline, Badge } from 'antd';
import { TrophyOutlined, StarOutlined, GlobalOutlined } from '@ant-design/icons';

export default function AchievementsPage() {
  const { Title, Paragraph } = Typography;
  const achievements = [
    {
      year: '2022',
      title: 'Best DFS Innovative Award in Dubai',
      organization: 'Dubai Financial Services',
      description: 'Nagad received the prestigious Best DFS Innovative Award in Dubai, recognizing excellence in digital financial services under Mohammad Aminul Haque\'s leadership.',
      category: 'Award',
      icon: <TrophyOutlined />,
    },
    {
      year: '2021',
      title: 'Mastercard Excellence Award',
      organization: 'Mastercard',
      description: 'Nagad received the Mastercard Excellence Award 2021, highlighting outstanding performance in digital payments and financial services innovation.',
      category: 'Award',
      icon: <StarOutlined />,
    },
    {
      year: '2021',
      title: 'Fintech Impact Award',
      organization: 'New Age Bangladesh',
      description: 'Nagad won the Fintech Impact Award, recognizing the significant impact in transforming digital financial services in Bangladesh.',
      category: 'Award',
      icon: <TrophyOutlined />,
    },
    {
      year: '2020',
      title: 'WITSA Best Innovation in Fintech',
      organization: 'World Information Technology and Services Alliance',
      description: 'WITSA honored Nagad as the best innovation in fintech, highlighting Nagad\'s position as a global fintech innovator.',
      category: 'Award',
      icon: <GlobalOutlined />,
    },
    {
      year: '2020',
      title: 'Inclusive Fintech 50 Cohort',
      organization: 'Inclusive Fintech 50',
      description: 'Nagad was selected for the prestigious Inclusive Fintech 50 cohort list for 2020, highlighting commitment to financial inclusion.',
      category: 'Recognition',
      icon: <StarOutlined />,
    },
    {
      year: '2020',
      title: 'Number One DFS Operator in Bangladesh',
      organization: 'Bangladesh Post',
      description: 'Nagad achieved the milestone of becoming the number one Digital Financial Services (DFS) operator in Bangladesh.',
      category: 'Achievement',
      icon: <TrophyOutlined />,
    },
    {
      year: '2020',
      title: 'World\'s Fastest-Growing MFS Market',
      organization: 'Business Tabloid Magazine',
      description: 'Under leadership, Bangladesh emerged as the world\'s fastest-growing Mobile Financial Services (MFS) market.',
      category: 'Achievement',
      icon: <GlobalOutlined />,
    },
    {
      year: '2020',
      title: '62M+ Registered Users & $80M+ Daily Transactions',
      organization: 'Fintech Transformation',
      description: 'Led transformation project shaping one of Asia\'s fastest growing fintech from scratch to 62M+ registered users and $80M+ daily transactions.',
      category: 'Achievement',
      icon: <TrophyOutlined />,
    },
  ];

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    Award: { bg: '#fef3c7', text: '#92400e', border: '#fbbf24' },
    Recognition: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
    Achievement: { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
  };

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
          Achievements & Awards
        </Title>
        <Paragraph style={{ fontSize: '1.125rem', color: '#5a6c7d', maxWidth: '700px', margin: '0 auto' }}>
          Recognitions, awards, and achievements of Mohammad Aminul Haque in banking, fintech, and finance
        </Paragraph>
      </div>

      <Timeline
        mode="start"
        style={{ paddingLeft: 0 }}
        items={achievements.map((achievement, index) => ({
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
              {achievement.icon}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '0.813rem', 
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      background: categoryColors[achievement.category]?.bg || '#f1f5f9',
                      color: categoryColors[achievement.category]?.text || '#475569',
                      border: `1px solid ${categoryColors[achievement.category]?.border || '#e2e8f0'}`,
                      display: 'inline-block',
                    }}>
                      {achievement.category}
                    </span>
                    <span style={{ 
                      fontSize: '0.813rem', 
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      background: '#eff6ff',
                      color: '#1e40af',
                      border: '1px solid #3b82f6',
                      display: 'inline-block',
                    }}>
                      {achievement.year}
                    </span>
                  </div>
                  <Title level={3} style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '1.375rem', lineHeight: 1.3 }}>
                    {achievement.title}
                  </Title>
                  <Paragraph style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.938rem' }}>
                    {achievement.organization}
                  </Paragraph>
                </div>
              </div>
              <Paragraph style={{ fontSize: '1rem', lineHeight: 1.7, color: '#5a6c7d', margin: 0 }}>
                {achievement.description}
              </Paragraph>
            </Card>
          ),
        }))}
      />
    </div>
  );
}

