import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Star, GitFork, Calendar as CalendarIcon, Code2, Loader2, AlertCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import VanillaTilt from 'vanilla-tilt';
import { soundManager } from '../utils/soundManager';
import AnimatedTitle from './AnimatedTitle';
import { useFetchGitHub } from '../hooks/useFetchGitHub';

const fallbackProjects = [
  {
    id: '1',
    name: 'Mental Health Bot',
    description: 'An AI-powered chatbot leveraging LangChain and LLMs to provide empathetic responses and mental health resources. Built with privacy-first architecture.',
    language: 'Python',
    tech: ['Python', 'LangChain', 'OpenAI API', 'FastAPI'],
    html_url: '#',
    homepage: '#',
    stargazers_count: 42,
    forks_count: 12,
    updated_at: new Date().toISOString(),
    color: 'var(--neon-cyan)'
  },
  {
    id: '2',
    name: 'Open Supply Environment',
    description: 'A decentralized platform for tracking supply chain provenance. Features real-time dashboard and immutable audit logs.',
    language: 'JavaScript',
    tech: ['React', 'Node.js', 'MongoDB', 'WebSockets'],
    html_url: '#',
    homepage: '#',
    stargazers_count: 38,
    forks_count: 8,
    updated_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    color: 'var(--neon-purple)'
  },
  {
    id: '3',
    name: 'Flight Tracker',
    description: 'Real-time flight visualization tool. Consumes aviation APIs to render live positions on a 3D globe.',
    language: 'TypeScript',
    tech: ['Next.js', 'Three.js', 'Tailwind CSS'],
    html_url: '#',
    homepage: '#',
    stargazers_count: 115,
    forks_count: 24,
    updated_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    color: 'var(--neon-green)'
  },
  {
    id: '4',
    name: 'Cyber Portfolio',
    description: 'The very site you are looking at right now. A terminal-inspired, cyberpunk-themed digital resume.',
    language: 'JavaScript',
    tech: ['React', 'Vite', 'Framer Motion', 'Tailwind'],
    html_url: '#',
    homepage: '#',
    stargazers_count: 89,
    forks_count: 5,
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    color: 'var(--neon-pink)'
  }
];

const languageColors = {
  JavaScript: 'var(--neon-cyan)',
  TypeScript: 'var(--neon-purple)',
  Python: 'var(--neon-green)',
  HTML: 'var(--neon-pink)',
  CSS: 'var(--neon-cyan)',
  Java: '#b07219',
  'C++': '#f34b7d',
  default: 'var(--text-secondary)'
};

const ProjectCard = ({ project }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02,
      });
    }
    return () => {
      if (tiltRef.current?.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  const color = project.color || languageColors[project.language] || languageColors.default;

  return (
    <div ref={tiltRef} className="h-full w-full">
      <div className="cyber-card p-6 h-full flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 transform-style-3d">
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity translate-z-10">
          <Terminal size={40} style={{ color }} />
        </div>
        <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: color }}></div>

        <div className="translate-z-20">
          <h3 className="text-xl md:text-2xl font-bold font-heading mb-2 uppercase tracking-widest text-white group-hover:glitch" data-text={project.name}>
            {project.name}
          </h3>
          
          <div className="bg-gray-900/50 p-4 border border-gray-800 font-mono text-sm text-gray-300 mb-4 relative overflow-hidden h-24">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none"></div>
            <p className="relative z-10 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1" style={{ color }}>
              <Code2 size={14} /> {project.language}
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400" /> {project.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={14} className="text-gray-500" /> {project.forks_count}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon size={14} /> {new Date(project.updated_at).toLocaleDateString()}
            </span>
          </div>

          {project.tech && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-1 bg-gray-800 border border-gray-700" style={{ color }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 border-t border-gray-800 pt-4 mt-auto translate-z-10">
          <a href={project.html_url} target="_blank" rel="noopener noreferrer" onMouseEnter={() => soundManager.play('hover')} onClick={() => soundManager.play('click')} className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors">
            <FaGithub size={16} /> [Source]
          </a>
          {project.homepage && project.homepage !== '' && (
            <a href={project.homepage} target="_blank" rel="noopener noreferrer" onMouseEnter={() => soundManager.play('hover')} onClick={() => soundManager.play('click')} className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors" style={{ color }}>
              <ExternalLink size={16} /> [Execute]
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { repos, loading, error } = useFetchGitHub('amannarang04');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'stars'
  const [languageFilter, setLanguageFilter] = useState('all');

  const sourceData = error || repos.length === 0 ? fallbackProjects : repos;

  const languages = ['all', ...new Set(sourceData.map(r => r.language).filter(Boolean))];

  const processedProjects = useMemo(() => {
    let filtered = [...sourceData];
    
    if (languageFilter !== 'all') {
      filtered = filtered.filter(p => p.language === languageFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      // recent
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

    return filtered.slice(0, 6);
  }, [sourceData, sortBy, languageFilter]);

  return (
    <section className="section-container relative z-10" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <AnimatedTitle text="DATABASE.PROJECTS()" speed={20} className="section-title mb-0" />
          
          {/* Controls */}
          <div className="flex flex-wrap gap-4 font-mono text-sm z-20 relative">
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 p-1 rounded shadow-lg">
              <span className="text-gray-500 px-2">Sort:</span>
              <button 
                onClick={() => setSortBy('recent')}
                onMouseEnter={() => soundManager.play('hover')}
                className={`px-3 py-1 rounded transition-colors ${sortBy === 'recent' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                Recent
              </button>
              <button 
                onClick={() => setSortBy('stars')}
                onMouseEnter={() => soundManager.play('hover')}
                className={`px-3 py-1 rounded transition-colors ${sortBy === 'stars' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-white'}`}
              >
                Stars
              </button>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 p-1 rounded shadow-lg">
              <span className="text-gray-500 px-2">Lang:</span>
              <select 
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                onMouseEnter={() => soundManager.play('hover')}
                className="bg-transparent text-cyan-400 outline-none cursor-pointer pr-2"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang} className="bg-gray-900 text-white">{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-cyan-400 font-mono">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p className="animate-pulse">Fetching repositories from GitHub matrix...</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded mb-8 font-mono text-sm">
            <AlertCircle size={16} />
            API connection failed. Loading local fallback records...
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {processedProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative h-full w-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && processedProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono border border-dashed border-gray-800 rounded">
            No projects found matching the current filters.
          </div>
        )}

        <div className="mt-12 text-center">
          <a 
            href="https://github.com/amannarang04?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundManager.play('hover')}
            onClick={() => soundManager.play('click')}
            className="inline-block cyber-btn border-green-500 text-green-400 hover:bg-green-500 hover:text-black shadow-[0_0_5px_#39ff14_inset,0_0_5px_#39ff14] hover:shadow-[0_0_20px_#39ff14_inset,0_0_20px_#39ff14]"
          >
            query_all_github_records()
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
