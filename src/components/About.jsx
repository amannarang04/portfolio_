import { motion, useInView } from 'framer-motion';
import { Terminal, Code, Cpu, Coffee } from 'lucide-react';
import { useState, useRef } from 'react';
import AnimatedTitle from './AnimatedTitle';
import { useCountUp } from '../hooks/useCountUp';

const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(stat.value, 2000, isInView);
  
  const isComplete = count === stat.value;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + (index * 0.1) }}
      className="flex flex-col border-l-2 pl-4 transition-all duration-300"
      style={{ 
        borderColor: isComplete ? stat.color : 'rgba(255,255,255,0.1)' 
      }}
    >
      <span className="text-gray-400 flex items-center gap-2 mb-1 text-xs uppercase tracking-wider">
        <span style={{ color: isComplete ? stat.color : '#9ca3af', transition: 'color 0.3s' }}>
          {stat.icon}
        </span>
        {stat.label}
      </span>
      <span 
        className="text-2xl lg:text-3xl font-bold font-mono transition-all duration-500"
        style={{ 
          color: isComplete ? stat.color : '#fff',
          textShadow: isComplete ? `0 0 15px ${stat.color}` : 'none'
        }}
      >
        {stat.label === 'Coffee Consumed' && isComplete ? '∞' : count}{stat.suffix}
      </span>
    </motion.div>
  );
};

const About = () => {
  const stats = [
    { label: "Lines of Code", value: 10000, suffix: "+", icon: <Code size={20} />, color: 'var(--neon-cyan)' },
    { label: "Projects Completed", value: 32, suffix: "+", icon: <Terminal size={20} />, color: 'var(--neon-purple)' },
    { label: "Technologies Mastered", value: 25, suffix: "+", icon: <Cpu size={20} />, color: 'var(--neon-green)' },
    { label: "Coffee Consumed", value: 999, suffix: "", icon: <Coffee size={20} />, color: 'var(--neon-pink)' },
  ];

  return (
    <section className="section-container relative z-10" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedTitle text="SYSTEM.ABOUT()" speed={20} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Terminal Stats Window */}
          <div className="wireframe-border">
            <div className="bg-gray-900 rounded-lg h-full border border-gray-800">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-gray-400">user@mainframe:~</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm">
                <p className="text-green-400 mb-4">$ ./fetch_stats.sh --all</p>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  {stats.map((stat, idx) => (
                    <StatItem key={idx} stat={stat} index={idx} />
                  ))}
                </div>
                
                <p className="text-green-400 mt-8 mb-2">$ status --current</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/50 rounded-full text-green-400 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Seeking new opportunities
                </div>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-heading text-white mb-6 uppercase tracking-wider">
              Decoding the <span className="text-purple-400 glow-purple">Matrix</span>
            </h3>
            
            <div className="space-y-4 text-gray-300 font-body text-lg leading-relaxed">
              <p>
                I am a third-year Full Stack Developer and Prompt Engineer obsessed with pushing the boundaries of what's possible on the web. My playground is the terminal, and my tools are modern frameworks and AI models.
              </p>
              <p>
                Bridging the gap between aesthetic design and robust backend architecture, I build experiences that don't just work—they leave an impression. Whether it's crafting an intuitive React interface or training LLMs for complex tasks, I bring a cyberpunk ethos to my workflow: high tech, high efficiency.
              </p>
              <p>
                When I'm not writing code or engineering prompts, you can find me exploring open-source repositories, participating in hackathons, or upgrading my cybernetics (drinking coffee).
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
