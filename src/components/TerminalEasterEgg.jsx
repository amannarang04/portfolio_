import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'CYBER TERMINAL v2.077 - AMAN.SYS' },
    { type: 'output', text: 'Type "help" for available commands.' }
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + ~ or Ctrl + `
      if (e.ctrlKey && (e.key === '`' || e.key === '~')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  const processCommand = (cmd) => {
    const command = cmd.trim().toLowerCase();
    
    if (!command) return;

    let response = '';

    switch (command) {
      case 'help':
        response = `Available commands:\n- about: Display bio\n- skills: List tech stack\n- projects: View projects\n- clear: Clear terminal\n- whoami: Display current user\n- date: Show system time\n- hack: Initialize override protocol\n- exit: Close terminal`;
        break;
      case 'about':
        response = 'AMAN NARANG - Full Stack Developer | Prompt Engineer\nArchitecting digital solutions in the neon-lit intersection of clean code and artificial intelligence.';
        break;
      case 'skills':
        response = 'Frontend: React, Next.js, Tailwind CSS\nBackend: Node.js, Python, MongoDB\nAI: LangChain, Prompt Engineering, OpenAI API';
        break;
      case 'projects':
        response = '1. Mental Health Bot\n2. Open Supply Environment\n3. Flight Tracker\n4. Cyber Portfolio';
        break;
      case 'whoami':
        response = 'root@aman';
        break;
      case 'date':
        response = `SYSTEM_TIME: [${new Date().toISOString()}]`;
        break;
      case 'hack':
        response = 'ACCESS DENIED. SECURE CONNECTION REQUIRED.\nJust kidding! Matrix rain initialized on main screen...';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      case 'sudo':
        response = 'Nice try, but you are already root.';
        break;
      default:
        response = `bash: ${command}: command not found`;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: `root@aman:~$ ${cmd}` },
      { type: 'output', text: response }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 md:bottom-10 md:right-10 w-[90vw] md:w-[600px] h-[400px] z-[100] wireframe-border"
          style={{ cursor: 'auto' }}
        >
          <div className="w-full h-full bg-[#050816]/95 flex flex-col backdrop-blur-md overflow-hidden rounded-lg">
            {/* Terminal Header */}
          <div className="bg-gray-900 border-b border-cyan-500/50 p-2 flex justify-between items-center cursor-move">
            <div className="flex items-center gap-2 text-cyan-500">
              <Terminal size={16} />
              <span className="font-mono text-sm">terminal.exe</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
            {history.map((line, idx) => (
              <div key={idx} className={`mb-2 ${line.type === 'input' ? 'text-cyan-400' : 'text-gray-300'}`}>
                {line.type === 'output' && line.text.includes('\n') ? (
                  line.text.split('\n').map((l, i) => <div key={i}>{l}</div>)
                ) : (
                  line.text
                )}
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex mt-2 items-center">
              <span className="text-cyan-500 mr-2">root@aman:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                spellCheck={false}
                autoFocus
              />
            </form>
            <div ref={bottomRef} />
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalEasterEgg;
