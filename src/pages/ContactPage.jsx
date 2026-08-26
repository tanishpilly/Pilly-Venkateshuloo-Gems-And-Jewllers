import React from 'react';
import ContactForm from '../components/ContactForm';
import { STORE_DETAILS } from '../data/storeDetails';
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';

export default function ContactPage({ onOpenWhatsApp }) {
  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          WE WOULD LOVE TO HEAR FROM YOU
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          Contact Our Store
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          Connect with Pilly Venkateshuloo Gems and Jewellers directly by phone, WhatsApp, or through our store enquiry form.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#3B101C] text-white p-8 rounded-3xl border border-[#C5A059]/40 shadow-xl space-y-6">
              <h2 className="font-serif-luxury text-2xl font-bold text-[#DFBA6A] border-b border-[#C5A059]/30 pb-3">
                Store Communication Lines
              </h2>

              <div className="space-y-6 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-1">
                    Call Us Directly
                  </span>
                  <div className="space-y-1">
                    <a href={STORE_DETAILS.phones[0].link} className="flex items-center gap-2 text-white font-bold hover:text-[#DFBA6A] transition-colors">
                      <Phone className="w-4 h-4 text-[#DFBA6A]" /> {STORE_DETAILS.phones[0].formatted}
                    </a>
                    <a href={STORE_DETAILS.phones[1].link} className="flex items-center gap-2 text-white font-bold hover:text-[#DFBA6A] transition-colors">
                      <Phone className="w-4 h-4 text-[#DFBA6A]" /> {STORE_DETAILS.phones[1].formatted}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-1">
                    Official Email
                  </span>
                  <a href={STORE_DETAILS.email.link} className="flex items-center gap-2 text-xs text-gray-200 hover:text-white transition-colors break-all">
                    <Mail className="w-4 h-4 text-[#DFBA6A] shrink-0" /> {STORE_DETAILS.email.address}
                  </a>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-1">
                    General Bazaar Address
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {STORE_DETAILS.address.fullAddress}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-1">
                    Showroom Hours
                  </span>
                  <p className="text-xs text-gray-300">{STORE_DETAILS.openingHours.weekdays}</p>
                  <p className="text-xs font-bold text-red-300 mt-0.5">{STORE_DETAILS.openingHours.sunday}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenWhatsApp}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Chat
                </button>
                <a
                  href={STORE_DETAILS.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] text-xs font-bold uppercase tracking-wider rounded-xl shadow text-center flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" /> Open Maps Destination
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>
    </div>
  );
}
