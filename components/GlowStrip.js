"use client";
import React, { useState, useEffect } from 'react';

export default function GlowStrip() {
  const [config, setConfig] = useState({
    // Default array of texts (loading state)
    texts: ["🔥 Loading Offers...", "⚡ Please wait..."], 
    show: false 
  });

  // 🔴 Aapka Config Tab ka Link (Same as before)
  const CONFIG_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=1681585265&single=true&output=csv';

  useEffect(() => {
    const timestamp = new Date().getTime();
    
    fetch(`${CONFIG_SHEET_URL}&t=${timestamp}`, { cache: 'no-store' })
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').slice(1);
        let newConfig = { texts: [], show: true };
        
        rows.forEach(row => {
          // Splitting by first comma
          const parts = row.split(/,(.*)/s); 
          
          if (parts.length >= 2) {
            const key = parts[0].replace(/^"|"$/g, '').trim().toLowerCase();
            const val = parts[1].replace(/^"|"$/g, '').trim(); 
            
            if (key === 'glow_text') {
              // 🔥 LOGIC CHANGE: Split by '|' to get multiple texts
              // Example: "Offer 1 | Offer 2" -> ["Offer 1", "Offer 2"]
              newConfig.texts = val.split('|').map(t => t.trim()).filter(t => t.length > 0);
            }
            
            if (key === 'show_glow') {
              newConfig.show = val.toUpperCase() === 'TRUE';
            }
          }
        });

        // Agar sheet se texts mil gaye to update karo, nahi to default rakho
        if (newConfig.texts.length > 0) {
            setConfig(newConfig);
        }
      })
      .catch(err => console.error("GlowStrip Config Error:", err));
  }, []);

  if (!config.show) return null;

  return (
    <div className="marquee-strip glow-effect">
      <div className="marquee-track">
        {/* Hum 20 items render karenge loop mein.
           % operator use karke texts ko cycle karenge.
           Agar 3 texts hain: 1, 2, 3, 1, 2, 3... aise chalega.
        */}
        {Array(20).fill(0).map((_, i) => (
          <span key={i}>
            {config.texts[i % config.texts.length]} &nbsp; • &nbsp; 
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee-strip {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          background: linear-gradient(90deg, #ff4d4d, #ff9e2c, #ff4d4d);
          background-size: 200% 200%;
          padding: 10px 0;
          font-weight: bold;
          font-size: 0.9rem;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
          animation: bgGlow 3s ease infinite;
          position: relative;
          z-index: 50;
          box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
        }

        .marquee-track {
          display: inline-block;
          animation: scrollLeft 40s linear infinite; /* Speed thoda slow kiya padhne ke liye */
        }

        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes bgGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}