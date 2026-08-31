import React from 'react';

export default function PVLogo({ size = "md", variant = "light", showText = true }) {
  const logoDimensions = {
    sm: "h-7 sm:h-8 w-auto",
    md: "h-9 sm:h-10 w-auto",
    lg: "h-11 sm:h-14 w-auto",
    xl: "h-16 sm:h-20 w-auto"
  };

  const textSizes = {
    sm: { title: "text-[11px] sm:text-xs", sub: "text-[8px] sm:text-[9px]" },
    md: { title: "text-xs sm:text-sm font-bold", sub: "text-[9px] sm:text-[10px]" },
    lg: { title: "text-xs sm:text-sm md:text-base font-bold", sub: "text-[10px] sm:text-xs" },
    xl: { title: "text-sm sm:text-base md:text-lg font-bold", sub: "text-xs" }
  };

  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 select-none max-w-full group shrink-0">
      {/* Official PV Monogram Image with Transparent Background */}
      <img
        src="/pv-logo.png"
        alt="PV Monogram Logo - Pilly Venkateshuloo Gems and Jewellers"
        className={`${logoDimensions[size] || logoDimensions.md} object-contain shrink-0 transition-transform duration-300 group-hover:scale-105`}
      />
      
      {showText && (
        <div className="flex flex-col justify-center min-w-0">
          <span className={`font-serif-luxury font-bold tracking-normal leading-tight whitespace-nowrap ${textSizes[size]?.title || 'text-xs sm:text-sm'} ${isDark ? 'text-white' : 'text-[#3B101C]'}`}>
            PILLY VENKATESHULOO
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 whitespace-nowrap">
            <span className={`tracking-wider uppercase font-semibold ${textSizes[size]?.sub || 'text-[9px]'} ${isDark ? 'text-[#DFBA6A]' : 'text-[#9E7934]'}`}>
              Gems & Jewellers
            </span>
            <span className="h-1 w-1 rounded-full bg-[#C5A059] opacity-60 shrink-0"></span>
            <span className={`text-[8px] sm:text-[9px] tracking-widest uppercase font-semibold shrink-0 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              ESTD 1912
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
