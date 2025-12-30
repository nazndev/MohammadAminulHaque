import { config } from './config';

export function generateBreadcrumbSchema(pathname: string) {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return null; // No breadcrumb for homepage
  }

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: config.baseUrl,
    },
    ...pathSegments.map((segment, index) => {
      const href = config.baseUrl + '/' + pathSegments.slice(0, index + 1).join('/');
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      return {
        '@type': 'ListItem',
        position: index + 2,
        name,
        item: href,
      };
    }),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

