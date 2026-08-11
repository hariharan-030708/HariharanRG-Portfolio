import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, Github, Linkedin, ArrowRight, FileText, Sparkles, Code, Shield, Brain } from 'lucide-react';
import { personalInfo } from '../data';

interface HeroProps {
  onOpenResume: () => void;
  onScrollToContact: () => void;
}

const TYPING_WORDS = [
  'Java Developer',
  'Python Learner',
  'AI Enthusiast',
  'Web Developer',
  'Problem Solver'
];

export function Hero({ onOpenResume, onScrollToContact }: HeroProps) {
  // 1. Typewriter Animation Logic
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullWord = TYPING_WORDS[currentWordIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing letters
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(70);

        if (currentText === fullWord) {
          // Pause at peak
          timer = setTimeout(() => setIsDeleting(true), 1800);
          return;
        }
      } else {
        // Deleting letters
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(45);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
          setTypingSpeed(200);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  // 2. Parallax Scrolling Effect
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 120]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0.4]);

  // 3. Gentle Tilt Effect on Mouse Move
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to [-1, 1]
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Max tilt degrees: rotateY (side to side) 12deg, rotateX (up and down) 12deg
    setTilt({
      x: mouseX * 12,
      y: -mouseY * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            
            {/* Soft UI Welcome Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
              className="clay-pill px-4 py-1.5 text-xs font-semibold text-clay-blue mb-6 flex items-center gap-1.5"
            >
              <Sparkles size={12} className="animate-pulse" />
              Welcome to my digital space
            </motion.div>

            {/* Main Name Heading with reveal effect */}
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 tracking-tight leading-tight"
            >
              Hi, I'm <span className="text-clay-blue block mt-1 relative inline-block">{personalInfo.name}</span>
            </motion.h1>

            {/* B.Tech Title */}
            <motion.h2 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl font-bold text-[#4a5568] mt-4 max-w-2xl font-sans"
            >
              {personalInfo.title}
            </motion.h2>

            {/* Cycling Typewriter Container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-10 sm:h-12 mt-4 flex items-center"
            >
              <span className="text-sm sm:text-base font-mono text-gray-500 mr-2">I am a</span>
              <span className="text-lg sm:text-2xl font-extrabold text-clay-blue font-sans bg-clay-blue/5 px-3 py-1 rounded-lg border border-clay-blue/10 shadow-sm relative">
                {currentText}
                <span className="inline-block w-1.5 h-5 sm:h-6 ml-1 bg-clay-blue animate-pulse align-middle" />
              </span>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base text-gray-600 mt-6 leading-relaxed max-w-xl font-sans font-light text-justify"
            >
              "{personalInfo.shortIntro}"
            </motion.p>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 mt-8"
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn p-3.5 cursor-pointer relative overflow-hidden group"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn p-3.5 cursor-pointer relative overflow-hidden group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-icon-btn p-3.5 cursor-pointer relative overflow-hidden group"
                aria-label="Send Email via Gmail"
              >
                <Mail size={18} />
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-5 mt-10 w-full sm:w-auto"
            >
              <button
                onClick={onOpenResume}
                className="clay-btn px-8 py-4 text-xs font-extrabold w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <FileText size={16} />
                Download Resume
              </button>
              <button
                onClick={onScrollToContact}
                className="clay-btn-secondary px-8 py-4 text-xs font-extrabold w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Contact Me
                <ArrowRight size={15} />
              </button>
            </motion.div>

          </div>

          {/* Right Column - Blended Interactive Hero Image */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              style={{ y: yParallax, opacity: opacityParallax }}
              className="relative w-full max-w-[420px] aspect-[3/4]"
            >
              {/* Soft glow detrás de la imagen */}
              <div className="absolute inset-[-20px] bg-gradient-to-tr from-clay-blue/35 via-blue-200/25 to-purple-300/20 blur-3xl rounded-full opacity-70 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />

              {/* Floating Container with interactive mouse-follow tilt */}
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                  rotateX: tilt.y,
                  rotateY: tilt.x,
                  y: [0, -8, 0],
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  },
                  rotateX: { type: "spring", stiffness: 150, damping: 20 },
                  rotateY: { type: "spring", stiffness: 150, damping: 20 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-full rounded-[40px] overflow-hidden border-2 border-white/80 shadow-[15px_15px_40px_rgba(163,177,198,0.3),_inset_3px_3px_6px_white] bg-white/20 backdrop-blur-sm group"
              >
                
                {/* Developer Portrait Image with blending gradient overlay */}
                <div className="relative w-full h-full">
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[38px] transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Edges Gradient Blending Mask Overlays */}
                  {/* Bottom blend */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f0f4f8] via-[#f0f4f8]/70 to-transparent pointer-events-none" />
                  {/* Top blend */}
                  <div className="absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b from-[#f0f4f8]/40 to-transparent pointer-events-none" />
                  {/* Left blend */}
                  <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#f0f4f8]/40 to-transparent pointer-events-none" />
                  {/* Right blend */}
                  <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#f0f4f8]/40 to-transparent pointer-events-none" />
                  
                  {/* Soft vignetting to melt into design */}
                  <div className="absolute inset-0 ring-8 ring-inset ring-[#f0f4f8]/60 rounded-[38px] pointer-events-none" />
                </div>

                {/* Glassmorphic floating contextual indicator */}
                <div 
                  className="absolute bottom-10 left-6 right-6 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-md flex items-center gap-3"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ml-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-extrabold text-gray-800">Available for Opportunities</div>
                    <div className="text-[10px] font-medium text-gray-500">Internships & Technical Collaborations</div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
