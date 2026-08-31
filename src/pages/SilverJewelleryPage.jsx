import React, { useState, useEffect } from 'react';
import { fetchPublishedDesigns } from '../services/cmsService';
import { ShieldCheck, MessageCircle, Phone, Sparkles, Eye, Layers } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function SilverJewelleryPage({ onOpenWhatsApp, onSelectDesign }) {
  const [cmsDesigns, setCmsDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSilverDesigns();
  }, []);

  const loadSilverDesigns = async () => {
    setLoading(true);
    try {
      const data = await fetchPublishedDesigns('Silver Jewellery');
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

      {/* Visual Showcase Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C5A059]/40 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 h-[320px] sm:h-[400px]">
            <img
              src="/silver-jewellery.jpg"
              alt="Traditional Indian 92.5 Sterling Silver Anklets & Men's Kada"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 bg-[#3B101C] text-white p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <span className="text-[#DFBA6A] text-xs font-bold uppercase tracking-[0.2em] block">
              Pure 92.5 Hallmarked Silver
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
              Men's Silver Kadas, Heavy Chains & Traditional Anklets
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Crafted with authentic 92.5 silver purity, our silver line features solid bangles, payal anklets with bells, 
              durable chains, and customary pooja items.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Enquire Silver Range on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Published Silver Jewellery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.2em] block">
            Store Catalogue
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B101C]">
            92.5 Silver Jewellery Collection
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto"></div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500 font-medium">
            Loading Silver Jewellery Catalogue...
          </div>
        ) : cmsDesigns.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-white p-8 rounded-3xl border border-dashed border-gray-200">
            <Layers className="w-8 h-8 text-[#C5A059] mx-auto" />
            <p className="text-sm font-semibold text-gray-700">No published silver jewellery designs available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => onSelectDesign && onSelectDesign(design)}
                className="bg-white rounded-2xl border border-[#C5A059]/30 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="h-44 rounded-xl overflow-hidden bg-gray-100 relative">
                    <img
                      src={design.images && design.images[0] ? design.images[0] : '/silver-jewellery.jpg'}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#9E7934] uppercase tracking-wider block">
                    {design.category}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C] group-hover:text-[#9E7934] transition-colors">
                    {design.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 font-light">
                    {design.description || '92.5 Sterling silver ornament.'}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#3B101C] flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" /> Details
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenWhatsApp();
                    }}
                    className="px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-bold"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
