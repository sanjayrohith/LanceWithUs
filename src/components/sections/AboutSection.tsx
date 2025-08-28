import { motion, useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";
import teamAlex from "@/assets/team-alex.jpg";
import teamrohit from "@/assets/team-rohith.jpeg"
import teamsanjay from "@/assets/team-sanjay.jpg";

import teamsandeep from "@/assets/team-sandep.jpg";
import teamMike from "@/assets/team-mike.jpg";
import { MotionBlurCard } from "@/components/animations/MotionBlurCard";
import { StaggeredText } from "@/components/animations/StaggeredText";

const teamMembers = [
  {
    name: "SANJAY ROHITH L",
    role: "Lead Developer",
    color: "border-primary/50",
    roleColor: "text-primary",
    description: "I design, build, and ship full-stack applications — while leading teams to deliver high-quality software.",
    image: teamrohit,
    linkedinUrl: "https://www.linkedin.com/in/sanjayrohith18/",
  },
  {
    name: "SANJAY E",
    role: "DATA ENGINEER",
    color: "border-accent/50",
    roleColor: "text-accent",
    description: "Pixel-perfect visionary who makes our solutions not just functional, but beautiful.",
    image: teamsanjay,
    linkedinUrl: "https://www.linkedin.com/in/sanjayelango06/",
  },
  {
    name: "SANDEEP KUMAR",
    role: "AI & ML Specialist",
    color: "border-stellar-pink/50",
    roleColor: "text-stellar-pink",
    description: "Our resident genius, teaching machines to think so you don't have to.",
    image: teamsandeep,
    linkedinUrl: "https://www.linkedin.com/in/sandeep-kumaar-12a00731a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Abishek Raj",
    role: "AI & ML Specialist",
    color: "border-stellar-pink/50",
    roleColor: "text-stellar-pink",
    description: "Our resident genius, teaching machines to think so you don't have to.",
    image: teamMike,
    linkedinUrl: "https://www.linkedin.com/in/abishek-raj-a2aa39318/",
  }
];

export const AboutSection = () => {
  const [scope, animate] = useAnimate();
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const slider = scope.current;
    if (!slider || slider.children.length === 0) return;

    const startAutoScroll = () => {
        intervalRef.current = setInterval(() => {
        currentIndexRef.current = (currentIndexRef.current + 1) % teamMembers.length;
        
        const cardWidth = slider.children[0].offsetWidth;
        const gap = 32;

        const nextScrollLeft = currentIndexRef.current * (cardWidth + gap);

        animate(
          slider, 
          { scrollLeft: nextScrollLeft }, 
          { duration: 0.7, ease: "easeInOut" }
        );
      }, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(intervalRef.current);
    };

    startAutoScroll();

    slider.addEventListener('mousedown', stopAutoScroll);
    slider.addEventListener('touchstart', stopAutoScroll);
    slider.addEventListener('wheel', stopAutoScroll);

    return () => {
      stopAutoScroll();
      slider.removeEventListener('mousedown', stopAutoScroll);
      slider.removeEventListener('touchstart', stopAutoScroll);
      slider.removeEventListener('wheel', stopAutoScroll);
    };
  }, [animate, scope]);

  return (
    <section id="about" className="py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              <StaggeredText text="From " delay={0.2} animationType="slide" />
              <span className="text-primary">
                <StaggeredText text="Vision" delay={0.4} animationType="scale" />
              </span>
              <StaggeredText text=" to " delay={0.6} animationType="slide" />
              <span className="text-accent">
                <StaggeredText text="Value" delay={0.8} animationType="rotate" />
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Meet the team turning ideas into reality.
            </p>
          </motion.div>

          <div className="relative w-full">
            <div 
              ref={scope}
              className="flex overflow-x-auto space-x-8 py-4"
              style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
            >
              {teamMembers.map((member, index) => (
                <div key={member.name} className="flex-shrink-0">
                  <MotionBlurCard
                    delay={index * 0.1}
                    direction={'up'}
                    className="p-6 text-center group w-72 h-full"
                  >
                    <div className="relative mb-4">
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name}'s LinkedIn Profile`}
                        className="cursor-pointer"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className={`w-24 h-24 rounded-full mx-auto border-4 ${member.color} transform group-hover:scale-110 transition-transform duration-300 object-cover`}
                        />
                        <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className={`${member.roleColor} font-semibold mb-3`}>
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </MotionBlurCard>
                </div>
              ))}
            </div>
            {/* Symbolic horizontal scroll indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 flex items-center justify-center">
              <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
                <defs>
                  <linearGradient id="scroll-gradient" x1="0" y1="16" x2="48" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="0.5" stopColor="#06B6D4" />
                    <stop offset="1" stopColor="#10B981" />
                  </linearGradient>
                  <filter id="scroll-glow" x="-4" y="-4" width="56" height="40" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="3" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#scroll-glow)">
                  {/* Double arrow pattern suggesting horizontal movement */}
                  <path d="M8 16 L16 16" stroke="url(#scroll-gradient)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M12 12 L16 16 L12 20" stroke="url(#scroll-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  <path d="M20 16 L28 16" stroke="url(#scroll-gradient)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M24 12 L28 16 L24 20" stroke="url(#scroll-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  <path d="M32 16 L40 16" stroke="url(#scroll-gradient)" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M36 12 L40 16 L36 20" stroke="url(#scroll-gradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Subtle dots indicating more content */}
                  <circle cx="42" cy="16" r="1.5" fill="url(#scroll-gradient)" opacity="0.7" />
                  <circle cx="45" cy="16" r="1" fill="url(#scroll-gradient)" opacity="0.5" />
                </g>
                <animateTransform attributeName="transform" type="translate" values="0 0; 6 0; 0 0" dur="2s" repeatCount="indefinite" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
/*Implement the following:

🌟 Features:

Hero: Floating particles with mouse-following glow
About: Rotating geometric shapes in brand colors
Services: Matrix-style code rain effect
Portfolio: Gradient waves with floating orbs
Contact: Animated network connections
🔄 Smooth Transitions:

1.2-second fade transitions between backgrounds
IntersectionObserver detects section changes
No jarring background switches
🎨 Visual Appeal:

Each background matches section content
Subtle animations that don't distract
Consistent brand colors throughout
The backgrounds will automatically transition as you scroll between sections. */