'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Projects', path: '/' },
    { name: 'Devlogs', path: '/devlogs' },
  ];

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Effect to prevent body scroll when menu is open
  if (typeof window !== 'undefined') {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-mono text-lg font-bold">
          joe chen
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = item.path === pathname || 
                (item.path !== '/' && pathname?.startsWith(item.path));
              
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`font-mono font-medium transition-colors ${
                    isActive 
                      ? 'text-black dark:text-white font-bold' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className="sm:hidden p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Inline Mobile menu implementation
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm sm:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={closeMobileMenu} />
          
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-background border-l border-gray-200 dark:border-gray-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <p className="font-bold font-mono">Menu</p>
              <button 
                onClick={closeMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 overflow-auto py-4">
              {navItems.map((item) => {
                const isActive = item.path === pathname || 
                  (item.path !== '/' && pathname?.startsWith(item.path));
                
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`font-mono block py-3 px-6 text-lg ${
                      isActive 
                        ? 'font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 font-mono">
              <p>© {new Date().getFullYear()} Indie Dev</p>
            </div>
          </div>
        </div>
      )} */}
    </header>
  );
}