'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme as 'light' | 'dark');
    
    applyTheme(initialTheme as 'light' | 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const applyTheme = (currentTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (currentTheme === 'dark') {
      root.classList.add('dark');
      document.body.style.setProperty('--background', '#0a0a0a');
      document.body.style.setProperty('--foreground', '#ededed');
    } else {
      root.classList.remove('dark');
      document.body.style.setProperty('--background', '#ffffff');
      document.body.style.setProperty('--foreground', '#171717');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-700" />
      ) : (
        <Sun size={20} className="text-yellow-300" />
      )}
    </button>
  );
}