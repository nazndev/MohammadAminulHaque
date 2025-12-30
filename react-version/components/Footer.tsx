'use client';

import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter
      style={{
        background: '#1e293b',
        padding: '32px 24px',
        borderTop: '1px solid #334155',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <Text style={{ color: '#64748b', fontSize: '0.875rem' }}>
          © {currentYear} Mohammad Aminul Haque. All rights reserved.
        </Text>
      </div>
    </AntFooter>
  );
}

