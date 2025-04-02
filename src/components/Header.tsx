"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaAngular, FaNodeJs, FaReact, FaRobot, FaHome } from "react-icons/fa";
import { HiCode } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";

type PageKey = string;

const iconMap: Record<string, React.ElementType> = {
  FaAngular,
  FaNodeJs,
  FaReact,
  FaRobot,
  HiCode,
  FaHome,
};

interface MenuItem {
  name: string;
  icon: string;
  url: string;
  color?: string;
}

const Header: React.FC<{ setSelectedItem: (item: PageKey) => void; menuItems: MenuItem[] }> = ({ 
  setSelectedItem, 
  menuItems 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (url: string) => {
    const pageKey = url.replace(/^\//, '') as PageKey;
    setSelectedItem(menuItems.some(item => item.url === `/${pageKey}`) ? pageKey : 'home');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => {
                const Icon = iconMap[item.icon] || FaHome;
                return (
                  <button
                    key={item.url}
                    onClick={() => handleItemClick(item.url)}
                    className="cursor-pointer flex items-center px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Icon className="mr-2" style={{ color: item.color }} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div 
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">jAI</h2>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || FaHome;
            return (
              <button
                key={item.url}
                onClick={() => handleItemClick(item.url)}
                className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <Icon className="mr-3 text-lg" style={{ color: item.color }} />
                <span className="text-base">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Semi-transparent overlay (hidden but still captures clicks) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 opacity-0"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;