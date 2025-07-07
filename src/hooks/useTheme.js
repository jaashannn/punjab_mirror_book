import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      switch (prev) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'sepia';
        case 'sepia':
          return 'light';
        default:
          return 'light';
      }
    });
  };

  const setThemeDirectly = (newTheme) => {
    if (['light', 'dark', 'sepia'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  return {
    theme,
    toggleTheme,
    setTheme: setThemeDirectly
  };
};