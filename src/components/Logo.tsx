import React, { useState } from 'react';
import { UtensilsCrossed, Flame } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20'
  };

  const textClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="brand-logo-container">
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center shrink-0 transition-transform hover:scale-105 duration-200`}>
        {!imageError ? (
          <img
            src={STORE_INFO.googleDriveLogoUrl}
            alt="Logotipo Giga's Pastelaria"
            className="w-full h-full object-contain select-none drop-shadow-sm"
            referrerPolicy="no-referrer"
            onError={() => {
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-stone-900 rounded-full flex flex-col items-center justify-center text-amber-400 relative overflow-hidden">
            <Flame className="w-5 h-5 text-red-500 animate-pulse absolute -top-1 right-0 opacity-80" />
            <span className="font-black text-xs text-amber-400 tracking-tighter uppercase font-heading leading-none">GIGA'S</span>
            <span className="text-[8px] font-bold text-white uppercase tracking-widest leading-none mt-0.5">PASTEL</span>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight font-heading text-stone-900 ${textClasses[size]} leading-none`}>
            GIGA'S
          </span>
          <span className={`font-extrabold tracking-tight font-heading text-red-600 ${textClasses[size]} leading-none`}>
            PASTELARIA
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-medium tracking-wide text-amber-700 uppercase mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping"></span>
            Porto Feliz - SP
          </span>
        )}
      </div>
    </div>
  );
};
