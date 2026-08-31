import React from 'react';
import { Award, ShieldCheck, Gem, MapPin, Clock, MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function AboutUsPage({ onOpenWhatsApp, setActiveTab }) {
  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          OUR FAMILY & LEADERSHIP
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          About Pilly Venkateshuloo
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Four generations. One enduring commitment to trust, craftsmanship, and natural precious gemstones in General Bazaar, Secunderabad.
        </p>
      </section>

      {/* Leadership & Family Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#C5A059]/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[#9E7934] text-xs font-bold uppercase tracking-wider block">
                Current Store Director & Family Leadership
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B101C]">
                Raghavendra Pilly & Family
              </h2>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
              Pilly Venkateshuloo Gems and Jewellers was established in 1912 by our grandfather and has continued 
              uninterrupted as a family business through four generations. Today, under the personal care of 
              <strong className="font-semibold text-[#3B101C]"> Raghavendra Pilly</strong>, our store maintains 
              the warmth, authenticity, and personal trust that only a true family-run establishment can offer.
            </p>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
              We do not treat jewellery as mass commercial inventory. For us, every gemstone consultation and custom 916 gold ornament 
              represents a milestone in a family's life—be it weddings, auspicious ceremonies, or precious heirloom pass-downs.
            </p>

            <div className="p-4 bg-[#F3EEEA] rounded-2xl border border-[#C5A059]/30 space-y-2">
              <h4 className="font-serif-luxury text-lg font-bold text-[#3B101C]">Our Core Philosophy</h4>
              <p className="text-xs text-gray-700 leading-relaxed font-light">
                "Honest evaluation, certified gemstone authenticity, strict 916 hallmarking, and treating every visiting customer as family."
              </p>
            </div>
          </div>

          {/* Owner/Contact Card */}
          <div className="lg:col-span-5 text-center space-y-6 bg-[#3B101C] text-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/40 shadow-xl overflow-hidden">
            <img
              src="/pv-logo.png"
              alt="PV Monogram Logo"
              className="h-16 sm:h-20 mx-auto object-contain shrink-0"
            />

            <div className="space-y-1.5 px-2">
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#DFBA6A] tracking-wider text-center leading-tight">
                PILLY VENKATESHULOO
              </h3>
              <p className="text-xs text-gray-300 font-medium tracking-wide">
                Gems and Jewellers • Estd 1912
              </p>
            </div>

            <div className="border-t border-[#C5A059]/30 pt-6 space-y-3 text-xs text-gray-300">
              <p>📍 Shop No. 3-4-469, General Bazar, Secunderabad</p>
              <p>📞 9393331010 / 9666605505</p>
              <p>⏰ Mon - Sat: 12:00 PM – 9:00 PM (Sun Closed)</p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" /> Connect with Raghavendra Pilly
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
