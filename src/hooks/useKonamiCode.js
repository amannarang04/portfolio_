import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const useKonamiCode = (callback) => {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => {
        // e.key handles 'b' and 'a' regardless of layout, 
        // fallback to e.code for arrows if needed, but e.key works for arrows too
        const key = e.key.startsWith('Arrow') ? e.key : e.key.toLowerCase();
        const newKeys = [...prevKeys, key].slice(-10);
        
        if (newKeys.join(',') === KONAMI_CODE.join(',')) {
          callback();
          return [];
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
};
