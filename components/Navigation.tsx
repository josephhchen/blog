'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Projects', path: '/' },
    { name: 'Devlogs', path: '/devlogs' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="font-mono text-lg font-bold text-black dark:text-white hover:opacity-70 transition-opacity"
        >
          joe chen
        </Link>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = item.path === pathname || 
                (item.path !== '/' && pathname?.startsWith(item.path));
              
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`font-mono text-sm font-medium transition-all duration-200 relative group ${
                    isActive 
                      ? 'text-black dark:text-white' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-black dark:bg-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
          
          <ThemeToggle />
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
          
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-gray-200/20 dark:border-gray-800/20">
              <p className="font-bold font-mono">Menu</p>
              <button 
                onClick={closeMobileMenu}
                className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 py-6">
              {navItems.map((item) => {
                const isActive = item.path === pathname || 
                  (item.path !== '/' && pathname?.startsWith(item.path));
                
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`font-mono block py-4 px-6 text-base transition-all duration-200 ${
                      isActive 
                        ? 'font-medium text-black dark:text-white bg-gray-100/50 dark:bg-gray-800/50' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100/30 dark:hover:bg-gray-800/30'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-6 border-t border-gray-200/20 dark:border-gray-800/20 text-sm text-gray-500 dark:text-gray-400 font-mono">
              <p>© 2025 Joe Chen</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}