import React, { useState } from 'react';
import PVLogo from '../../components/PVLogo';
import { LayoutDashboard, PlusCircle, Layers, Grid, LogOut, Globe, Menu, X } from 'lucide-react';
import { logoutAdmin } from '../../services/cmsService';

export default function AdminLayout({ children, activeTab, setActiveTab, session, onLogout, onNavigatePublic }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-design', label: 'Add New Design', icon: PlusCircle },
    { id: 'manage-designs', label: 'Manage Designs', icon: Layers },
    { id: 'manage-categories', label: 'Categories', icon: Grid },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1B1A] font-sans flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#2D0A14] text-white border-b border-[#C5A059]/40 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PVLogo size="sm" variant="dark" />
            <span className="hidden sm:inline-block h-6 w-px bg-[#C5A059]/40"></span>
            <span className="hidden sm:inline-block px-3 py-1 bg-[#3B101C] border border-[#C5A059]/40 rounded-full text-xs font-bold text-[#DFBA6A] uppercase tracking-wider">
              Owner CMS Portal
            </span>
          </div>

          {/* Desktop Nav Items & User Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    activeTab === item.id
                      ? 'bg-[#C5A059] text-[#2D0A14] font-bold shadow'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigatePublic}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-1.5 transition-colors"
              title="View Public Store"
            >
              <Globe className="w-4 h-4 text-[#DFBA6A]" />
              <span className="hidden sm:inline">View Public Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-900/40 hover:bg-red-900/60 text-red-200 text-xs font-semibold rounded-xl border border-red-500/30 flex items-center gap-1.5 transition-colors"
              title="Logout from CMS"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#3B101C] border-t border-[#C5A059]/30 p-4 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                    activeTab === item.id
                      ? 'bg-[#C5A059] text-[#2D0A14] font-bold'
                      : 'text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Admin Content Container - Renders active admin view */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
