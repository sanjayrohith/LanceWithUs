import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagneticHover } from '@/hooks/useMagneticHover';
import { cn } from '@/lib/utils';

interface MotionBlurCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const MotionBlurCard = ({ 
  children, 
  className, 
  delay = 0,
  direction = 'up'
}: MotionBlurCardProps) => {
  const magneticRef = useMagneticHover(0.1);

  const directionVariants = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  };

  return (
    <motion.div
      ref={magneticRef as any}
      initial={{
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.8,
        ...directionVariants[direction]
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "glass-card rounded-2xl backdrop-blur-xl transition-all duration-300",
        "hover:shadow-2xl hover:shadow-primary/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
};