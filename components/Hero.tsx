
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SpeechBubble } from './SpeechBubble';

interface HeroProps {
  theme?: string;
}

export const Hero: React.FC<HeroProps> = ({ theme = 'dark' }) => {
  // 📱 MOBILE POSITION CONTROLS - Edit these values to adjust layout
  const mobileControls = {
    // Circle position & size
    circleTop: '50%',        // Move circle UP (lower %) or DOWN (higher %)
    circleSize: '80vw',      // Make circle BIGGER (higher vw) or SMALLER (lower vw)
    
    // ROBLOX text position & size
    textTop: '49%',          // Move text UP (lower %) or DOWN (higher %)
    textSize: '22vw',        // Make text BIGGER (higher vw) or SMALLER (lower vw)
    
    // Robux strip position
    stripTop: '40%',         // Move strip UP (lower %) or DOWN (higher %)
    
    // Character position & size
    characterBottom: '10%',  // Move character UP (use negative like '-50px') or DOWN (positive like '50px')
    characterHeight: '200vh', // Make character BIGGER (higher vh) or SMALLER (lower vh)
    characterLeft: '50%',    // Move character LEFT (lower %) or RIGHT (higher %) - ALWAYS use 50% for centered
    characterShift: '0px',   // Fine-tune LEFT/RIGHT position without affecting size (use negative for left, positive for right)
  };

  return (
    <section id="home" className={`relative h-[100vh] w-full flex items-center justify-center overflow-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-black' : 'bg-white'
    }`}>
      {/* Top Left: Category Tags - Hidden on mobile */}
      <div className="absolute top-20 sm:top-28 left-4 sm:left-8 z-40 hidden md:flex gap-4 sm:gap-8">
        <div className="flex flex-col gap-1">
          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/30' : 'text-black/30'
          }`}>DESIGN</span>
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-tight font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>THUMBNAILS</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/30' : 'text-black/30'
          }`}>GRAPHICS</span>
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-tight font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>BRANDING</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/30' : 'text-black/30'
          }`}>CREATIVE</span>
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-tight font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>ARTWORK</span>
        </div>
      </div>

      {/* Top Right: Category Tags - Hidden on mobile */}
      <div className="absolute top-20 sm:top-28 right-4 sm:right-8 z-40 hidden md:flex gap-4 sm:gap-8">
        <div className="flex flex-col gap-1 items-end">
          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/30' : 'text-black/30'
          }`}>PHOTOSHOP</span>
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-tight font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>EXPERT</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/30' : 'text-black/30'
          }`}>VISUAL</span>
          <span className={`font-semibold text-xs sm:text-sm uppercase tracking-tight font-body transition-colors duration-500 ${
            theme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>DESIGNER</span>
        </div>
      </div>

      {/* Large Circle Background - Subtle glow backdrop on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] sm:w-[32vw] lg:w-[23vw] h-[65vw] sm:h-[32vw] lg:h-[23vw] rounded-full z-10" 
           style={{ 
             background: 'radial-gradient(circle at center, #0EA5E9 0%, #0EA5E9 70%, rgba(100, 100, 100, 0.3) 95%, transparent 100%)'
           }}>
      </div>
      
      {/* Giant Title - ROBLOX - Center-based positioning */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-4">
        <h1 className={`text-[20vw] sm:text-[16vw] lg:text-[14vw] font-black leading-none select-none uppercase transition-colors duration-500 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`} 
            style={{ 
              fontFamily: 'Lilita One, Arial Black, sans-serif',
              fontWeight: '600',
              letterSpacing: '-0.03em',
              textShadow: theme === 'dark' ? '0 6px 12px rgba(0,0,0,0.3)' : '0 6px 12px rgba(0,0,0,0.1)'
            }}>
          ROBLOX
        </h1>
      </div>

      {/* Horizontal Strip of Icons - Center-based positioning */}
      <div className={`absolute top-1/2 translate-y-[15vw] sm:translate-y-[8vw] lg:translate-y-[5vw] w-[180%] sm:w-[170%] lg:w-[160%] left-1/2 -translate-x-1/2 h-[50px] sm:h-[55px] lg:h-[60px] flex items-center overflow-hidden z-25 rotate-[-4deg] origin-center backdrop-blur-sm transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-300/40'
      }`}>
        <div className="flex gap-2 sm:gap-2.5 lg:gap-3 animate-scroll-icons items-center">
           {[...Array(100)].map((_, i) => (
             <div key={i} className="shrink-0 w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] lg:w-[45px] lg:h-[45px] rounded-full bg-sky-500 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
               <img 
                 src="https://res.cloudinary.com/duvswaqcv/image/upload/v1771349518/960px-Robux_2019_Logo_gold.svg_a7f18f.png" 
                 className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 object-contain" 
                 alt="Robux" 
               />
             </div>
           ))}
        </div>
      </div>

      {/* Character - Scales from center, immersive on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-[95vw] sm:w-auto">
        <img 
          src="https://res.cloudinary.com/duvswaqcv/image/upload/v1771348330/ChatGPT_Image_Feb_17_2026_10_41_34_PM_dzfc4i.png" 
          alt="EditIQ Roblox Character"
          className="w-full sm:h-[650px] sm:w-auto lg:h-[88vh] object-contain"
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }}
        />
      </div>

      {/* Speech Bubble above character's head - positioned to the right */}
      <div className="absolute top-[20%] sm:top-[18%] lg:top-[14%] left-1/2 -translate-x-1/2 translate-y-0 z-40 pointer-events-none">
        <div className="relative left-[8%] sm:left-[22%] lg:left-[28%]">
          <SpeechBubble 
            text={`Hi! I'm Ankur
I'm a Roblox Thumbnail Designer`}
            theme={theme}
            type="thought"
          />
        </div>
      </div>

      {/* Bottom CTA - Responsive */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
        <a 
          href="#work" 
          className={`group flex items-center gap-2 sm:gap-3 transition-all duration-300 no-underline pointer-events-auto ${
            theme === 'dark' ? 'opacity-40 hover:opacity-100' : 'opacity-30 hover:opacity-100'
          }`}
        >
          <span className={`text-sm sm:text-lg uppercase tracking-widest font-body ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            View Thumbnails
          </span>
          <ArrowRight className={`group-hover:translate-x-1 transition-transform ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`} size={16} />
        </a>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-icons {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll-icons {
          animation: scroll-icons 35s linear infinite;
        }
      `}} />
    </section>
  );
};
