import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeDetails';

export default function VisitUsPage({ onOpenWhatsApp }) {
  return (
    <div className="py-12 bg-[#FAF8F5] text-[#1C1B1A]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center space-y-4">
        <span className="text-[#9E7934] text-xs font-bold uppercase tracking-[0.25em] block">
          GENERAL BAZAAR, SECUNDERABAD
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-[#3B101C]">
          Visit Our Showroom
        </h1>
        <div className="w-20 h-0.5 bg-[#C5A059] mx-auto"></div>
        <p className="max-w-3xl mx-auto text-gray-700 text-sm sm:text-base leading-relaxed font-light">
          We welcome you to visit our store in General Bazaar, Secunderabad, to explore our certified precious gemstones, 
          discuss custom 916 BIS gold orders with Raghavendra Pilly, and experience four generations of family warmth.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl space-y-8">
            <h2 className="font-serif-luxury text-2xl font-bold text-[#3B101C] border-b border-gray-100 pb-4">
              Store Information & Timings
            </h2>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-semibold mb-1">Store Address</strong>
                  <p className="text-gray-700 leading-relaxed">{STORE_DETAILS.address.fullAddress}</p>
                  <p className="text-xs text-gray-500 mt-1">Landmark: Mahankali Street, General Bazaar</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-semibold mb-1">Store Operating Hours</strong>
                  <p className="text-gray-700">{STORE_DETAILS.openingHours.weekdays}</p>
                  <p className="text-xs font-bold text-red-600 mt-0.5">{STORE_DETAILS.openingHours.sunday}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-semibold mb-1">Phone Numbers</strong>
                  <div className="space-y-1 text-xs font-semibold text-[#3B101C]">
                    <a href={STORE_DETAILS.phones[0].link} className="block hover:underline">{STORE_DETAILS.phones[0].formatted}</a>
                    <a href={STORE_DETAILS.phones[1].link} className="block hover:underline">{STORE_DETAILS.phones[1].formatted}</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-gray-900 font-semibold mb-1">Email Address</strong>
                  <a href={STORE_DETAILS.email.link} className="text-xs text-gray-700 hover:text-[#3B101C] hover:underline break-all">
                    {STORE_DETAILS.email.address}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href={STORE_DETAILS.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] font-bold text-xs uppercase tracking-wider rounded-xl shadow text-center flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" /> Get Directions on Google Maps
              </a>
              <button
                onClick={onOpenWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Enquire Store Visit on WhatsApp
              </button>
            </div>
          </div>

          {/* Interactive Google Map Preview */}
          <div className="lg:col-span-7 bg-[#2D0A14] text-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/40 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-2xl font-bold">Google Maps Location</h3>
                <p className="text-xs text-[#DFBA6A]">Exact store location in Secunderabad</p>
              </div>
              <a
                href={STORE_DETAILS.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#C5A059] text-[#2D0A14] font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" /> Launch Maps
              </a>
            </div>

            {/* Embedded Google Maps iframe pointing to the exact business address */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-inner">
              <iframe
                title="Pilly Venkateshuloo Gems and Jewellers Google Map"
                src="https://maps.google.com/maps?q=Pilly%20Venkateshuloo%20Gems%20%26%20Jewellers%20Shop%20No.%203-4-469%20General%20Bazaar%20Secunderabad%20Telangana%20500003&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-gray-300 text-center">
              Target Destination: {STORE_DETAILS.address.googleMapsDestination}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
