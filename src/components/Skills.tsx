import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skills } from '../data';
import { Icon } from './Icon';
import { ScrollReveal } from './ScrollReveal';

export function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'concepts' | 'mathematics' | 'tools' | 'softskills'>('all');

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'languages', name: 'Languages' },
    { id: 'concepts', name: 'Core Concepts' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'tools', name: 'Tools' },
    { id: 'softskills', name: 'Soft Skills' },
  ] as const;

  const filteredSkills = skills.filter((skill) => {
    if (activeTab === 'all') return true;
    return skill.category === activeTab;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden select-none">
      {/* Decorative background visual elements */}
      <div className="absolute top-1/3 right-10 w-72 h-72 rounded-full bg-blue-300/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-72 h-72 rounded-full bg-purple-300/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" duration={0.8}>
          <div className="clay-pill px-4 py-1 text-xs font-semibold text-clay-blue inline-block mb-3">
            My Tech Stack
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-sm text-gray-500 mt-3 font-sans">
            Selected tech stacks and engineering principles studied as part of B.Tech curriculum and self-taught expertise.
          </p>
        </ScrollReveal>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 text-xs font-bold rounded-2xl transition-all duration-300 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-clay-blue text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),_3px_3px_6px_rgba(79,142,247,0.35)]'
                  : 'bg-white/60 hover:bg-white text-gray-600 hover:text-clay-blue border border-white'
              }`}
              style={{
                boxShadow: activeTab === cat.id
                  ? undefined
                  : '4px 4px 10px rgba(163,177,198,0.15), -4px -4px 10px rgba(255,255,255,0.8)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 25 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="clay-card p-6 flex flex-col items-center text-center justify-between transition-all duration-300 group cursor-default relative overflow-hidden hover:-translate-y-2 hover:border-clay-blue/50 hover:shadow-[0_20px_35px_rgba(79,142,247,0.15)]"
              >
                {/* 1. Shine Sweep Overlay Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="absolute top-0 -left-[100%] w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transition-all duration-1000 ease-out group-hover:left-[150%]" />
                </div>

                {/* 2. Soft Blue Hover Glow Backplate */}
                <div className="absolute inset-0 bg-clay-blue/[0.01] group-hover:bg-clay-blue/[0.04] transition-colors duration-300 pointer-events-none" />

                {/* Icon Wrapper with rotation and bounce */}
                <div 
                  className="w-14 h-14 rounded-full bg-white flex items-center justify-center border border-white/95 shadow-sm mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-white group-hover:to-blue-50/50"
                  style={{ boxShadow: 'inset 2px 2px 4px rgba(255,255,255,1), 4px 4px 8px rgba(163,177,198,0.2)' }}
                >
                  <Icon 
                    name={skill.iconName} 
                    className="text-clay-blue group-hover:rotate-12 transition-transform duration-300" 
                    size={24} 
                  />
                </div>

                {/* Skill Title */}
                <h3 className="text-xs font-bold text-gray-700 tracking-tight leading-tight mb-2 h-8 flex items-center justify-center group-hover:text-clay-blue transition-colors duration-300 z-10">
                  {skill.name}
                </h3>

                {/* Skill Category Pill */}
                <span className="text-[9px] uppercase font-mono font-bold text-gray-400 bg-gray-100/60 px-2.5 py-1 rounded-lg group-hover:bg-clay-blue/10 group-hover:text-clay-blue transition-colors duration-300 z-10">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
