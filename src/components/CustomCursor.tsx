import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    // Add hover effect when over interactive elements
    const addLinkHover = () => setLinkHovered(true);
    const removeLinkHover = () => setLinkHovered(false);
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Apply hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', addLinkHover);
      el.addEventListener('mouseleave', removeLinkHover);
    });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', addLinkHover);
        el.removeEventListener('mouseleave', removeLinkHover);
      });
    };
  }, []);
  
  return (
    <>
      <div 
        className={`cursor-dot ${clicked ? 'cursor-dot--clicked' : ''} ${linkHovered ? 'cursor-dot--hover' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className={`cursor-ring ${clicked ? 'cursor-ring--clicked' : ''} ${linkHovered ? 'cursor-ring--hover' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
    </>
  );
};
