"use client";
import React, { useState, useEffect } from 'react';

export default function HeroActions() {
  // --- Dark Mode Logic Yahan Shift Kar Diya ---
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleTheme = (e) => {
    setIsDarkMode(e.target.checked);
  };

  return (
    <section className="hero-actions-row" style={{
        // Layout settings
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '20px', 
        // Positioning
        position: 'relative',
        zIndex: 10,
        margin: '30px auto', // Center mein lane ke liye (hero to margin up down)
        padding: '10px 0', // Thoda gap upar niche (pill size)
        // ✨ PILL SHAPE & SIZE (Ye line zaroori hai taaki wo lamba na ho)
        width: 'fit-content', 
        maxWidth: '90%',       // ✅ Mobile par screen se bahar nahi jayega
        padding: '12px 30px', 
        borderRadius: '50px', // Gol kinare pill de
        // ✨ GLASS EFFECT (Blur)
        // Background color (Halka transparent)
        background: isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        // Blur Magic
        backdropFilter: 'blur(10px)', 
        WebkitBackdropFilter: 'blur(10px)',
        // Border taaki chamke
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        position: 'relative',
        zIndex: 10
        
    }}
    >
      <a href="tel:+919814812623" className="btn-hero-call">Call Now 📞</a>
      
      <label className="theme-switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" onChange={toggleTheme} checked={isDarkMode} />
        <div className="slider round">
          <span className="icon-sun">☀&#xFE0E;</span>
          <span className="icon-moon">🌙</span>
        </div>
      </label>
    </section>
  );
}