import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Hackathon from './components/Hackathon';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOutExpo
      smoothWheel: true,
      touchMultiplier: 0, // disable touch override for native mobile feel
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian text-gray-100 overflow-x-hidden font-sans">
      {/* Dynamic Background Layout glow objects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] pulsing-glow-cyan opacity-40"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] pulsing-glow-violet opacity-30"></div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Hackathon />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
