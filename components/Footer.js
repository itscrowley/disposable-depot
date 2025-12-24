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
    {/* "YOUR_PAGE_NAME" ki jagah apni Facebook profile/page ka naam likhein */}
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
    {/* "YOUR_USERNAME" ki jagah apni Instagram ID likhein */}
    <a 
        href="https://www.instagram.com/the_disposable_depot/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.socialIcon}
        aria-label="Instagram"
    >
        <i className="fab fa-instagram"></i>
    </a>

    {/* 3. WhatsApp Link (Ye Sabse Important Hai) */}
    {/* Maine aapka number add kar diya hai (91 + 9814812623) */}
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
              <li><Link href="/about" className={styles.link}>Party Planner (Calculator)</Link></li>
              <li><Link href="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerCol}>
            <h3>Contact Us</h3>
            <ul className={styles.contactInfo}>
              <li>
                <span className={styles.icon}><i className="fas fa-map-marker-alt"></i></span>
                <span>Jalandhar, Punjab</span>
              </li>
              <li>
                <span className={styles.icon}><i className="fas fa-phone-alt"></i></span>
                <span>+91 98148-12623</span>
              </li>
              <li>
                <span className={styles.icon}><i className="fas fa-envelope"></i></span>
                <span>thedisposabledepot@gmail.com</span>
              </li>
            </ul>
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
