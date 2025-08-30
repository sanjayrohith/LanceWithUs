import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import { Lightbulb, Palette, Code, Rocket } from "lucide-react";

// The data for our process steps remains the same.
const steps = [
  {
    number: 1,
    title: "Discovery",
    description: "The discovery phase is where our journey begins. We take time to understand your vision, goals, and specific requirements in depth. Through discussions, research, and careful analysis, we uncover core challenges and opportunities. This step ensures we are aligned on priorities, creating a strong foundation that guides the project forward with clarity and purpose.",
    color: "from-indigo-500 to-purple-500",
    icon: Lightbulb,
  },
  {
    number: 2,
    title: "Multi Design",
    description: "We create wireframes and multiple design variations that visually shape your idea into reality with vibrant concepts.",
    color: "from-pink-500 to-orange-500",
    icon: Palette,
  },
  {
    number: 3,
    title: "Development",
    description: "Once the foundation is set, our team brings ideas to life through precise coding and robust implementation. We focus on clean, scalable, efficient practices that ensure long-term performance and adaptability. Every feature is built with attention to detail, tested rigorously, and aligned with standards. This stage transforms vision into a working solution, ensuring reliability and future-ready technology.",
    color: "from-green-400 to-teal-500",
    icon: Code,
  },
  {
    number: 4,
    title: "Delivery",
    description: "We deploy your project successfully and provide ongoing support to guarantee a smooth launch and sustainability.",
    color: "from-yellow-400 to-red-500",
    icon: Rocket,
  },
];

// A dedicated component for the dynamically drawn SVG path
const SvgPath = ({ path, scrollProgress }) => {
  // Animate the path drawing based on the overall scroll progress
  const pathLength = useTransform(scrollProgress, [0.1, 0.8], [0, 1]);

  return (
    <svg width="100%" height="100%" className="absolute top-0 left-0" style={{ zIndex: 0, pointerEvents: "none" }}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--accent))" />
        </marker>
      </defs>
      {/* The track for the line */}
      <path d={path} stroke="hsl(var(--primary) / 0.2)" strokeWidth="3" fill="transparent" />
      {/* The animated line that draws on top */}
      <motion.path
        d={path}
        stroke="hsl(var(--accent))"
        strokeWidth="3"
        fill="transparent"
        style={{ pathLength }}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export const ProcessSection = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [svgPath, setSvgPath] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // This effect calculates the SVG path based on the card positions.
  useLayoutEffect(() => {
    const calculatePath = () => {
      const cardElements = cardRefs.current;
      if (cardElements.length < 2) return;

      let pathData = "";
      for (let i = 0; i < cardElements.length - 1; i++) {
        const startCard = cardElements[i];
        const endCard = cardElements[i + 1];
        
        if (startCard && endCard) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const startRect = startCard.getBoundingClientRect();
            const endRect = endCard.getBoundingClientRect();

            // Calculate positions relative to the container
            const startX = startRect.right - containerRect.left + 10;
            const startY = startRect.top - containerRect.top + startRect.height / 2;
            const endX = endRect.left - containerRect.left - 10;
            const endY = endRect.top - containerRect.top + endRect.height / 2;
            
            // The first move command
            if (i === 0) {
                pathData += `M ${startX} ${startY} `;
            }

            // Create a smooth cubic bezier curve
            const controlX1 = startX + (endX - startX) * 0.5;
            const controlY1 = startY;
            const controlX2 = startX + (endX - startX) * 0.5;
            const controlY2 = endY;

            pathData += `C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY} `;
        }
      }
      setSvgPath(pathData);
    };
    
    // Calculate on mount and on resize
    calculatePath();
    window.addEventListener('resize', calculatePath);
    return () => window.removeEventListener('resize', calculatePath);
  }, []);

  return (
  <section id="process" className="py-16 sm:py-32 bg-background/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-20 md:mb-32"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How We <span className="text-accent">Work</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process from idea to launch, explained step by step.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Render the dynamic SVG path on larger screens */}
          <div className="hidden md:block">
             <SvgPath path={svgPath} scrollProgress={scrollYProgress} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {steps.map((step, index) => {
              // Determine the animation range for this specific card
              const start = index / steps.length;
              const end = (index + 1) / steps.length;
              
              const opacity = useTransform(scrollYProgress, [start, (start + end)/2], [0.3, 1]);
              const scale = useTransform(scrollYProgress, [start, (start + end)/2], [0.9, 1]);
              
              // Apply staggering effect on desktop
              const isStaggered = index % 2 !== 0;

              return (
                <motion.div
                  key={step.number}
                  ref={(el) => (cardRefs.current[index] = el)}
                  style={{ opacity, scale }}
                  className={`relative z-10 p-6 rounded-2xl shadow-xl border border-white/10 bg-gradient-to-br ${step.color} ${isStaggered ? 'md:mt-24' : ''}`}
                >
                  <span className="absolute -top-3 -left-3 bg-white text-gray-800 font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                    {step.number}
                  </span>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 border-2 border-white/30">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-extrabold mb-2 text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-white/90">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};