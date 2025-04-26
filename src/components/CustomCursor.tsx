import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 30,
          mass: 0.1,
        }}
      />
      <motion.div
        className="custom-cursor"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 2 : 1.5,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 25,
          mass: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor; 