'use client';

import { Breadcrumb as AntBreadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return null; // Don't show breadcrumb on homepage
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    {
      title: (
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <HomeOutlined /> Home
        </Link>
      ),
    },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const isLast = index === pathSegments.length - 1;
      const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      return {
        title: isLast ? (
          <span>{title}</span>
        ) : (
          <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </Link>
        ),
      };
    }),
  ];

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '16px 24px',
      background: '#fafafa',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <AntBreadcrumb
        items={breadcrumbItems}
        style={{ fontSize: '0.875rem' }}
      />
    </div>
  );
}

