
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ParticleBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Floating particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-500/60 rounded-full"
          animate={{
            x: [0, Math.random() * (typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800)],
            y: [0, Math.random() * (typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600)],
            opacity: [0, 1, 0.5, 1, 0]
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%'
          }}
        />
      ))}
      
      {/* Mouse follower glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};
