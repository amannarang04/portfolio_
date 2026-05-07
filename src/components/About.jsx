import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Coffee } from 'lucide-react';

const About = () => {
  const stats = [
    { label: "Lines of Code", value: "100k+", icon: <Code size={20} /> },
    { label: "Projects", value: "25+", icon: <Terminal size={20} /> },
    { label: "Technologies", value: "15+", icon: <Cpu size={20} /> },
    { label: "Coffee Cups", value: "9001", icon: <Coffee size={20} /> },
  ];

  return (
    <section className="section-container relative z-10" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">SYSTEM.ABOUT()</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          {/* Terminal Stats Window */}
          <div className="cyber-card p-1 rounded-lg overflow-hidden group">
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
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="flex flex-col border-l-2 border-cyan-500/30 pl-4 hover:border-cyan-500 transition-colors"
                    >
                      <span className="text-gray-400 flex items-center gap-2 mb-1">
                        {stat.icon} {stat.label}
                      </span>
                      <span className="text-2xl font-bold text-cyan-400 glow-cyan">{stat.value}</span>
                    </motion.div>
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
