
import React from 'react';
import { ThumbnailItem, Theme } from '../types';

interface ThumbnailCardProps {
  item: ThumbnailItem;
  theme: Theme;
  onClick: (item: ThumbnailItem) => void;
  hasFade?: boolean;
}

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ item, onClick, theme, hasFade = false }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className="group cursor-pointer relative"
    >
      <div className={`relative aspect-video rounded-[1.5rem] overflow-hidden border transition-all duration-700 group-hover:scale-[1.03] ${
        theme === 'dark' 
        ? 'border-white/5 group-hover:border-sky-500/50 group-hover:shadow-[0_0_60px_rgba(14,165,233,0.3)]' 
        : 'border-slate-200 group-hover:border-sky-500/50 group-hover:shadow-[0_0_60px_rgba(14,165,233,0.2)]'
      }`}>
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 backdrop-blur-md flex items-center justify-center border border-white/20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
        </div>
      </div>
      <div className="mt-2 px-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-500 mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.category}</h3>
          <h2 className="text-sm font-bold uppercase tracking-tight group-hover:text-sky-500 transition-colors">{item.title}</h2>
      </div>
    </div>
  );
};
