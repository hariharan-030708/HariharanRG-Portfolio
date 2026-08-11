import { motion } from 'motion/react';
import { education } from '../data';
import { GraduationCap, Calendar, BookOpen, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" duration={0.8}>
          <div className="clay-pill px-4 py-1 text-xs font-semibold text-clay-blue inline-block mb-3">
            My Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Education Timeline
          </h2>
          <p className="text-xs text-gray-500 mt-2">
            My formal engineering academics, focus streams, and ongoing collegiate training.
          </p>
        </ScrollReveal>

        {/* Timeline Structure */}
        <div className="max-w-3xl mx-auto relative pl-6 md:pl-10 border-l-2 border-clay-blue/30 space-y-12 py-4">
          
          {education.map((item, index) => (
            <ScrollReveal
              key={item.institution}
              direction="left"
              delay={index * 0.15}
              duration={0.8}
              className="relative"
            >
              {/* Timeline Checkpoint Pin */}
              <div className="absolute -left-[39px] md:-left-[55px] top-0.5 z-10 w-14 h-14 rounded-full bg-white flex items-center justify-center border border-white"
                   style={{ boxShadow: '8px 8px 16px rgba(163, 177, 198, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.9)' }}>
                <GraduationCap className="text-clay-blue" size={24} />
              </div>

              {/* Timeline Card */}
              <div className="clay-card p-6 md:p-8 ml-4">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4 border-b border-white pb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">{item.institution}</h3>
                    <p className="text-sm font-semibold text-clay-blue mt-1 flex items-center gap-1.5">
                      <BookOpen size={14} />
                      {item.degree}
                    </p>
                  </div>
                  
                  {/* Timeline Badge */}
                  <div className="clay-pill px-3 py-1 text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                    <Calendar size={13} className="text-clay-blue" />
                    {item.timeline}
                  </div>
                </div>

                {/* Course Details List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Key Details & Focus</h4>
                  <ul className="space-y-2.5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 text-xs md:text-sm text-gray-600 font-light">
                        <div className="w-5 h-5 rounded-full bg-clay-blue/10 flex items-center justify-center border border-white mt-0.5 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-clay-blue" />
                        </div>
                        <span className="leading-relaxed text-justify">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
          
        </div>

      </div>
    </section>
  );
}
