import { Howl, Howler } from 'howler';

// Check if user previously muted the site
const isMuted = localStorage.getItem('portfolio_muted') === 'true';

// Base volume
const baseVolume = 0.5;
Howler.volume(isMuted ? 0 : baseVolume);

// Define sounds
// Using relative paths to public/sounds/ folder.
// Ensure these files exist or Howler will just silently fail to play them.
const sounds = {
  boot: new Howl({ src: ['/sounds/boot.mp3'], volume: 0.7 }),
  click: new Howl({ src: ['/sounds/click.mp3'], volume: 0.5 }),
  hover: new Howl({ src: ['/sounds/hover.mp3'], volume: 0.3 }),
  typing: new Howl({ src: ['/sounds/typing.mp3'], volume: 0.4, loop: true }),
  terminalOpen: new Howl({ src: ['/sounds/terminal-open.mp3'], volume: 0.6 }),
  success: new Howl({ src: ['/sounds/success.mp3'], volume: 0.6 }),
  error: new Howl({ src: ['/sounds/error.mp3'], volume: 0.6 }),
  glitch: new Howl({ src: ['/sounds/glitch.mp3'], volume: 0.5 }),
};

export const soundManager = {
  play: (soundName) => {
    if (sounds[soundName]) {
      sounds[soundName].play();
    }
  },
  stop: (soundName) => {
    if (sounds[soundName]) {
      sounds[soundName].stop();
    }
  },
  stopAll: () => {
    Object.values(sounds).forEach(sound => sound.stop());
  },
  toggleMute: () => {
    const currentlyMuted = localStorage.getItem('portfolio_muted') === 'true';
    const newMutedState = !currentlyMuted;
    
    localStorage.setItem('portfolio_muted', newMutedState.toString());
    Howler.volume(newMutedState ? 0 : baseVolume);
    
    return newMutedState;
  },
  isMuted: () => localStorage.getItem('portfolio_muted') === 'true',
  setVolume: (vol) => {
    // vol should be between 0.0 and 1.0
    Howler.volume(localStorage.getItem('portfolio_muted') === 'true' ? 0 : vol);
  }
};
