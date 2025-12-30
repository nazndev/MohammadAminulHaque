import { Typography, Card, Row, Col, Tag, Timeline } from 'antd';
import { TrophyOutlined, StarOutlined, GlobalOutlined } from '@ant-design/icons';
import { generateSEOMetadata } from '@/components/SEO';

const { Title, Paragraph } = Typography;

export const metadata = generateSEOMetadata({
  title: 'Achievements & Awards - Mohammad Aminul Haque',
  description: 'Awards, recognitions, and achievements of Mohammad Aminul Haque in banking, fintech, and finance. Including Nagad awards, WITSA recognition, and fintech excellence awards.',
  url: '/achievements',
});

export default function AchievementsPage() {
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

  const categoryColors: Record<string, string> = {
    Award: 'gold',
    Recognition: 'blue',
    Achievement: 'green',
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
        mode="left"
        items={achievements.map((achievement, index) => ({
          dot: <div style={{ fontSize: '24px', color: '#1e3a8a' }}>{achievement.icon}</div>,
          children: (
            <Card
              style={{
                marginBottom: '32px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <Tag color={categoryColors[achievement.category]} style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
                    {achievement.category}
                  </Tag>
                  <Title level={3} style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '1.25rem' }}>
                    {achievement.title}
                  </Title>
                  <Paragraph style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.938rem' }}>
                    {achievement.organization}
                  </Paragraph>
                </div>
                <div style={{ 
                  padding: '8px 16px', 
                  background: '#f0f9ff', 
                  borderRadius: '8px',
                  fontWeight: 600,
                  color: '#1e3a8a',
                  fontSize: '1.125rem'
                }}>
                  {achievement.year}
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

