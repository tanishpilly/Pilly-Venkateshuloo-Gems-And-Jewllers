import React from 'react';
import { ArrowRight, MapPin, Phone, MessageCircle, Navigation, ShieldCheck, Clock, Award, Sparkles, Gem } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';
import { CATEGORIES } from '../data/collectionsData';
import TrustBadges from '../components/TrustBadges';

export default function HomePage({ setActiveTab, onOpenWhatsApp }) {
  const handleCategoryClick = (catId) => {
    if (catId === 'gemstones') setActiveTab('gemstones');
    else if (catId === 'gold') setActiveTab('jewellery');
    else if (catId === 'silver') setActiveTab('silver');
    else if (catId === 'beads-pearls') setActiveTab('beads-pearls');
    else setActiveTab('jewellery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#2D0A14] text-[#F3EEEA] overflow-hidden">
        {/* Background Image with Deep Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-jewellery.png"
            alt="Handcrafted traditional Indian 916 gold necklace with rubies and uncut diamonds"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transform animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14] via-[#2D0A14]/70 to-[#2D0A14]/90"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#2D0A14]/50 to-[#2D0A14]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Heritage Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C5A059]/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#DFBA6A]" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#DFBA6A]">
              ESTABLISHED IN 1912 • GENERAL BAZAAR, SECUNDERABAD
            </span>
          </div>

          {/* Main Hero Headings */}
          <div className="space-y-4">
            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              A Legacy of Trust <br className="hidden sm:inline" />
              <span className="text-gold-gradient italic">Since 1912</span>
            </h1>
            <p className="font-serif-luxury text-lg sm:text-2xl text-[#DFBA6A] font-medium tracking-wide">
              Precious Gemstones. Bespoke Jewellery. Generations of Craftsmanship.
            </p>
          </div>

          {/* Supporting Copy */}
          <p className="max-w-3xl mx-auto text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            For four generations, Pilly Venkateshuloo Gems and Jewellers has been serving discerning customers 
            with precious gemstones, customised 916 BIS Hallmarked gold jewellery and timeless craftsmanship 
            in the heart of General Bazaar, Secunderabad.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('jewellery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <span>Explore Our Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveTab('visit-us');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-[#C5A059]/40 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3"
            >
              <MapPin className="w-4 h-4 text-[#DFBA6A]" />
              <span>Visit Our Store</span>
            </button>
          </div>

          {/* Quick Contact Ribbon */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-300 border-t border-white/10 max-w-2xl mx-auto">
            <a href={STORE_DETAILS.phones[0].link} className="hover:text-[#DFBA6A] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#DFBA6A]" />
              <span>{STORE_DETAILS.phones[0].formatted}</span>
            </a>
            <span>•</span>
            <a href={STORE_DETAILS.phones[1].link} className="hover:text-[#DFBA6A] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#DFBA6A]" />
              <span>{STORE_DETAILS.phones[1].formatted}</span>
            </a>
            <span>•</span>
            <span className="text-gray-400">{STORE_DETAILS.openingHours.weekdays}</span>
          </div>
        </div>
      </section>

      {/* 2. HERITAGE EDITORIAL SECTION */}
      <section className="py-20 bg-[#FAF8F5] text-[#1C1B1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#C5A059]/30">
                <img
                  src="/gold-craftsmanship.png"
                  alt="Master goldsmith crafting 916 hallmarked gold in workshop"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#3B101C]/90 backdrop-blur-md rounded-xl border border-[#C5A059]/40 text-white">
                  <p className="font-serif-luxury text-lg font-bold text-[#DFBA6A]">
                    Four Generations of Trust
                  </p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    Currently guided by Raghavendra Pilly
                  </p>
                </div>
              </div>
              {/* Gold Crest Accent */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#C5A059] rounded-tl-xl pointer-events-none"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#C5A059] rounded-br-xl pointer-events-none"></div>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.2em] block">
                  Established 1912
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B101C]">
                  A Legacy That Began in 1912
                </h2>
              </div>

              <div className="w-20 h-0.5 bg-[#C5A059]"></div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
                What began in 1912 with a passion for precious gemstones has grown into a family legacy spanning 
                four generations in General Bazaar, Secunderabad. From carefully selected gemstones to customized 
                916 BIS Hallmarked gold jewellery made to order, our journey has always been guided by craftsmanship, 
                authenticity and trust.
              </p>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light">
                Today, under the leadership of <strong className="font-semibold text-[#3B101C]">Raghavendra Pilly</strong>, 
                we preserve the founding principles of honest guidance, certified purity, and deeply personal customer service 
                that generations of families have relied upon.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setActiveTab('heritage');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-3 group"
                >
                  <span>Discover Our Heritage</span>
                  <ArrowRight className="w-4 h-4 text-[#DFBA6A] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SHOWROOM CATEGORIES GRID */}
      <section className="py-20 bg-[#F3EEEA] text-[#1C1B1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.2em] block">
              Digital Showroom Collections
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#3B101C]">
              Curated Heritage Collections
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mx-auto"></div>
            <p className="text-gray-600 text-sm sm:text-base">
              Explore our specialisations in precious gemstones, hallmarked 916 gold, sterling silver, and pearls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A14]/90 via-[#2D0A14]/30 to-transparent"></div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#3B101C]/80 backdrop-blur-md border border-[#C5A059]/40 text-[#DFBA6A] text-[11px] font-bold uppercase rounded-full">
                    {cat.count}
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-serif-luxury text-2xl font-bold text-white mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#DFBA6A] font-medium">{cat.tagline}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      className="text-xs font-bold uppercase tracking-wider text-[#3B101C] hover:text-[#9E7934] flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                    </button>

                    <button
                      onClick={onOpenWhatsApp}
                      className="px-3.5 py-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRUST & INTEGRITY BANNER */}
      <TrustBadges />

      {/* 5. STORE VISIT & LOCATION HIGHLIGHT */}
      <section className="py-20 bg-[#FAF8F5] text-[#1C1B1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#C5A059]/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Info Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.2em] block">
                  General Bazaar Showroom
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#3B101C]">
                  Visit Us in General Bazaar
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We invite you to experience our gemstones and customised jewellery in person at our established 
                  Secunderabad store.
                </p>
              </div>

              <div className="space-y-4 py-4 border-y border-gray-100">
                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <MapPin className="w-5 h-5 text-[#3B101C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-semibold">Store Address:</strong>
                    <span>{STORE_DETAILS.address.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <Clock className="w-5 h-5 text-[#3B101C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-semibold">Store Operating Hours:</strong>
                    <p>{STORE_DETAILS.openingHours.weekdays}</p>
                    <p className="text-red-600 font-semibold text-xs mt-0.5">{STORE_DETAILS.openingHours.sunday}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-700">
                  <Phone className="w-5 h-5 text-[#3B101C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-semibold">Phone Lines:</strong>
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#3B101C] mt-1">
                      <a href={STORE_DETAILS.phones[0].link} className="hover:underline">{STORE_DETAILS.phones[0].formatted}</a>
                      <span>•</span>
                      <a href={STORE_DETAILS.phones[1].link} className="hover:underline">{STORE_DETAILS.phones[1].formatted}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={STORE_DETAILS.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
                <a
                  href={STORE_DETAILS.phones[0].link}
                  className="px-6 py-3.5 bg-[#3B101C] hover:bg-[#2D0A14] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <Phone className="w-4 h-4 text-[#DFBA6A]" /> Call Store
                </a>
              </div>
            </div>

            {/* Google Maps Visual Card */}
            <div className="lg:col-span-6 bg-[#3B101C] p-6 sm:p-8 text-white flex flex-col justify-between relative min-h-[350px]">
              <div className="space-y-4 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-[#DFBA6A]">
                  <Navigation className="w-3.5 h-3.5" /> Google Maps Navigation
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                  {STORE_DETAILS.fullName}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Located in the vibrant market hub of General Bazaar, Secunderabad, opposite landmark Mahankali Street.
                </p>
              </div>

              {/* Map Mockup Trigger */}
              <div className="my-6 p-6 rounded-2xl bg-white/5 border border-[#C5A059]/30 text-center space-y-3 backdrop-blur-md">
                <MapPin className="w-10 h-10 text-[#DFBA6A] mx-auto animate-bounce" />
                <div>
                  <p className="text-sm font-bold text-white">Click to launch Google Maps navigation</p>
                  <p className="text-xs text-gray-300 mt-1">Dest: {STORE_DETAILS.address.area}, {STORE_DETAILS.address.city}</p>
                </div>
                <a
                  href={STORE_DETAILS.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 bg-[#DFBA6A] text-[#2D0A14] text-xs font-bold uppercase rounded-lg shadow hover:bg-white transition-colors"
                >
                  Open Maps Destination
                </a>
              </div>

              <div className="text-xs text-gray-400 text-center z-10">
                Four Generations of Customer Trust in Secunderabad
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FINAL HOMEPAGE CTA */}
      <section className="py-20 bg-[#2D0A14] text-white text-center border-t border-[#C5A059]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <span className="text-[#DFBA6A] text-xs font-bold uppercase tracking-[0.25em] block">
            Visit Our General Bazaar Store
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold leading-tight">
            Come Discover Our Legacy
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            From precious gemstones to customized 916 BIS Hallmarked gold jewellery, our story has been shaped by 
            four generations of trust, craftsmanship and personal relationship.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setActiveTab('visit-us');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" /> Visit Our Store
            </button>

            <button
              onClick={onOpenWhatsApp}
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
            </button>

            <a
              href={STORE_DETAILS.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-[#C5A059]/40 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl backdrop-blur-md transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-[#DFBA6A]" /> Get Directions
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
