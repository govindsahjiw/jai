
"use client";
import React, { useState, useEffect } from "react";
import { FaAngular, FaNodeJs, FaReact, FaRobot, FaHome } from "react-icons/fa";
import { HiCode } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";

type PageKey = string; // Dynamically based on menu items fetched from API

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

interface HeaderProps {
  setSelectedItem: (item: PageKey) => void;
  menuItems: MenuItem[];
}

const Header: React.FC<HeaderProps> = ({ setSelectedItem, menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = (url: string) => {
    // Extract page key from the URL (e.g., /angular -> angular)
    const pageKey = url.replace(/^\//, '') as PageKey;
    if (menuItems.some(item => item.url === `/${pageKey}`)) {
      setSelectedItem(pageKey); // Dynamically set page key
    } else {
      setSelectedItem('home'); // Fallback to home if invalid page key
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                    className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer flex items-center px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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

      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon] || FaHome;
            return (
              <button
                key={item.url}
                onClick={() => {
                  handleItemClick(item.url);
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full py-2 text-gray-700 hover:text-blue-600"
              >
                <Icon className="mr-2" style={{ color: item.color }} />
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;

