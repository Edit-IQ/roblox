
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center justify-between w-14 h-8 rounded-full p-1 transition-all duration-300 focus:outline-none shadow-xl border ${
        theme === 'dark' ? 'bg-black border-white/10' : 'bg-slate-100 border-slate-200'
      }`}
    >
      <div
        className={`absolute w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center transform ${
          theme === 'dark' ? 'translate-x-6 bg-accent-red' : 'translate-x-0 bg-black'
        }`}
      >
        {theme === 'dark' ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-white" />
        )}
      </div>
      <Sun size={12} className={`ml-1.5 transition-opacity ${theme === 'dark' ? 'opacity-20' : 'opacity-100 text-slate-400'}`} />
      <Moon size={12} className={`mr-1.5 transition-opacity ${theme === 'dark' ? 'opacity-100 text-accent-red' : 'opacity-20'}`} />
    </button>
  );
};
