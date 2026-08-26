import React from 'react';
import { SERVICES_LIST } from '../data/collectionsData';
import { Wrench, RefreshCw, Sparkles, Gem, ShieldCheck, FileText, MessageCircle, Phone } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function ServicesPage({ onOpenWhatsApp }) {
  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          HERITAGE SERVICES & SPECIALTIES
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          Our Services & Store Offerings
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Beyond selling certified gemstones and custom 916 gold, we provide complete post-purchase support, 
          exchange services, restoration, and transparent documentation.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-[#C5A059]/30 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center border border-[#C5A059]/40 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Wrench className="w-6 h-6" />}
                  {idx === 1 && <RefreshCw className="w-6 h-6" />}
                  {idx === 2 && <RefreshCw className="w-6 h-6" />}
                  {idx === 3 && <Wrench className="w-6 h-6" />}
                  {idx === 4 && <Sparkles className="w-6 h-6" />}
                  {idx === 5 && <Gem className="w-6 h-6" />}
                  {idx === 6 && <ShieldCheck className="w-6 h-6" />}
                  {idx === 7 && <FileText className="w-6 h-6" />}
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C]">
                  {srv.title}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                  {srv.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  onClick={onOpenWhatsApp}
                  className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#3B101C] hover:text-white border border-[#C5A059]/40 text-[#3B101C] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> Enquire Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gold & Silver Exchange Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3B101C] text-white p-8 sm:p-12 rounded-3xl border border-[#C5A059]/40 text-center space-y-4">
          <h3 className="font-serif-luxury text-3xl font-bold text-[#DFBA6A]">
            Gold & Silver Exchange Available
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Bring your old gold or silver ornaments to our General Bazaar store for precise, transparent purity testing 
            and exchange evaluation toward your new custom orders.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href={STORE_DETAILS.phones[0].link}
              className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call Store for Details
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
