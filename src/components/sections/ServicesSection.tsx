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

// Assuming StaggeredText is in a separate file, e.g., @/components/animations/StaggeredText
const StaggeredText = ({ text, ...props }) => {
  // A fallback implementation for demonstration
  return (
    <span {...props}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03, duration: 0.5 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Services array (unchanged)
const services = [
  { icon: Code2, title: "Web Development", description: "Building responsive, high-performance websites from scratch.", color: "text-accent", },
  { icon: Smartphone, title: "App Development", description: "Creating intuitive mobile applications for iOS and Android.", color: "text-primary", },
  { icon: BrainCircuit, title: "AI Integration", description: "Leveraging machine learning to build smart, automated systems.", color: "text-stellar-pink", },
  { icon: Figma, title: "UI/UX Design", description: "Designing user-centric interfaces that are a joy to use.", color: "text-stellar-yellow", },
  { icon: TrendingUp, title: "Digital Marketing & SEO", description: "SEO, social media marketing, content marketing, and PPC advertising.", color: "text-stellar-green", },
  { icon: FileText, title: "Content Creation", description: "Copywriting, blog writing, video editing, and graphic design.", color: "text-stellar-cyan", },
  { icon: ShoppingCart, title: "E-commerce Solutions", description: "Shopify/WooCommerce development and online marketplace optimization.", color: "text-accent", },
  { icon: BarChart4, title: "Data Analytics & Automation", description: "Business intelligence, workflow automation, and data visualization.", color: "text-primary", },
  { icon: Briefcase, title: "Consulting Services", description: "Business strategy, digital transformation, and technical consulting.", color: "text-stellar-pink", },
  { icon: ShieldCheck, title: "Quality Assurance", description: "Testing, code reviews, and performance optimization.", color: "text-stellar-yellow", },
];

// Autoplay duration (unchanged)
const CARD_DURATION = 7000;

// ServiceCard component (unchanged)
const ServiceCard = ({ service }) => {
  if (!service) return null;
  const Icon = service.icon;
  return (
    <div className="w-full h-full p-10 sm:p-12 bg-background/30 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-white/10 flex flex-col items-center justify-center text-center">
      <div className="mb-6">
        <Icon size={64} className={`${service.color} transition-colors duration-300`} />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
        {service.description}
      </p>
    </div>
  );
};

export const ServicesSection = () => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const paginate = (newDirection: number) => {
    setPage(([idx]) => [idx + newDirection * 2, newDirection]);
  };

  const goToService = (serviceIndex: number) => {
    const currentPairedIndex = Math.floor(currentIndex / 2) * 2;
    if (serviceIndex === currentPairedIndex) return;

    const newDirection = serviceIndex > currentIndex ? 1 : -1;
    setPage([serviceIndex, newDirection]);
  };

  // Autoplay (logic unchanged)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      paginate(1);
    }, CARD_DURATION);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  // Animation variants (unchanged)
  const slideVariants = {
    initial: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }),
  };
  const tileVariants = {
    initial: { opacity: 0, y: 18 },
    animate: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.4 } }),
  };

  // Drag handler (logic unchanged)
  const handleDragEnd = (_event, info) => {
    const offset = info.offset.x;
    if (offset > 120) paginate(-1);
    else if (offset < -120) paginate(1);
  };

  // Index and page calculation (unchanged)
  const leftCardIndex = (currentIndex % services.length + services.length) % services.length;
  const rightCardIndex = (leftCardIndex + 1) % services.length;
  const numPages = Math.ceil(services.length / 2);
  const activePageIndex = Math.floor(leftCardIndex / 2);

  return (
    <section id="services" className="py-24 sm:py-36 bg-background/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section (unchanged) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            <StaggeredText text="What We " />
            <span className="text-accent">
              <StaggeredText text="Offer" />
            </span>
          </h2>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground">
            Crafting solutions for the modern web.
          </p>
        </motion.div>

        {/* MODIFIED: Taller + wider carousel container */}
        <div
          className="relative h-[450px] md:h-[500px] w-full max-w-[1300px] mx-auto overflow-hidden" // Changed h-[380px] to h-[450px], md:h-[420px] to md:h-[500px], and max-w-[1100px] to max-w-[1300px]
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={Math.floor(currentIndex / 2)}
              variants={slideVariants}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 cursor-grab active:cursor-grabbing"
            >
              {/* LEFT tile (index 0) */}
              <motion.div variants={tileVariants} initial="initial" animate="animate" custom={0} className="w-full h-full">
                <ServiceCard service={services[leftCardIndex]} />
              </motion.div>

              {/* RIGHT tile (index 1) */}
              <motion.div variants={tileVariants} initial="initial" animate="animate" custom={1} className="hidden md:block w-full h-full">
                {leftCardIndex + 1 < services.length && (
                  <ServiceCard service={services[rightCardIndex]} />
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots (unchanged) */}
        <div className="flex justify-center gap-2.5 mt-14">
          {Array.from({ length: numPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToService(pageIndex * 2)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activePageIndex === pageIndex
                  ? "bg-accent scale-125"
                  : "bg-muted-foreground/50"
              }`}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};