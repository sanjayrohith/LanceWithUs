import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export const Navigation = () => {
  const [activeId, setActiveId] = useState("top");

  const navItems = useMemo(
    () => [
      { name: "Home", id: "top" },
      { name: "Services", id: "services" },
      { name: "About", id: "about" },
      { name: "Our Work", id: "portfolio" },
      { name: "Workflow", id: "process" },
      { name: "ContactUs", id: "contact" },
    ],
    []
  );

  const scrollToSection = (id) => {
    setActiveId(id);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // --- THE DEFINITIVE FIX ---
      // This logic finds the last section that has scrolled past the top of the viewport,
      // with a buffer of 1px to ensure accuracy. This is the most reliable way to
      // determine the "current" section you are viewing.
      const currentSection = [...navItems].reverse().find(item => {
          const element = document.getElementById(item.id);
          if (element) {
              return element.offsetTop <= scrollPosition + 1;
          }
          // The 'top' section doesn't have an element, so we handle it by default.
          return item.id === 'top'; 
      });

      if (currentSection) {
          setActiveId(currentSection.id);
      }
      
      // --- EDGE CASE FIX FOR BOTTOM ---
      // If the user scrolls to the absolute bottom of the page, force the last item to be active.
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (isAtBottom) {
          setActiveId('contact');
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  return (
    <nav className="w-full fixed top-6 z-50 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-xl bg-black/30 border border-white/20 rounded-full px-4 py-2 shadow-2xl shadow-black/50"
      >
        <div className="flex items-center justify-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeId === item.id
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              {activeId === item.id && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-white/15 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};