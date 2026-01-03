"use client";
import React, { useState, useEffect } from 'react';

export default function NavBar() {
  // --- STATES (Variables) ---
  const [scrolled, setScrolled] = useState(false);
  
  // --- LOGIC ---

  // Scroll Event handle karna
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

      <header id="mainHeader" className={scrolled ? "scrolled" : ""}>
        <div className="brand">
          <img src="https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000062278.jpg?w=1024" alt="The Disposable Depot" className="logo-img" />
        </div>
      </header>
      );
      }