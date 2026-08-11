import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { personalInfo } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link detector based on section offsets
      const scrollPosition = window.scrollY + 150;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <header className={`fixed top-4 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8`}>
      <nav
        className={`max-w-7xl mx-auto transition-all duration-300 rounded-3xl ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-md py-3 px-6 shadow-lg border border-white/80' 
            : 'bg-white/40 backdrop-blur-sm py-4 px-6 border border-white/40'
        }`}
        style={{
          boxShadow: scrolled 
            ? '8px 8px 20px rgba(163, 177, 198, 0.25), -8px -8px 20px rgba(255, 255, 255, 0.8), inset 2px 2px 4px rgba(255, 255, 255, 0.9)'
            : '4px 4px 10px rgba(163, 177, 198, 0.1), -4px -4px 10px rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-sans font-bold text-gray-800 text-lg tracking-tight flex items-center">
              HRG<span className="text-clay-blue">.</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/30 p-1 rounded-2xl border border-white/40">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-4 py-2.5 text-xs font-bold rounded-xl transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-clay-blue' : 'text-gray-600 hover:text-clay-blue'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/95 rounded-xl shadow-[2px_2px_6px_rgba(163,177,198,0.2),_inset_1px_1px_2px_white] border border-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-1.5 left-4 right-4 h-[2px] bg-clay-blue rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Call to Action Desktop */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleLinkClick('contact')}
              className="clay-btn px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={13} />
              Let's Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden clay-icon-btn p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-4 right-4 clay-card p-6 flex flex-col gap-3 z-50"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-5 py-3 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-clay-blue text-white'
                      : 'text-gray-600 bg-white/30 hover:bg-white/60 hover:text-clay-blue'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <button
              onClick={() => handleLinkClick('contact')}
              className="clay-btn w-full py-3 text-xs font-bold flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <Sparkles size={14} />
              Let's Connect
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
