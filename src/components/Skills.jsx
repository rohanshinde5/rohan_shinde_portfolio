import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Brain, Wrench, Shield, CheckCircle2 } from 'lucide-react';
import Floating3DBackground from './Floating3DBackground';

const skillsData = {
  languages: {
    title: 'Languages',
    icon: <Code className="text-neonCyan" size={20} />,
    color: 'neonCyan',
    items: [
      { name: 'JavaScript (MERN)', level: 'Advanced', description: 'Core language for building interactive client interfaces and scalable Express.js backends.' },
      { name: 'Python', level: 'Intermediate/Advanced', description: 'Used for machine learning multi-label classifications and FastAPI integration.' },
      { name: 'Java', level: 'Intermediate', description: 'Leveraged for building systems with Role-Based Access Control and strict ACID schemas.' },
      { name: 'C', level: 'Fundamental', description: 'Academics foundation for system programming, memory management, and pointers.' },
    ],
  },
  databases: {
    title: 'Databases',
    icon: <Database className="text-emeraldGreen" size={20} />,
    color: 'emeraldGreen',
    items: [
      { name: 'MongoDB', level: 'Advanced', description: 'Highly proficient in aggregation pipelines, B-tree schema optimizations, text indexing, and transactions.' },
      { name: 'MySQL', level: 'Intermediate/Advanced', description: 'Experienced with relational databases, normalized schemas (1NF, 2NF, 3NF), and foreign key indexing.' },
    ],
  },
  core: {
    title: 'Core CS & AI',
    icon: <Brain className="text-electricViolet" size={20} />,
    color: 'electricViolet',
    items: [
      { name: 'Advanced Data Structures & Algorithms', level: 'Proficient', description: 'Applied problem-solving with trees, graphs, sorting, and dynamic programming.' },
      { name: 'Database Management Systems (DBMS)', level: 'Advanced', description: 'Deep comprehension of ACID transactions, query performance, and indexing models.' },
      { name: 'Operating Systems & Networks', level: 'Academics', description: 'Understand kernel architectures, process synchronization, and TCP/IP routing protocols.' },
      { name: 'Machine Learning & AI Data Science', level: 'Proficient', description: 'Experience in classification algorithms, recommendation matrices, and ML APIs.' },
      { name: 'Data Mining & Business Intelligence', level: 'Intermediate', description: 'Filtering raw data structures for analytics, forecasting, and business metrics.' },
    ],
  },
  tools: {
    title: 'Tools & Platforms',
    icon: <Wrench className="text-yellow-400" size={20} />,
    color: 'yellow-400',
    items: [
      { name: 'Git & GitHub', level: 'Advanced', description: 'Version control workflows, branching strategy, pull request reviews, and action hooks.' },
      { name: 'AWS (Amazon Web Services)', level: 'Intermediate', description: 'Experience with EC2 instances, S3 storage buckets, and server deployments.' },
      { name: 'DevOps & CI/CD', level: 'Intermediate', description: 'Basic containerization, environment orchestrations, and automated staging pipelines.' },
    ],
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages');

  const tabKeys = Object.keys(skillsData);

  const tabColors = {
    languages: 'border-neonCyan text-neonCyan bg-neonCyan/5 shadow-glowCyan',
    databases: 'border-emeraldGreen text-emeraldGreen bg-emeraldGreen/5 shadow-glowGreen',
    core: 'border-electricViolet text-electricViolet bg-electricViolet/5 shadow-glowViolet',
    tools: 'border-yellow-400 text-yellow-400 bg-yellow-400/5 shadow-[0_0_15px_rgba(250,204,21,0.25)]',
  };

  const activeColor = skillsData[activeTab].color;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* 3D Ambient Shapes Background */}
      <Floating3DBackground />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[30%] right-[-10%] w-96 h-96 rounded-full pulsing-glow-green pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neonCyan mb-3">
            TECHNICAL MATRIX
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            My Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-electricViolet">Expertise</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-neonCyan to-electricViolet mt-4 rounded-full"></div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {tabKeys.map((key) => {
            const isActive = activeTab === key;
            const skill = skillsData[key];
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? tabColors[key]
                    : 'border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {skill.icon}
                {skill.title}
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div className="glass-panel rounded-2xl border border-white/5 bg-obsidian-light/50 p-6 md:p-10 min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skillsData[activeTab].items.map((skillItem, index) => (
                <motion.div
                  key={skillItem.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  className="glass-panel-hover flex gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 
                      className={`transition-colors duration-300 ${
                        activeTab === 'languages' ? 'text-neonCyan' :
                        activeTab === 'databases' ? 'text-emeraldGreen' :
                        activeTab === 'core' ? 'text-electricViolet' : 'text-yellow-400'
                      }`} 
                      size={20} 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neonCyan transition-all duration-300">
                      {skillItem.name}
                    </h4>
                    <div className="flex gap-2 items-center mt-1 mb-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        activeTab === 'languages' ? 'bg-neonCyan/10 text-neonCyan border border-neonCyan/20' :
                        activeTab === 'databases' ? 'bg-emeraldGreen/10 text-emeraldGreen border border-emeraldGreen/20' :
                        activeTab === 'core' ? 'bg-electricViolet/10 text-electricViolet border border-electricViolet/20' : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                      }`}>
                        {skillItem.level}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      {skillItem.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
