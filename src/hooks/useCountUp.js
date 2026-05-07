import { useState, useEffect } from 'react';

export const useCountUp = (end, duration = 2000, isInView) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    // If end is not a number, just return it without animating, or handle custom logic
    const finalValue = parseInt(end);
    if (isNaN(finalValue)) {
      setCount(end);
      return;
    }
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutQuart
      const eased = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(finalValue * eased));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(finalValue);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return count;
};
