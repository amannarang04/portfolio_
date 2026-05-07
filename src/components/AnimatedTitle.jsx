import { useRef, useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'framer-motion';
import { soundManager } from '../utils/soundManager';

const AnimatedTitle = ({ text, speed = 20, className = "section-title", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <div ref={ref} className="min-h-[3rem] w-full block">
      {shouldAnimate ? (
        <h2 className={className}>
          <TypeAnimation
            sequence={[
              text,
              () => {
                soundManager.stop('typing');
              }
            ]}
            wrapper="span"
            cursor={true}
            speed={speed}
            className="inline-block"
          />
        </h2>
      ) : (
        <h2 className={className} style={{ opacity: 0 }}>
          {text}
        </h2>
      )}
    </div>
  );
};

export default AnimatedTitle;
