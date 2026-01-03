"use client";
import { useConfig } from '../hooks/useConfig';
import NavBar from '../components/NavBar';
import StatsSection from '../components/StatsSection';
import WhatsAppOrder from '../components/WhatsAppOrder';
import Catalogue from '../components/Catalogue';
import GlowStrip from '../components/GlowStrip';
import WhyUs from '../components/WhyUs';
import MidBanner from '../components/MidBanner';
import HeroActions from '../components/HeroActions';
import HeroContent from '../components/HeroContent';


export default function Home() {
  const { heroTitle, maintenanceMode } = useConfig(); 

  if (maintenanceMode) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center z-[99999]">
        <AlertTriangle className="w-20 h-20 text-orange-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-slate-400">Updating our inventory. Please check back soon.</p>
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <div className="parallax-wrapper">
        <section className="hero parallax-bg">
          <HeroContent dynamicTitle={heroTitle} />
          <HeroActions />
          <GlowStrip />
        </section>
      </div>
      <Catalogue />
      <WhyUs />
      <MidBanner />
      <StatsSection />
      <WhatsAppOrder />
    </>
  );
}
