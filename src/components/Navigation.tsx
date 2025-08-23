import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export const Navigation = () => {
  const [activeId, setActiveId] = useState("hero");
  const [isManualNavigation, setIsManualNavigation] = useState(false);

  const navItems = useMemo(
    () => [
      { name: "Home", id: "hero" },
      { name: "About", id: "about" },
      { name: "Services", id: "services" },
      { name: "Our Work", id: "portfolio" },
      { name: "Workflow", id: "process" },
      { name: "ContactUs", id: "contact" },
    ],
    []
  );

  const scrollToSection = (id: string) => {
    // Immediately update the active state for responsive UI
    setActiveId(id);
    setIsManualNavigation(true);
    
    // Clear the manual navigation flag after a short delay
    setTimeout(() => {
      setIsManualNavigation(false);
    }, 1000);
    
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        // Account for fixed navigation height with better offset
        const navHeight = 120; // Increased offset for better positioning
        const offsetTop = element.offsetTop - navHeight;
        window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active state if user just clicked a navigation button
      if (isManualNavigation) return;
      
      const scrollPosition = window.scrollY + 200; // Better offset for detection
      
      // Get all sections with their positions
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id);
        return {
          id: item.id,
          offsetTop: element ? element.offsetTop : 0,
          offsetBottom: element ? element.offsetTop + element.offsetHeight : 0
        };
      }).filter(section => section.offsetTop > 0);

      // Sort sections by their position
      sections.sort((a, b) => a.offsetTop - b.offsetTop);

      // Find current section
      let currentSection = "hero";
      
      // Check if we're at the very top
      if (window.scrollY < 100) {
        currentSection = "hero";
      } else {
        // Find the section that we're currently viewing
        for (let i = sections.length - 1; i >= 0; i--) {
          if (scrollPosition >= sections[i].offsetTop) {
            currentSection = sections[i].id;
            break;
          }
        }
      }

      // Force contact at bottom
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isAtBottom) {
        currentSection = "contact";
      }

      setActiveId(currentSection);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [navItems, isManualNavigation]);

  return (
    <nav className="w-full fixed top-3 md:top-6 z-50 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-full px-2 py-2 md:px-6 md:py-3 shadow-2xl shadow-black/30 backdrop-saturate-150 max-w-full overflow-x-auto scrollbar-hide"
        style={{
          background: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.125)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex items-center justify-center space-x-0.5 md:space-x-1 min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-2 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 min-h-[44px] md:min-h-auto flex items-center justify-center ${
                activeId === item.id
                  ? "text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="relative z-10 whitespace-nowrap">
                <span className="md:hidden">
                  {item.name === "ContactUs" ? "Contact" : item.name === "Our Work" ? "Work" : item.name}
                </span>
                <span className="hidden md:inline">{item.name}</span>
              </span>
              {activeId === item.id && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full border border-white/20"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    mass: 0.8,
                    duration: 0.6
                  }}
                  initial={false}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};