import React, { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function WhatsAppModal({ isOpen, onClose, defaultTopic = "" }) {
  const [topic, setTopic] = useState(defaultTopic || "Gemstone Consultation");
  const [customMsg, setCustomMsg] = useState("");

  if (!isOpen) return null;

  const topics = [
    "Gemstone Consultation",
    "916 BIS Gold Jewellery Customisation",
    "92.5 Sterling Silver Collection",
    "Beads, Pearls & Corals Enquiry",
    "Gold / Silver Exchange Inquiry",
    "Schedule Store Visit to General Bazaar",
    "General Enquiry"
  ];

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    let text = `Hello Pilly Venkateshuloo Gems & Jewellers,\n\nI would like to enquire about: *${topic}*.`;
    if (customMsg.trim()) {
      text += `\n\nDetails: ${customMsg.trim()}`;
    }
    text += `\n\nThank you!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsAppNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden text-[#1C1B1A]">
        {/* Header */}
        <div className="bg-[#3B101C] p-6 text-white border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">Enquire on WhatsApp</h3>
              <p className="text-xs text-[#DFBA6A]">Connect directly with Raghavendra Pilly & Family</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Select Enquiry Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C] transition-all"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
              Optional Message or Requirement Details
            </label>
            <textarea
              rows="3"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="e.g. Looking for a certified blue sapphire / custom bridal haram requirement..."
              className="w-full px-4 py-3 bg-white border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C] transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" /> Start WhatsApp Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
