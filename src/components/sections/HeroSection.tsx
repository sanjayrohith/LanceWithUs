import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/ParticleBackground";
import { TypedText } from "@/components/TypedText";
import { motion } from "framer-motion";

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
          We Build{" "}
          <span className="text-primary">Smart, Modern</span>
          <br />
          Solutions for{" "}
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
          <Button
            onClick={() => scrollToSection("contact")}
            size="lg"
            className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
          >
            Hire Us
          </Button>
          <Button
            onClick={() => scrollToSection("portfolio")}
            variant="outline"
            size="lg"
            className="glass-card border-white/20 text-foreground hover:bg-white/10 font-semibold px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
          >
            Get a Quote
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};