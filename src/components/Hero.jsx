import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Send } from 'lucide-react';
import Canvas3D from './Canvas3D';

export default function Hero() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden radial-bg"
    >
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-[20%] left-[15%] w-72 h-72 rounded-full pulsing-glow-cyan pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full pulsing-glow-violet pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copywriting & Actions */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Greeting badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neonCyan/30 bg-neonCyan/5 text-neonCyan text-xs font-semibold tracking-widest uppercase mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-neonCyan animate-ping"></span>
            Available for Opportunities
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Rohan Shinde
            <span className="block mt-2 bg-gradient-to-r from-neonCyan via-electricViolet to-emeraldGreen bg-clip-text text-transparent">
              Full-Stack Developer
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl mb-8 font-light leading-relaxed"
          >
            Specializing in scalable MERN applications, ML integration, and optimized database architectures. Graduating May 2027.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, '#projects')}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-obsidian bg-neonCyan hover:bg-white hover:scale-105 transition-all duration-300 shadow-glowCyan"
            >
              Explore Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-white border border-white/10 hover:border-electricViolet hover:bg-electricViolet/5 glow-violet-hover hover:scale-105 transition-all duration-300"
            >
              Get in Touch
              <Send size={15} />
            </a>

            <a
              href="/Rohan_Shinde_Resume.pdf"
              download="Rohan_Shinde_Resume.pdf"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-gray-400 hover:text-white border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              View Resume
              <FileText size={15} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="lg:col-span-5 w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center relative"
        >
          {/* Subtle glowing halo behind Canvas */}
          <div className="absolute inset-0 bg-gradient-to-tr from-neonCyan/10 to-electricViolet/10 rounded-full filter blur-[60px] opacity-75"></div>
          <Canvas3D />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50 sm:flex">
        <span className="text-[10px] tracking-widest uppercase text-gray-500">Scroll Down</span>
        <div className="w-[18px] h-[30px] rounded-full border border-gray-600 flex justify-center p-1">
          <motion.div 
            animate={{ 
              y: [0, 10, 0] 
            }} 
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 rounded-full bg-neonCyan"
          />
        </div>
      </div>
    </section>
  );
}
