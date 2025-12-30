// Configuration for base URL
export const getConfig = (): { baseUrl: string; environment: 'development' | 'production' } => {
  const environment = (process.env.NEXT_PUBLIC_ENVIRONMENT || 'development') as 'development' | 'production';
  
  const baseUrls = {
    development: process.env.NEXT_PUBLIC_DEV_URL || 'http://localhost:3000',
    production: 'https://mohammadaminulhaque.net'
  };
  
  return {
    baseUrl: baseUrls[environment],
    environment
  };
};

export const config = getConfig();

