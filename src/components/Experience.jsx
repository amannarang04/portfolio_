import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import AnimatedTitle from './AnimatedTitle';

const timeline = [
  {
    type: 'Education',
    date: '2022 - Present',
    title: 'B.Tech in Computer Science',
    organization: 'University Name',
    description: 'Specializing in software engineering and artificial intelligence. Maintaining a strong GPA while actively participating in tech clubs.',
    color: 'var(--neon-cyan)'
  },
  {
    type: 'Experience',
    date: 'Summer 2024',
    title: 'Full Stack Developer Intern',
    organization: 'Tech Startup',
    description: 'Developed and maintained core features of the main product. Improved application performance by 30% through code optimization.',
    color: 'var(--neon-purple)'
  },
  {
    type: 'Achievement',
    date: 'March 2024',
    title: '1st Place, National Hackathon',
    organization: 'Hackathon Name',
    description: 'Built an AI-powered educational tool within 48 hours. Recognized for best technical implementation and innovative use of LLMs.',
    color: 'var(--neon-green)'
  },
  {
    type: 'Certification',
    date: 'January 2024',
    title: 'Advanced Prompt Engineering',
    organization: 'OpenAI / DeepLearning.AI',
    description: 'Mastered techniques for guiding large language models, mitigating hallucinations, and building robust AI agents.',
    color: 'var(--neon-pink)'
  }
];

const Experience = () => {
  return (
    <section className="section-container relative z-10" id="experience">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <AnimatedTitle text="TIMELINE.LOG()" speed={20} className="section-title text-right w-full block" />
        
        <div className="relative mt-16 max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-800 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
          
          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node */}
                <div className="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 rounded-full bg-gray-900 border-2 z-10"
                     style={{ borderColor: item.color, boxShadow: `0 0 10px ${item.color}` }}>
                </div>
                
                {/* Content Area */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className={`cyber-card p-6 ${idx % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono uppercase tracking-widest px-2 py-1 bg-gray-900 border" style={{ color: item.color, borderColor: item.color }}>
                        {item.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-gray-500">
                        <Calendar size={12} /> [{item.date}]
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold font-heading text-white mt-4 mb-1">
                      {item.title}
                    </h3>
                    <h4 className="text-sm font-mono text-gray-400 mb-4">
                      @ {item.organization}
                    </h4>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
