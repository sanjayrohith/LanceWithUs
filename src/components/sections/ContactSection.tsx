import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { StaggeredText } from "@/components/animations/StaggeredText";
import { GeometricMorph } from "@/components/animations/GeometricMorph";

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to send your message.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateMessageSuggestion = () => {
    const name = formData.name || "a potential client";
    const projectInfo = formData.message || "a new project";
    
    const suggestion = `Hello LanceWithUs Solutions team,

My name is ${name}, and I'm writing to you today because I'm interested in discussing a potential project related to ${projectInfo}.

I was impressed by your portfolio and would love to learn more about your process and availability.

Looking forward to hearing from you.`;

    setFormData({
      ...formData,
      message: suggestion,
    });
  };

  return (
    <section id="contact" className="py-20 sm:py-32 bg-background/20 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute top-32 left-20 opacity-25">
        <GeometricMorph 
          shapes={['star', 'circle', 'triangle']}
          size={180}
          colors={['hsl(var(--primary))', 'hsl(var(--accent))']}
          duration={10}
        />
      </div>
      <div className="absolute bottom-20 right-32 opacity-20">
        <GeometricMorph 
          shapes={['hexagon', 'square', 'star']}
          size={120}
          colors={['hsl(var(--stellar-cyan))', 'hsl(var(--stellar-pink))']}
          duration={12}
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
            <StaggeredText text="Let's " delay={0.2} animationType="slide" />
            <span className="text-primary">
              <StaggeredText text="Talk" delay={0.4} animationType="scale" />
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind? We'd love to hear about it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="glass-card border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="glass-card border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="relative">
              <Textarea
                name="message"
                rows={4}
                placeholder="Briefly describe your project..."
                value={formData.message}
                onChange={handleChange}
                className="glass-card border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary resize-none"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generateMessageSuggestion}
                className="absolute bottom-3 right-3 text-xs backdrop-blur-xl bg-black/30 border border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-all duration-300 rounded-full px-3 py-1.5 shadow-lg"
              >
                ✨ Help me write
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="neon-glow bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 magnetic"
              >
                Get in Touch
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};