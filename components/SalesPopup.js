"use client";
import React, { useState, useEffect } from 'react';

const locations = ["Kot Sadiq", "Kala Sanghian", "Dhaliwal", "Kadian", "Kanshi Nagar", "Geeta Colony", "Chogawan", "Nijjran", "Basti Danishmandan", "Jalandhar"];
const products = ["Paper Cups", "Disposable Plates", "250ml Water Bottles", "Plastic Bowls", "Paper Cups and Plates", "Mixed Cold Drinks", "Water Cup Boxes and Paper Cups", "Paper Donas", "Plastic Spoons And Forks", "1 ltr. Water Bottles"];
const times = ["Just now", "1 min ago", "2 mins ago", "3 mins ago", "4 mins ago"];

export default function SalesPopup() {
  const [show, setShow] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState({ name: "", product: "", qty: "", time: "", unit: "", isWholesale: false });
  
  // --- Naya State Sheet Config ke liye ---
  const [adminConfig, setAdminConfig] = useState({
    showPopup: false,
    delay: 20000,
    interval: 50000
  });

  const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=1681585265&single=true&output=csv";

  useEffect(() => {
    // 1. Sheet se Config uthana
    const fetchSheetConfig = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        const rows = csvText.split('\n');
        const config = {};
        
        rows.forEach(row => {
          const [key, value] = row.split(',');
          if (key) config[key.trim()] = value ? value.trim() : "";
        });

        setAdminConfig({
          showPopup: config['show_sales_popup'] === 'TRUE',
          delay: parseInt(config['sales_popup_delay']) || 20000,
          interval: parseInt(config['sales_popup_interval']) || 50000
        });
      } catch (err) {
        console.error("Ghosheet Fetch Error:", err);
      }
    };

    fetchSheetConfig();

    const checkTheme = () => {
      const darkActive = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      setIsDark(darkActive);
    };

    const themeInterval = setInterval(checkTheme, 1000);
    checkTheme();

    return () => clearInterval(themeInterval);
  }, []);

  useEffect(() => {
    // Agar admin ne FALSE kiya hai, toh aage nahi badhna
    if (!adminConfig.showPopup) return;

    const triggerPopup = () => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomProd = products[Math.floor(Math.random() * products.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      
      let randomQty;
      if (randomLoc === "Kot Sadiq" || randomLoc === "Kanshi Nagar") {
        randomQty = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
      } else {
        randomQty = Math.floor(Math.random() * 45) + 1; 
      }

      const boxProducts = ["250ml Water Bottles", "Mixed Cold Drinks", "Water Cup Boxes and Paper Cups", "1 ltr. Water Bottles"];
      const unit = boxProducts.includes(randomProd) ? "Boxes" : "Pkts.";
      const isWholesale = randomQty > 15;

      setData({ 
        name: randomLoc, 
        product: randomProd, 
        qty: randomQty, 
        time: randomTime, 
        unit: unit, 
        isWholesale: isWholesale 
      });

      setShow(true);
      setTimeout(() => setShow(false), 8000);
    };

    // --- Admin Config se Delay aur Interval set karna ---
    const timer = setTimeout(() => triggerPopup(), adminConfig.delay);
    const interval = setInterval(triggerPopup, adminConfig.interval);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [adminConfig]); // Dependency mein adminConfig daala hai taaki fetch ke baad start ho

  // Condition check: Popup tabhi dikhega jab state 'show' ho AUR admin ne TRUE kiya ho
  if (!show || !adminConfig.showPopup) return null;

  const glassBg = isDark ? 'rgba(30, 41, 59, 0.75)' : 'rgba(255, 255, 255, 0.75)';
  const textColor = isDark ? '#f1f5f9' : '#1e293b';
  const highlightColor = isDark ? '#ffffff' : '#000000';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className="sales-popup-glass" style={{
        background: glassBg,
        border: `1px solid ${borderColor}`,
        backdropFilter: 'blur(10px) saturate(200%)',
        WebkitBackdropFilter: 'blur(10px) saturate(200%)',
    }}>
      <div className="flex items-center gap-3 relative z-10">
        <div className="icon-wrapper" style={{ background: isDark ? '#334155' : '#fff' }}>
          <span className="text-xl">📦</span>
          <div className="verified-tick" style={{ border: `2px solid ${isDark ? '#334155' : '#fff'}` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        <div className="content-wrapper flex-1">
          <div className="flex items-center justify-between mb-0.5">
             <div className="flex items-center gap-1.5">
                <span className="live-dot"></span>
                <p className="status-label">Live Order</p>
             </div>
          </div>
          <p className="description-text" style={{ color: textColor }}>
            Someone in <span style={{ color: highlightColor, fontWeight: 800 }}>{data.name}</span> just ordered 
            <span style={{ color: highlightColor, fontWeight: 800 }}> {data.qty} {data.unit}</span> of {data.product}
          </p>
          <p className="verified-text">
            {data.isWholesale ? "Verified Wholesale Purchase ✓" : "Verified Purchase ✓"}
          </p>
        </div>
      </div>

      <div className="progress-bar-bg" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
        <div className="progress-bar-fill"></div>
      </div>

      <style jsx>{`
        .sales-popup-glass {
          position: fixed;
          bottom: 30px;
          left: 20px;
          z-index: 999999;
          width: 340px;
          padding: 12px 14px 18px 14px;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: slideIn 0.8s ease-out;
        }

        .description-text { font-size: 13px; line-height: 1.4; }
        .status-label { font-size: 10px; font-weight: 900; color: #f97316; text-transform: uppercase; }
        .verified-text { font-size: 9px; color: #22c55e; margin-top: 3px; font-weight: bold; }

        .icon-wrapper { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; }

        .progress-bar-bg { position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; }
        .progress-bar-fill { height: 100%; background: #f97316; width: 100%; animation: shrink 8s linear forwards; }

        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
        @keyframes slideIn { from { transform: translateX(-110%); } to { transform: translateX(0); } }
        
        .live-dot { width: 5px; height: 5px; background: #ef4444; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        .verified-tick { position: absolute; bottom: -2px; right: -2px; background: #22c55e; color: white; width: 16px; height: 16px; border-radius: 50%; padding: 3px; }

        @media (max-width: 768px) { 
          .sales-popup-glass { 
            bottom: 30px; 
            left: 10px; 
            right: auto; 
            width: 280px; 
          } 
          .description-text { font-size: 12px; }
        }
      `}</style>
    </div>
  );
}