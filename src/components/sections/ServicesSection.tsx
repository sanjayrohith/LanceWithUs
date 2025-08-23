import { motion } from "framer-motion";
import { Code2, Smartphone, BrainCircuit, Figma } from "lucide-react";
import { MotionBlurCard } from "@/components/animations/MotionBlurCard";
import { StaggeredText } from "@/components/animations/StaggeredText";
import { SVGMorphIcon } from "@/components/animations/SVGMorphIcon";
import { GeometricMorph } from "@/components/animations/GeometricMorph";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building responsive, high-performance websites from scratch.",
    color: "text-accent",
    hoverColor: "hover:shadow-neon-cyan",
    morphPaths: [
      "M16 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8 7h8M8 11h8M8 15h6",
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    ]
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Creating intuitive mobile applications for iOS and Android.",
    color: "text-primary",
    hoverColor: "hover:shadow-neon-purple",
    morphPaths: [
      "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 6h10M7 18h10",
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      "M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM5 12h14"
    ]
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    description: "Leveraging machine learning to build smart, automated systems.",
    color: "text-stellar-pink",
    hoverColor: "hover:shadow-xl hover:shadow-pink-500/20",
    morphPaths: [
      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
      "M12 2v20M2 12h20M6.34 6.34l11.32 11.32M17.66 6.34L6.34 17.66"
    ]
  },
  {
    icon: Figma,
    title: "UI/UX Design",
    description: "Designing user-centric interfaces that are a joy to use.",
    color: "text-stellar-yellow",
    hoverColor: "hover:shadow-xl hover:shadow-yellow-500/20",
    morphPaths: [
      "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z",
      "M3 12h18m-9-9v18m-6-6l12-12M9 3l12 12",
      "M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2z"
    ]
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 sm:py-32 bg-background/20 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute top-20 right-10 opacity-30">
        <GeometricMorph 
          shapes={['circle', 'hexagon', 'star']}
          size={150}
          colors={['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--stellar-cyan))']}
          duration={6}
        />
      </div>
      <div className="absolute bottom-20 left-10 opacity-20">
        <GeometricMorph 
          shapes={['triangle', 'square', 'circle']}
          size={120}
          colors={['hsl(var(--stellar-pink))', 'hsl(var(--stellar-green))']}
          duration={8}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            <StaggeredText text="What We " delay={0.2} animationType="slide" />
            <span className="text-accent">
              <StaggeredText text="Offer" delay={0.4} animationType="scale" />
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Crafting solutions for the modern web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <MotionBlurCard
                key={service.title}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'up' : 'down'}
                className={`p-6 cursor-pointer group ${service.hoverColor}`}
              >
                <div className="mb-4 flex justify-center">
                  <SVGMorphIcon
                    morphPaths={service.morphPaths}
                    size={48}
                    className={`${service.color} group-hover:scale-110 transition-all duration-300`}
                    trigger="hover"
                    animationDuration={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </MotionBlurCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};