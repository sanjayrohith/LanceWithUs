import { useState } from "react";
import { motion } from "framer-motion";

export const Navigation = () => {
  const [activeItem, setActiveItem] = useState("Case Studies");

  const navItems = [
    { name: "Services", hasIcon: false, id: "services" },
    { name: "Case Studies", hasIcon: true, id: "portfolio" },
    { name: "About", hasIcon: false, id: "about" },
    { name: "Resources", hasIcon: false, id: "process" },
    { name: "Free Audit", hasIcon: false, id: "contact" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 -ml-56 z-50"
    >
      <div className="backdrop-blur-xl bg-black/30 border border-white/20 rounded-full px-6 py-2.5 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-center space-x-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                scrollToSection(item.id);
              }}
              className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-full transition-all duration-300 ${
                activeItem === item.name 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.hasIcon && (
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></div>
              )}
              <span className="text-xs font-medium whitespace-nowrap">{item.name}</span>
              
              {activeItem === item.name && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-white/15 backdrop-blur-sm rounded-full border border-white/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};