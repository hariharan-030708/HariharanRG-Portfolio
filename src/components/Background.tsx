import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function Background() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on client-side
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * -20,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Self-contained CSS Animations for hardware-accelerated 60fps movement */}
      <style>{`
        @keyframes float-blob-1 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); border-radius: 50% 40% 60% 40% / 40% 50% 30% 60%; }
          33% { transform: translate(40px, -50px) scale(1.1) rotate(120deg); border-radius: 40% 60% 50% 50% / 50% 40% 60% 40%; }
          66% { transform: translate(-30px, 40px) scale(0.9) rotate(240deg); border-radius: 60% 40% 40% 60% / 40% 60% 50% 50%; }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); border-radius: 50% 40% 60% 40% / 40% 50% 30% 60%; }
        }
        @keyframes float-blob-2 {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); border-radius: 40% 60% 50% 50% / 50% 40% 60% 40%; }
          50% { transform: translate(-50px, 40px) scale(1.2) rotate(180deg); border-radius: 50% 50% 60% 40% / 40% 60% 40% 50%; }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); border-radius: 40% 60% 50% 50% / 50% 40% 60% 40%; }
        }
        @keyframes slow-drift {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.5; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.2; }
        }
        @keyframes floating-circle {
          0% { transform: translateY(100vh) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) translateX(50px) scale(1.2); opacity: 0; }
        }
        @keyframes particle-rise {
          0% { transform: translateY(105%) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-5%) translateX(20px); opacity: 0; }
        }
        .animate-blob-1 {
          animation: float-blob-1 25s infinite ease-in-out;
        }
        .animate-blob-2 {
          animation: float-blob-2 30s infinite ease-in-out;
        }
        .animate-drift-slow {
          animation: slow-drift 18s infinite ease-in-out;
        }
        .animate-floating-circle-1 {
          animation: floating-circle 45s infinite linear;
        }
        .animate-floating-circle-2 {
          animation: floating-circle 35s infinite linear;
        }
      `}</style>

      {/* 1. Gradient Mesh Background Base */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f4f8] via-[#e6effc] to-[#eef4fc]" />

      {/* 2. Floating Blurred Blobs with smooth pastel colors */}
      <div 
        className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-[#bfdbfe]/30 to-[#a5f3fc]/20 blur-[80px] animate-blob-1 pointer-events-none"
      />
      <div 
        className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-gradient-to-br from-[#c084fc]/15 to-[#e0f2fe]/20 blur-[90px] animate-blob-2 pointer-events-none"
      />
      <div 
        className="absolute top-[45%] left-[30%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-gradient-to-br from-[#fbcfe8]/10 to-[#fed7aa]/10 blur-[100px] animate-blob-1 pointer-events-none"
        style={{ animationDelay: '-8s' }}
      />

      {/* 3. Moving Gradient Lights */}
      <div 
        className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-300/10 blur-[120px] animate-pulse"
        style={{ animationDuration: '12s' }}
      />
      <div 
        className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-indigo-300/10 blur-[140px] animate-pulse"
        style={{ animationDuration: '16s', animationDelay: '-4s' }}
      />

      {/* 4. Glassmorphism Floating Circles */}
      <div 
        className="absolute left-[5%] bottom-[-100px] w-24 h-24 rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),_0_8px_16px_rgba(0,0,0,0.02)] animate-floating-circle-1"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute right-[15%] bottom-[-100px] w-36 h-36 rounded-full border border-white/50 bg-white/5 backdrop-blur-[3px] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),_0_8px_16px_rgba(0,0,0,0.02)] animate-floating-circle-2"
        style={{ animationDelay: '12s' }}
      />
      <div 
        className="absolute left-[45%] bottom-[-100px] w-16 h-16 rounded-full border border-white/30 bg-white/8 backdrop-blur-[1px] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),_0_8px_16px_rgba(0,0,0,0.02)] animate-floating-circle-1"
        style={{ animationDelay: '25s' }}
      />

      {/* 5. Animated Geometric Shapes */}
      <div className="absolute top-[15%] right-[10%] opacity-[0.12] animate-drift-slow pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#4F8EF7" strokeWidth="1.5">
          <polygon points="30,5 55,50 5,50" />
        </svg>
      </div>
      <div className="absolute bottom-[25%] left-[8%] opacity-[0.15] animate-drift-slow pointer-events-none" style={{ animationDelay: '-5s' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="#a0c4ff" strokeWidth="1.5">
          <rect x="5" y="5" width="40" height="40" rx="10" />
        </svg>
      </div>

      {/* 6. Smooth Moving Waves (using elegant SVG path vectors in bottom-most layer) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="#4F8EF7" 
            fillOpacity="0.15" 
            d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,213.3C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            style={{
              animation: 'wave-move 20s infinite linear',
              transformOrigin: 'center bottom',
            }}
          />
        </svg>
      </div>

      {/* 7. Tiny Glowing Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-blue-400/40 blur-[1px] pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `particle-rise ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
