import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Mental Health Bot',
    description: 'An AI-powered chatbot leveraging LangChain and LLMs to provide empathetic responses and mental health resources. Built with privacy-first architecture.',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FastAPI'],
    github: '#',
    live: '#',
    color: 'var(--neon-cyan)'
  },
  {
    title: 'Open Supply Environment',
    description: 'A decentralized platform for tracking supply chain provenance. Features real-time dashboard and immutable audit logs.',
    tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    github: '#',
    live: '#',
    color: 'var(--neon-purple)'
  },
  {
    title: 'Flight Tracker',
    description: 'Real-time flight visualization tool. Consumes aviation APIs to render live positions on a 3D globe.',
    tech: ['Next.js', 'Three.js', 'Tailwind CSS'],
    github: '#',
    live: '#',
    color: 'var(--neon-green)'
  },
  {
    title: 'Cyber Portfolio',
    description: 'The very site you are looking at right now. A terminal-inspired, cyberpunk-themed digital resume.',
    tech: ['React', 'Vite', 'Framer Motion', 'Tailwind'],
    github: '#',
    live: '#',
    color: 'var(--neon-pink)'
  }
];

const Projects = () => {
  return (
    <section className="section-container relative z-10" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-end mb-8">
          <h2 className="section-title mb-0">DATABASE.PROJECTS()</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="cyber-card p-8 h-full flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Terminal size={40} style={{ color: project.color }} />
                </div>
                <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: project.color }}></div>

                <div>
                  <h3 className="text-2xl font-bold font-heading mb-3 uppercase tracking-widest text-white group-hover:glitch" data-text={project.title}>
                    {project.title}
                  </h3>
                  
                  <div className="bg-gray-900/50 p-4 border border-gray-800 font-mono text-sm text-gray-300 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
                    <p className="relative z-10 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 bg-gray-800 border border-gray-700" style={{ color: project.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 border-t border-gray-800 pt-4 mt-auto">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors">
                    <FaGithub size={16} /> [Source Code]
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors" style={{ color: project.color }}>
                    <ExternalLink size={16} /> [Execute]
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="cyber-btn border-green-500 text-green-400 hover:bg-green-500 hover:text-black shadow-[0_0_5px_#39ff14_inset,0_0_5px_#39ff14] hover:shadow-[0_0_20px_#39ff14_inset,0_0_20px_#39ff14]">
            query_more_records()
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
