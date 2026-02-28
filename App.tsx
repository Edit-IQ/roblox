
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThumbnailCard } from './components/ThumbnailCard';
import { ProjectModal } from './components/ProjectModal';
import { ThemeToggle } from './components/ThemeToggle';
import { PORTFOLIO_ITEMS, REVIEWS, ORDER_PACKAGES } from './constants';
import { ThumbnailItem, Theme } from './types';
import { Check, Mail, Instagram, Twitter, Send, Github } from 'lucide-react';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ThumbnailItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(PORTFOLIO_ITEMS.length / itemsPerPage);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleSeeMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setCurrentPage(0);
    // Scroll to work section smoothly
    setTimeout(() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const [scrollPosition, setScrollPosition] = React.useState(0);
  const itemsPerRow = 3;
  const rowHeight = 400; // Approximate height of each row including gap
  const visibleRows = 2;
  const totalRows = Math.ceil(PORTFOLIO_ITEMS.length / itemsPerRow);
  const maxScroll = Math.max(0, (totalRows - visibleRows) * rowHeight);

  const handleNextPage = () => {
    setScrollPosition(prev => {
      const newPos = Math.min(prev + rowHeight, maxScroll);
      const container = document.getElementById('thumbnail-scroll');
      if (container) {
        const grid = container.firstElementChild as HTMLElement;
        if (grid) {
          grid.style.transition = 'transform 0.7s ease-in-out';
          grid.style.transform = `translateY(-${newPos}px)`;
        }
      }
      return newPos;
    });
  };

  const handlePrevPage = () => {
    setScrollPosition(prev => {
      const newPos = Math.max(prev - rowHeight, 0);
      const container = document.getElementById('thumbnail-scroll');
      if (container) {
        const grid = container.firstElementChild as HTMLElement;
        if (grid) {
          grid.style.transition = 'transform 0.7s ease-in-out';
          grid.style.transform = `translateY(-${newPos}px)`;
        }
      }
      return newPos;
    });
  };

  const displayedItems = showAll 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      theme === 'dark' 
        ? 'bg-black text-white selection:bg-sky-500/30' 
        : 'bg-white text-slate-900 selection:bg-sky-500/20'
    }`}>
      <Header theme={theme} onThemeToggle={toggleTheme} />

      {/* SECTION: HOME - Full width */}
      <Hero theme={theme} />

      <main className="max-w-[1800px] mx-auto">

        {/* SECTION: WORK */}
        <section id="work" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 relative">
          <div className="flex flex-col items-center mb-12 sm:mb-16 lg:mb-24">
            <span className="text-sky-500 text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4">PRODUCTION REEL</span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight uppercase text-center">Selected Works</h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-sky-500 mt-4 sm:mt-5 lg:mt-6"></div>
          </div>
          
          {/* Scrollable container for thumbnails with arrow controls */}
          <div className="relative">
            {/* Up Arrow */}
            <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 z-50">
              <button 
                onClick={handlePrevPage}
                className={`p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-sky-500 text-white' 
                    : 'bg-black/10 hover:bg-sky-500 text-black hover:text-white'
                }`}
                aria-label="Scroll up"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>

          {/* Scrollable container - no manual scroll, only button control */}
          <div className="relative">
            {/* Container with overflow hidden */}
            <div id="thumbnail-scroll" className="relative h-[800px] overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {PORTFOLIO_ITEMS.map((item, index) => (
                  <ThumbnailCard 
                    key={item.id} 
                    item={item} 
                    theme={theme} 
                    onClick={setSelectedItem}
                    hasFade={false}
                  />
                ))}
              </div>
            </div>

            {/* Gradient fade at bottom only */}
            <div className={`absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none ${
              theme === 'dark' 
                ? 'bg-gradient-to-t from-black via-black/80 to-transparent' 
                : 'bg-gradient-to-t from-white via-white/80 to-transparent'
            }`}></div>
          </div>

            {/* Down Arrow */}
            <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 z-50">
              <button 
                onClick={handleNextPage}
                className={`p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                  theme === 'dark' 
                    ? 'bg-white/10 hover:bg-sky-500 text-white' 
                    : 'bg-black/10 hover:bg-sky-500 text-black hover:text-white'
                }`}
                aria-label="Scroll down"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:w-6 sm:h-6">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION: ABOUT ME */}
        <section id="about" className="py-24 sm:py-32 lg:py-40 px-6 sm:px-12 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/3 blur-[100px] rounded-full -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image side - Hidden on mobile */}
              <div className="relative group order-2 lg:order-1 hidden lg:block">
                <div className="absolute -inset-6 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="absolute -inset-4 border-2 border-sky-500/30 rounded-3xl group-hover:border-sky-500/50 transition-all duration-500"></div>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src="https://res.cloudinary.com/duvswaqcv/image/upload/v1771348330/ChatGPT_Image_Feb_17_2026_10_41_34_PM_dzfc4i.png" 
                      className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                      alt="About EditIQ" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-sky-500 blur-xl opacity-75 animate-pulse"></div>
                      <div className="relative bg-sky-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl border-2 border-sky-400">
                        DESIGNER'S CUT
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <div className="inline-block mb-6">
                  <span className="text-sky-500 text-xs font-bold tracking-widest uppercase px-4 py-2 bg-sky-500/10 rounded-full border border-sky-500/20">
                    DESIGNER PROFILE
                  </span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight uppercase leading-none">
                  MEET <span className="text-sky-500">EDITIQ</span>
                </h2>
                
                <p className={`text-lg leading-relaxed mb-10 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  I don't just design thumbnails. I create <span className="text-sky-500 font-semibold">visual narratives</span> that demand attention. 
                  In the fast-paced multiverse of Roblox content, your thumbnail is your movie poster.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-sky-500/20 hover:border-sky-500/40 hover:bg-white/10' 
                      : 'bg-slate-50 border-sky-500/20 hover:border-sky-500/40 hover:bg-slate-100'
                  }`}>
                    <h4 className="text-sky-500 font-black text-4xl mb-2">500+</h4>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">POSTERS CREATED</p>
                  </div>
                  <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-sky-500/20 hover:border-sky-500/40 hover:bg-white/10' 
                      : 'bg-slate-50 border-sky-500/20 hover:border-sky-500/40 hover:bg-slate-100'
                  }`}>
                    <h4 className="text-sky-500 font-black text-4xl mb-2">2.4M+</h4>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">VIEWS GENERATED</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="#contact" 
                    className="px-8 py-4 bg-sky-500 text-white font-bold uppercase text-sm rounded-xl hover:bg-sky-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/30"
                  >
                    LET'S WORK
                  </a>
                  <a 
                    href="#work" 
                    className={`px-8 py-4 font-bold uppercase text-sm rounded-xl transition-all duration-300 hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    VIEW WORK
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: CONTACT */}
        <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[150px] -z-10"></div>
          
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <span className="text-sky-500 text-xs font-bold tracking-widest uppercase px-4 py-2 bg-sky-500/10 rounded-full border border-sky-500/20">
                  CASTING CALL
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight uppercase">
                START <span className="text-sky-500">PRODUCTION</span>
              </h2>
              <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Ready to bring your story to the big screen? Let's collaborate on your next blockbuster.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black uppercase mb-6">Contact Information</h3>
                  
                  {/* Email */}
                  <div className={`flex items-center gap-4 p-6 rounded-2xl border mb-4 transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-sky-500/20 hover:border-sky-500/40' 
                      : 'bg-slate-50 border-sky-500/20 hover:border-sky-500/40'
                  }`}>
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1">EMAIL US</h4>
                      <p className="font-bold">contact.editiq@gmail.com</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className={`flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-sky-500/20 hover:border-sky-500/40' 
                      : 'bg-slate-50 border-sky-500/20 hover:border-sky-500/40'
                  }`}>
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
                      <Send size={24} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1">WHATSAPP</h4>
                      <p className="font-bold">+91 9434 8877 05</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-2xl font-black uppercase mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://instagram.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-sky-500 border border-white/10 text-white'
                          : 'bg-slate-100 hover:bg-sky-500 border border-slate-300 text-slate-700'
                      } hover:text-white`}
                      aria-label="Instagram"
                    >
                      <Instagram size={24} />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-sky-500 border border-white/10'
                          : 'bg-slate-100 hover:bg-sky-500 border border-slate-300'
                      } group`}
                      aria-label="Twitter/X"
                    >
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png" 
                        alt="Twitter" 
                        className={`w-6 h-6 ${theme === 'dark' ? 'invert' : ''} group-hover:invert-0 transition-all`}
                      />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-sky-500 border border-white/10 text-white'
                          : 'bg-slate-100 hover:bg-sky-500 border border-slate-300 text-slate-700'
                      } hover:text-white`}
                      aria-label="LinkedIn"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a 
                      href="https://pinterest.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-sky-500 border border-white/10'
                          : 'bg-slate-100 hover:bg-sky-500 border border-slate-300'
                      } group`}
                      aria-label="Pinterest"
                    >
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/14463/14463765.png" 
                        alt="Pinterest" 
                        className={`w-6 h-6 ${theme === 'dark' ? 'invert' : ''} group-hover:invert-0 transition-all`}
                      />
                    </a>
                    <a 
                      href="https://github.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                        theme === 'dark'
                          ? 'bg-white/5 hover:bg-sky-500 border border-white/10 text-white'
                          : 'bg-slate-100 hover:bg-sky-500 border border-slate-300 text-slate-700'
                      } hover:text-white`}
                      aria-label="GitHub"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className={`p-8 rounded-3xl border ${
                theme === 'dark' 
                  ? 'bg-white/5 border-sky-500/20' 
                  : 'bg-slate-50 border-sky-500/20'
              }`}>
                <h3 className="text-2xl font-black uppercase mb-6">Send Message</h3>
                <form className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="YOUR NAME" 
                    className={`w-full px-6 py-4 rounded-xl font-semibold uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500'
                        : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <input 
                    type="email" 
                    placeholder="YOUR EMAIL" 
                    className={`w-full px-6 py-4 rounded-xl font-semibold uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500'
                        : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <textarea 
                    placeholder="TELL US ABOUT THE PROJECT" 
                    rows={5}
                    className={`w-full px-6 py-4 rounded-xl font-semibold uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none ${
                      theme === 'dark'
                        ? 'bg-white/5 border border-white/10 text-white placeholder-slate-500'
                        : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-sky-500 text-white py-5 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-sky-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/30"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 border-t ${
        theme === 'dark' 
          ? 'bg-[#030303] border-sky-500/10' 
          : 'bg-slate-50 border-sky-500/10'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand */}
            <div className="flex items-center gap-6">
              <div className="border-2 border-sky-500 px-5 py-2 font-black text-2xl text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300 cursor-pointer">
                EDITIQ
              </div>
              <span className={`text-xs font-semibold tracking-wider uppercase ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
              }`}>
                © 2024 PRODUCTIONS • ALL RIGHTS RESERVED
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-8 text-xs font-semibold tracking-wide uppercase">
              <a 
                href="#home" 
                className={`transition-colors hover:text-sky-500 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                HOME
              </a>
              <a 
                href="#work" 
                className={`transition-colors hover:text-sky-500 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                WORK
              </a>
              <a 
                href="#about" 
                className={`transition-colors hover:text-sky-500 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                ABOUT
              </a>
              <a 
                href="#contact" 
                className={`transition-colors hover:text-sky-500 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                CONTACT
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-sky-500 hover:text-white ${
                  theme === 'dark'
                    ? 'bg-white/5 text-slate-400 border border-white/10'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-sky-500 hover:text-white ${
                  theme === 'dark'
                    ? 'bg-white/5 text-slate-400 border border-white/10'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-sky-500 hover:text-white ${
                  theme === 'dark'
                    ? 'bg-white/5 text-slate-400 border border-white/10'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="mailto:contact.editiq@gmail.com" 
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-sky-500 hover:text-white ${
                  theme === 'dark'
                    ? 'bg-white/5 text-slate-400 border border-white/10'
                    : 'bg-slate-100 text-slate-600 border border-slate-300'
                }`}
                aria-label="Mail"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ProjectModal 
        item={selectedItem} 
        theme={theme} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default App;
