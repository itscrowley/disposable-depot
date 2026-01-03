"use client";
import { useState, useEffect } from 'react';

const CONFIG_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=1681585265&single=true&output=csv';

export function useConfig() {
  const [config, setConfig] = useState({
    heroTitle: "",
    maintenanceMode: false,
    loading: true
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${CONFIG_SHEET_URL}&t=${new Date().getTime()}`, { cache: 'no-store' });
        const text = await res.text();
        const rows = text.split('\n').slice(1);
        
        let newConfig = { heroTitle: "", maintenanceMode: false, loading: false };
        
        rows.forEach(row => {
          const parts = row.split(/,(.*)/s);
          if (parts.length >= 2) {
            const key = parts[0].replace(/^"|"$/g, '').trim().toLowerCase();
            const val = parts[1].replace(/^"|"$/g, '').trim();
            
            if (key === 'hero_title' && val) newConfig.heroTitle = val;
            if (key === 'maintenance_mode') newConfig.maintenanceMode = val.toUpperCase() === 'TRUE';
          }
        });
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