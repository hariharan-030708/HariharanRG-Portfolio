import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';
import { Globe, X, Sparkles, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ScrollReveal } from './ScrollReveal';

export function Projects() {
  const [selectedDemoProject, setSelectedDemoProject] = useState<Project | null>(null);

  const handleLiveDemoClick = (project: Project, e: MouseEvent) => {
    e.preventDefault();
    if (project.liveUrl && project.liveUrl !== '#') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedDemoProject(project);
    }
  };

  return (
    <section id="projects" className="py-24 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-300/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" duration={0.8}>
          <div className="clay-pill px-4 py-1 text-xs font-semibold text-clay-blue inline-block mb-3">
            My Creations
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm text-gray-500 mt-3 font-sans">
            A selection of practical applications and tools engineered across web technologies, AI, and desktop structures.
          </p>
        </ScrollReveal>

        {/* Projects Grid with interactive custom card components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.15} duration={0.8}>
              <ProjectCard
                project={project}
                index={index}
                onLiveDemoClick={(p, e) => handleLiveDemoClick(p, e as any)}
              />
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Interactive Project Live Demo Dialog */}
      <AnimatePresence>
        {selectedDemoProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedDemoProject(null);
              }}
              className="absolute inset-0 bg-[#f0f4f8]/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg clay-card overflow-hidden z-10 flex flex-col max-h-[85vh] border border-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/50">
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-clay-blue animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs font-mono text-clay-blue font-bold tracking-widest">LIVE SIMULATOR</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedDemoProject(null);
                  }}
                  className="clay-icon-btn p-1.5"
                  aria-label="Close demo"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Demo Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-white/30">
                <div className="text-center mb-6">
                  <h3 className="text-base font-bold text-gray-800">{selectedDemoProject.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Interactively test the features of this project directly in your browser.</p>
                </div>

                {/* PROJECT-SPECIFIC MOCK INTERFACE */}

                {/* 2. Personal Portfolio Website */}
                {selectedDemoProject.title.includes('Portfolio') && (
                  <div className="space-y-4 text-center">
                    <div className="clay-card-inset p-6 flex flex-col items-center">
                      <Sparkles size={32} className="text-clay-blue animate-pulse mb-3" />
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">
                        You are currently experiencing the live environment of the <strong>Personal Portfolio Website</strong>! 
                        Designed with high-contrast Soft UI principles, integrated React modules, and dynamic state handlers.
                      </p>
                    </div>
                    <div className="text-xs text-clay-blue font-semibold font-mono bg-clay-blue/10 py-2 rounded-lg border border-clay-blue/20">
                      Performance Metrics: 100% Client Responsive
                    </div>
                  </div>
                )}

                {/* 4. Responsive Landing Page */}
                {selectedDemoProject.title.includes('Landing Page') && (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 text-center">Simulate desktop, tablet, and mobile views for our responsive grids:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="clay-card-inset p-3 text-center">
                        <div className="font-bold text-xs text-gray-700">Desktop</div>
                        <div className="text-[10px] text-gray-400 mt-1">12 Columns Grid</div>
                      </div>
                      <div className="clay-card-inset p-3 text-center border-clay-blue/30 bg-clay-blue/5">
                        <div className="font-bold text-xs text-clay-blue">Tablet</div>
                        <div className="text-[10px] text-clay-blue/60 mt-1">6 Columns Grid</div>
                      </div>
                      <div className="clay-card-inset p-3 text-center">
                        <div className="font-bold text-xs text-gray-700">Mobile</div>
                        <div className="text-[10px] text-gray-400 mt-1">1 Column Block</div>
                      </div>
                    </div>
                    <div className="clay-card p-4 border-dashed border-gray-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2 mb-2">
                        <span className="text-xs font-bold text-gray-800">Preview Mock Page</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Adaptive CSS Live</span>
                      </div>
                      <div className="h-16 rounded-xl bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                        Header ➔ Hero Banner ➔ CTA Features Panel
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer / Controls */}
              <div className="p-4 bg-white/60 border-t border-white/50 flex justify-end">
                <button
                  onClick={() => {
                    setSelectedDemoProject(null);
                  }}
                  className="clay-btn px-6 py-2 text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
