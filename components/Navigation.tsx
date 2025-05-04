'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Projects', path: '/' },
    { name: 'Devlogs', path: '/devlogs' },
  ];

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
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      
      {/* Mobile menu component */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
}