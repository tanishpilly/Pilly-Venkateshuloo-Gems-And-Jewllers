import React from 'react';
import PVLogo from './PVLogo';
import { STORE_DETAILS } from '../data/storeDetails';
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle, ChevronRight } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenWhatsApp }) {
  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'heritage', label: 'Our Heritage' },
    { id: 'jewellery', label: '916 BIS Gold Jewellery' },
    { id: 'gemstones', label: 'Precious Gemstones' },
    { id: 'beads-pearls', label: 'Beads, Pearls & Corals' },
    { id: 'silver', label: '92.5 Silver Jewellery' },
    { id: 'craftsmanship', label: 'Craftsmanship' },
    { id: 'services', label: 'Our Services' },
    { id: 'about', label: 'About Raghavendra Pilly' },
    { id: 'visit-us', label: 'Visit General Bazaar Store' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLinkClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D0A14] text-[#F3EEEA] pt-16 pb-24 md:pb-12 border-t border-[#C5A059]/30 relative overflow-hidden font-sans">
      {/* Decorative Gold Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#2D0A14] via-[#C5A059] to-[#2D0A14] absolute top-0 left-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C5A059]/20">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 max-w-full">
            <div className="flex items-center max-w-full">
              <PVLogo size="lg" variant="dark" />
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed pt-2">
              For four generations since 1912, Pilly Venkateshuloo Gems and Jewellers has been serving 
              discerning families with authentic precious gemstones, customised 916 BIS Hallmarked gold, and timeless craftsmanship.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 text-[#DFBA6A] rounded-full text-[11px] font-semibold">
                Estd 1912
              </span>
              <span className="px-3 py-1 bg-white/10 text-[#DFBA6A] rounded-full text-[11px] font-semibold">
                General Bazaar
              </span>
              <span className="px-3 py-1 bg-white/10 text-[#DFBA6A] rounded-full text-[11px] font-semibold">
                Raghavendra Pilly
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-white mb-4 border-b border-[#C5A059]/30 pb-2">
              Showroom Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(0, 6).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-xs text-gray-300 hover:text-[#DFBA6A] flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Collections & Services */}
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-white mb-4 border-b border-[#C5A059]/30 pb-2">
              Services & Heritage
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(6).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-xs text-gray-300 hover:text-[#DFBA6A] flex items-center gap-1.5 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Store Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-lg font-bold text-white mb-4 border-b border-[#C5A059]/30 pb-2">
              Visit Our Store
            </h4>

            <div className="flex items-start gap-3 text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-[#DFBA6A] shrink-0 mt-0.5" />
              <span>{STORE_DETAILS.address.fullAddress}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-300">
              <Clock className="w-4 h-4 text-[#DFBA6A] shrink-0" />
              <div>
                <p>{STORE_DETAILS.openingHours.weekdays}</p>
                <p className="text-red-300 font-semibold">{STORE_DETAILS.openingHours.sunday}</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <a
                href={STORE_DETAILS.phones[0].link}
                className="flex items-center gap-2 text-xs text-[#DFBA6A] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> {STORE_DETAILS.phones[0].formatted}
              </a>
              <a
                href={STORE_DETAILS.phones[1].link}
                className="flex items-center gap-2 text-xs text-[#DFBA6A] hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> {STORE_DETAILS.phones[1].formatted}
              </a>
              <a
                href={STORE_DETAILS.email.link}
                className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#DFBA6A] shrink-0" /> {STORE_DETAILS.email.address}
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={STORE_DETAILS.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" /> Get Directions on Maps
              </a>
              <button
                onClick={onOpenWhatsApp}
                className="w-full py-2 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Enquire on WhatsApp
              </button>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Pilly Venkateshuloo Gems and Jewellers. All rights reserved.</p>
          <p className="text-[11px] text-gray-500">
            Heritage Jewellery & Gemstone Showroom • General Bazaar, Secunderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
