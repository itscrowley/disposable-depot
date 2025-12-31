"use client";
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; 

const Footer = () => {
  return (
    <>
      <style jsx global>{`
        /* --- 🔥 WORKING DARK MAP LOGIC --- */
        :root { --map-filter: none; }
        html.dark, body.dark, [data-theme='dark'], .dark-mode {
          --map-filter: invert(90%) hue-rotate(180deg) contrast(90%) !important;
        }

        .map-iframe-working {
          width: 100%;
          height: 100%;
          border: 0;
          filter: var(--map-filter);
          transition: filter 0.5s ease;
        }

        /* --- QUICK LINKS HOVER EFFECT --- */
        .footer-link-custom {
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }
        .footer-link-custom:hover {
          color: #e46338 !important;
          transform: translateX(8px);
        }
      `}</style>

      <footer className={styles.footer} style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* 👇 WATERMARK (Fixed Position) */}
        <div style={{
          position: 'absolute',
          bottom: '54px', 
          left: '50%',
          transform: 'translateX(-50%)', 
          width: '100%',
          textAlign: 'center',
          fontSize: '9.25vw',       
          whiteSpace: 'nowrap',   
          lineHeight: '1',
          fontWeight: '610',
          color: '#ffffff',
          opacity: '0.04',        
          pointerEvents: 'none', 
          zIndex: 0,
          textTransform: 'lowercase',
          fontFamily: 'poppins',
          userSelect: 'none' 
        }}>
          the disposable depot
        </div>

        {/* 👇 MAIN CONTENT */}
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.row}>
            
            {/* 1. BRAND INFO */}
            <div className={styles.footerCol}>
              <Link href="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <h2 className={styles.footerLogo}>The Disposable Depot</h2>
              </Link>
              <p className={styles.text} style={{ marginBottom: "20px" }}>
                Best quality disposable items for all your business and event needs. Wholesale rates available.
              </p>
              <div className={styles.socialLinks}>
                <a href="https://www.facebook.com/TheDisposableDepot" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.instagram.com/the_disposable_depot/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/919814812623" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* 2. QUICK LINKS (Sare Menus Wapas Aa Gaye) */}
            <div className={styles.footerCol}>
              <h3>Quick Links</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link href="/" className={`${styles.link} footer-link-custom`}>Home</Link></li>
                <li><Link href="/#catalogue" className={`${styles.link} footer-link-custom`}>Our Products</Link></li>
                <li><Link href="/calculator" className={`${styles.link} footer-link-custom`}>Party Planner (Calculator)</Link></li>
                <li><Link href="/faq" className={`${styles.link} footer-link-custom`}>FAQs (Help)</Link></li>
                <li>
                  <Link href="/planner" className={`${styles.link} footer-link-custom`}>
                    Smart Menu Planner 
                    <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded ml-1 animate-pulse" style={{fontWeight:'bold'}}>
                      NEW
                    </span> 
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. LOCATION & WORKING MAP */}
            <div className={styles.footerCol}>
              <h3>Our Location</h3>
              <div style={{ marginTop: '10px', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', height: '150px' }}>
                <iframe 
                  className="map-iframe-fix map-iframe-working"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=The%20Disposable%20Depot%2C%20Kot%20Sadiq%2C%20Jalandhar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
        
        {/* 👇 COPYRIGHT (Fixed Padding) */}
        <div className={styles.footerBottom} style={{ 
            position: 'relative', 
            zIndex: 10,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: '30px', /* Proper spacing wapas add ki */
            paddingTop: '20px'
        }}>
          <p>© {new Date().getFullYear()} The Disposable Depot. All Rights Reserved.</p>
        </div>

      </footer>
    </>
  );
};

export default Footer;