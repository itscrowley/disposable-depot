"use client";
import React from 'react';

export default function HeroContent({ dynamicTitle }) {
  // Logic: Comma (,) hatao aur extra spaces clean karo
  const cleanTitle = dynamicTitle ? dynamicTitle.replace(/,$/, '').trim() : "";

  // Logic: Check karo ki title valid hai ya nahi (sirf comma nahi hona chahiye)
  const showCustomTitle = cleanTitle && cleanTitle !== "," && cleanTitle !== "";

  return (
    <div className="hero-content text-center mb-8 relative z-10 px-4">
      
      {/* --- TITLE SECTION --- */}
      <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6 leading-tight tracking-tight">
        {showCustomTitle ? (
          // ✅ FIX: Ab yahan 'cleanTitle' use ho raha hai (Comma hatane ke baad wala text)
          <span>{cleanTitle}</span>
        ) : (
          // Case 2: Agar Sheet khaali hai, toh Default Beautiful Design dikhao
          <>
            Best Wholesale Prices in <br className="hidden md:block" />
          
            <span className="text-[#e46338]">
              Jalandhar
            </span>{" "}
            for <br className="hidden md:block" />
            Packaged Water & Disposables
          </>
        )}
      </h1>
      
      {/* --- SUBTITLE --- */}
      <p className="text-lg md:text-xl text-slate-600 mb-8 opacity-90 font-medium">
        Your trusted Wholesale Supplier for Events, Shops & Catering.
      </p>
      
      {/* --- WHATSAPP BUTTON --- */}
      <a 
        href="https://wa.me/919814812623?text=Hi%2C%20I%20want%20to%20order%20disposable%20items" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hero-cta-whatsapp" 
        style={{
          display: 'inline-block',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '12px 30px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 'bold',
          marginTop: '10px',
          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
        }}
      >
        <i className="fa-brands fa-whatsapp" style={{ marginRight: '8px' }}></i>
        Order On WhatsApp
      </a>
    </div>
  );
}