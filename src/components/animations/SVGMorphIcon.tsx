import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface SVGMorphIconProps {
  morphPaths: string[];
  className?: string;
  size?: number;
  strokeWidth?: number;
  animationDuration?: number;
  loop?: boolean;
  trigger?: 'hover' | 'auto' | 'visible';
}

export const SVGMorphIcon = ({
  morphPaths,
  className,
  size = 48,
  strokeWidth = 2,
  animationDuration = 2,
  loop = true,
  trigger = 'auto'
}: SVGMorphIconProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!pathRef.current || morphPaths.length < 2) return;

    const path = pathRef.current;
    const timeline = gsap.timeline({ 
      repeat: loop ? -1 : 0,
      yoyo: loop,
      paused: trigger !== 'auto'
    });

    // Set initial path
    gsap.set(path, { attr: { d: morphPaths[0] } });

    // Create morph sequence
    morphPaths.slice(1).forEach((targetPath, index) => {
      timeline.to(path, {
        duration: animationDuration,
        attr: { d: targetPath },
        ease: "power2.inOut",
        delay: index === 0 ? 0.5 : 0
      });
    });

    timelineRef.current = timeline;

    // Handle different triggers
    if (trigger === 'visible') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeline.play();
          }
        },
        { threshold: 0.5 }
      );

      if (svgRef.current) {
        observer.observe(svgRef.current);
      }

      return () => observer.disconnect();
    }

    return () => {
      timeline.kill();
    };
  }, [morphPaths, animationDuration, loop, trigger]);

  const handleMouseEnter = () => {
    if (trigger === 'hover' && timelineRef.current) {
      timelineRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && timelineRef.current) {
      timelineRef.current.reverse();
    }
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("transition-all duration-300", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <path
        ref={pathRef}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};