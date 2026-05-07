import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Terminal as TerminalIcon, CheckCircle2, X } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { createPortal } from 'react-dom';

const DownloadCV = ({ className, children }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const startDownload = () => {
    soundManager.play('click');
    soundManager.play('terminalOpen');
    setIsDownloading(true);
    setProgress(0);
    setLogs(['$ download_cv --format=pdf']);
    setIsComplete(false);

    const stages = [
      { progress: 10, log: '> Initializing secure connection...', delay: 400 },
      { progress: 30, log: '> Fetching resume data...', delay: 1000 },
      { progress: 50, log: '> Generating PDF...', delay: 1600 },
      { progress: 70, log: '[50%] Downloading...', delay: 2200 },
      { progress: 90, log: '[90%] Finalizing...', delay: 2800 },
      { progress: 100, log: '[100%] Download successful! ✓', delay: 3500 },
    ];

    // Play typing sound periodically
    const typingInterval = setInterval(() => {
      soundManager.play('typing');
    }, 600);

    stages.forEach(({ progress: stageProgress, log, delay }) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        setProgress(stageProgress);

        if (stageProgress === 100) {
          clearInterval(typingInterval);
          soundManager.stop('typing');
          soundManager.play('success');
          setIsComplete(true);
          
          // Actually trigger the download
          const link = document.createElement('a');
          link.href = '/Aman_Narang_Resume.pdf';
          link.download = 'Aman_Narang_Resume.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Auto-close after 2.5 seconds
          setTimeout(() => {
            setIsDownloading(false);
          }, 2500);
        }
      }, delay);
    });
  };

  const Overlay = () => {
    if (!isDownloading) return null;

    return createPortal(
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 50 }}
          className="fixed bottom-6 right-6 w-80 md:w-96 z-[9999] font-mono"
        >
          <div className="bg-black/95 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] rounded-lg overflow-hidden backdrop-blur-md">
            {/* Terminal Header */}
            <div className="bg-gray-900 border-b border-purple-500/30 p-2 flex justify-between items-center">
              <div className="flex items-center gap-2 text-purple-400">
                <TerminalIcon size={14} />
                <span className="text-xs">resume_downloader.exe</span>
              </div>
              <button 
                onClick={() => setIsDownloading(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 min-h-[160px] flex flex-col justify-end">
              <div className="space-y-1 mb-4 text-xs">
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={
                      log.startsWith('$') ? 'text-cyan-400 font-bold' :
                      log.includes('successful') ? 'text-green-400 font-bold' :
                      'text-gray-300'
                    }
                  >
                    {log}
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-auto">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-purple-400">Progress</span>
                  <span className={isComplete ? "text-green-400" : "text-purple-400"}>{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                  <motion.div 
                    className={`h-full ${isComplete ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-purple-500 shadow-[0_0_8px_#a855f7]'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            </div>

            {/* Success Overlay Notification */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-green-500/10 backdrop-blur-[2px] flex items-center justify-center border-2 border-green-500 rounded-lg"
                >
                  <motion.div 
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center gap-2 text-green-400 bg-gray-900/90 p-4 rounded-lg border border-green-500/50"
                  >
                    <CheckCircle2 size={32} />
                    <span className="font-bold tracking-widest text-sm">SECURE_DOWNLOAD_COMPLETE</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <>
      <button 
        onClick={startDownload}
        onMouseEnter={() => soundManager.play('hover')}
        className={className}
      >
        {children || (
          <>
            <Download size={20} />
            Download CV
          </>
        )}
      </button>
      <Overlay />
    </>
  );
};

export default DownloadCV;
