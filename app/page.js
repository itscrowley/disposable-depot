"use client";
import Image from 'next/image';
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
import MaintenanceScreen from '../components/MaintenanceScreen';
import LoadingScreen from '../components/LoadingScreen';
import SalesPopup from '../components/SalesPopup';

export default function Home() {
  const { heroTitle, maintenanceMode, maintenanceEndTime, loading } = useConfig(); 
 
  if (loading) {
    return (<LoadingScreen />);
  }
  // Ab loading khatam hone ke baad pehle ye check hoga
  if (maintenanceMode) {
    return <MaintenanceScreen endTime={maintenanceEndTime} />;
  }

  // 👇 5. MAIN WEBSITE
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
      <SalesPopup />
    </>
  );
}