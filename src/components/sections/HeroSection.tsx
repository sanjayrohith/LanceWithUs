import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { TypedText } from "@/components/TypedText";
import { motion } from "framer-motion";
import { StaggeredText } from "@/components/animations/StaggeredText";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { HorizontalScrollStory } from "@/components/animations/HorizontalScrollStory";

const storyFrames = [
  {
    title: "Welcome to",
    subtitle: "Stellar Solutions",
    description: "Where innovation meets expertise. We are a team of passionate students creating digital experiences that matter.",
    keyword: "STELLAR",
    color: "hsl(var(--primary))"
  },
  {
    title: "Smart",
    subtitle: "Solutions for Every Challenge",
    description: "We leverage cutting-edge technologies and creative problem-solving to build applications that are both powerful and intuitive.",
    keyword: "SMART",
    color: "hsl(var(--accent))"
  },
  {
    title: "Modern",
    subtitle: "Design Meets Functionality",
    description: "Clean, responsive designs that work seamlessly across all devices, creating experiences your users will love.",
    keyword: "MODERN",
    color: "hsl(var(--stellar-cyan))"
  },
  {
    title: "Reliable",
    subtitle: "Built to Last and Scale",
    description: "Enterprise-grade solutions with robust architecture, ensuring your digital presence grows with your business.",
    keyword: "RELIABLE",
    color: "hsl(var(--stellar-green))"
  }
];

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Horizontal Scroll Story - Primary Hero Experience */}
      <HorizontalScrollStory frames={storyFrames} />
      
      {/* Traditional Hero as backup - can be removed if horizontal scroll works well */}
      <section
        id="home-traditional"
        className="relative h-screen flex items-center justify-center text-center overflow-hidden gradient-bg"
        style={{ display: 'none' }} // Hidden by default, can be shown as fallback
      >
        <ParticleBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 p-4 max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight"
          >
            <StaggeredText 
              text="We Build " 
              delay={0.5}
              animationType="slide"
            />
            <span className="text-primary">
              <StaggeredText 
                text="Smart, Modern" 
                delay={0.8}
                animationType="scale"
              />
            </span>
            <br />
            <StaggeredText 
              text="Solutions for " 
              delay={1.1}
              animationType="slide"
            />
            <TypedText
              strings={["Your Ideas.", "Your Business.", "Your Future."]}
              className="text-accent"
            />
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            A team of passionate student developers turning caffeine into code and ideas into reality.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <MagneticButton 
              onClick={() => scrollToSection("contact")}
              variant="primary"
              strength={0.2}
              className="font-semibold text-lg px-8 py-6"
            >
              Hire Us
            </MagneticButton>
            <MagneticButton 
              onClick={() => scrollToSection("portfolio")}
              variant="glass"
              strength={0.2}
              className="font-semibold text-lg px-8 py-6"
            >
              Get a Quote
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};