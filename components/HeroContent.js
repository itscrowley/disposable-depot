import React from 'react';

export default function HeroContent() {
  return (
    <div className="hero-content" style={{ 
      textAlign: 'center', 
      marginBottom: '20px', 
      position: 'relative', 
      zIndex: 2 
    }}>
      {/* --- SEO CHANGE: "Your Area" ko "Jalandhar" se replace kiya --- */}
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '1.4', color: 'var(--text-main)' }}>
        Best Wholesale Prices in <br /> 
        <span style={{ color: '#e46338' }}>Jalandhar</span> for <br />
        Packaged Water & Disposables
      </h1>
      
      {/* --- SEO CHANGE: "Supplier", "Events" aur "Catering" keywords add kiye --- */}
      <p style={{ fontSize: '1.1rem', margin: '30px 0', opacity: 0.9 }}>
        Your trusted Wholesale Supplier for Events, Shops & Catering. <br/>
        Get Premium Paper Cups, Plates, Foils & Tissues at factory rates.
      </p>
      
      {/* --- UX CHANGE: Direct WhatsApp Link (Number aapke schema se liya hai) --- */}
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