import React, { useState, useEffect } from 'react';
import { GOLD_JEWELLERY_ITEMS } from '../data/collectionsData';
import { fetchPublishedDesigns } from '../services/cmsService';
import { ShieldCheck, MessageCircle, Phone, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function JewelleryPage({ onOpenWhatsApp, setActiveTab, onSelectDesign }) {
  const [cmsDesigns, setCmsDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoldDesigns();
  }, []);

  const loadGoldDesigns = async () => {
    try {
      const data = await fetchPublishedDesigns('Gold Jewellery');
      setCmsDesigns(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          CUSTOM MADE TO ORDER • 916 BIS HALLMARKED
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          916 BIS Hallmarked Gold Jewellery
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Every gold ornament at Pilly Venkateshuloo is custom-crafted to order according to your exact weight specifications, 
          design preferences, and gemstone choices, fully certified with 916 BIS Hallmarking.
        </p>
      </section>

      {/* Made to Order Process Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#3B101C] text-white p-8 sm:p-12 rounded-3xl border border-[#C5A059]/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-[#DFBA6A]">
              <ShieldCheck className="w-4 h-4" /> 100% Certified 916 BIS Hallmarked Gold
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Customised Gold Jewellery Made to Order
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              Because gold prices fluctuate daily with market rates and every piece of jewellery carries personal sentiment, 
              we craft bespoke pieces directly following customer consultation. Speak with Raghavendra Pilly and our master artisans 
              to bring your family heirlooms or custom bridal visions to life.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={onOpenWhatsApp}
              className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" /> Discuss Your Requirement
            </button>
            <a
              href={STORE_DETAILS.phones[0].link}
              className="w-full py-4 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4" /> Call Store Directly
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic Uploaded CMS Gold Designs Section */}
      {cmsDesigns.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.2em] block">
              Store Masterpieces
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B101C]">
              Uploaded Gold Jewellery Designs
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
                    src={design.images && design.images[0] ? design.images[0] : '/hero-jewellery.png'}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#3B101C]/80 text-[#DFBA6A] text-[11px] font-bold uppercase rounded-full">
                    916 Gold
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#3B101C] group-hover:text-[#9E7934] transition-colors">
                      {design.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-2 font-light">
                      {design.description || 'Custom crafted 916 gold ornament made to order.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B101C] flex items-center gap-1 group-hover:underline">
                      <Eye className="w-4 h-4 text-[#C5A059]" /> View Design Details
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

      {/* Showroom Collections Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            Featured Gold Jewellery Categories
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Visual inspiration for custom made-to-order gold manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GOLD_JEWELLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#C5A059]/30 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F3EEEA] border border-[#C5A059]/30 flex items-center justify-center text-[#3B101C]">
                  <Sparkles className="w-6 h-6 text-[#C5A059]" />
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#9E7934] uppercase tracking-wider block mb-1">
                    {item.type}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#3B101C] group-hover:text-[#9E7934] transition-colors">
                    {item.name}
                  </h3>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {item.description}
                </p>

                <p className="text-[11px] text-gray-500 italic bg-[#FAF8F5] p-2.5 rounded-lg border border-gray-100">
                  {item.details}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={onOpenWhatsApp}
                  className="w-full py-3 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#DFBA6A]" /> Enquire on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Craftsmanship Trigger Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F3EEEA] p-8 sm:p-12 rounded-3xl border border-[#C5A059]/40 text-center space-y-4">
          <h3 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            Have a Specific Design or Heirloom Idea?
          </h3>
          <p className="text-gray-700 text-sm max-w-2xl mx-auto">
            You can bring photos, design references, or heirloom gold to our General Bazaar store to discuss custom manufacturing.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('craftsmanship');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#3B101C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow flex items-center gap-2 hover:bg-[#2D0A14] transition-colors"
            >
              <span>Explore Custom Process</span>
              <ArrowRight className="w-4 h-4 text-[#DFBA6A]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
