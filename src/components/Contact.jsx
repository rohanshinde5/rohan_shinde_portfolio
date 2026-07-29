import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Linkedin, Github, Send, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import Floating3DBackground from './Floating3DBackground';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('[Submit Error]', err);
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Server connection failed. Make sure the backend is active.'
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-obsidian-dark/50">
      {/* 3D Ambient Shapes Background */}
      <Floating3DBackground />

      {/* Dynamic Background glowing orb */}
      <div className="absolute top-[40%] left-[10%] w-[350px] h-[350px] pulsing-glow-violet opacity-25 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neonCyan mb-3">
            COMMUNICATION
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-electricViolet">Touch</span>
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-neonCyan to-electricViolet mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full relative z-20">
            <h4 className="text-2xl font-bold text-white mb-2">
              Let's build something <span className="text-neonCyan">remarkable</span> together.
            </h4>
            <p className="text-gray-400 font-light leading-relaxed mb-4">
              Feel free to reach out for employment queries, project discussions, hackathon team-ups, or standard technical inquiries. I am responsive via email and LinkedIn.
            </p>

            {/* Direct Cards */}
            <div className="space-y-4">
              <div className="glass-panel flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
                <div className="p-3.5 rounded-xl bg-neonCyan/10 border border-neonCyan/25 text-neonCyan">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">CALL ME</span>
                  <a href="tel:+919321506937" className="text-white font-semibold hover:text-neonCyan transition-colors">
                    +91-9321506937
                  </a>
                </div>
              </div>

              <div className="glass-panel flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.01]">
                <div className="p-3.5 rounded-xl bg-emeraldGreen/10 border border-emeraldGreen/25 text-emeraldGreen">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">EMAIL ME</span>
                  <a href="mailto:rohansnshinde05@gmail.com" className="text-white font-semibold hover:text-emeraldGreen transition-colors break-all">
                    rohansnshinde05@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://linkedin.com/in/rohan-shinde-344426358"
                target="_blank"
                rel="noreferrer"
                className="flex-1 glass-panel flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-electricViolet hover:bg-electricViolet/5 text-gray-400 hover:text-electricViolet transition-all duration-300 group"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold tracking-wider">LINKEDIN</span>
              </a>

              <a
                href="https://github.com/rohanshinde5"
                target="_blank"
                rel="noreferrer"
                className="flex-1 glass-panel flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-neonCyan hover:bg-neonCyan/5 text-gray-400 hover:text-neonCyan transition-all duration-300 group"
              >
                <Github size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold tracking-wider">GITHUB</span>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 w-full relative z-20">
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 bg-obsidian-light/40 relative">
              {/* Top gradient glow line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-neonCyan/40 to-transparent"></div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Your Name <span className="text-neonCyan">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neonCyan focus:shadow-glowCyan transition-all duration-300 ${
                        errors.name ? 'border-red-500/50' : 'border-white/10'
                      }`}
                    />
                    {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Your Email <span className="text-neonCyan">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neonCyan focus:shadow-glowCyan transition-all duration-300 ${
                        errors.email ? 'border-red-500/50' : 'border-white/10'
                      }`}
                    />
                    {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neonCyan focus:shadow-glowCyan transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Message <span className="text-neonCyan">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message details here..."
                    className={`px-4 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neonCyan focus:shadow-glowCyan transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-500/50' : 'border-white/10'
                    }`}
                  />
                  {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                </div>

                {/* Feedback Alerts */}
                <AnimatePresence mode="wait">
                  {status.success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 rounded-xl border border-emeraldGreen/30 bg-emeraldGreen/5 text-emeraldGreen flex items-center gap-3 text-sm"
                    >
                      <CheckCircle size={18} className="flex-shrink-0" />
                      <span>Thank you! Your message has been saved successfully in our system.</span>
                    </motion.div>
                  )}

                  {status.error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400 flex items-center gap-3 text-sm"
                    >
                      <AlertTriangle size={18} className="flex-shrink-0" />
                      <span>{status.error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold tracking-wider text-sm text-obsidian bg-neonCyan hover:bg-white hover:scale-[1.01] disabled:opacity-50 disabled:scale-100 disabled:bg-neonCyan/50 transition-all duration-300 shadow-glowCyan"
                >
                  {status.submitting ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      TRANSMITTING MESSAGE...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      TRANSMIT MESSAGE
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
