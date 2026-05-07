import React from 'react';
import { soundManager } from '../utils/soundManager';

const SocialLink = ({ icon: Icon, href, label, color, tooltip }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => soundManager.play('hover')}
      onClick={() => soundManager.play('click')}
      className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border border-gray-800 transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040a]"
      style={{
        '--hover-color': color,
        focusVisibleRingColor: color
      }}
    >
      {/* Pulsing ring on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse-ring transition-opacity duration-300" style={{ border: `2px solid ${color}` }}></div>
      
      {/* Icon with scaling, rotation, and color transition */}
      <Icon 
        className="w-5 h-5 text-gray-400 group-hover:text-[var(--hover-color)] transition-all duration-300 ease-out transform group-hover:scale-125 group-hover:rotate-6 z-10" 
        style={{ filter: `drop-shadow(0 0 0px transparent)` }}
      />
      
      {/* Intense glow backing on hover */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md z-0"
        style={{ backgroundColor: color }}
      ></div>

      {/* Animated Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none border border-gray-700 shadow-lg"
            style={{ boxShadow: `0 4px 12px ${color}33` }}>
        {tooltip}
        {/* Tooltip Arrow */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 border-b border-r border-gray-700 rotate-45"></span>
      </span>
    </a>
  );
};

export default SocialLink;
