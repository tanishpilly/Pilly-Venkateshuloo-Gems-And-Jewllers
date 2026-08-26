import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock, MessageCircle, ChevronRight } from 'lucide-react';
import PVLogo from './PVLogo';
import { STORE_DETAILS } from '../data/storeDetails';

export default function Navbar({ activeTab, setActiveTab, onOpenWhatsApp }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'gemstones', label: 'Gemstones' },
    { id: 'beads-pearls', label: 'Beads & Pearls' },
    { id: 'silver', label: 'Silver' },
    { id: 'craftsmanship', label: 'Craftsmanship' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'visit-us', label: 'Visit Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full font-sans transition-all duration-300">
      {/* Top Micro Header Banner */}
      <div className="bg-[#2D0A14] text-[#F3EEEA] py-2 px-4 border-b border-[#C5A059]/20 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#DFBA6A]" />
              General Bazaar, Secunderabad (Estd. 1912)
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-[#DFBA6A]" />
              {STORE_DETAILS.openingHours.weekdays}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={STORE_DETAILS.phones[0].link} 
              className="flex items-center gap-1.5 text-[#DFBA6A] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {STORE_DETAILS.phones[0].formatted}
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href={STORE_DETAILS.phones[1].link} 
              className="flex items-center gap-1.5 text-[#DFBA6A] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {STORE_DETAILS.phones[1].formatted}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md py-2.5 border-b border-[#C5A059]/30' 
            : 'bg-[#FAF8F5] py-3.5 border-b border-[#C5A059]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="text-left focus:outline-none shrink-0"
            aria-label="Pilly Venkateshuloo Gems & Jewellers Home"
          >
            <PVLogo size={isScrolled ? "sm" : "md"} showText={true} />
          </button>

          {/* Desktop Navigation Links - Shown on XL+ screens with clean spacing */}
          <div className="hidden xl:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2.5 py-1.5 text-xs xl:text-sm font-semibold tracking-wide transition-all rounded-md whitespace-nowrap relative ${
                  activeTab === item.id
                    ? 'text-[#3B101C] font-bold'
                    : 'text-gray-700 hover:text-[#3B101C] hover:bg-[#3B101C]/5'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#C5A059] rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Right Action Trigger */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenWhatsApp}
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </button>
          </div>

          {/* Mobile / Tablet Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#3B101C] rounded-lg focus:outline-none hover:bg-[#3B101C]/10 transition-colors shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#C5A059]/30 flex items-center justify-between bg-[#3B101C] text-white">
              <PVLogo size="sm" variant="dark" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-white rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="py-4 px-3 space-y-1 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-[#3B101C] text-white'
                      : 'text-gray-800 hover:bg-[#3B101C]/10'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${activeTab === item.id ? 'text-[#DFBA6A]' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-[#C5A059]/20 bg-[#F3EEEA] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
              </button>

              <div className="pt-2 text-center space-y-1 text-xs text-gray-600">
                <p className="font-semibold text-gray-900">{STORE_DETAILS.fullName}</p>
                <p>{STORE_DETAILS.address.area}, {STORE_DETAILS.address.city}</p>
                <div className="flex justify-center gap-4 pt-1 font-medium text-[#3B101C]">
                  <a href={STORE_DETAILS.phones[0].link}>{STORE_DETAILS.phones[0].number}</a>
                  <span>•</span>
                  <a href={STORE_DETAILS.phones[1].link}>{STORE_DETAILS.phones[1].number}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
