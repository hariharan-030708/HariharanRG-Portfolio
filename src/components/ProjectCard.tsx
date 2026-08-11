import { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Github, Play } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string;
  project: Project;
  index: number;
  onLiveDemoClick: (project: Project, e: any) => void;
}

export function ProjectCard({ project, index, onLiveDemoClick }: ProjectCardProps) {
  // 3D tilt effect states
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates to range [-1, 1]
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Max tilt is 8 degrees
    setTilt({
      x: mouseX * 8,
      y: -mouseY * 8
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
        // Add a gentle floating animation when NOT hovered; when hovered, it sits in 3D tilt
        y: isHovered ? -4 : [0, -6, 0]
      }}
      transition={{
        y: isHovered 
          ? { type: 'spring', stiffness: 300, damping: 25 }
          : { repeat: Infinity, duration: 6, ease: "easeInOut", delay: index * 0.5 },
        rotateX: { type: 'spring', stiffness: 200, damping: 20 },
        rotateY: { type: 'spring', stiffness: 200, damping: 20 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className="clay-card overflow-hidden flex flex-col transition-all duration-300 relative group border border-white/60 hover:border-clay-blue/40 h-full"
    >
      {/* 1. Animated glowing gradient border on hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-tr from-clay-blue/30 via-transparent to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[30px] pointer-events-none -z-10`} 
      />

      {/* 2. Glass Reflection Overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-[30px] pointer-events-none">
        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[150%]" />
      </div>

      {/* Project Image Panel */}
      <div className="h-48 md:h-56 relative overflow-hidden bg-gray-100/50 rounded-t-[30px]" style={{ transform: 'translateZ(10px)' }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-[10px] font-semibold bg-clay-blue/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            Click Live Demo to interact
          </span>
        </div>
      </div>

      {/* Project Details Panel */}
      <div className="p-6 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(15px)' }}>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-clay-blue transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed text-justify h-20 overflow-y-auto pr-1 font-sans font-light">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] font-mono font-semibold text-gray-500 bg-white/90 border border-white/80 hover:border-clay-blue/30 hover:text-clay-blue px-2.5 py-0.5 rounded-lg shadow-[2px_2px_4px_rgba(163,177,198,0.1),_inset_1px_1px_1px_white] transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions with magnets */}
        <div className="flex items-center gap-3 mt-6">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="clay-btn-secondary px-4 py-2.5 text-xs font-extrabold flex-1 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white transition-all duration-300 shadow-sm"
          >
            <Github size={14} />
            GitHub
          </a>
          <button
            onClick={(e) => onLiveDemoClick(project, e)}
            className="clay-btn px-4 py-2.5 text-xs font-extrabold flex-1 flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 shadow-md"
          >
            <Play size={12} fill="white" />
            Live Demo
          </button>
        </div>
      </div>
    </motion.div>
  );
}
