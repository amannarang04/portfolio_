import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake boot sequence loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center font-mono text-cyan-400 p-5">
        <div className="w-full max-w-lg">
          <p className="text-green-500 mb-2">Initialize CyberBoot Sequence v1.0.4...</p>
          <p className="mb-2 opacity-80">Loading neural pathways...</p>
          <p className="mb-2 opacity-60">Connecting to the matrix...</p>
          <p className="mb-2 opacity-40">Decrypting user profile: AMAN NARANG...</p>
          <div className="mt-4 w-full h-2 border border-cyan-500 rounded overflow-hidden">
            <div className="h-full bg-cyan-500 shadow-[0_0_10px_#00ffff] animate-pulse" style={{ width: '100%', animationDuration: '2s' }}></div>
          </div>
          <p className="mt-2 text-center text-xs animate-pulse">ACCESS GRANTED</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white font-body selection:bg-cyan-500/30 selection:text-cyan-50">
      {/* Background Effects */}
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
