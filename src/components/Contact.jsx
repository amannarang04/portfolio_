import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="section-container relative z-10" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="section-title text-center w-full block">COMM_LINK.ESTABLISH()</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">

          {/* Contact Form */}
          <div className="cyber-card p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
              <Terminal size={24} className="text-cyan-400" />
              <h3 className="text-xl font-mono text-white">/bin/send_message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">--name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 text-white p-3 font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Enter alias"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">--email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 text-white p-3 font-mono focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter comm address"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">--payload</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 text-white p-3 font-mono focus:outline-none focus:border-green-500 transition-colors resize-none"
                  placeholder="Enter transmission data..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="w-full cyber-btn flex items-center justify-center gap-2 mt-4"
              >
                {status === 'idle' && <><Send size={18} /> Execute Transmission</>}
                {status === 'sending' && <span className="animate-pulse">Encrypting & Sending...</span>}
                {status === 'success' && <span className="text-green-400">Transmission Successful!</span>}
              </button>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-heading text-white mb-4 uppercase tracking-wider">
                Direct <span className="text-cyan-400 glow-cyan">Connection</span>
              </h3>
              <p className="text-gray-400 text-lg">
                My inbox is always open. Whether you have a question, a project proposal, or just want to discuss the latest in AI and web development, I'll try my best to get back to you!
              </p>
            </div>

            <div className="cyber-card p-6 border-l-4 border-l-purple-500">
              <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors cursor-pointer group">
                <div className="p-3 bg-gray-900 rounded-full group-hover:bg-purple-500/20 transition-colors">
                  <Mail className="group-hover:text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-mono text-gray-500">Primary Protocol</div>
                  <div className="font-mono text-lg">contact@amannarang.dev</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="#" className="p-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all rounded-lg group">
                <FaGithub size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all rounded-lg group">
                <FaLinkedin size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all rounded-lg group">
                <FaTwitter size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
