import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Discovery",
    description: "We start by understanding your vision, goals, and requirements.",
    color: "bg-primary",
    borderColor: "border-primary/50",
  },
  {
    number: 2,
    title: "Design",
    description: "We create wireframes and mockups to bring your idea to life visually.",
    color: "bg-accent",
    borderColor: "border-accent/50",
  },
  {
    number: 3,
    title: "Development",
    description: "Our team gets to work, writing clean and efficient code.",
    color: "bg-stellar-pink",
    borderColor: "border-stellar-pink/50",
  },
  {
    number: 4,
    title: "Delivery",
    description: "We deploy your project and provide support for a smooth launch.",
    color: "bg-stellar-green",
    borderColor: "border-stellar-green/50",
  },
];

export const ProcessSection = () => {
  return (
    <section id="process" className="py-20 sm:py-32 bg-background/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How We <span className="text-accent">Work</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our streamlined process from idea to launch.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/30 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-block">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center text-2xl font-bold mx-auto mb-4 border-4 ${step.borderColor} text-background relative z-10`}
                  >
                    {step.number}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};