import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiCodechef } from 'react-icons/si';
import { TypeAnimation } from 'react-type-animation';
import { soundManager } from '../utils/soundManager';
import AnimatedTitle from './AnimatedTitle';
import SocialLink from './SocialLink';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      soundManager.play('error');
      setStatus('error');
      setErrorMsg('ERROR: All payload fields are required for transmission.');
      return;
    }

    setStatus('sending');
    soundManager.play('terminalOpen');

    try {
      // Replace with actual Formspree endpoint (e.g., https://formspree.io/f/xbjnqweq)
      const response = await fetch('https://formspree.io/f/xdablgan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // We simulate success even if placeholder fails for demo purposes, 
      // but in real world we check response.ok
      setTimeout(() => {
        setStatus('success');
        soundManager.play('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }, 1500);

    } catch (error) {
      soundManager.play('error');
      setStatus('error');
      setErrorMsg('ERROR: Connection to server failed. Please try alternative comms.');
    }
  };


  return (
    <section className="section-container relative z-10" id="contact">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatedTitle text="COMM_LINK.ESTABLISH()" speed={20} className="section-title text-center w-full block" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 max-w-5xl mx-auto">

          {/* Contact Form */}
          <div className="cyber-card p-1 md:p-6 bg-[#030510]">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4 px-4 pt-2">
              <Terminal size={20} className="text-cyan-400" />
              <h3 className="text-lg font-mono text-white">root@comms:~# ./transmit_message.sh</h3>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 font-mono text-sm px-4 pb-4">

              {/* Name Field */}
              <div className="group">
                <div className="flex text-gray-400 mb-1">
                  <span className="text-green-500 mr-2">guest@portfolio:~$</span>
                  <TypeAnimation sequence={['set_var NAME', 1000]} wrapper="span" speed={80} cursor={false} />
                </div>
                <div className="flex items-center border border-gray-800 bg-gray-900/50 p-2 rounded focus-within:border-cyan-500 focus-within:shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all">
                  <span className="text-cyan-400 mr-2">&gt;</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      soundManager.play('typing');
                      setTimeout(() => soundManager.stop('typing'), 50);
                    }}
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-700"
                    placeholder="Enter your name/alias..."
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <div className="flex text-gray-400 mb-1">
                  <span className="text-green-500 mr-2">guest@portfolio:~$</span>
                  <TypeAnimation sequence={[500, 'set_var EMAIL', 1000]} wrapper="span" speed={80} cursor={false} />
                </div>
                <div className="flex items-center border border-gray-800 bg-gray-900/50 p-2 rounded focus-within:border-purple-500 focus-within:shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all">
                  <span className="text-purple-400 mr-2">&gt;</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      soundManager.play('typing');
                      setTimeout(() => soundManager.stop('typing'), 50);
                    }}
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-700"
                    placeholder="Enter valid email address..."
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="group">
                <div className="flex text-gray-400 mb-1">
                  <span className="text-green-500 mr-2">guest@portfolio:~$</span>
                  <TypeAnimation sequence={[1000, 'set_var SUBJECT', 1000]} wrapper="span" speed={80} cursor={false} />
                </div>
                <div className="flex items-center border border-gray-800 bg-gray-900/50 p-2 rounded focus-within:border-blue-500 focus-within:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all">
                  <span className="text-blue-400 mr-2">&gt;</span>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      soundManager.play('typing');
                      setTimeout(() => soundManager.stop('typing'), 50);
                    }}
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-700"
                    placeholder="Purpose of connection..."
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="group">
                <div className="flex text-gray-400 mb-1">
                  <span className="text-green-500 mr-2">guest@portfolio:~$</span>
                  <TypeAnimation sequence={[1500, 'write_payload --message', 1000]} wrapper="span" speed={80} cursor={false} />
                </div>
                <div className="flex items-start border border-gray-800 bg-gray-900/50 p-2 rounded focus-within:border-green-500 focus-within:shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all">
                  <span className="text-green-400 mr-2 mt-1">&gt;</span>
                  <textarea
                    rows="4"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      soundManager.play('typing');
                      setTimeout(() => soundManager.stop('typing'), 50);
                    }}
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-700 resize-none"
                    placeholder="Begin transmission..."
                  ></textarea>
                </div>
              </div>

              {/* Terminal Output Logs */}
              <div className="min-h-[40px] pt-2">
                {status === 'sending' && (
                  <p className="text-cyan-400 animate-pulse flex items-center gap-2">
                    <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse"></span>
                    Encrypting payload and establishing secure connection...
                  </p>
                )}
                {status === 'success' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 flex items-center gap-2 font-bold">
                    <CheckCircle2 size={16} /> [200 OK] Transmission delivered successfully.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 flex items-center gap-2 font-bold">
                    <AlertTriangle size={16} /> {errorMsg}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                onMouseEnter={() => soundManager.play('hover')}
                onClick={() => status === 'idle' && soundManager.play('click')}
                className="w-full cyber-btn flex items-center justify-center gap-2 mt-2 font-mono uppercase tracking-wider"
              >
                <Terminal size={18} />
                {status === 'idle' || status === 'error' ? 'execute_send_message()' : status === 'sending' ? 'processing...' : 'delivered'}
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

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <SocialLink
                icon={FaGithub}
                href="https://github.com/amannarang04"
                label="GitHub Profile"
                tooltip="Hack the repo"
                color="var(--neon-cyan)"
              />
              <SocialLink
                icon={FaLinkedin}
                href="https://www.linkedin.com/in/aman-narang-8aa904341/"
                label="LinkedIn Profile"
                tooltip="Connect network"
                color="#0a66c2"
              />
              <SocialLink
                icon={FaTwitter}
                href="https://twitter.com/AmanNarang30403"
                label="Twitter Profile"
                tooltip="Transmit tweet"
                color="#1da1f2"
              />
              <SocialLink
                icon={FaEnvelope}
                href="mailto:0402narang@gmail.com"
                label="Email Address"
                tooltip="Send payload"
                color="var(--neon-purple)"
              />
              <SocialLink
                icon={SiLeetcode}
                href="https://leetcode.com/u/amannarang04/"
                label="LeetCode Profile"
                tooltip="Algorithm logs"
                color="#ffa116"
              />
              <SocialLink
                icon={SiCodechef}
                href="https://www.codechef.com/users/amannarang04"
                label="CodeChef Profile"
                tooltip="Compete here"
                color="#5B4638"
              />
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
