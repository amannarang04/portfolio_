import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(soundManager.isMuted());
  }, []);

  const handleToggle = () => {
    const newMutedState = soundManager.toggleMute();
    setIsMuted(newMutedState);
    if (!newMutedState) {
      soundManager.play('click');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-16 lg:top-6 lg:right-6 z-[90] p-3 rounded-full bg-black/50 border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/20 hover:border-cyan-500 transition-all duration-300 backdrop-blur-sm group"
      aria-label="Toggle Sound"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
      ) : (
        <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
      )}
      
      {/* Tooltip */}
      <span className="absolute -bottom-8 right-0 bg-black/80 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
      </span>
    </button>
  );
};

export default SoundToggle;
