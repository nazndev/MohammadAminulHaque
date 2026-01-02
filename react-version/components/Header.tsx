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
    label: <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link> 
  },
  { 
    key: 'about', 
    label: <Link href="/#about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link> 
  },
  { 
    key: 'experience', 
    label: <Link href="/#experience" style={{ textDecoration: 'none', color: 'inherit' }}>Experience</Link> 
  },
  { 
    key: 'research', 
    label: <Link href="/#research" style={{ textDecoration: 'none', color: 'inherit' }}>Research</Link> 
  },
  { 
    key: 'achievements', 
    label: <Link href="/#achievements" style={{ textDecoration: 'none', color: 'inherit' }}>Achievements</Link> 
  },
  { 
    key: 'news', 
    label: <Link href="/#news" style={{ textDecoration: 'none', color: 'inherit' }}>News</Link> 
  },
  { 
    key: 'contact', 
    label: <Link href="/#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact</Link> 
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
      setIsMobile(window.innerWidth <= 1024);
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
        background: 'rgba(30, 58, 138, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        height: '80px',
        overflow: 'visible',
      }}
    >
      <div style={{ 
        maxWidth: '1400px', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: '16px',
      }}>
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.5rem)', 
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            fontFamily: 'Inter, -apple-system, sans-serif',
            whiteSpace: 'nowrap',
          }}>
            Mohammad Aminul Haque
          </div>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, justifyContent: 'flex-end', minWidth: 0 }}>
          {!isMobile && (
            <>
              <Menu
                mode="horizontal"
                items={menuItems}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  flex: 1,
                  minWidth: 0,
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  justifyContent: 'flex-end',
                }}
                theme="dark"
                className="super-white-nav"
              />
              <Search
                placeholder="Search..."
                allowClear
                enterButton={<SearchOutlined />}
                size="middle"
                className="header-search-input"
                style={{
                  maxWidth: '240px',
                  minWidth: '200px',
                  flexShrink: 0,
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
                color: '#ffffff',
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
                  background: 'rgba(30, 58, 138, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                  padding: '24px',
                }}>
                  <Menu
                    mode="vertical"
                    items={menuItems}
                    style={{
                      background: 'transparent',
                      border: 'none',
                    }}
                    theme="dark"
                    className="super-white-nav"
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
