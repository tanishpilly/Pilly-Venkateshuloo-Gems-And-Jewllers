import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileQuickActionBar from './components/MobileQuickActionBar';
import WhatsAppModal from './components/WhatsAppModal';

import HomePage from './pages/HomePage';
import HeritagePage from './pages/HeritagePage';
import JewelleryPage from './pages/JewelleryPage';
import GemstonesPage from './pages/GemstonesPage';
import BeadsPearlsPage from './pages/BeadsPearlsPage';
import SilverJewelleryPage from './pages/SilverJewelleryPage';
import CraftsmanshipPage from './pages/CraftsmanshipPage';
import ServicesPage from './pages/ServicesPage';
import AboutUsPage from './pages/AboutUsPage';
import VisitUsPage from './pages/VisitUsPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    setIsWhatsAppOpen(true);
  };

  const handleCloseWhatsApp = () => {
    setIsWhatsAppOpen(false);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'heritage':
        return <HeritagePage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'jewellery':
        return <JewelleryPage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'gemstones':
        return <GemstonesPage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'beads-pearls':
        return <BeadsPearlsPage onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'silver':
        return <SilverJewelleryPage onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'craftsmanship':
        return <CraftsmanshipPage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'services':
        return <ServicesPage onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'about':
        return <AboutUsPage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'visit-us':
        return <VisitUsPage onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'contact':
        return <ContactPage onOpenWhatsApp={handleOpenWhatsApp} />;
      default:
        return <HomePage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1B1A] font-sans relative">
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenWhatsApp={handleOpenWhatsApp} 
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Luxury Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenWhatsApp={handleOpenWhatsApp} 
      />

      {/* Persistent Mobile Action Bar */}
      <MobileQuickActionBar 
        onOpenWhatsApp={handleOpenWhatsApp} 
      />

      {/* Interactive WhatsApp Enquiry Modal */}
      <WhatsAppModal 
        isOpen={isWhatsAppOpen} 
        onClose={handleCloseWhatsApp} 
      />
    </div>
  );
}
