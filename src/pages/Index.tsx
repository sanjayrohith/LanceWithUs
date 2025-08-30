import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingChat } from "@/components/FloatingChat";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="Professional Freelance Development Team"
        description="LanceWithUs: Expert freelance developers specializing in React, TypeScript, AI integration, mobile development & modern web solutions. Get quality results at competitive rates."
        keywords="freelance developers, web development, React developers, TypeScript, AI integration, mobile development, UI/UX design, Next.js, Node.js, professional development team"
      />
      
      <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <ContactSection />
      </main>

      <footer className="bg-background/30 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; 2025 LanceWithUs. All rights reserved. Code, Craft, Care . Driven by passion, powered by skill.</p>
        </div>
      </footer>

      <FloatingChat />
      </div>
    </>
  );
};

export default Index;