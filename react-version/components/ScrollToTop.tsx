'use client';

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          type="primary"
          icon={<ArrowUpOutlined />}
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#fdba12',
            borderColor: '#fdba12',
            color: '#0d244f',
            boxShadow: '0 4px 12px rgba(253, 186, 18, 0.4), 0 0 0 4px rgba(253, 186, 18, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            animation: 'fadeInUp 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fbbf24';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(253, 186, 18, 0.5), 0 0 0 6px rgba(253, 186, 18, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fdba12';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(253, 186, 18, 0.4), 0 0 0 4px rgba(253, 186, 18, 0.1)';
          }}
        />
      )}
    </>
  );
}

