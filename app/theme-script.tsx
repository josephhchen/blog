'use client';

import { useEffect } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      
      const initialTheme = savedTheme || 'light';
      
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return null;
}