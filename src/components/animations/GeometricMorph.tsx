import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface GeometricMorphProps {
  className?: string;
  shapes?: ('circle' | 'square' | 'triangle' | 'hexagon' | 'star')[];
  size?: number;
  colors?: string[];
  duration?: number;
  opacity?: number;
}

export const GeometricMorph = ({
  className,
  shapes = ['circle', 'square', 'triangle', 'hexagon'],
  size = 200,
  colors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--stellar-cyan))', 'hsl(var(--stellar-pink))'],
  duration = 4,
  opacity = 0.3
}: GeometricMorphProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<SVGPathElement[]>([]);

  // Define SVG paths for different shapes
  const shapePaths = {
    circle: "M 50,50 m -25,0 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0",
    square: "M 25,25 L 75,25 L 75,75 L 25,75 Z",
    triangle: "M 50,25 L 75,75 L 25,75 Z",
    hexagon: "M 50,25 L 68,37.5 L 68,62.5 L 50,75 L 32,62.5 L 32,37.5 Z",
    star: "M 50,25 L 55,40 L 70,40 L 58,50 L 63,65 L 50,55 L 37,65 L 42,50 L 30,40 L 45,40 Z"
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    shapeRefs.current = [];

    // Create multiple morphing shapes
    const numShapes = Math.min(shapes.length, 3);
    
    for (let i = 0; i < numShapes; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      svg.setAttribute("width", size.toString());
      svg.setAttribute("height", size.toString());
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.style.position = "absolute";
      svg.style.top = `${i * -20}px`;
      svg.style.left = `${i * -20}px`;
      svg.style.opacity = opacity.toString();
      svg.style.filter = "blur(1px)";
      
      path.setAttribute("d", shapePaths[shapes[0]]);
      path.setAttribute("fill", colors[i % colors.length]);
      path.setAttribute("stroke", "none");
      
      svg.appendChild(path);
      container.appendChild(svg);
      shapeRefs.current.push(path);
    }

    // Create morphing animation timeline
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });

    shapeRefs.current.forEach((path, index) => {
      const shapeSequence = [...shapes];
      
      shapeSequence.forEach((shape, shapeIndex) => {
        timeline.to(path, {
          duration: duration / shapes.length,
          attr: { d: shapePaths[shape] },
          ease: "power2.inOut",
          delay: index * 0.2
        }, shapeIndex * (duration / shapes.length));
      });

      // Add rotation and scale variations
      timeline.to(path.parentElement, {
        rotation: 360,
        scale: 1.1,
        duration: duration * shapes.length,
        ease: "none",
        repeat: -1,
        yoyo: true
      }, 0);
    });

    return () => {
      timeline.kill();
      // Clean up DOM elements
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [shapes, size, colors, duration, opacity]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative pointer-events-none select-none",
        className
      )}
      style={{ width: size, height: size }}
    />
  );
};