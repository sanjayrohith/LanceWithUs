import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Smartphone,
  BrainCircuit,
  Figma,
  TrendingUp,
  FileText,
  ShoppingCart,
  BarChart4,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { StaggeredText } from "@/components/animations/StaggeredText";

// Updated services array with 10 services
const services = [
  // Original Services
  {
    icon: Code2,
    title: "Web Development",
    description: "Building responsive, high-performance websites from scratch.",
    color: "text-accent",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Creating intuitive mobile applications for iOS and Android.",
    color: "text-primary",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    description:
      "Leveraging machine learning to build smart, automated systems.",
    color: "text-stellar-pink",
  },
  {
    icon: Figma,
    title: "UI/UX Design",
    description: "Designing user-centric interfaces that are a joy to use.",
    color: "text-stellar-yellow",
  },
  // New Services
  {
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    description:
      "SEO, social media marketing, content marketing, and PPC advertising.",
    color: "text-stellar-green",
  },
  {
    icon: FileText,
    title: "Content Creation",
    description:
      "Copywriting, blog writing, video editing, and graphic design.",
    color: "text-stellar-cyan",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description:
      "Shopify/WooCommerce development and online marketplace optimization.",
    color: "text-accent",
  },
  {
    icon: BarChart4,
    title: "Data Analytics & Automation",
    description:
      "Business intelligence, workflow automation, and data visualization.",
    color: "text-primary",
  },
  {
    icon: Briefcase,
    title: "Consulting Services",
    description:
      "Business strategy, digital transformation, and technical consulting.",
    color: "text-stellar-pink",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Testing, code reviews, and performance optimization.",
    color: "text-stellar-yellow",
  },
];

const CARD_DURATION = 3000; // 3 seconds

export const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect for auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, CARD_DURATION);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const cardVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      rotateY: 90,
      transition: { duration: 0.5 },
    }),
    animate: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      rotateY: -90,
      transition: { duration: 0.5, ease: "easeIn" },
    }),
  };

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    if (offset > 100) { // Dragged right
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    } else if (offset < -100) { // Dragged left
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
  };


  const currentService = services[currentIndex];
  const Icon = currentService.icon;

  return (
    <section id="services" className="py-20 sm:py-32 bg-background/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Card Carousel */}
        <div className="relative h-[250px] w-full max-w-lg mx-auto" style={{ perspective: "1000px" }}>
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              custom={1}
              initial="initial"
              animate="animate"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute w-full h-full p-6 cursor-grab active:cursor-grabbing bg-background/30 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 flex flex-col items-center justify-center text-center"
            >
              <div className="mb-4">
                <Icon size={48} className={`${currentService.color} transition-colors duration-300`} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2 transition-colors">
                {currentService.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {currentService.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-accent scale-125' : 'bg-muted-foreground/50'
              }`}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};