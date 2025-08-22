import { useEffect, useRef } from "react";

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  className?: string;
}

export const TypedText = ({
  strings,
  typeSpeed = 70,
  backSpeed = 50,
  loop = true,
  className = "",
}: TypedTextProps) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const currentIndex = useRef(0);
  const currentCharIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentString = strings[currentIndex.current];
      const shouldDelete = isDeleting.current;

      if (!elementRef.current) return;

      if (shouldDelete) {
        // Deleting
        elementRef.current.textContent = currentString.substring(0, currentCharIndex.current - 1);
        currentCharIndex.current--;

        if (currentCharIndex.current === 0) {
          isDeleting.current = false;
          currentIndex.current = (currentIndex.current + 1) % strings.length;
        }

        timeout = setTimeout(type, backSpeed);
      } else {
        // Typing
        elementRef.current.textContent = currentString.substring(0, currentCharIndex.current + 1);
        currentCharIndex.current++;

        if (currentCharIndex.current === currentString.length) {
          if (loop) {
            isDeleting.current = true;
            timeout = setTimeout(type, 2000); // Pause before deleting
          }
        } else {
          timeout = setTimeout(type, typeSpeed);
        }
      }
    };

    type();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={elementRef} className={className}></span>;
};