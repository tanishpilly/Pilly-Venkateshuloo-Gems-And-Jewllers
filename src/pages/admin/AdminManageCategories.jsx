import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory } from '../../services/cmsService';
import { Grid, Plus, CheckCircle, ArrowLeft } from 'lucide-react';

export default function AdminManageCategories({ onNavigateTab }) {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const list = await fetchCategories();
      setCategories(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setAdding(true);
    setMsg('');

    try {
      await addCategory(newCatName);
      setNewCatName('');
      setMsg('Category added successfully!');
      loadCategories();
    } catch (err) {
      setMsg(err.message || 'Failed to add category.');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigateTab('dashboard')}
          className="text-xs font-bold text-gray-600 hover:text-[#3B101C] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl space-y-6">
        <div>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            Manage Showroom Categories
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Extend categories available for organising your gold, gemstone, silver, and bead collections.
          </p>
        </div>

        {msg && (
          <div className="p-3.5 bg-emerald-100 border border-emerald-400 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> {msg}
          </div>
        )}

        {/* Add Category Form */}
        <form onSubmit={handleAddCategory} className="flex gap-3">
          <input
            type="text"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="e.g. Temple Nakshi Jewellery..."
            className="flex-1 px-4 py-3 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
          />
          <button
            type="submit"
            disabled={adding}
            className="px-6 py-3 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase rounded-xl shadow flex items-center gap-1.5 disabled:opacity-50"
          >
            <Plus className="w-4 h-4 text-[#DFBA6A]" /> {adding ? 'Adding...' : 'Add Category'}
          </button>
        </form>

        {/* Current Categories Grid */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C]">Active Categories</h3>

          {loading ? (
            <p className="text-xs text-gray-500">Loading categories...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#FAF8F5] rounded-xl border border-gray-200 text-xs font-semibold text-[#3B101C] flex items-center gap-2"
                >
                  <Grid className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="truncate">{cat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
