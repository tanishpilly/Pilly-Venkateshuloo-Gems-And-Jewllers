import React from 'react';
import { SILVER_JEWELLERY_ITEMS } from '../data/collectionsData';
import { ShieldCheck, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function SilverJewelleryPage({ onOpenWhatsApp }) {
  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          92.5 STERLING SILVER COLLECTION
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          92.5 Sterling Silver Jewellery
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Discover our range of 92.5 sterling silver ornaments, featuring men's solid silver kadas, traditional anklets, 
          contemporary daily wear pieces, and divine silver articles.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SILVER_JEWELLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#C5A059]/30 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/30 flex items-center justify-center text-[#3B101C]">
                  <Sparkles className="w-6 h-6 text-[#C5A059]" />
                </div>
                <span className="text-[10px] font-bold text-[#9E7934] uppercase tracking-wider block">
                  {item.type}
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C]">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  onClick={onOpenWhatsApp}
                  className="w-full py-3 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#DFBA6A]" /> Enquire on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3B101C] text-white p-8 rounded-3xl border border-[#C5A059]/40 text-center space-y-4">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#DFBA6A]">
            Men's Silver Kadas & Heavy Chains Specialist
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            We specialize in custom sizing and heavy solid 92.5 silver kadas, bracelets, and chains for men. 
            Visit our General Bazaar store to try our fittings in person.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={onOpenWhatsApp}
              className="px-6 py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Discuss Men's Silver Range
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
