import React from 'react';
import { Award, ShieldCheck, Gem, MapPin, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function HeritagePage({ setActiveTab, onOpenWhatsApp }) {
  const milestones = [
    {
      year: "1912",
      title: "Founding in General Bazaar",
      description: "Our grandfather founded the business in General Bazaar, Secunderabad, specializing in natural precious gemstones, rubies, sapphires, and emeralds."
    },
    {
      year: "1950s",
      title: "Expansion into Fine Gold Jewellery",
      description: "As customer relationships deepened across generations, the family expanded services into custom gold jewellery crafted by traditional goldsmith artisans."
    },
    {
      year: "1990s",
      title: "Adoption of 916 BIS Hallmarking",
      description: "Pioneered strict hallmarking practices, guaranteeing 916 purity (22 Karat) on every customized order for complete customer confidence."
    },
    {
      year: "Present",
      title: "Four Generations under Raghavendra Pilly",
      description: "Today, under Raghavendra Pilly, we blend 112+ years of gemstone heritage with bespoke 916 gold and 92.5 silver jewellery craftsmanship."
    }
  ];

  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          ESTABLISHED IN 1912 • FOUR GENERATIONS
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          Our Heritage & Family Legacy
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          What began in 1912 with a passion for precious gemstones has grown into a family legacy spanning 
          four generations in General Bazaar, Secunderabad.
        </p>
      </section>

      {/* Main Heritage Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 bg-white rounded-3xl border border-[#C5A059]/30 shadow-xl space-y-6">
              <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
                From Gemstone Connoisseurs to Bespoke Jewellers
              </h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
                The business was founded by our grandfather in 1912 and has continued as an authentic family business 
                through generations. Originally established around precious gemstones—rubies, emeralds, sapphires, 
                and natural pearls—the family earned a reputation for gemstone purity and integrity throughout Secunderabad and Hyderabad.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
                Over time, fulfilling the bespoke wishes of long-standing family clients, the business expanded into 
                <strong className="font-semibold text-[#3B101C]"> customized 916 BIS Hallmarked gold jewellery made to order</strong>.
              </p>

              <div className="p-4 bg-[#F3EEEA] rounded-2xl border border-[#C5A059]/20 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center font-serif-luxury font-bold text-xl shrink-0">
                  PV
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg font-bold text-[#3B101C]">Raghavendra Pilly</h4>
                  <p className="text-xs text-gray-600">Current Leader & Family Director</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C5A059]/40">
              <img
                src="/hero-jewellery.png"
                alt="Heritage Indian Gold & Gemstone Jewellery"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <p className="font-serif-luxury text-2xl font-bold text-[#DFBA6A]">112+ Years of Trust</p>
                <p className="text-xs text-gray-200">
                  Built on four generations of honesty, artisan craftsmanship, and personal customer relationships.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[#3B101C] text-white border-y border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-[#DFBA6A] text-xs font-bold uppercase tracking-[0.2em] block">
              Generational Journey
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
              Milestones Across Generations
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-[#C5A059]/20 hover:border-[#C5A059]/60 transition-all space-y-3"
              >
                <span className="text-3xl font-serif-luxury font-bold text-[#DFBA6A] block">
                  {m.year}
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pt-20 text-center space-y-6">
        <h3 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
          Experience Our Heritage in Person
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              setActiveTab('visit-us');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-[#3B101C] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#2D0A14] transition-all flex items-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#DFBA6A]" /> Visit General Bazaar Store
          </button>
          <button
            onClick={onOpenWhatsApp}
            className="px-8 py-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#20bd5a] transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
          </button>
        </div>
      </section>

    </div>
  );
}
