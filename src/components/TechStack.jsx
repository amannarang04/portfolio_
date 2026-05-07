import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Database, Code2, Monitor, Cpu, Cloud } from 'lucide-react';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGithub, FaLinux, FaAws } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiOpenai, SiLangchain, SiPostgresql, SiRedis } from 'react-icons/si';
import AnimatedTitle from './AnimatedTitle';
import { soundManager } from '../utils/soundManager';

const categories = [
  { id: 'all', label: 'All Tech', icon: <Layers size={16} /> },
  { id: 'frontend', label: 'Frontend', icon: <Monitor size={16} /> },
  { id: 'backend', label: 'Backend', icon: <Code2 size={16} /> },
  { id: 'database', label: 'Database', icon: <Database size={16} /> },
  { id: 'ai', label: 'AI/ML', icon: <Cpu size={16} /> },
  { id: 'devops', label: 'DevOps', icon: <Cloud size={16} /> },
];

const technologies = [
  { name: 'React/Next.js', level: 90, years: 3, category: 'frontend', color: 'var(--neon-cyan)', icon: <FaReact size={32} /> },
  { name: 'TypeScript', level: 85, years: 2.5, category: 'frontend', color: 'var(--neon-cyan)', icon: <SiTypescript size={32} /> },
  { name: 'Tailwind CSS', level: 95, years: 3, category: 'frontend', color: 'var(--neon-cyan)', icon: <SiTailwindcss size={32} /> },
  { name: 'Node.js', level: 80, years: 2, category: 'backend', color: 'var(--neon-green)', icon: <FaNodeJs size={32} /> },
  { name: 'Python', level: 85, years: 3, category: 'backend', color: 'var(--neon-green)', icon: <FaPython size={32} /> },
  { name: 'MongoDB', level: 75, years: 2, category: 'database', color: 'var(--neon-pink)', icon: <SiMongodb size={32} /> },
  { name: 'PostgreSQL', level: 80, years: 2.5, category: 'database', color: 'var(--neon-pink)', icon: <SiPostgresql size={32} /> },
  { name: 'Redis', level: 60, years: 1, category: 'database', color: 'var(--neon-pink)', icon: <SiRedis size={32} /> },
  { name: 'LangChain', level: 80, years: 1.5, category: 'ai', color: 'var(--neon-purple)', icon: <SiLangchain size={32} /> },
  { name: 'OpenAI API', level: 90, years: 2, category: 'ai', color: 'var(--neon-purple)', icon: <SiOpenai size={32} /> },
  { name: 'Docker', level: 65, years: 1.5, category: 'devops', color: '#f59e0b', icon: <FaDocker size={32} /> },
  { name: 'AWS', level: 70, years: 2, category: 'devops', color: '#f59e0b', icon: <FaAws size={32} /> },
  { name: 'Linux', level: 75, years: 3, category: 'devops', color: '#f59e0b', icon: <FaLinux size={32} /> },
  { name: 'Git/GitHub', level: 85, years: 3, category: 'devops', color: '#f59e0b', icon: <FaGithub size={32} /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15 }
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

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
      >
        <AnimatedTitle text="NEURAL_NETWORK.TECH()" speed={20} delay={100} />
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onMouseEnter={() => soundManager.play('hover')}
              onClick={() => {
                setFilter(cat.id);
                soundManager.play('click');
              }}
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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <AnimatePresence mode='popLayout'>
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="cyber-card p-6 tech-icon-container group"
              >
                <div className="flex justify-between items-start mb-4">
                  {/* 3D Rotating Icon Container */}
                  <div className="tech-icon-wrapper" style={{ color: tech.color }}>
                    <div className="tech-icon transition-transform duration-700 ease-out group-hover:rotate-y-360 group-hover:drop-shadow-[0_0_15px_currentColor]">
                      {tech.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    <h4 className="font-heading font-bold text-lg tracking-wider transition-colors duration-300" style={{ color: tech.color }}>
                      {tech.name}
                    </h4>
                    <span className="font-mono text-xs text-gray-400 block mt-1">
                      {tech.years} {tech.years === 1 ? 'Year' : 'Years'} Exp
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between font-mono text-xs text-gray-500 mb-2">
                  <span>Proficiency</span>
                  <span style={{ color: tech.color }}>{tech.level}%</span>
                </div>

                <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full relative transition-colors duration-300"
                    style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse-fast"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TechStack;
