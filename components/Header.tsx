import React, { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';

interface HeaderProps {
  theme?: string;
  onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme = 'dark', onThemeToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-16 sm:h-20 z-[100] transition-colors duration-300 backdrop-blur-md border-b ${
        theme === 'dark' 
          ? 'bg-black/50 border-white/5' 
          : 'bg-white/50 border-black/5'
      }`}>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
          {/* EditIQ Logo - Comic Sans with colors - Responsive */}
          <div className="flex items-center gap-1">
            <span className="text-sky-500 text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>Edit</span>
            <span className={`text-2xl sm:text-3xl font-bold transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Comic Sans MS, cursive' }}>IQ</span>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-400 rounded-full"></div>
          </div>
          
          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {[
              { name: 'HOME', id: '#home' },
              { name: 'PORTFOLIO', id: '#work' },
              { name: 'ABOUT', id: '#about' },
              { name: 'CONTACT', id: '#contact' }
            ].map(item => (
              <a 
                key={item.name} 
                href={item.id}
                className={`text-xs sm:text-sm font-semibold tracking-wider no-underline uppercase font-body transition-colors duration-500 ${
                  theme === 'dark' 
                    ? 'text-slate-400 hover:text-white' 
                    : 'text-slate-600 hover:text-black'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          
          {/* Icons - Responsive */}
          <div className={`flex items-center gap-3 sm:gap-6 transition-colors duration-500 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
            {/* Theme Toggle */}
            <button 
              onClick={onThemeToggle}
              className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all flex items-center px-1 ${
                theme === 'dark' 
                  ? 'bg-slate-700 hover:bg-slate-600' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label="Toggle theme"
            >
              <div 
                className={`absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-sky-500 transition-all duration-300 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon size={10} className="text-white sm:w-3 sm:h-3" />
                ) : (
                  <Sun size={10} className="text-white sm:w-3 sm:h-3" />
                )}
              </div>
            </button>
            
            {/* Hamburger Menu - Only on mobile/tablet */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden hover:text-sky-500 transition-colors p-2" 
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X size={24} strokeWidth={2} />
              ) : (
                <Menu size={24} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 backdrop-blur-md ${
            theme === 'dark' ? 'bg-black/80' : 'bg-white/80'
          }`}
          onClick={toggleMenu}
        ></div>
        
        {/* Menu Content - Compact */}
        <div className={`absolute top-16 sm:top-20 right-4 w-64 transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        } ${
          theme === 'dark' 
            ? 'bg-slate-900/95 border border-white/10' 
            : 'bg-white/95 border border-black/10'
        }`}>
          <nav className="flex flex-col p-4 gap-1">
            {[
              { name: 'HOME', id: '#home' },
              { name: 'PORTFOLIO', id: '#work' },
              { name: 'ABOUT', id: '#about' },
              { name: 'CONTACT', id: '#contact' }
            ].map((item, index) => (
              <a 
                key={item.name} 
                href={item.id}
                onClick={handleNavClick}
                className={`text-sm font-bold tracking-wider no-underline uppercase py-3 px-4 rounded-lg transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'text-slate-300 hover:text-white hover:bg-sky-500/20' 
                    : 'text-slate-700 hover:text-black hover:bg-sky-500/10'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMenuOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}} />
    </>
  );
};
