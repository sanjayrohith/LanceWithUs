import { useEffect, useState } from 'react';

export const useCurrentSection = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setCurrentSection(entry.target.id || 'hero');
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return currentSection;
};
