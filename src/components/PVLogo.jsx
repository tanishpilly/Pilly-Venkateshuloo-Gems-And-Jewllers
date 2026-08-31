import React from 'react';

export default function PVLogo({ size = "md", variant = "light", showText = true }) {
  const logoDimensions = {
    sm: "h-8 sm:h-9 md:h-10 w-auto",
    md: "h-10 sm:h-11 md:h-12 w-auto",
    lg: "h-14 sm:h-16 md:h-20 w-auto",
    xl: "h-20 sm:h-24 md:h-28 w-auto"
  };

  const textSizes = {
    sm: { title: "text-xs sm:text-sm md:text-base", sub: "text-[8px] sm:text-[9px] md:text-[10px]" },
    md: { title: "text-sm sm:text-base md:text-lg", sub: "text-[9px] sm:text-[10px] md:text-[11px]" },
    lg: { title: "text-base sm:text-lg md:text-xl lg:text-2xl font-bold", sub: "text-[10px] sm:text-xs" },
    xl: { title: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold", sub: "text-xs sm:text-sm" }
  };

  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 select-none max-w-full group">
      {/* Official PV Monogram Image with Transparent Background */}
      <img
        src="/pv-logo.png"
        alt="PV Monogram Logo - Pilly Venkateshuloo Gems and Jewellers"
        className={`${logoDimensions[size] || logoDimensions.md} object-contain shrink-0 transition-transform duration-300 group-hover:scale-105`}
      />
      
      {showText && (
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <span className={`font-serif-luxury font-bold tracking-wide leading-tight whitespace-nowrap ${textSizes[size]?.title || 'text-base'} ${isDark ? 'text-white' : 'text-[#3B101C]'}`}>
            PILLY VENKATESHULOO
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 whitespace-nowrap overflow-hidden">
            <span className={`tracking-wider uppercase font-semibold ${textSizes[size]?.sub || 'text-[10px]'} ${isDark ? 'text-[#DFBA6A]' : 'text-[#9E7934]'}`}>
              Gems & Jewellers
            </span>
            <span className="h-1 w-1 rounded-full bg-[#C5A059] opacity-60 shrink-0"></span>
            <span className={`text-[8px] sm:text-[9px] md:text-[10px] tracking-wider uppercase font-semibold shrink-0 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              ESTD 1912
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
