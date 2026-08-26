import React from 'react';

export default function PVLogo({ size = "md", variant = "light", showText = true }) {
  const logoDimensions = {
    sm: "h-9 sm:h-10 w-auto",
    md: "h-11 sm:h-12 w-auto",
    lg: "h-16 sm:h-20 w-auto",
    xl: "h-24 sm:h-28 w-auto"
  };

  const textSizes = {
    sm: { title: "text-sm sm:text-base", sub: "text-[9px] sm:text-[10px]" },
    md: { title: "text-base sm:text-lg", sub: "text-[10px] sm:text-[11px]" },
    lg: { title: "text-xl sm:text-2xl font-bold", sub: "text-xs" },
    xl: { title: "text-2xl sm:text-3xl font-bold", sub: "text-sm" }
  };

  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-2.5 select-none shrink-0 group">
      {/* Official PV Monogram Image with Transparent Background */}
      <img
        src="/pv-logo.png"
        alt="PV Monogram Logo - Pilly Venkateshuloo Gems and Jewellers"
        className={`${logoDimensions[size] || logoDimensions.md} object-contain shrink-0 transition-transform duration-300 group-hover:scale-105`}
      />
      
      {showText && (
        <div className="flex flex-col justify-center shrink-0">
          <span className={`font-serif-luxury font-bold tracking-wider leading-tight whitespace-nowrap ${textSizes[size]?.title || 'text-base'} ${isDark ? 'text-white' : 'text-[#3B101C]'}`}>
            PILLY VENKATESHULOO
          </span>
          <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
            <span className={`tracking-[0.15em] uppercase font-semibold ${textSizes[size]?.sub || 'text-[10px]'} ${isDark ? 'text-[#DFBA6A]' : 'text-[#9E7934]'}`}>
              Gems & Jewellers
            </span>
            <span className="h-1 w-1 rounded-full bg-[#C5A059] opacity-60 shrink-0"></span>
            <span className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold shrink-0 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              ESTD 1912
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
