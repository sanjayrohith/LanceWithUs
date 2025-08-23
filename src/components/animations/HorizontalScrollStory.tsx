import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { StaggeredText } from './StaggeredText';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface StoryFrame {
  title: string;
  subtitle: string;
  description: string;
  keyword: string;
  color: string;
}

interface HorizontalScrollStoryProps {
  frames: StoryFrame[];
  className?: string;
}

export const HorizontalScrollStory = ({
  frames,
  className
}: HorizontalScrollStoryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scrollContainer = scrollRef.current;

    // Set up horizontal scroll animation
    const scrollTween = gsap.to(scrollContainer, {
      x: () => -(scrollContainer.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollContainer.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Animate individual frames
    const frames = scrollContainer.querySelectorAll('.story-frame');
    frames.forEach((frame, index) => {
      const keyword = frame.querySelector('.story-keyword');
      const title = frame.querySelector('.story-title');
      const description = frame.querySelector('.story-description');

      // Frame entrance animation
      gsap.fromTo(frame, 
        { 
          scale: 0.8,
          opacity: 0,
          rotationY: 30
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frame,
            start: "left 80%",
            end: "left 20%",
            scrub: 1,
            containerAnimation: scrollTween,
          }
        }
      );

      // Keyword zoom effect
      if (keyword) {
        gsap.fromTo(keyword,
          {
            scale: 0.5,
            opacity: 0,
            rotationX: -90
          },
          {
            scale: 1,
            opacity: 1,
            rotationX: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: frame,
              start: "left 60%",
              end: "left 40%",
              scrub: 1,
              containerAnimation: scrollTween,
            }
          }
        );
      }

      // Content stagger animation
      if (title && description) {
        gsap.fromTo([title, description],
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: frame,
              start: "left 50%",
              end: "left 30%",
              scrub: 1,
              containerAnimation: scrollTween,
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [frames]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ height: "100vh" }}
    >
      <div
        ref={scrollRef}
        className="flex items-center h-full"
        style={{ width: `${frames.length * 100}vw` }}
      >
        {frames.map((frame, index) => (
          <div
            key={index}
            className="story-frame flex-shrink-0 w-screen h-full flex items-center justify-center relative"
          >
            {/* Background gradient based on frame color */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${frame.color}40, transparent 70%)`
              }}
            />
            
            {/* Content */}
            <div className="container mx-auto px-8 text-center relative z-10">
              {/* Large keyword */}
              <div 
                className="story-keyword text-8xl md:text-9xl font-black opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
                style={{ color: frame.color }}
              >
                {frame.keyword}
              </div>
              
              {/* Main content */}
              <div className="relative z-20">
                <div className="story-title mb-4">
                  <StaggeredText
                    text={frame.title}
                    className="text-4xl md:text-6xl font-bold"
                    animationType="scale"
                    stagger={0.1}
                  />
                </div>
                
                <div className="story-subtitle mb-6">
                  <StaggeredText
                    text={frame.subtitle}
                    className="text-xl md:text-2xl text-muted-foreground"
                    animationType="slide"
                    stagger={0.05}
                    delay={0.3}
                  />
                </div>
                
                <div className="story-description mb-8 max-w-2xl mx-auto">
                  <p className="text-lg leading-relaxed opacity-80">
                    {frame.description}
                  </p>
                </div>

                {/* Call to action for last frame */}
                {index === frames.length - 1 && (
                  <div className="story-cta">
                    <MagneticButton
                      variant="primary"
                      onClick={() => scrollToSection('about')}
                      className="mr-4"
                    >
                      Explore Our Work
                    </MagneticButton>
                    <MagneticButton
                      variant="glass"
                      onClick={() => scrollToSection('contact')}
                    >
                      Start Your Project
                    </MagneticButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center items-start">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </div>
  );
};