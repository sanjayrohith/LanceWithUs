import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate';
}

export const StaggeredText = ({ 
  text, 
  className, 
  delay = 0,
  stagger = 0.05,
  animationType = 'fade'
}: StaggeredTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text into characters
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      return span;
    });

    container.innerHTML = '';
    chars.forEach(char => container.appendChild(char));

    // Set initial state based on animation type
    const initialState = {
      fade: { opacity: 0 },
      slide: { opacity: 0, y: 30 },
      scale: { opacity: 0, scale: 0.5 },
      rotate: { opacity: 0, rotationY: 90 }
    };

    const finalState = {
      fade: { opacity: 1 },
      slide: { opacity: 1, y: 0 },
      scale: { opacity: 1, scale: 1 },
      rotate: { opacity: 1, rotationY: 0 }
    };

    gsap.set(chars, initialState[animationType]);

    // Animate characters with stagger
    gsap.to(chars, {
      ...finalState[animationType],
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: "back.out(1.7)",
    });

  }, [text, delay, stagger, animationType]);

  return <div ref={containerRef} className={cn("inline-block", className)} />;
};