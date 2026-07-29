import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';

const timelineData = [
  {
    type: 'education',
    title: 'Bachelor of Engineering (Information Technology)',
    institution: 'Datta Meghe College of Engineering, Airoli, Navi-Mumbai',
    period: 'Aug 2023 – May 2027',
    badge: 'CGPA: 8.0 / 10',
    badgeColor: 'border-neonCyan text-neonCyan bg-neonCyan/5 shadow-glowCyan',
    description: 'Specializing in computer systems, algorithms, databases, intelligence mining, web engineering, and machine learning. Final-year IT student active in project squads and technical events.',
    icon: <GraduationCap className="text-neonCyan" size={20} />
  },
  {
    type: 'education',
    title: 'Higher Secondary Certificate (Class XII - Science)',
    institution: 'Maharashtra State Board',
    period: 'Completed 2023',
    badge: 'Result: 71%',
    badgeColor: 'border-electricViolet text-electricViolet bg-electricViolet/5 shadow-glowViolet',
    description: 'Focused on core scientific streams including Physics, Chemistry, Mathematics, and Computer Science.',
    icon: <GraduationCap className="text-electricViolet" size={20} />
  },
  {
    type: 'education',
    title: 'Secondary School Certificate (Class X)',
    institution: 'Maharashtra State Board',
    period: 'Completed 2021',
    badge: 'Result: 80%',
    badgeColor: 'border-yellow-400 text-yellow-400 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.2)]',
    description: 'General academics with early interests in logical reasoning and mathematics foundation.',
    icon: <GraduationCap className="text-yellow-400" size={20} />
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-obsidian-dark/30">
      {/* Background glow */}
      <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full pulsing-glow-cyan opacity-15 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neonCyan mb-3">
            MY JOURNEY
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-electricViolet">Timeline</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-neonCyan to-electricViolet mt-4 rounded-full"></div>
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-white/10 md:pl-8 ml-4 md:ml-12 space-y-10">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Vertical connector dot */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-obsidian border-2 border-white/10 flex items-center justify-center z-10 group-hover:border-neonCyan transition-all duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-white/40 group-hover:bg-neonCyan transition-colors"></div>
              </div>

              {/* Card content */}
              <div className="glass-panel rounded-2xl border border-white/5 bg-obsidian-light/40 hover:border-white/10 p-6 md:p-8 hover:scale-[1.01] transition-all duration-300 relative group">
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-neonCyan/50 transition-all duration-300"></div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg md:text-xl group-hover:text-neonCyan transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm font-light mt-0.5">
                        {item.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 md:flex-col md:items-end">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
