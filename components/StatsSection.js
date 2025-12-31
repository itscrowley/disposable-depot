"use client";
import React from 'react';
import Stats from './Stats'; // 👈 Ye aapke existing Stats.js ko bula raha hai

export default function StatsSection() {
  return (
    <section style={{
      position: 'relative',
      padding: '0px 0', 
      marginTop: '30px', 
      marginBottom: '30px',
      // Background Image
      backgroundImage: `url('https://images.unsplash.com/photo-1761481755390-83999d790b95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundAttachment: 'fixed', 
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Dark Overlay */}
      <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: '0'
      }}></div>

      {/* Aapka purana Stats yahan dikhega */}
      <div style={{ position: 'relative', zIndex: '1' }}>
           <Stats />
      </div>
    </section>
  );
}