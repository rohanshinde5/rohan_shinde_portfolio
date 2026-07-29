import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Hackathon', href: '#hackathon' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12 ${
          scrolled 
            ? 'bg-obsidian-dark/70 border-b border-white/5 backdrop-blur-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-neonCyan/30 group-hover:border-neonCyan bg-obsidian-light text-neonCyan font-bold text-lg glow-cyan-hover transition-all duration-300">
              RS
              <div className="absolute inset-0 rounded-lg bg-neonCyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <span className="font-semibold text-lg tracking-wider text-white hidden sm:block">
              ROHAN<span className="text-neonCyan">.SHINDE</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 py-2 group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-neonCyan to-electricViolet transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Socials & CTA */}
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <a
                href="https://github.com/rohanshinde5"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-neonCyan transition-colors duration-300"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/rohan-shinde-344426358"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-electricViolet transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-obsidian bg-gradient-to-r from-neonCyan to-electricViolet hover:scale-105 transition-all duration-300 shadow-glowCyan"
              >
                HIRE ME
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-3 py-1 rounded-full text-xs font-semibold text-obsidian bg-neonCyan"
            >
              Contact
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[64px] left-0 w-full z-40 bg-obsidian-dark/95 border-b border-white/10 backdrop-blur-lg px-6 py-8 flex flex-col gap-6 md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-lg font-medium text-gray-300 hover:text-neonCyan transition-colors block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
              <a
                href="https://github.com/rohanshinde5"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center gap-2 text-sm text-gray-400 hover:text-neonCyan"
              >
                <Github size={18} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/rohan-shinde-344426358"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center gap-2 text-sm text-gray-400 hover:text-electricViolet"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
