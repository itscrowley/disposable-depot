"use client";
import React from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 z-[9999] overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px]" />
      
      {/* Glass Card */}
      <div className="relative flex items-center justify-center p-0.1 bg-white/30 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div className="relative w-40 h-40 animate-pulse">
          <Image 
            src="/logo.png" 
            alt="Loading..." 
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}