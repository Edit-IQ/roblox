import React, { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { ThumbnailItem, Theme } from '../types';

interface ProjectModalProps {
  item: ThumbnailItem | null;
  theme: Theme;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ item, onClose }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 10);
    } else {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [item]);

  const handleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!imageContainerRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await imageContainerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  if (!item) return null;

  return (
    <div 
      className={`fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-xl cursor-zoom-out transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className={`absolute top-2 right-2 sm:top-4 sm:right-4 z-[2001] p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <X size={24} className="sm:w-7 sm:h-7" />
      </button>

      <button 
        onClick={handleFullscreen}
        className={`absolute top-2 right-14 sm:top-4 sm:right-20 z-[2001] p-2 sm:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
        style={{ transitionDelay: '200ms' }}
        title="Fullscreen"
      >
        <Maximize2 size={24} className="sm:w-7 sm:h-7" />
      </button>

      <div 
        ref={imageContainerRef}
        className="w-[95vw] h-[95vh] flex items-center justify-center bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className={`w-full h-full object-contain transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        />
      </div>
    </div>
  );
};
