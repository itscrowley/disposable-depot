'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme track karne ke liye state

  useEffect(() => {
    // 1. SCROLL LOGIC
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 2. THEME DETECT LOGIC (Jasoosi Code)
    const checkTheme = () => {
      // Check karein ki kya body par 'dark-mode' class lagi hai?
      if (document.body.classList.contains('dark-mode')) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };

    // Shuru mein check karein
    checkTheme();

    // Body tag par nazar rakhne ke liye 'MutationObserver' lagaya
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('scroll', toggleVisibility);

    // Cleanup (Jab component hatega toh safai karega)
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        // Agar 'dark-mode' class mili toh WHITE, nahi toh ORANGE
        backgroundColor: isDarkMode ? '#ffffff' : '#f97316',
        color: isDarkMode ? '#000000' : '#ffffff',
      }}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
      aria-label="Back to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}