import React, { useState, useEffect } from 'react';
import { fetchPublishedDesigns } from '../services/cmsService';
import { MessageCircle, Phone, Sparkles, Layers, ArrowRight, Eye } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function BeadsPearlsPage({ onOpenWhatsApp, onSelectDesign }) {
  const [cmsDesigns, setCmsDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBeadsDesigns();
  }, []);

  const loadBeadsDesigns = async () => {
    setLoading(true);
    try {
      const data = await fetchPublishedDesigns('Beads');
      setCmsDesigns(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Dynamic Published Beads, Pearls & Corals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.2em] block">
            Store Catalogue
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B101C]">
            Beads, Pearls & Coral Collections
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto"></div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500 font-medium">
            Loading Beads & Pearls Catalogue...
          </div>
        ) : cmsDesigns.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-white p-8 rounded-3xl border border-dashed border-gray-200">
            <Layers className="w-8 h-8 text-[#C5A059] mx-auto" />
            <p className="text-sm font-semibold text-gray-700">No published beads or pearl designs available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cmsDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => onSelectDesign && onSelectDesign(design)}
                className="bg-white rounded-3xl border border-[#C5A059]/30 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={design.images && design.images[0] ? design.images[0] : '/precious-beads.jpg'}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/90 via-[#2D0A14]/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-[10px] font-bold text-[#DFBA6A] uppercase tracking-wider block">
                      {design.category}
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-bold">
                      {design.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                    {design.description || 'Custom hand-cut beads, Hyderabadi Basra pearls, or natural corals.'}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B101C] flex items-center gap-1">
                      <Eye className="w-4 h-4 text-[#C5A059]" /> View Details
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWhatsApp();
                      }}
                      className="py-3 px-6 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-[#DFBA6A]" /> Enquire About Collection
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
