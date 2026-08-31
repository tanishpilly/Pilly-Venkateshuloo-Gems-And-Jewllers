import React, { useState } from 'react';
import { X, MessageCircle, Phone, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function DesignDetailModal({ design, onClose, onNavigateToVisitUs }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!design) return null;

  const images = design.images && design.images.length > 0
    ? design.images
    : ['/hero-jewellery.png'];

  const currentImage = images[selectedImageIdx] || images[0];

  const handleWhatsAppEnquiry = () => {
    const text = `Hello Pilly Venkateshuloo Gems & Jewellers,\n\nI would like to enquire about the *${design.title}* (${design.category}).\n\nCould you please share details when I visit the General Bazaar store?\n\nThank you!`;
    const url = `https://wa.me/${STORE_DETAILS.whatsAppNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#C5A059]/40 rounded-3xl shadow-2xl overflow-hidden text-[#1C1B1A] flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#3B101C] text-white hover:bg-[#2D0A14] rounded-full shadow-lg transition-transform hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery Viewer */}
        <div className="md:w-1/2 bg-[#2D0A14] p-6 flex flex-col justify-between items-center relative min-h-[320px] md:min-h-[480px]">
          <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden rounded-2xl border border-[#C5A059]/30 bg-black/30">
            <img
              src={currentImage}
              alt={design.title}
              className="max-h-[360px] w-full object-contain transition-all duration-300"
            />

            {/* Carousel navigation controls if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto max-w-full py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIdx === idx ? 'border-[#DFBA6A] scale-105 shadow-md' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Communication Triggers (NO PRICES / NO CART) */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#3B101C]/10 text-[#3B101C] border border-[#C5A059]/40 rounded-full text-xs font-bold uppercase tracking-wider">
                {design.category}
              </span>
              <span className="text-[11px] text-[#9E7934] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Authentic Showroom Piece
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C] leading-tight">
              {design.title}
            </h2>

            <div className="w-16 h-0.5 bg-[#C5A059]"></div>

            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-light whitespace-pre-line">
              {design.description || 'Custom crafted design available for inspection and made-to-order consultation at our General Bazaar store.'}
            </p>

            <div className="p-4 bg-[#F3EEEA] rounded-2xl border border-[#C5A059]/30 text-xs space-y-1.5 text-gray-700">
              <p className="font-bold text-[#3B101C] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" /> Available at General Bazaar Showroom
              </p>
              <p className="text-gray-600">
                Pilly Venkateshuloo Gems & Jewellers • Shop No. 3-4-469, Secunderabad
              </p>
            </div>
          </div>

          {/* Action CTAs: Direct Communication Triggers Only */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <button
              onClick={handleWhatsAppEnquiry}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4" /> Enquire About This Design on WhatsApp
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={STORE_DETAILS.phones[0].link}
                className="py-3 bg-[#3B101C] hover:bg-[#2D0A14] text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#DFBA6A]" /> Call Store
              </a>

              <button
                onClick={() => {
                  onClose();
                  if (onNavigateToVisitUs) onNavigateToVisitUs();
                }}
                className="py-3 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] font-bold text-xs uppercase tracking-wider rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> Visit Store
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
