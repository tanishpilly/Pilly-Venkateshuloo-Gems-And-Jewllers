import React, { useState, useEffect } from 'react';
import { fetchAllAdminDesigns, fetchCategories } from '../../services/cmsService';
import { PlusCircle, Layers, Grid, Eye, FileText, CheckCircle, Clock, Sparkles, ArrowRight } from 'lucide-react';

export default function AdminDashboard({ onNavigateTab }) {
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [allDesigns, catList] = await Promise.all([
        fetchAllAdminDesigns(),
        fetchCategories(),
      ]);
      setDesigns(allDesigns);
      setCategories(catList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalDesigns = designs.length;
  const publishedDesigns = designs.filter((d) => d.status === 'published').length;
  const draftDesigns = designs.filter((d) => d.status === 'draft').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#3B101C] text-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[#DFBA6A] text-xs font-bold uppercase tracking-[0.2em]">
            ESTABLISHED 1912 • GENERAL BAZAAR
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold">
            Pilly Venkateshuloo Gems & Jewellers
          </h1>
          <p className="text-xs text-gray-300">
            Welcome to your private jewellery management portal, Raghavendra Pilly.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('add-design')}
          className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#d6b066] text-[#2D0A14] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 shrink-0 transition-transform hover:scale-[1.02]"
        >
          <PlusCircle className="w-5 h-5" /> Add New Design
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/30 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Total Designs</span>
            <div className="w-10 h-10 rounded-xl bg-[#3B101C]/10 text-[#3B101C] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif-luxury font-bold text-[#3B101C]">{totalDesigns}</p>
          <p className="text-[11px] text-gray-500">In database store</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-500/30 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">Published</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif-luxury font-bold text-emerald-700">{publishedDesigns}</p>
          <p className="text-[11px] text-emerald-600 font-medium">Visible on public site</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-500/30 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-amber-600 tracking-wider">Drafts</span>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif-luxury font-bold text-amber-700">{draftDesigns}</p>
          <p className="text-[11px] text-amber-600 font-medium">Hidden from customers</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/30 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Categories</span>
            <div className="w-10 h-10 rounded-xl bg-[#3B101C]/10 text-[#3B101C] flex items-center justify-center">
              <Grid className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-serif-luxury font-bold text-[#3B101C]">{categories.length}</p>
          <p className="text-[11px] text-gray-500">Active collections</p>
        </div>

      </div>

      {/* Main Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <button
          onClick={() => onNavigateTab('add-design')}
          className="p-6 bg-white rounded-2xl border border-[#C5A059]/30 shadow-md hover:shadow-xl transition-all text-left space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center group-hover:scale-105 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C] group-hover:text-[#9E7934]">
            + Add New Design
          </h3>
          <p className="text-xs text-gray-600">
            Upload new photos from smartphone or desktop, choose category, and publish.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('manage-designs')}
          className="p-6 bg-white rounded-2xl border border-[#C5A059]/30 shadow-md hover:shadow-xl transition-all text-left space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C] group-hover:text-[#9E7934]">
            Manage Designs
          </h3>
          <p className="text-xs text-gray-600">
            Edit existing designs, toggle Draft/Publish status, or remove items.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab('manage-categories')}
          className="p-6 bg-white rounded-2xl border border-[#C5A059]/30 shadow-md hover:shadow-xl transition-all text-left space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#3B101C] text-[#DFBA6A] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Grid className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C] group-hover:text-[#9E7934]">
            Manage Categories
          </h3>
          <p className="text-xs text-gray-600">
            Extend available categories for Gold, Silver, Gemstones, and Beads.
          </p>
        </button>

      </div>

      {/* Recent Additions List */}
      <div className="bg-white rounded-3xl border border-[#C5A059]/30 shadow-lg p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#3B101C]">Recent Designs</h3>
            <p className="text-xs text-gray-500">Latest jewellery items uploaded to your store</p>
          </div>
          <button
            onClick={() => onNavigateTab('manage-designs')}
            className="text-xs font-bold text-[#3B101C] hover:underline flex items-center gap-1"
          >
            <span>View All</span> <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-gray-500">Loading recent designs...</div>
        ) : designs.length === 0 ? (
          <div className="py-12 text-center space-y-3 bg-[#FAF8F5] rounded-2xl border border-dashed border-gray-200">
            <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto" />
            <p className="text-sm font-semibold text-gray-700">No custom designs uploaded yet</p>
            <button
              onClick={() => onNavigateTab('add-design')}
              className="px-5 py-2.5 bg-[#3B101C] text-white text-xs font-bold uppercase rounded-xl"
            >
              Add Your First Design
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.slice(0, 6).map((design) => (
              <div
                key={design.id}
                className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-gray-200 flex items-center gap-3"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <img
                    src={design.images && design.images[0] ? design.images[0] : '/hero-jewellery.png'}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#9E7934] uppercase tracking-wider block truncate">
                    {design.category}
                  </span>
                  <p className="font-bold text-sm text-[#3B101C] truncate">{design.title}</p>
                  <span
                    className={`inline-block px-2 py-0.5 mt-1 text-[9px] font-bold uppercase rounded-full ${
                      design.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {design.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
