import { motion, useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";
import teamAlex from "@/assets/team-alex.jpg";
import teamrohit from "@/assets/team-rohith.jpeg"
import teamSamantha from "@/assets/team-samantha.jpg";
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
    description: "The architect of our digital dreams. Fueled by coffee and a passion for clean code.",
    image: teamrohit,
    linkedinUrl: "https://www.linkedin.com/in/sanjayrohith18/",
  },
  {
    name: "SANJAY E",
    role: "DATA ENGINEER",
    color: "border-accent/50",
    roleColor: "text-accent",
    description: "Pixel-perfect visionary who makes our solutions not just functional, but beautiful.",
    image: teamSamantha,
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
              // Removed snap-x and snap-mandatory to prevent conflict with the animation
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
          </div>
        </div>
      </div>
    </section>
  );
};