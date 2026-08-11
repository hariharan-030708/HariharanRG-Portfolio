import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  key?: string | number | null;
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  distance?: number;
  className?: string;
  staggerChildren?: boolean;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  distance = 35,
  className = '',
  staggerChildren = false,
}: ScrollRevealProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom easeOutExpo for fluid, premium aesthetic
        staggerChildren: staggerChildren ? 0.1 : undefined,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-80px' }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
