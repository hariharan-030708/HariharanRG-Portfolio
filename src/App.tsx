import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { Background } from './components/Background';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Simulate premium environment assembly loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* 1. Custom Interactive 60fps Cursor */}
      <CustomCursor />

      {/* 2. Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4.5px] bg-clay-blue origin-left z-50 shadow-[0_2px_8px_rgba(79,142,247,0.35)]"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          /* 3. Smooth Assembly Loader Screen */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 bg-[#f0f4f8] flex flex-col items-center justify-center z-[9999]"
          >
            <div className="flex flex-col items-center select-none">
              
              {/* Pulsing Claymorphic Logo */}
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-white shadow-[8px_8px_20px_rgba(163,177,198,0.35),_inset_2px_2px_4px_white] mb-6"
              >
                <span className="font-sans font-extrabold text-2xl text-gray-800 tracking-tight">HRG<span className="text-clay-blue">.</span></span>
              </motion.div>

              {/* Loader Labels */}
              <h1 className="font-sans font-extrabold text-gray-800 tracking-tight text-sm mb-1.5">
                Assembling Digital Environment
              </h1>
              <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest animate-pulse mb-8">
                Hariharan RG Portfolio
              </p>

              {/* Progress Track */}
              <div className="w-48 h-2.5 rounded-full bg-white border border-white/80 shadow-[inset_1px_1px_3px_rgba(163,177,198,0.2)] p-0.5 relative overflow-hidden">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 bottom-0 w-1/3 bg-clay-blue rounded-full shadow-[0_0_8px_rgba(79,142,247,0.4)]"
                />
              </div>

            </div>
          </motion.div>
        ) : (
          /* 4. Main Portfolio Website with entrance reveal */
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="min-h-screen bg-[#f0f4f8] text-gray-700 selection:bg-clay-blue selection:text-white relative overflow-x-hidden"
          >
            {/* Infinite slow-moving animated background components */}
            <Background />

            {/* Dynamic Glass Navigation */}
            <Navbar />

            {/* Main Multi-section Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* 1. Hero Section */}
              <Hero 
                onOpenResume={() => setIsResumeOpen(true)} 
                onScrollToContact={handleScrollToContact} 
              />

              {/* Elegant Section Wave Divider */}
              <div className="max-w-4xl mx-auto h-[2px] bg-white/40 shadow-inner rounded-full" />

              {/* 2. About Section with statistics counters */}
              <About />

              {/* Elegant Section Wave Divider */}
              <div className="max-w-4xl mx-auto h-[2px] bg-white/40 shadow-inner rounded-full" />

              {/* 3. Skills Section with shine sweep animations */}
              <Skills />

              {/* Elegant Section Wave Divider */}
              <div className="max-w-4xl mx-auto h-[2px] bg-white/40 shadow-inner rounded-full" />

              {/* 4. Projects Section with custom ProjectCard 3D tilts */}
              <Projects />

              {/* Elegant Section Wave Divider */}
              <div className="max-w-4xl mx-auto h-[2px] bg-white/40 shadow-inner rounded-full" />

              {/* 5. Education Section */}
              <Education />

              {/* Elegant Section Wave Divider */}
              <div className="max-w-4xl mx-auto h-[2px] bg-white/40 shadow-inner rounded-full" />

              {/* 6. Certifications Section */}
              <Certifications />

              {/* Elegant Section Wave Divider */}
              <div className="max-w-4xl mx-auto h-[2px] bg-white/40 shadow-inner rounded-full" />

              {/* 7. Contact Section with clipboard integrations */}
              <Contact />

            </main>

            {/* 8. Footer Section */}
            <footer className="py-10 bg-white/20 backdrop-blur-sm border-t border-white/60 relative overflow-hidden z-10">
              <div className="max-w-6xl mx-auto px-4 md:px-8 text-center flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Logo brand */}
                <div className="flex items-center gap-2 group">
                  <span className="font-sans font-bold text-gray-800 tracking-tight text-xs">
                    Hariharan RG Portfolio
                  </span>
                </div>

                {/* Portfolio Developer Badge */}
                <div className="text-xs font-bold text-gray-800 tracking-wider uppercase font-sans bg-white/60 px-4 py-2 rounded-full border border-white/80 shadow-[2px_2px_8px_rgba(163,177,198,0.25)] flex items-center gap-1.5">
                  <Sparkles size={13} className="text-clay-blue animate-pulse" />
                  <span>Portfolio Developed by HARIHARAN GOPINATH</span>
                </div>

                {/* Copy rights */}
                <div className="text-xs text-gray-500 font-medium font-sans">
                  © 2026 Hariharan RG. All rights reserved.
                </div>

              </div>
            </footer>

            {/* Floating Scroll to Top Pill */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  onClick={handleScrollToTop}
                  className="fixed bottom-6 right-6 p-3.5 clay-icon-btn z-40 cursor-pointer shadow-lg"
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Interactive CV Modal Portal */}
            <ResumeModal 
              isOpen={isResumeOpen} 
              onClose={() => setIsResumeOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
