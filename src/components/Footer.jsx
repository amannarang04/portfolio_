import { motion } from 'framer-motion';
import { Rocket, Zap, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import { soundManager } from '../utils/soundManager';
import SocialLink from './SocialLink';
import DownloadCV from './DownloadCV';

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
            onClick={() => {
              soundManager.play('click');
              scrollToTop();
            }}
            onMouseEnter={() => soundManager.play('hover')}
            className="group flex items-center justify-center w-10 h-10 bg-gray-900 border border-gray-700 hover:border-cyan-500 rounded transition-colors shrink-0"
            aria-label="Back to top"
          >
            <Rocket size={18} className="text-gray-400 group-hover:text-cyan-400 group-hover:-translate-y-1 transition-transform" />
          </button>
          
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <SocialLink 
            icon={FaGithub} 
            href="https://github.com/amannarang04" 
            label="GitHub Profile" 
            tooltip="Hack the repo" 
            color="var(--neon-cyan)" 
          />
          <SocialLink 
            icon={FaLinkedin} 
            href="https://www.linkedin.com/in/aman-narang-8aa904341/" 
            label="LinkedIn Profile" 
            tooltip="Connect network" 
            color="#0a66c2" 
          />
          <SocialLink 
            icon={FaTwitter} 
            href="https://twitter.com/AmanNarang30403" 
            label="Twitter Profile" 
            tooltip="Transmit tweet" 
            color="#1da1f2" 
          />
          <SocialLink 
            icon={FaEnvelope} 
            href="mailto:0402narang@gmail.com" 
            label="Email Address" 
            tooltip="Send payload" 
            color="var(--neon-purple)" 
          />
          <SocialLink 
            icon={SiLeetcode} 
            href="https://leetcode.com/u/amannarang04/" 
            label="LeetCode Profile" 
            tooltip="Algorithm logs" 
            color="#ffa116" 
          />
          <SocialLink 
            icon={SiCodechef} 
            href="https://www.codechef.com/users/amannarang04" 
            label="CodeChef Profile" 
            tooltip="Compete here" 
            color="#5B4638" 
          />
        </div>

        <div className="flex justify-center mb-10">
          <DownloadCV className="cyber-btn flex items-center justify-center gap-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white shadow-[0_0_5px_#a855f7_inset,0_0_5px_#a855f7] hover:shadow-[0_0_20px_#a855f7_inset,0_0_20px_#a855f7] text-sm py-2 px-6">
            <Download size={16} />
            Download Resume
          </DownloadCV>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
          <p>© {currentYear} AMAN NARANG. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span onMouseEnter={() => soundManager.play('hover')} onClick={() => soundManager.play('click')} className="hover:text-cyan-400 cursor-pointer transition-colors">V 1.0.4</span>
            <span onMouseEnter={() => soundManager.play('hover')} onClick={() => soundManager.play('click')} className="hover:text-cyan-400 cursor-pointer transition-colors">STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
