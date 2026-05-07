import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the primary input mechanism is a touch screen
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Also hide cursor on all interactive elements
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    let trailIdCounter = 0;

    const updatePosition = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPosition(newPos);
      
      trailIdCounter += 1;
      
      setTrails((prevTrails) => {
        const newTrails = [...prevTrails, { ...newPos, id: trailIdCounter }];
        return newTrails.slice(-15); // Keep last 15 positions for the trail
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cyber-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Trails */}
      {trails.map((trail, index) => {
        const opacity = (index + 1) / trails.length;
        const size = isHovering ? 20 * opacity : 10 * opacity;
        
        return (
          <div
            key={trail.id}
            className="fixed rounded-full mix-blend-screen"
            style={{
              left: trail.x,
              top: trail.y,
              width: size,
              height: size,
              transform: 'translate(-50%, -50%)',
              opacity: opacity * 0.5,
              background: 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
              transition: 'width 0.1s, height 0.1s',
              zIndex: 9999
            }}
          />
        );
      })}

      {/* Main Cursor */}
      <div
        className="fixed rounded-full mix-blend-screen shadow-[0_0_20px_var(--neon-cyan)]"
        style={{
          left: position.x,
          top: position.y,
          width: isClicking ? 15 : isHovering ? 30 : 15,
          height: isClicking ? 15 : isHovering ? 30 : 15,
          transform: 'translate(-50%, -50%)',
          background: isHovering ? 'transparent' : 'radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)',
          border: isHovering ? '2px solid var(--neon-cyan)' : 'none',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border 0.2s ease-out',
          zIndex: 10000
        }}
      />
    </div>
  );
};

export default CustomCursor;
