import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { TypedText } from "@/components/TypedText";
import { motion } from "framer-motion";
import { StaggeredText } from "@/components/animations/StaggeredText";
import { MagneticButton } from "@/components/animations/MagneticButton";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center overflow-hidden gradient-bg"
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
  );
};