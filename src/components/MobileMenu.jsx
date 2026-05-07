import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavigate = (id) => {
    soundManager.play('click');
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Only show on mobile */}
      <div className="lg:hidden fixed top-4 right-4 z-[100]">
        <button
          className="p-2 cyber-btn"
          onClick={() => {
            soundManager.play('click');
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-gray-900 
                         border-l-2 border-cyan-500 z-50"
            >
              <div className="p-6 pt-20 space-y-4">
                {links.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className="block w-full text-left px-4 py-3 text-lg 
                             text-white hover:text-cyan-400 
                             hover:border-l-2 hover:border-cyan-400 
                             transition-colors font-heading uppercase"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
