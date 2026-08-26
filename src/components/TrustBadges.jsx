import React from 'react';
import { Award, ShieldCheck, Gem, Layers, Clock, FileCheck } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function TrustBadges() {
  return (
    <section className="py-16 bg-[#3B101C] text-white border-y border-[#C5A059]/30 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#DFBA6A] text-xs font-bold uppercase tracking-[0.25em] block mb-2">
            Heritage & Integrity
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-4">
            Trust Built Across Generations
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            For four generations since 1912, our family has remained committed to absolute purity, 
            artisan craftsmanship, and transparent service in General Bazaar, Secunderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORE_DETAILS.trustPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-[#C5A059]/20 hover:border-[#C5A059]/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#DFBA6A]/10 border border-[#DFBA6A]/30 flex items-center justify-center text-[#DFBA6A] mb-4 group-hover:scale-110 transition-transform">
                {idx === 0 && <Clock className="w-6 h-6" />}
                {idx === 1 && <Award className="w-6 h-6" />}
                {idx === 2 && <ShieldCheck className="w-6 h-6" />}
                {idx === 3 && <Gem className="w-6 h-6" />}
                {idx === 4 && <Layers className="w-6 h-6" />}
                {idx === 5 && <FileCheck className="w-6 h-6" />}
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-white mb-2 group-hover:text-[#DFBA6A] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
