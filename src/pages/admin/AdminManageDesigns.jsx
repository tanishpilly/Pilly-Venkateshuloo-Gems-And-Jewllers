import React, { useState, useEffect } from 'react';
import { fetchAllAdminDesigns, fetchCategories, toggleDesignStatus, deleteDesign } from '../../services/cmsService';
import AdminEditDesign from './AdminEditDesign';
import { Search, Filter, Edit3, Trash2, CheckCircle, Clock, Eye, PlusCircle, AlertTriangle } from 'lucide-react';

export default function AdminManageDesigns({ onNavigateTab }) {
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal States
  const [editingDesign, setEditingDesign] = useState(null);
  const [deletingDesignId, setDeletingDesignId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
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

  const handleToggleStatus = async (design) => {
    try {
      await toggleDesignStatus(design.id, design.status);
      loadData();
    } catch (e) {
      alert(e.message || 'Status toggle failed.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingDesignId) return;
    setDeleting(true);
    try {
      await deleteDesign(deletingDesignId);
      setDeletingDesignId(null);
      loadData();
    } catch (e) {
      alert(e.message || 'Delete failed.');
    } finally {
      setDeleting(false);
    }
  };

  // Filtered designs logic
  const filteredDesigns = designs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus =
      selectedStatus === 'All' || item.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#C5A059]/30 shadow-md">
        <div>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            Manage Jewellery Designs
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Total {designs.length} designs in system database
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('add-design')}
          className="px-5 py-3 bg-[#3B101C] hover:bg-[#2D0A14] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-[#DFBA6A]" /> Add New Design
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C5A059]/30 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-[#C5A059]/30 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-[#C5A059]/30 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
        >
          <option value="All">All Statuses (Drafts & Published)</option>
          <option value="published">Published Only</option>
          <option value="draft">Drafts Only</option>
        </select>
      </div>

      {/* Design Table / Grid View */}
      {loading ? (
        <div className="py-12 text-center text-xs text-gray-500">Loading designs...</div>
      ) : filteredDesigns.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-300 text-center space-y-3">
          <p className="text-sm font-semibold text-gray-700">No designs match your filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="text-xs text-[#3B101C] underline font-bold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#C5A059]/30 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#3B101C] text-white border-b border-[#C5A059]/30 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-bold">Image</th>
                  <th className="py-3.5 px-4 font-bold">Design Title</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {filteredDesigns.map((design) => (
                  <tr key={design.id} className="hover:bg-[#FAF8F5] transition-colors">
                    
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <img
                          src={design.images && design.images[0] ? design.images[0] : '/hero-jewellery.png'}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title & description snippet */}
                    <td className="py-3 px-4">
                      <p className="font-bold text-sm text-[#3B101C]">{design.title}</p>
                      <p className="text-[11px] text-gray-500 line-clamp-1 max-w-xs">
                        {design.description || 'No description'}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-[11px]">
                        {design.category}
                      </span>
                    </td>

                    {/* Status Toggle Pill */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(design)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-transform hover:scale-105 ${
                          design.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                        title="Click to toggle Draft / Published"
                      >
                        {design.status === 'published' ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" /> Published
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-amber-600" /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingDesign(design)}
                          className="p-2 bg-[#3B101C]/10 text-[#3B101C] hover:bg-[#3B101C] hover:text-white rounded-lg transition-colors"
                          title="Edit Design"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => setDeletingDesignId(design.id)}
                          className="p-2 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
                          title="Delete Design"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Design Modal */}
      {editingDesign && (
        <AdminEditDesign
          design={editingDesign}
          categories={categories}
          onClose={() => setEditingDesign(null)}
          onUpdated={loadData}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingDesignId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full border border-red-200 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#3B101C]">Confirm Delete</h3>
            <p className="text-xs text-gray-600">
              Are you sure you want to permanently delete this jewellery design? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingDesignId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-5 py-2 bg-red-600 text-white font-bold text-xs uppercase rounded-xl shadow hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete Design'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
