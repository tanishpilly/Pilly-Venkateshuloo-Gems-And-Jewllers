import React, { useState, useEffect } from 'react';
import { GEMSTONE_ITEMS } from '../data/collectionsData';
import { fetchPublishedDesigns } from '../services/cmsService';
import { Gem, ShieldCheck, MessageCircle, Phone, ArrowRight, Award, Eye } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function GemstonesPage({ onOpenWhatsApp, setActiveTab, onSelectDesign }) {
  const [cmsDesigns, setCmsDesigns] = useState([]);

  useEffect(() => {
    loadGemstoneDesigns();
  }, []);

  const loadGemstoneDesigns = async () => {
    try {
      const [rubies, emeralds, sapphires, gemstones] = await Promise.all([
        fetchPublishedDesigns('Precious Gemstones'),
        fetchPublishedDesigns('Semi-Precious Gemstones'),
        fetchPublishedDesigns('Rubies'),
        fetchPublishedDesigns('Emeralds'),
      ]);
      const combined = [...rubies, ...emeralds, ...sapphires, ...gemstones];
      const unique = Array.from(new Set(combined.map((a) => a.id)))
        .map((id) => combined.find((a) => a.id === id));
      setCmsDesigns(unique);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          OUR FOUNDING HERITAGE SINCE 1912
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          The World of Precious Gemstones
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Pilly Venkateshuloo Gems and Jewellers was founded in 1912 as a specialist gemstone house. 
          For over 112 years, we have provided collectors, connoisseurs, and families with natural, unheated, certified gemstones.
        </p>
      </section>

      {/* Gemstone Consultation & Certification Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#2D0A14] text-white p-8 sm:p-12 rounded-3xl border border-[#C5A059]/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-[#DFBA6A]">
              <Gem className="w-4 h-4" /> Natural Certified Precious Gemstones
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
              Gemstone Consultation & Certification Guidance
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Selecting the right natural gemstone requires expert assessment of color saturation, clarity, origin, cuts, and certification. 
              We offer personalized consultations for jewellery settings and astrological requirements with laboratory testing documentation.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#DFBA6A]">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> Natural Unheated Stones</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Laboratory Certification</span>
              <span className="flex items-center gap-1.5"><Gem className="w-4 h-4" /> Authentic Navratna Sets</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={onOpenWhatsApp}
              className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" /> Book Gemstone Consultation
            </button>
            <a
              href={STORE_DETAILS.phones[0].link}
              className="w-full py-4 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4" /> Call Store Specialist
            </a>
          </div>
        </div>
      </section>

      {/* Uploaded Published Gemstones CMS Grid */}
      {cmsDesigns.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.2em] block">
              Certified Store Inventory
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B101C]">
              Uploaded Precious Gemstone Collections
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cmsDesigns.map((design) => (
              <div
                key={design.id}
                onClick={() => onSelectDesign && onSelectDesign(design)}
                className="bg-white rounded-3xl border border-[#C5A059]/30 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={design.images && design.images[0] ? design.images[0] : '/gemstones-display.png'}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#3B101C]/80 text-[#DFBA6A] text-[11px] font-bold uppercase rounded-full">
                    {design.category}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#3B101C] group-hover:text-[#9E7934] transition-colors">
                      {design.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2 font-light">
                      {design.description || 'Natural certified gemstone available for consultation.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B101C] flex items-center gap-1 group-hover:underline">
                      <Eye className="w-4 h-4 text-[#C5A059]" /> View Stone Details
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenWhatsApp();
                      }}
                      className="px-3.5 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gemstones Visual Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            Precious Gemstone Specialties
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Curated category offerings available for store inspection and custom setting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GEMSTONE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#C5A059]/30 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold text-[#DFBA6A] uppercase tracking-wider block">
                    {item.type}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-white">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Certification:</span>
                  <span className="font-semibold text-[#3B101C] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    {item.certification}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={onOpenWhatsApp}
                    className="w-full py-3 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-[#DFBA6A]" /> Enquire About Stone
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Laboratory Certification Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3EEEA] p-8 rounded-2xl border border-[#C5A059]/30 text-center space-y-3">
          <Award className="w-8 h-8 text-[#C5A059] mx-auto" />
          <h3 className="font-serif-luxury text-2xl font-bold text-[#3B101C]">
            Authenticity & Laboratory Certification Guarantee
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            All high-value rubies, emeralds, sapphires, and unheated gemstones are provided with accredited gemstone laboratory certification documents specifying authenticity, natural origin, and treatment verification.
          </p>
        </div>
      </section>
    </div>
  );
}
