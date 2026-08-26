import React from 'react';
import { CRAFTSMANSHIP_STEPS } from '../data/collectionsData';
import { Sparkles, MessageCircle, Phone, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function CraftsmanshipPage({ onOpenWhatsApp, setActiveTab }) {
  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          ARTISAN MANUFACTURING & BESPOKE CREATION
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          Craftsmanship & Bespoke Process
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Every custom piece at Pilly Venkateshuloo is born from a collaboration between your vision, 
          our four-generation heritage knowledge, and the delicate skill of master Indian goldsmiths.
        </p>
      </section>

      {/* Visual Workshop Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C5A059]/40 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 min-h-[350px]">
            <img
              src="/gold-craftsmanship.png"
              alt="Goldsmith artisan crafting 916 gold ornament in atelier"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 bg-[#3B101C] text-white p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <span className="text-[#DFBA6A] text-xs font-bold uppercase tracking-[0.2em] block">
              Handmade Excellence
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
              Preserving Traditional Nakshi & Stone-Setting Techniques
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
              From delicate stone bezel settings to grand bridal harams, our goldsmiths utilize centuries-old 
              hand-carving techniques combined with 916 BIS Hallmarking standards.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Start Custom Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            The 5-Step Custom Jewellery Journey
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            How we bring your custom requirements from concept to finished hallmark piece.
          </p>
        </div>

        <div className="space-y-6">
          {CRAFTSMANSHIP_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-[#C5A059]/30 shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#3B101C] text-[#DFBA6A] font-serif-luxury font-bold text-2xl flex items-center justify-center shrink-0 border border-[#C5A059]/40">
                {step.step}
              </div>
              <div className="space-y-1 flex-1">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#3B101C]">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#F3EEEA] p-8 sm:p-12 rounded-3xl border border-[#C5A059]/40 space-y-4">
          <h3 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            Ready to Create a Custom Heirloom?
          </h3>
          <p className="text-gray-700 text-sm max-w-xl mx-auto font-light">
            Visit Raghavendra Pilly at our General Bazaar store to discuss your weights, design ideas, and gemstone requirements.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('visit-us');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-[#3B101C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow hover:bg-[#2D0A14] transition-colors"
            >
              Visit Store in Secunderabad
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
