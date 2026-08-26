import React from 'react';
import { MessageCircle, Phone, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function BeadsPearlsPage({ onOpenWhatsApp }) {
  const items = [
    {
      title: "Precious Gemstone Beads",
      subtitle: "Ruby, Emerald & Sapphire Strings",
      description: "Fine hand-cut and smooth polished beads of natural rubies, emeralds, and sapphires strung in single, multi-strand, or gold-interspersed designs.",
      image: "/precious-beads.jpg"
    },
    {
      title: "Hyderabadi Basra & South Sea Pearls",
      subtitle: "Secunderabad's Pearl Legacy",
      description: "Lustrous natural and cultured pearls carrying Secunderabad's historic pearl tradition. Available in classic multi-strand necklaces, chokers, and pendant drops.",
      image: "/basra-pearls.jpg"
    },
    {
      title: "Natural Italian Red Coral (Pagam)",
      subtitle: "Natural Coral Beads & Cabochons",
      description: "Authentic deep red Italian corals selected for smooth texture, astrological purity, and gold-encased traditional stringing.",
      image: "/italian-coral.jpg"
    },
    {
      title: "Semi-Precious Specialty Beads",
      subtitle: "Tourmaline, Turquoise, Garnet & Jade",
      description: "A wide variety of colorful semi-precious beads for custom neckpieces, layered malas, and contemporary statement jewellery.",
      image: "/precious-beads.jpg"
    }
  ];

  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          SPECIALIST GEMSTONE & PEARL HOUSE
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          Beads, Pearls & Natural Corals
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Secunderabad has long been famous for its pearl and gemstone heritage. We present an exquisite collection 
          of precious gemstone beads, Hyderabadi Basra pearls, and natural corals for bespoke stringing.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#C5A059]/30 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/90 via-[#2D0A14]/30 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold text-[#DFBA6A] uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={onOpenWhatsApp}
                    className="w-full py-3 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#DFBA6A]" /> Enquire About Collection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
