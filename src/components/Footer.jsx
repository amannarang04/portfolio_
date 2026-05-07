import { motion } from 'framer-motion';
import { Rocket, Zap } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

  return (
    <footer className="relative z-10 border-t border-gray-800 bg-[#02040a] mt-20 pt-12 pb-6">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-yellow-400" />
            <span className="font-mono text-gray-300">
              Built with React & Vite by <span className="text-white font-bold tracking-wider">Aman Narang</span>
            </span>
          </div>
          
          <div className="font-mono text-xs text-gray-500 bg-gray-900 px-3 py-1 border border-gray-800 rounded">
            SYS_UPDATED: [{timestamp}]
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center justify-center w-10 h-10 bg-gray-900 border border-gray-700 hover:border-cyan-500 rounded transition-colors"
            aria-label="Back to top"
          >
            <Rocket size={18} className="text-gray-400 group-hover:text-cyan-400 group-hover:-translate-y-1 transition-transform" />
          </button>
          
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
          <p>© {currentYear} AMAN NARANG. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">V 1.0.4</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
