import React from 'react';
import { Phone, MessageCircle, Navigation } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function MobileQuickActionBar({ onOpenWhatsApp }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2D0A14]/95 backdrop-blur-md border-t border-[#C5A059]/40 p-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={STORE_DETAILS.phones[0].link}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all text-center group"
          aria-label="Call Store"
        >
          <Phone className="w-5 h-5 text-[#DFBA6A] group-hover:scale-110 transition-transform mb-1" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Call Us</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all text-center shadow-md group"
          aria-label="Enquire on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white group-hover:scale-110 transition-transform mb-1" />
          <span className="text-[10px] font-bold tracking-wider uppercase">WhatsApp</span>
        </button>

        {/* Directions Button */}
        <a
          href={STORE_DETAILS.address.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#C5A059] text-[#2D0A14] hover:bg-[#d6b066] transition-all text-center font-semibold group"
          aria-label="Get Directions to Store"
        >
          <Navigation className="w-5 h-5 text-[#2D0A14] group-hover:scale-110 transition-transform mb-1" />
          <span className="text-[10px] font-bold tracking-wider uppercase">Directions</span>
        </a>
      </div>
    </div>
  );
}
