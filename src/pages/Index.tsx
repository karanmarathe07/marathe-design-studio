import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Timeline from '@/components/Timeline';
import Works from '@/components/Works';
import Contact from '@/components/Contact';
import MagneticCursor from '@/components/MagneticCursor';
import BackgroundParticles from '@/components/BackgroundParticles';
import SectionTransition from '@/components/SectionTransition';

const Index = () => {
  return (
    <main className="relative">
      <MagneticCursor />
      <BackgroundParticles />
      <SectionTransition />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Works />
      <Contact />
    </main>
  );
};

export default Index;
