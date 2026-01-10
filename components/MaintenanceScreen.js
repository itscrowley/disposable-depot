"use client";
import Image from 'next/image';
import { AlertTriangle, Clock } from 'lucide-react';

export default function MaintenanceScreen({ endTime }) {
  // Date Format karne ke liye (e.g., "Sun Jan 04 2026")
  const formattedDate = endTime 
    ? new Date(endTime).toDateString() 
    : null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950 text-white p-4 text-center">
        
        <div className="relative mb-8">
  {/* Glow effect */}
  <div className="absolute -inset-4 bg-orange-500/20 blur-xl rounded-full"></div>
  
  {/* Logo positioned over the glow */}
  <div className="relative z-10 w-40 h-40 animate-pulse">
    <Image 
      src="/logo.png" 
      alt="Logo" 
      fill 
      className="object-contain drop-shadow-lg" 
      priority 
    />
  </div>
</div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-7 tracking-tight">
          We are <span className="text-orange-500">Upgrading</span>
        </h1>
        
        {/* Description */}
        <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
          Our website is currently undergoing scheduled maintenance. We will be back shortly with updated inventory.
        </p>

        {/* Secondary Headline */}
        <p className="text-xl md:text-2xl font-bold text-orange-400 mb-8">
          Launching Any Moment Now!
        </p>

        {/* Date Display (Agar time set hai) */}
        {formattedDate && (
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-6 py-1 rounded-full text-slate-300">
            <Clock size={18} className="text-slate-500" />
            <span className="text-sm font-medium">Estimated Return: {formattedDate}</span>
          </div>
        )}

        {/* Footer Credit */}
        <div className="absolute bottom-6 text-slate-600 text-xs font">
          &copy; {new Date().getFullYear()} The Disposable Depot. All Rights Reserved.
        </div>
    </div>
  );
}