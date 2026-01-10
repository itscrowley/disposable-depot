"use client";
import { useState, useEffect } from 'react';

const CONFIG_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=1681585265&single=true&output=csv';

export function useConfig() {
  const [config, setConfig] = useState({
    heroTitle: "",
    maintenanceMode: false,
    maintenanceEndTime: null,
    loading: true
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const uniqueUrl = `${CONFIG_SHEET_URL}&t=${new Date().getTime()}`;
        const res = await fetch(uniqueUrl, { 
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });

        const text = await res.text();
        const rows = text.split('\n').slice(1);
        
        let newConfig = { heroTitle: "", maintenanceMode: false, maintenanceEndTime: null, loading: false };
        let sheetMode = false;
        let sheetTime = "";

        rows.forEach(row => {
          const parts = row.split(/,(.*)/s);
          if (parts.length >= 2) {
            const key = parts[0].replace(/^"|"$/g, '').trim().toLowerCase();
            const val = parts[1].replace(/^"|"$/g, '').trim();
            
            if (key === 'hero_title' && val) newConfig.heroTitle = val;
            
            if (key === 'maintenance_mode') {
               sheetMode = val.toUpperCase() === 'TRUE';
            }
            
            if (key === 'maintenance_end') {
               sheetTime = val; 
               newConfig.maintenanceEndTime = val;
            }
          }
        });

        // 👇 JADOI LOGIC (Auto-Live vs Manual)
        if (sheetMode) {
          if (sheetTime) {
            // Case A: Time Set hai -> Check karo time bacha hai ya nahi
            const now = new Date();
            const end = new Date(sheetTime);
            
            if (now < end) {
              // Time bacha hai -> Maintenance ON
              newConfig.maintenanceMode = true;
            } else {
              // Time khatam -> Website LIVE (Auto-Off)
              newConfig.maintenanceMode = false;
              console.log("Maintenance Time Expired: Going Live Automatically!");
            }
          } else {
            // Case B: Time Empty hai -> Forever Maintenance (Manual Control)
            newConfig.maintenanceMode = true;
          }
        } else {
          // Sheet me hi OFF hai
          newConfig.maintenanceMode = false;
        }

        setConfig(newConfig);
      } catch (error) {
        console.error("Config fetch error:", error);
        setConfig(prev => ({ ...prev, loading: false }));
      }
    };

    fetchConfig();
  }, []);

  return config;
}