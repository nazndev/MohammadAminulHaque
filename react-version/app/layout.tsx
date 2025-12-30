import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { config } from '@/lib/config';
import { generateStructuredData } from '@/components/SEO';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohammad Aminul Haque - Senior Banker, Fintech & Finance Expert | News & Research",
  description: "Mohammad Aminul Haque - Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience. Internationally published researcher in Islamic Finance.",
  keywords: [
    "Mohammad Aminul Haque",
    "Aminul Haque",
    "banking",
    "fintech",
    "Islamic finance",
    "Sukuk",
    "transformation",
    "wealth management",
    "strategy",
    "finance researcher"
  ],
  authors: [{ name: "Mohammad Aminul Haque" }],
  openGraph: {
    type: "website",
    url: config.baseUrl,
    title: "Mohammad Aminul Haque - Senior Banker, Fintech & Finance Expert",
    description: "Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience.",
    images: [{ url: `${config.baseUrl}/og-image.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Aminul Haque - Senior Banker, Fintech & Finance Expert",
    description: "Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist.",
  },
  alternates: {
    canonical: config.baseUrl,
  },
};

const theme = {
  token: {
    // Sophisticated navy blue
    colorPrimary: '#1e3a8a',
    colorPrimaryHover: '#1e40af',
    colorPrimaryActive: '#1e293b',
    // Elegant light backgrounds
    colorBgBase: '#fafafa',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    // Professional text colors
    colorText: '#2c3e50',
    colorTextSecondary: '#5a6c7d',
    colorTextTertiary: '#7f8c9a',
    // Refined borders
    colorBorder: '#d5d9de',
    colorBorderSecondary: '#e8eaed',
    // Sophisticated accent colors
    colorWarning: '#d4a574',
    colorSuccess: '#4a7c59',
    colorInfo: '#3d5a80',
    borderRadius: 8,
    fontFamily: inter.style.fontFamily,
    // Subtle shadows
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    boxShadowSecondary: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  components: {
    Layout: {
      bodyBg: '#ffffff',
      headerBg: '#ffffff',
      headerPadding: '0',
      headerHeight: 80,
    },
    Card: {
      colorBgContainer: '#ffffff',
      colorBorderSecondary: '#e2e8f0',
      borderRadiusLG: 12,
      paddingLG: 24,
    },
    Button: {
      primaryColor: '#ffffff',
      borderRadius: 8,
      fontWeight: 600,
      controlHeight: 40,
      controlHeightLG: 48,
      controlHeightSM: 32,
    },
    Typography: {
      colorText: '#1e293b',
      colorTextHeading: '#1e293b',
      colorTextSecondary: '#64748b',
      fontWeightStrong: 700,
    },
    Tag: {
      borderRadiusSM: 6,
      fontSizeSM: 12,
      lineHeightSM: 20,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = generateStructuredData('Person', {
    description: 'Senior Banker, Fintech, Product, Pricing, Change, Transformation, Portfolio, Strategy & Wealth Management specialist with 19+ years of cross-regional experience.',
  });

  const websiteSchema = generateStructuredData('WebSite', {});

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <div style={{ minHeight: '100vh', background: '#fafafa', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <Breadcrumb />
              <main style={{ flex: 1 }}>
                {children}
              </main>
              <Footer />
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
