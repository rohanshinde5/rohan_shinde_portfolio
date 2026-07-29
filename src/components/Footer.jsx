import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, null, id);
    }
  };

  return (
    <footer className="border-t border-white/5 bg-obsidian-dark py-12 px-6 md:px-12 relative overflow-hidden">
      {/* Glow border decorative */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Logo and signature */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-2 group text-white font-bold text-lg tracking-wider"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-lg border border-neonCyan/30 bg-obsidian-light text-neonCyan font-bold text-sm">
              RS
            </div>
            <span>ROHAN<span className="text-neonCyan">.SHINDE</span></span>
          </a>
          <p className="text-xs text-gray-500 font-light mt-1">
            Software Developer.
          </p>
        </div>

        {/* Quick Links / Copyright */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-4 text-gray-500">
            <a 
              href="https://github.com/rohanshinde5" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-neonCyan transition-colors"
            >
              <Github size={16} />
            </a>
            <a 
              href="https://linkedin.com/in/rohan-shinde-344426358" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-electricViolet transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="mailto:rohansnshinde05@gmail.com" 
              className="hover:text-emeraldGreen transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
          <p className="text-[10px] text-gray-600 font-medium tracking-wide uppercase">
            © {new Date().getFullYear()} ROHAN SHINDE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
