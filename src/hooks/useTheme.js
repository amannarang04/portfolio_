import { useState, useEffect } from 'react';
import { themes } from '../config/themes';
import { soundManager } from '../utils/soundManager';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('cyber');

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio_theme');
    if (savedTheme && themes[savedTheme]) {
      applyTheme(savedTheme);
    } else {
      applyTheme('cyber'); // Default
    }
  }, []);

  const applyTheme = (themeId) => {
    const theme = themes[themeId];
    if (!theme) return;

    // Apply CSS variables to root
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Save to local storage
    localStorage.setItem('portfolio_theme', themeId);
    setCurrentTheme(themeId);
    
    // Dispatch custom event if other components need to know
    window.dispatchEvent(new CustomEvent('themeChange', { detail: themeId }));
  };

  const changeTheme = (themeId) => {
    applyTheme(themeId);
    soundManager.play('success');
  };

  return { currentTheme, changeTheme, themes };
};
