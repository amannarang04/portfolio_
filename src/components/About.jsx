import { motion, useInView } from 'framer-motion';
import { Terminal, Code, Cpu, Coffee } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect, useRef } from 'react';

const useCountUp = (end, duration = 2000, isInView) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const eased = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * eased));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return count;
};

const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(typeof stat.value === 'number' ? stat.value : parseInt(stat.value), 2500, isInView);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + (index * 0.1) }}
      className="flex flex-col border-l-2 border-cyan-500/30 pl-4 hover:border-cyan-500 transition-colors"
    >
      <span className="text-gray-400 flex items-center gap-2 mb-1">
        {stat.icon} {stat.label}
      </span>
      <span className="text-2xl font-bold text-cyan-400 glow-cyan">
        {stat.value === '9001' ? (count > 9000 ? '9000+' : count) : count}{stat.suffix || '+'}
      </span>
    </motion.div>
  );
};

const About = () => {
  const stats = [
    { label: "Lines of Code", value: 100, suffix: "k+", icon: <Code size={20} /> },
    { label: "Projects", value: 25, suffix: "+", icon: <Terminal size={20} /> },
    { label: "Technologies", value: 15, suffix: "+", icon: <Cpu size={20} /> },
    { label: "Coffee Cups", value: 9001, suffix: "+", icon: <Coffee size={20} /> },
  ];

  return (
    <section className="section-container relative z-10" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <TypeAnimation
            sequence={['SYSTEM.ABOUT()', 1000]}
            wrapper="span"
            cursor={true}
            speed={50}
          />
        </h2>
        
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
