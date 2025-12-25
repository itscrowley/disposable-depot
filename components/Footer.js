import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          
          {/* Brand Info */}
          <div className={styles.footerCol}>
            <h2 className={styles.footerLogo}>The Disposable Depot</h2>
            <p className={styles.text}>
              Best quality disposable items for all your business and event needs. Wholesale rates available.
            </p>
            <div className={styles.socialLinks}>
    
             {/* 1. Facebook Link */}
             <a 
                href="https://www.facebook.com/TheDisposableDepot" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="Facebook"
             >
                <i className="fab fa-facebook-f"></i>
             </a>

             {/* 2. Instagram Link */}
             <a 
                href="https://www.instagram.com/the_disposable_depot/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="Instagram"
             >
                <i className="fab fa-instagram"></i>
             </a>

             {/* 3. WhatsApp Link */}
             <a 
                href="https://wa.me/919814812623?text=Hello,%20I%20am%20interested%20in%20your%20products." 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="WhatsApp"
             >
                <i className="fab fa-whatsapp"></i>
             </a>

            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerCol}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/" className={styles.link}>Home</Link></li>
              <li><Link href="/#catalogue" className={styles.link}>Our Products</Link></li>
              <li><Link href="/calculator" className={styles.link}>Party Planner (Calculator)</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info + MAP ADDED HERE */}
          <div className={styles.footerCol}>
            <h3>Contact Us</h3>
            <ul className={styles.contactInfo}>
              <li>
              <li>
                <span className={styles.icon}><i className="fas fa-phone-alt"></i></span>
                <span>+91 98148-12623</span>
              </li>
              <li>
                <span className={styles.icon}><i className="fas fa-envelope"></i></span>
                <span>thedisposabledepot@gmail.com</span>
              </li>
            </ul>

            {/* 👇👇 Sahi Location Wala Map 👇👇 */}
<div style={{ marginTop: '20px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
  <iframe 
    width="100%" 
    height="100" 
    frameBorder="1" 
    scrolling="no" 
    marginHeight="0" 
    marginWidth="0" 
    src="https://maps.google.com/maps?width=100%25&amp;height=150&amp;hl=en&amp;q=The%20Disposable%20Depot%2C%20Jalandhar%20-%20Kala%20Sanghian%20Rd%2C%20Kot%20Sadiq%2C%20Jalandhar%2C%20Punjab&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
  </iframe>
</div>
{/* 👆👆 Sahi Location Wala Map 👆👆 */}

          </div>

        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} The Disposable Depot. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
