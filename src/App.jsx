import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileQuickActionBar from './components/MobileQuickActionBar';
import WhatsAppModal from './components/WhatsAppModal';
import DesignDetailModal from './components/DesignDetailModal';

// Public Pages
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

// Admin CMS Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAddDesign from './pages/admin/AdminAddDesign';
import AdminManageDesigns from './pages/admin/AdminManageDesigns';
import AdminManageCategories from './pages/admin/AdminManageCategories';

import { getAdminSession } from './services/cmsService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  
  // Admin Session & Navigation
  const [adminSession, setAdminSession] = useState(null);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Customer Modals
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [selectedDesignForModal, setSelectedDesignForModal] = useState(null);

  // Check URL path on mount & browser navigation (popstate)
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.startsWith('/admin')) {
        setIsAdminRoute(true);

        // Subroute parsing for admin section
        if (path.includes('/add')) {
          setAdminTab('add-design');
        } else if (path.includes('/designs') || path.includes('/manage-designs')) {
          setAdminTab('manage-designs');
        } else if (path.includes('/categories')) {
          setAdminTab('manage-categories');
        } else {
          setAdminTab('dashboard');
        }
      } else {
        setIsAdminRoute(false);

        // Public path parsing
        if (path.includes('/jewellery') || path.includes('/gold')) {
          setActiveTab('jewellery');
        } else if (path.includes('/gemstones')) {
          setActiveTab('gemstones');
        } else if (path.includes('/silver')) {
          setActiveTab('silver');
        } else if (path.includes('/beads') || path.includes('/pearls')) {
          setActiveTab('beads-pearls');
        } else if (path.includes('/heritage')) {
          setActiveTab('heritage');
        } else if (path.includes('/craftsmanship')) {
          setActiveTab('craftsmanship');
        } else if (path.includes('/services')) {
          setActiveTab('services');
        } else if (path.includes('/about')) {
          setActiveTab('about');
        } else if (path.includes('/visit')) {
          setActiveTab('visit-us');
        } else if (path.includes('/contact')) {
          setActiveTab('contact');
        } else {
          setActiveTab('home');
        }
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Check Admin session on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const session = await getAdminSession();
      setAdminSession(session);
    } catch {
      setAdminSession(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleOpenWhatsApp = () => {
    setIsWhatsAppOpen(true);
  };

  const handleCloseWhatsApp = () => {
    setIsWhatsAppOpen(false);
  };

  const handleSelectDesignModal = (design) => {
    setSelectedDesignForModal(design);
  };

  const handleNavigateToVisitUs = () => {
    setActiveTab('visit-us');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminTabChange = (tabId) => {
    setAdminTab(tabId);
    let path = '/admin/dashboard';
    if (tabId === 'add-design') path = '/admin/add-design';
    else if (tabId === 'manage-designs') path = '/admin/manage-designs';
    else if (tabId === 'manage-categories') path = '/admin/manage-categories';
    window.history.pushState({}, '', path);
  };

  const handleReturnToPublicView = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
  };

  // ==============================================================================
  // ADMIN CMS VIEW RENDER (REQUIRES SUPABASE AUTHENTICATION)
  // ==============================================================================
  if (isAdminRoute) {
    if (checkingAuth) {
      return (
        <div className="min-h-screen bg-[#2D0A14] text-white flex items-center justify-center text-xs font-sans">
          Authenticating owner session...
        </div>
      );
    }

    // Unauthenticated access -> Shows Admin Login Screen
    if (!adminSession) {
      return (
        <AdminLogin
          onLoginSuccess={(session) => setAdminSession(session)}
          onNavigatePublic={handleReturnToPublicView}
        />
      );
    }

    // Authenticated owner session -> Renders Admin CMS Dashboard Views
    const renderAdminTabContent = () => {
      switch (adminTab) {
        case 'dashboard':
          return <AdminDashboard onNavigateTab={handleAdminTabChange} />;
        case 'add-design':
          return <AdminAddDesign onNavigateTab={handleAdminTabChange} />;
        case 'manage-designs':
          return <AdminManageDesigns onNavigateTab={handleAdminTabChange} />;
        case 'manage-categories':
          return <AdminManageCategories onNavigateTab={handleAdminTabChange} />;
        default:
          return <AdminDashboard onNavigateTab={handleAdminTabChange} />;
      }
    };

    return (
      <AdminLayout
        activeTab={adminTab}
        setActiveTab={handleAdminTabChange}
        session={adminSession}
        onLogout={() => setAdminSession(null)}
        onNavigatePublic={handleReturnToPublicView}
      >
        {renderAdminTabContent()}
      </AdminLayout>
    );
  }

  // ==============================================================================
  // PUBLIC CUSTOMER WEBSITE VIEW RENDER (NO LOGIN REQUIRED)
  // ==============================================================================
  const renderActivePublicPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectDesign={handleSelectDesignModal}
          />
        );
      case 'heritage':
        return <HeritagePage setActiveTab={setActiveTab} onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'jewellery':
        return (
          <JewelleryPage
            setActiveTab={setActiveTab}
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectDesign={handleSelectDesignModal}
          />
        );
      case 'gemstones':
        return (
          <GemstonesPage
            setActiveTab={setActiveTab}
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectDesign={handleSelectDesignModal}
          />
        );
      case 'beads-pearls':
        return (
          <BeadsPearlsPage
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectDesign={handleSelectDesignModal}
          />
        );
      case 'silver':
        return (
          <SilverJewelleryPage
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectDesign={handleSelectDesignModal}
          />
        );
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
        return (
          <HomePage
            setActiveTab={setActiveTab}
            onOpenWhatsApp={handleOpenWhatsApp}
            onSelectDesign={handleSelectDesignModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1B1A] font-sans relative">
      {/* Customer Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Customer View */}
      <main className="flex-1">
        {renderActivePublicPage()}
      </main>

      {/* Customer Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Persistent Mobile Quick Actions */}
      <MobileQuickActionBar
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Customer WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={handleCloseWhatsApp}
      />

      {/* Public Design Detail View Modal */}
      <DesignDetailModal
        design={selectedDesignForModal}
        onClose={() => setSelectedDesignForModal(null)}
        onNavigateToVisitUs={handleNavigateToVisitUs}
      />
    </div>
  );
}
