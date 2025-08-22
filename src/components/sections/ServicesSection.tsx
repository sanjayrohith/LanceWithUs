import { motion } from "framer-motion";
import { Code2, Smartphone, BrainCircuit, Figma } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building responsive, high-performance websites from scratch.",
    color: "text-accent",
    hoverColor: "hover:shadow-neon-cyan",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Creating intuitive mobile applications for iOS and Android.",
    color: "text-primary",
    hoverColor: "hover:shadow-neon-purple",
  },
  {
    icon: BrainCircuit,
    title: "AI Integration",
    description: "Leveraging machine learning to build smart, automated systems.",
    color: "text-stellar-pink",
    hoverColor: "hover:shadow-xl hover:shadow-pink-500/20",
  },
  {
    icon: Figma,
    title: "UI/UX Design",
    description: "Designing user-centric interfaces that are a joy to use.",
    color: "text-stellar-yellow",
    hoverColor: "hover:shadow-xl hover:shadow-yellow-500/20",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-20 sm:py-32 bg-background/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What We <span className="text-accent">Offer</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Crafting solutions for the modern web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`glass-card p-6 rounded-xl transition-all duration-300 cursor-pointer ${service.hoverColor}`}
              >
                <Icon className={`w-10 h-10 ${service.color} mb-4`} />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};