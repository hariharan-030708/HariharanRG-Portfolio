import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { personalInfo } from '../data';
import { Brain, Code2, Database, Award, Calendar, Layers, Cpu, Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

// Reusable animated count component
function AnimatedCounter({ value, trigger, suffix = '', duration = 2 }: { value: number; trigger: boolean; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTimestamp: number | null = null;
    let frameId: number;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutExpo for extreme luxury feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };
    
    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [trigger, value, duration]);

  return <span>{count}{suffix}</span>;
}

export function About() {
  const values = [
    {
      icon: <Code2 className="text-clay-blue animate-pulse" size={24} />,
      title: 'Software Dev',
      desc: 'Committed to engineering clean, robust codebase applications using Java, Python, and C++.'
    },
    {
      icon: <Brain className="text-clay-blue animate-pulse" size={24} />,
      title: 'AI & Data Science',
      desc: 'Fascinated by predictive models, neural analytics, structures, and leveraging dataset integrity.'
    },
    {
      icon: <Database className="text-clay-blue animate-pulse" size={24} />,
      title: 'Database Systems',
      desc: 'Skilled in structuring robust relational datasets, writing queries, and managing schema integrations.'
    },
    {
      icon: <Award className="text-clay-blue animate-pulse" size={24} />,
      title: 'Rapid Learner',
      desc: 'Deeply driven to adapt to emerging toolsets, frameworks, databases, and structural designs.'
    }
  ];

  // Ref to track viewport visibility of the stats bar
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: false, margin: '-50px' });

  const statistics = [
    { label: 'Years Learning', value: 2, suffix: '+', icon: <Calendar className="text-clay-blue" size={20} /> },
    { label: 'Projects Built', value: 2, suffix: '+', icon: <Layers className="text-clay-blue" size={20} /> },
    { label: 'Technologies Learned', value: 15, suffix: '+', icon: <Cpu className="text-clay-blue" size={20} /> },
    { label: 'Coding Hours Logged', value: 1200, suffix: '+', icon: <Clock className="text-clay-blue" size={20} /> }
  ];

  return (
    <section id="about" className="py-24 bg-white/10 backdrop-blur-sm relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-blue-300/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16" duration={0.8}>
          <div className="clay-pill px-4 py-1 text-xs font-semibold text-clay-blue inline-block mb-3">
            Get to know me
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            About Me
          </h2>
        </ScrollReveal>

        {/* Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Detailed Biography Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 clay-card p-8 md:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-clay-blue/10 flex items-center justify-center border border-white/80 shadow-inner">
                  <Brain className="text-clay-blue" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">My Professional Philosophy</h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed text-justify font-light font-sans">
                {personalInfo.aboutMe}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/50 flex flex-wrap gap-4 items-center justify-between text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Active Student & Explorer
              </span>
              <span>Based in Chennai, India</span>
            </div>
          </motion.div>

          {/* Core Values Bento Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="clay-card p-6 flex flex-col justify-between hover:scale-102 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-white/95 shadow-sm mb-4 transition-transform duration-300 group-hover:rotate-12"
                       style={{ boxShadow: 'inset 2px 2px 4px rgba(255,255,255,1), 4px 4px 8px rgba(163,177,198,0.2)' }}>
                    {val.icon}
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 tracking-tight mb-2">{val.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed text-justify">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Dynamic Recruiter-focused Statistics Panel */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="clay-card p-8 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/40 border border-white/50"
        >
          {statistics.map((stat, i) => (
            <div 
              key={stat.label} 
              className={`flex flex-col items-center justify-center text-center p-4 lg:p-2 ${i >= 2 ? 'pt-8 lg:pt-2' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-clay-blue/10 flex items-center justify-center border border-white mb-3 shadow-inner">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} trigger={isStatsInView} />
              </div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
