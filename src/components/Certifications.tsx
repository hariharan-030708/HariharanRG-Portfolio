import { motion } from 'motion/react';
import { certifications } from '../data';
import { Award, CheckCircle2, ChevronRight, Calendar, Sparkles, BookOpen, ShieldCheck, Database, Brain } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function Certifications() {
  const syllabusInfo = [
    {
      title: 'Java SE Programming Professional',
      syllabus: ['Advanced Object-Oriented Java Coding', 'Multithreading & Concurrency', 'JDBC & DB Connections', 'Exception Handling frameworks']
    },
    {
      title: 'Introduction to Artificial Intelligence',
      syllabus: ['Supervised & Unsupervised ML Models', 'TensorFlow & Neural Architectures', 'Natural Language Processing basics', 'Feature Scaling & Engineering']
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-white/30 backdrop-blur-sm relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" duration={0.8}>
          <div className="clay-pill px-4 py-1 text-xs font-semibold text-clay-blue inline-block mb-3">
            Milestones
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Certifications & Training
          </h2>
          <p className="text-xs text-gray-500 mt-2">
            Professional development certifications currently in progress or planned as upcoming learning milestones.
          </p>
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
          {certifications.map((cert, index) => {
            const extraSyllabus = syllabusInfo.find(s => s.title.toLowerCase().includes(cert.title.toLowerCase().substring(0, 10)))?.syllabus || [];
            
            return (
              <ScrollReveal
                key={cert.title}
                delay={index * 0.15}
                duration={0.8}
              >
                <div className="clay-card p-6 flex flex-col justify-between hover:scale-103 transition-all duration-300 group h-full">
                  <div>
                    {/* Card Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-clay-blue/10 flex items-center justify-center border border-white/80"
                           style={{ boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.8), 2px 2px 5px rgba(163, 177, 198, 0.15)' }}>
                        {index === 0 ? <BookOpen className="text-clay-blue animate-pulse" size={22} /> : 
                                       <Brain className="text-clay-blue animate-pulse" size={22} />}
                      </div>

                      {/* Timeline Badge */}
                      <div className="clay-pill px-2.5 py-0.5 text-[9px] font-mono font-bold text-clay-blue flex items-center gap-1">
                        <Calendar size={10} />
                        {cert.date}
                      </div>
                    </div>

                    {/* Cert Title & Issuer */}
                    <h3 className="text-sm font-bold text-gray-800 tracking-tight group-hover:text-clay-blue transition-colors duration-200">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 mb-4">{cert.issuer}</p>

                    {/* Core Syllabus Checklists (Hidden/Interactive Expand) */}
                    <div className="mt-4 pt-4 border-t border-white/50 space-y-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Target Competencies:</span>
                      <ul className="space-y-1.5">
                        {extraSyllabus.map((topic) => (
                          <li key={topic} className="flex items-center gap-1.5 text-xs text-gray-500 font-light">
                            <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Status indicator button */}
                  <div className="mt-6 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] bg-amber-50 border border-amber-200/50 text-amber-600 px-2 py-0.5 rounded-lg font-bold">
                      In Progress
                    </span>
                    <span className="text-clay-blue font-semibold flex items-center gap-0.5 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Milestone Details
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
