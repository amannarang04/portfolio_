import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ChevronDown } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const [isTypingDone, setIsTypingDone] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(var(--neon-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px)',
             backgroundSize: '50px 50px',
             transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
             animation: 'grid-move 20s linear infinite'
           }}>
      </div>
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Terminal Command */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 font-mono text-xl md:text-2xl text-cyan-400 min-h-[32px]"
          >
            <TypeAnimation
              sequence={[
                'root@aman:~$ whoami',
                () => setIsTypingDone(true)
              ]}
              wrapper="span"
              cursor={true}
              speed={40}
            />
          </motion.div>

          {/* Name Reveal */}
          {isTypingDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 uppercase tracking-wider text-white">
                <span className="glitch glow-cyan inline-block" data-text="AMAN NARANG">
                  AMAN NARANG
                </span>
              </h1>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-xl md:text-3xl text-purple-400 font-mono mb-8"
              >
                Full Stack Developer <span className="text-white mx-2">|</span> Prompt Engineer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg"
              >
                Architecting digital solutions in the neon-lit intersection of clean code and artificial intelligence. Ready to hack the mainframe.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <button className="cyber-btn flex items-center justify-center gap-2 group">
                  <Terminal size={20} className="group-hover:animate-pulse" />
                  View Projects
                </button>
                <button className="cyber-btn flex items-center justify-center gap-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white shadow-[0_0_5px_#a855f7_inset,0_0_5px_#a855f7] hover:shadow-[0_0_20px_#a855f7_inset,0_0_20px_#a855f7]">
                  <Download size={20} />
                  Download CV
                </button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {isTypingDone && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-cyan-500"
        >
          <span className="text-xs font-mono mb-2 uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown className="animate-bounce" size={24} />
        </motion.div>
      )}

      <style jsx>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 50px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
