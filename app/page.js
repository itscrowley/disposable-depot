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
  return (
    <>
      <NavBar />
      <div className="parallax-wrapper">
        <section className="hero parallax-bg">
          <HeroContent />
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
