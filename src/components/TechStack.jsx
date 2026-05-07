import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Code2, Monitor, Cpu } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Tech', icon: <Layers size={16} /> },
  { id: 'frontend', label: 'Frontend', icon: <Monitor size={16} /> },
  { id: 'backend', label: 'Backend', icon: <Database size={16} /> },
  { id: 'ai', label: 'AI/Prompt Eng', icon: <Cpu size={16} /> },
  { id: 'tools', label: 'Tools', icon: <Code2 size={16} /> },
];

const technologies = [
  { name: 'React/Next.js', level: 90, category: 'frontend', color: 'var(--neon-cyan)' },
  { name: 'TypeScript', level: 85, category: 'frontend', color: 'var(--neon-cyan)' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend', color: 'var(--neon-cyan)' },
  { name: 'Node.js/Express', level: 80, category: 'backend', color: 'var(--neon-green)' },
  { name: 'Python', level: 85, category: 'backend', color: 'var(--neon-green)' },
  { name: 'MongoDB', level: 75, category: 'backend', color: 'var(--neon-green)' },
  { name: 'LangChain', level: 80, category: 'ai', color: 'var(--neon-purple)' },
  { name: 'OpenAI API', level: 90, category: 'ai', color: 'var(--neon-purple)' },
  { name: 'Prompt Eng', level: 95, category: 'ai', color: 'var(--neon-purple)' },
  { name: 'Git/GitHub', level: 85, category: 'tools', color: 'var(--neon-pink)' },
  { name: 'Docker', level: 65, category: 'tools', color: 'var(--neon-pink)' },
  { name: 'Linux/Bash', level: 75, category: 'tools', color: 'var(--neon-pink)' },
];

const TechStack = () => {
  const [filter, setFilter] = useState('all');

  const filteredTech = filter === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === filter);

  return (
    <section className="section-container relative z-10" id="tech">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">NEURAL_NETWORK.TECH()</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 font-mono text-sm border transition-all duration-300 ${
                filter === cat.id 
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.3)]' 
                  : 'border-gray-800 text-gray-400 hover:border-gray-600'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="cyber-card p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-heading font-bold text-lg tracking-wider" style={{ color: tech.color }}>
                  {tech.name}
                </h4>
                <span className="font-mono text-xs text-gray-500">{tech.level}%</span>
              </div>
              
              <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                  className="h-full relative"
                  style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-pulse-fast"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
