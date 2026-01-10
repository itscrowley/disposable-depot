"use client";
import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; 

const Footer = () => {
  return (
    <>
      <style jsx global>{`
      /* --- 🔥 FONT APPLY LOGIC --- */
        .genty-font-fix {
          font-family: 'Genty', cursive !important;
          /* Agar font file load nahi hoti toh cursive fallback rahega */
        }
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

        /* --- WATERMARK RESPONSIVE LOGIC --- */
        .watermark-text {
          position: absolute;
          left: 50%;
          width: 100%;
          text-align: center;
          white-space: nowrap;
          line-height: 1;
          font-weight: 610;
          color: #ffffff;
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
          text-transform: lowercase;
          font-family: 'poppins', sans-serif;
          user-select: none;
          
          /* 📱 MOBILE DEFAULT: Center mein rahega */
          top: 94.2%;
          transform: translate(-50%, -50%);
          font-size: 9.25vw; 
        }

        /* 💻 DESKTOP ONLY: Jab screen badi ho to neeche chala jaye */
        @media (min-width: 768px) {
          .watermark-text {
            top: auto;          /* Center hata diya */
            bottom: 30px;       /* Bilkul neeche chipka diya */
            transform: translateX(-50%); /* Sirf Left-Right Center */
            font-size: 9.27vw;    /* Desktop par size thoda adjust kiya */
          }
        }

        /* 👇👇 NEW: COPYRIGHT STRIP THINNER ON MOBILE 👇👇 */
        @media (max-width: 767px) {
            .copyright-strip {
                /* Padding aur Margin zabardasti kam kiya */
                margin-top: 15px !important;  
                padding-top: 12px !important; 
                padding-bottom: 12px !important; 
            }
            /* Text ka default gap hataya */
            .copyright-strip p {
                margin: 0 !important;
                font-size: 9px; /* Text thoda chhota aur saaf */
                line-height: 1.2;
            }
        }
      `}</style>

      <footer className={styles.footer} style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* 👇 WATERMARK */}
        <div className="watermark-text">
          the disposable depot
        </div>

        {/* 👇 MAIN CONTENT */}
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.row}>
            
            {/* 1. BRAND INFO */}
            <div className={styles.footerCol}>
              <Link href="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
  <h2 
    className={`${styles.footerLogo} genty-font-fix`} 
    style={{ 
      fontFamily: "'Genty', cursive", 
      fontWeight: '100',
      textTransform: 'none',
      fontSize: '30px', // 👈 22px se kam karke 16px kar diya hai
      color: '#f97316',
      WebkitTextStroke: '0px #f97316', 
      letterSpacing: '0.9px',
      opacity: '0.9'
    }}
  >
    The Disposable Depot
  </h2>
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

            {/* 2. QUICK LINKS */}
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
        
        {/* 👇 COPYRIGHT (Updated Class Added) */}
        <div 
            className={`${styles.footerBottom} copyright-strip`} 
            style={{ 
                position: 'relative', 
                zIndex: 10,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                marginTop: '30px', 
                paddingTop: '20px',
                paddingBottom: '20px' // Desktop ke liye safe padding
            }}
        >
          <p>© {new Date().getFullYear()} The Disposable Depot. All Rights Reserved.</p>
        </div>

      </footer>
    </>
  );
};

export default Footer;