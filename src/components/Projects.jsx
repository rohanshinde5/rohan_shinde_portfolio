import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Activity, Cpu, Check, X, Code2 } from 'lucide-react';

const projectsData = [
  {
    id: 'dukandaar',
    title: 'Dukan Daar',
    subtitle: 'Smart Ledger with ML Credit Guardrails',
    github: 'https://github.com/rohanshinde5/DukanDaar',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'FastAPI', 'Python', 'Tailwind'],
    category: 'MERN Stack + ML',
    bannerColor: 'from-neonCyan to-electricViolet',
    accentColor: '#00f0ff',
    metrics: [
      { label: 'DB Write Boost', value: '80%', desc: 'Using frontend Debounce design pattern' },
      { label: 'Credit Ceilings', value: '3 Levels', desc: 'ML automated risk assessment (Rs. 1.5K-10K)' },
      { label: 'Data Integrity', value: '100%', desc: 'Preserved via item snapshot schema designs' },
    ],
    summary: 'A smart merchant ledger built to eliminate bad debt and facilitate real-time credit tracking using custom machine learning algorithms and optimized database structures.',
    feats: [
      'Automated bad-debt mitigation with ML credit ceilings (Rs. 1,500 High Risk, Rs. 5,000 Medium Risk, Rs. 10,000 Low Risk) based on user repayment history.',
      'Boosted database write performance by 80% using a 500ms frontend Debounce Design Pattern to throttle excessive API calls during real-time ledger inputs.',
      'Preserved 100% historical invoice integrity by utilizing transaction schema item snapshots (item_name_snapshot) preventing retrospect changes when catalog prices fluctuate.',
      'Constructed complex MongoDB aggregation pipelines filtering repayments to compute precise 6-month sales trends and merchant analytics dashboards.'
    ]
  },
  {
    id: 'ayurdarpan',
    title: 'Ayur Darpan',
    subtitle: 'Ayurvedic Lifestyle Recommendation Platform',
    github: 'https://github.com/rohanshinde5/AyurDarpan',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'Machine Learning', 'API Optimization'],
    category: 'Full-Stack MERN + ML',
    bannerColor: 'from-emeraldGreen to-neonCyan',
    accentColor: '#00ff9d',
    metrics: [
      { label: 'Query Latency', value: '< 50ms', desc: 'Achieved through indexed text search schemas' },
      { label: 'Payload Reduction', value: '35%', desc: 'Optimized REST API structures and B-trees' },
      { label: 'Dosha Mapping', value: '25 Qs', desc: 'Dynamic questionnaire covering 7 profiles' },
    ],
    summary: 'A full-stack personalized Ayurvedic lifestyle recommendation platform providing customized remedies, diet plans, and yoga routines based on ML classification of individual health profiles.',
    feats: [
      'Built a 25-question matrix scoring algorithm mapping dominant dosha (Vata, Pitta, Kapha) across 7 multi-profile health permutations.',
      'Integrated Machine Learning multi-label classification to deliver 100% personalized remedies, recipes, and yoga routines depending on user dosha profiles.',
      'Reduced database query execution times to under 50ms by adding custom indexed MongoDB text searches across hundreds of holistic catalog items.',
      'Optimized RESTful API routers and B-tree schema fields, reducing network payload size by 35% for smoother mobile client loading.'
    ]
  },
  {
    id: 'banker',
    title: 'Banker',
    subtitle: 'Secured Desktop Banking System',
    github: 'https://github.com/rohanshinde5/Banking-System-Java-',
    tags: ['Java', 'Swing UI', 'SQL Server', 'ACID Transactions'],
    category: 'Java Systems Engineering',
    bannerColor: 'from-electricViolet to-pink-500',
    accentColor: '#7000ff',
    metrics: [
      { label: 'Transaction Security', value: 'ACID', desc: 'Fully compliant double-entry ledger security' },
      { label: 'Access Control', value: 'RBAC', desc: 'Isolating administrator vs employee capabilities' },
      { label: 'DB Architecture', value: 'Normalized', desc: 'Optimized foreign key indexes for concurrent operations' },
    ],
    summary: 'A robust desktop banking application designed to handle high-frequency banking operations securely with Role-Based Access Control and strict ACID database conformity.',
    feats: [
      'Built granular Role-Based Access Control (RBAC) to isolate admin configurations and cashier employee privileges, preventing unauthorized data views.',
      'Implemented normalized SQL schemas with optimized foreign key indexing to manage concurrent customer transactions with zero deadlock risks.',
      'Engineered ACID-compliant transaction routines to ensure that double-entry balance transfers either execute completely or roll back in full on failures.'
    ]
  }
];

function TiltCard({ project, onOpenModal }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowStyle, setGlowStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Max 12 degrees rotation
    const rX = -((mouseY - height / 2) / height) * 12;
    const rY = ((mouseX - width / 2) / width) * 12;
    
    setRotateX(rX);
    setRotateY(rY);

    // Render mouse follow glow
    setGlowStyle({
      opacity: 1,
      background: `radial-gradient(circle 140px at ${mouseX}px ${mouseY}px, ${project.accentColor}20, transparent 80%)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({ opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="glass-panel rounded-3xl overflow-hidden border border-white/5 bg-obsidian-light/35 flex flex-col justify-between hover:border-white/10 group transition-all duration-300 relative select-none cursor-pointer"
    >
      {/* Dynamic Cursor Light Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={glowStyle}
      />

      <div className={`h-2.5 bg-gradient-to-r ${project.bannerColor} w-full`}></div>
      
      {/* Content wrapper with depth translation */}
      <div 
        style={{ transform: 'translateZ(20px)' }}
        className="p-6 md:p-8 flex-grow flex flex-col justify-between relative z-20"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">
            {project.category}
          </span>
          <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-neonCyan transition-colors duration-300">
            {project.title}
          </h4>
          <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Highlight Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-white/5 py-4">
            {project.metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  {metric.label}
                </span>
                <span 
                  className="text-lg font-extrabold mt-0.5"
                  style={{ color: project.accentColor }}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-white/5 border border-white/5 rounded-full px-2.5 py-1 text-gray-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[10px] text-gray-500 self-center">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => onOpenModal(project)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all duration-300"
          >
            <Activity size={14} />
            Engineering Metrics
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-obsidian-dark/50">
      {/* Background glowing circle */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full pulsing-glow-violet opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neonCyan mb-3">
            ENGINEERING WORKSHOWCASE
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-electricViolet">Projects</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-neonCyan to-electricViolet mt-4 rounded-full"></div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <TiltCard 
              key={project.id} 
              project={project} 
              onOpenModal={setSelectedProject} 
            />
          ))}
        </div>
      </div>

      {/* Detail Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-obsidian-dark/90 backdrop-blur-sm cursor-pointer"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel w-full max-w-3xl rounded-2xl border border-white/10 bg-obsidian-light/95 shadow-2xl relative z-10 overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Modal Banner */}
              <div className={`h-2.5 bg-gradient-to-r ${selectedProject.bannerColor} w-full`}></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X size={18} />
              </button>

              <div className="p-6 md:p-10 overflow-y-auto flex-grow">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">
                  {selectedProject.category}
                </span>
                <h4 className="text-3xl font-extrabold text-white mb-2">
                  {selectedProject.title}
                </h4>
                <p className="text-gray-400 font-light mb-6 text-base leading-relaxed">
                  {selectedProject.subtitle}
                </p>

                {/* Tech Stack List */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/5 border border-white/5 rounded-full px-3 py-1 text-gray-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Performance Metrics Block */}
                <h5 className="text-sm font-semibold uppercase tracking-wider text-neonCyan mb-4 flex items-center gap-2">
                  <Cpu size={16} /> Engineering Metrics & Impact
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {selectedProject.metrics.map((metric, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.01]"
                    >
                      <span className="text-[10px] uppercase font-bold text-gray-500 block">
                        {metric.label}
                      </span>
                      <span 
                        className="text-2xl font-extrabold block mt-1"
                        style={{ color: selectedProject.accentColor }}
                      >
                        {metric.value}
                      </span>
                      <span className="text-xs text-gray-400 mt-1 block leading-relaxed font-light">
                        {metric.desc}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Accomplishments checklist */}
                <h5 className="text-sm font-semibold uppercase tracking-wider text-electricViolet mb-4 flex items-center gap-2">
                  <Code2 size={16} /> Technical Implementation Details
                </h5>
                <ul className="space-y-3.5 mb-8">
                  {selectedProject.feats.map((feat, index) => (
                    <li key={index} className="flex gap-3 text-sm text-gray-300 font-light leading-relaxed">
                      <div className="flex-shrink-0 mt-1">
                        <div 
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${selectedProject.accentColor}15`, border: `1px solid ${selectedProject.accentColor}30` }}
                        >
                          <Check size={10} style={{ color: selectedProject.accentColor }} />
                        </div>
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer / CTA */}
              <div className="p-6 bg-obsidian-dark/40 border-t border-white/5 flex gap-4 justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl border border-white/5 hover:border-white/10 text-gray-400 hover:text-white text-xs font-semibold transition-all"
                >
                  Close Metrics
                </button>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-obsidian flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-glowCyan"
                  style={{ backgroundColor: selectedProject.accentColor }}
                >
                  <Github size={14} />
                  Explore Source Code
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
