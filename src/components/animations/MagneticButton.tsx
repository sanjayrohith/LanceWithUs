import { ReactNode } from 'react';
import { useMagneticHover } from '@/hooks/useMagneticHover';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  variant?: 'primary' | 'secondary' | 'glass';
}

export const MagneticButton = ({ 
  children, 
  className, 
  onClick, 
  href,
  strength = 0.15,
  variant = 'primary'
}: MagneticButtonProps) => {
  const magneticRef = useMagneticHover(strength);

  const baseClasses = "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 neon-glow",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20",
    glass: "glass-card text-foreground hover:bg-white/10"
  };

  const combinedClasses = cn(baseClasses, variants[variant], className);

  if (href) {
    return (
      <a
        ref={magneticRef as any}
        href={href}
        className={combinedClasses}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={magneticRef as any}
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};