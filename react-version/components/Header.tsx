'use client';

import { Layout, Menu, Button, Input } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const { Search } = Input;

const { Header: AntHeader } = Layout;

const menuItems = [
  { 
    key: 'home', 
    label: <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a> 
  },
  { 
    key: 'about', 
    label: <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</a> 
  },
  { 
    key: 'news', 
    label: <a href="#news" style={{ textDecoration: 'none', color: 'inherit' }}>News</a> 
  },
  { 
    key: 'contact', 
    label: <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</a> 
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Handle smooth scrolling for hash links
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const id = href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleHashClick);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleHashClick);
    };
  }, []);

  return (
    <AntHeader 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000,
        background: scrolled ? 'rgba(255, 255, 255, 0.98)' : '#fafafa',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' : 'none',
        transition: 'all 0.3s ease',
        height: '80px',
      }}
    >
      <div style={{ 
        maxWidth: '1400px', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 48px',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700,
            color: '#2c3e50',
            letterSpacing: '-0.02em',
            fontFamily: 'Inter, -apple-system, sans-serif',
          }}>
            Mohammad Aminul Haque
          </div>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1, justifyContent: 'flex-end' }}>
          {!isMobile && (
            <>
              <Menu
                mode="horizontal"
                items={menuItems}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#2c3e50',
                  minWidth: '400px',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  justifyContent: 'flex-end',
                }}
                theme="light"
              />
              <Search
                placeholder="Search..."
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                style={{
                  maxWidth: '280px',
                  width: '100%',
                }}
                onSearch={(value) => {
                  if (value.trim()) {
                    // Scroll to news section and could implement search filtering
                    const newsSection = document.getElementById('news');
                    if (newsSection) {
                      const headerHeight = 80;
                      const elementPosition = newsSection.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
              />
            </>
          )}
          {isMobile && (
            <>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ 
                color: '#2c3e50',
                  fontSize: '1.25rem',
                  height: '48px',
                  width: '48px',
                }}
              />
              {mobileMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '80px',
                  left: 0,
                  right: 0,
                  background: '#f8fafc',
                  backdropFilter: 'blur(20px)',
                  borderTop: '1px solid #e2e8f0',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  padding: '24px',
                }}>
                  <Menu
                    mode="vertical"
                    items={menuItems}
                    style={{
                      background: 'transparent',
                      border: 'none',
                    }}
                    theme="light"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AntHeader>
  );
}
