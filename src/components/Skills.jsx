import { useState } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/soundManager';
import AnimatedTitle from './AnimatedTitle';
import RadarChart from './RadarChart';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <section className="section-container relative z-10" id="skills">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <AnimatedTitle text="SYSTEM.SKILLS()" speed={20} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="cyber-card p-2 md:p-8 rounded-lg flex flex-col h-full">
            {/* Mock Terminal Window */}
          <div className="bg-[#030510] rounded-lg border border-gray-800 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {/* Terminal Header */}
            <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
              </div>
              <div className="text-gray-500 text-xs font-mono">root@aman-server:~</div>
              <div className="w-10"></div> {/* Spacer for alignment */}
            </div>

            {/* Terminal Body */}
            <div className="p-4 md:p-6 font-mono text-sm md:text-base min-h-[400px]">
              {/* Command Input */}
              <div className="flex gap-4 mb-6 text-gray-400">
                <button 
                  onMouseEnter={() => soundManager.play('hover')}
                  onClick={() => {
                    soundManager.play('click');
                    setActiveTab('skills');
                  }}
                  className={`hover:text-cyan-400 transition-colors ${activeTab === 'skills' ? 'text-cyan-400 glow-cyan' : ''}`}
                >
                  $ ./show_skills.sh
                </button>
                <button 
                  onMouseEnter={() => soundManager.play('hover')}
                  onClick={() => {
                    soundManager.play('click');
                    setActiveTab('achievements');
                  }}
                  className={`hover:text-purple-400 transition-colors ${activeTab === 'achievements' ? 'text-purple-400 glow-purple' : ''}`}
                >
                  $ ./show_achievements.sh
                </button>
              </div>

              {/* Output Area */}
              <div className="text-gray-300">
                {activeTab === 'skills' ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-green-400">Loading module: Prompt Engineering...</span>
                      <ul className="mt-2 list-none space-y-1 pl-4 border-l-2 border-gray-800">
                        <li><span className="text-cyan-500">→</span> Zero-shot & Few-shot prompting</li>
                        <li><span className="text-cyan-500">→</span> Chain-of-Thought reasoning optimization</li>
                        <li><span className="text-cyan-500">→</span> RAG (Retrieval-Augmented Generation) architectures</li>
                        <li><span className="text-cyan-500">→</span> LLM fine-tuning data preparation</li>
                      </ul>
                    </div>
                    
                    <div>
                      <span className="text-green-400">Loading module: Full Stack Development...</span>
                      <ul className="mt-2 list-none space-y-1 pl-4 border-l-2 border-gray-800">
                        <li><span className="text-purple-500">→</span> Responsive, accessible UI/UX implementation</li>
                        <li><span className="text-purple-500">→</span> RESTful API design and integration</li>
                        <li><span className="text-purple-500">→</span> Database modeling (SQL/NoSQL)</li>
                        <li><span className="text-purple-500">→</span> CI/CD pipelines and containerization</li>
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start gap-4 p-3 bg-gray-900/50 rounded border border-gray-800 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold mt-1">[2024]</div>
                      <div>
                        <div className="text-white font-bold">Hackathon Winner - AI Track</div>
                        <div className="text-gray-400 text-sm mt-1">Built an automated documentation generator winning 1st place among 50+ teams.</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 bg-gray-900/50 rounded border border-gray-800 hover:border-cyan-500/50 transition-colors">
                      <div className="text-cyan-400 font-bold mt-1">[2023]</div>
                      <div>
                        <div className="text-white font-bold">Open Source Contributor</div>
                        <div className="text-gray-400 text-sm mt-1">Merged 10+ PRs into major React component libraries.</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-3 bg-gray-900/50 rounded border border-gray-800 hover:border-green-500/50 transition-colors">
                      <div className="text-green-400 font-bold mt-1">[2023]</div>
                      <div>
                        <div className="text-white font-bold">Top 5% on LeetCode</div>
                        <div className="text-gray-400 text-sm mt-1">Solved 300+ algorithmic challenges focusing on dynamic programming and graphs.</div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Blinking prompt line */}
                <div className="mt-8 flex items-center text-cyan-400">
                  <span>root@aman-server:~ $</span>
                  <span className="typing-cursor ml-2"></span>
                </div>
              </div>
            </div>
          </div>
          </div>
          
          <div className="cyber-card p-4 rounded-lg flex flex-col h-full bg-gray-900/30 border border-gray-800">
            <div className="text-center mb-2 font-mono text-cyan-400 text-sm opacity-80 tracking-widest uppercase">
              Skill Matrix Visualization
            </div>
            <div className="flex-grow flex items-center justify-center">
              <RadarChart />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
