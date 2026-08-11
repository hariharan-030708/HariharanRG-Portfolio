import { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Maintain position coordinates without React state trigger for absolute smoothness
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device or screen size too small
    const checkDevice = () => {
      const mobile = 
        window.matchMedia('(max-width: 768px)').matches || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev.slice(-3), newRipple]); // Limit max ripples in memory
    };

    // Hover state detection for expanding cursor
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = target.tagName === 'A' || target.closest('a');
      const isBtn = 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('.clay-btn') || 
        target.closest('.clay-btn-secondary') || 
        target.closest('.clay-icon-btn') ||
        target.closest('.cursor-pointer-hover');

      setIsHoveringLink(!!isLink);
      setIsHoveringButton(!!isBtn);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    window.addEventListener('mouseover', handleMouseOver);

    // Magnetic Attraction Logic
    const magneticElements = document.querySelectorAll('.clay-btn, .clay-btn-secondary, .clay-icon-btn, .clay-card');
    
    const elementListeners: Array<{
      element: Element;
      onMove: (e: Event) => void;
      onLeave: () => void;
    }> = [];

    magneticElements.forEach((el) => {
      const element = el as HTMLElement;
      
      const onMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = element.getBoundingClientRect();
        
        // Calculate relative position inside the element
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;

        // Pull the actual button/card slightly towards the mouse (magnetic pull)
        const pullFactor = element.classList.contains('clay-card') ? 0.08 : 0.25;
        element.style.transform = `translate(${x * pullFactor}px, ${y * pullFactor}px)`;
        
        // Squeeze style/shadow to enhance soft UI feeling
        element.style.boxShadow = '0 15px 30px rgba(79, 142, 247, 0.15)';
      };

      const onLeave = () => {
        element.style.transform = '';
        element.style.boxShadow = '';
      };

      element.addEventListener('mousemove', onMove);
      element.addEventListener('mouseleave', onLeave);

      elementListeners.push({ element, onMove, onLeave });
    });

    // RAF smooth cursor movement loop
    let animationFrameId: number;
    const render = () => {
      // Lerp (Linear Interpolation) for sluggish follow feel
      // Dot is fast
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.35;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.35;

      // Ring is slower
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);

      // Cleanup magnetic listeners
      elementListeners.forEach(({ element, onMove, onLeave }) => {
        element.removeEventListener('mousemove', onMove);
        element.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [isMobile]);

  // Clean up ripples when animation ends
  const handleRippleEnd = (id: number) => {
    setRipples(prev => prev.filter(r => r.id !== id));
  };

  if (isMobile) return null;

  return (
    <>
      <style>{`
        .custom-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
        }
        .cursor-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #4F8EF7;
          border-radius: 50%;
          transition: background-color 0.3s, scale 0.3s;
          box-shadow: 0 0 10px rgba(79, 142, 247, 0.6);
        }
        .cursor-ring {
          position: absolute;
          width: 36px;
          height: 36px;
          border: 2px solid rgba(79, 142, 247, 0.45);
          background-color: rgba(79, 142, 247, 0.02);
          border-radius: 50%;
          transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s;
          box-shadow: inset 0 0 4px rgba(255, 255, 255, 0.8);
        }
        .cursor-hovering-link .cursor-ring {
          background-color: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.85);
          width: 48px;
          height: 48px;
          transform: translate(-24px, -24px);
        }
        .cursor-hovering-link .cursor-dot {
          background-color: rgb(239, 68, 68);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
        }
        .cursor-hovering-btn .cursor-ring {
          background-color: rgba(79, 142, 247, 0.12);
          border-color: rgba(79, 142, 247, 0.95);
          width: 44px;
          height: 44px;
          transform: translate(-22px, -22px);
          scale: 1.15;
        }
        .cursor-hovering-btn .cursor-dot {
          scale: 1.5;
        }
        .click-ripple {
          position: absolute;
          border: 2px solid #4F8EF7;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          transform: translate(-50%, -50%);
          animation: ripple-grow 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
          pointer-events: none;
        }
        @keyframes ripple-grow {
          0% {
            width: 12px;
            height: 12px;
            opacity: 1;
            border-color: #4F8EF7;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
            border-color: rgba(79, 142, 247, 0.1);
          }
        }
      `}</style>

      <div className={`custom-cursor-container ${isHoveringLink ? 'cursor-hovering-link' : ''} ${isHoveringButton ? 'cursor-hovering-btn' : ''}`}>
        {/* Cursor ring */}
        <div ref={ringRef} className="cursor-ring" />
        
        {/* Inner glowing dot */}
        <div ref={dotRef} className="cursor-dot" />

        {/* Dynamic Ripples */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="click-ripple"
            style={{ left: ripple.x, top: ripple.y }}
            onAnimationEnd={() => handleRippleEnd(ripple.id)}
          />
        ))}
      </div>
    </>
  );
}
