'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Projects', path: '/' },
    { name: 'Devlogs', path: '/devlogs' },
  ];

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname, isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-background border-l border-gray-200 dark:border-gray-800 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <p className="font-bold font-mono">Menu</p>
          <button 
            onClick={onClose}
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
                onClick={onClose}
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
  );
}