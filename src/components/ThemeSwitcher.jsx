import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { soundManager } from '../utils/soundManager';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, changeTheme, themes } = useTheme();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    soundManager.play('click');
  };

  const handleThemeSelect = (themeId) => {
    changeTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-20 z-50" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        onMouseEnter={() => soundManager.play('hover')}
        className="p-3 rounded-full bg-black/50 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm group relative"
        aria-label="Toggle Theme"
      >
        <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
        
        {/* Tooltip */}
        {!isOpen && (
          <span className="absolute -bottom-8 right-0 bg-black/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Switch Theme
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 w-48 bg-gray-900/95 border border-cyan-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(0,255,255,0.1)] overflow-hidden"
          >
            <div className="p-2 flex flex-col gap-1">
              {Object.values(themes).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  onMouseEnter={() => soundManager.play('hover')}
                  className={`w-full flex items-center justify-between p-2 rounded text-sm font-mono transition-colors ${
                    currentTheme === theme.id 
                      ? 'bg-cyan-500/20 text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {/* Theme color previews */}
                    <span className="flex gap-0.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors['--neon-cyan'] }}></span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors['--neon-purple'] }}></span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.colors['--neon-pink'] }}></span>
                    </span>
                    {theme.name}
                  </span>
                  {currentTheme === theme.id && <Check size={14} className="text-cyan-400" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
