import React, { useState, useEffect } from 'react';
import { fetchCategories, addDesign } from '../../services/cmsService';
import { Upload, X, CheckCircle, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function AdminAddDesign({ onNavigateTab }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categoriesList, setCategoriesList] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('published'); // 'published' or 'draft'
  
  // Image files selected for upload
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const list = await fetchCategories();
      setCategoriesList(list);
      if (list.length > 0) setCategory(list[0]);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle image files selection (Camera or File Picker)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedFiles = imageFiles.filter((_, idx) => idx !== index);
    const updatedPreviews = imagePreviews.filter((_, idx) => idx !== index);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a design title.');
      return;
    }
    if (imageFiles.length === 0) {
      setErrorMsg('Please select at least one image photo for this design.');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await addDesign(
        { title, category, description, status },
        imageFiles
      );

      setSuccessMsg('Design uploaded successfully!');
      setTimeout(() => {
        onNavigateTab('manage-designs');
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save design. Please try again.');
      setSaving(false);
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
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
          Mobile Photo Uploader
        </span>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#C5A059]/30 shadow-xl space-y-6">
        <div>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#3B101C]">
            Add New Jewellery Design
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Upload photos, pick a category, and choose whether to publish immediately or save as a draft.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-2xl text-xs text-red-700 font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-100 border border-emerald-500/40 rounded-2xl text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
              Jewellery Photos (Upload 1 or more photos) <span className="text-red-500">*</span>
            </label>
            
            <div className="border-2 border-dashed border-[#C5A059]/40 rounded-2xl p-6 text-center bg-[#FAF8F5] hover:bg-[#F3EEEA] transition-colors relative cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-10 h-10 text-[#C5A059] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#3B101C]">Tap to upload or take photo</p>
              <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WEBP high-detail photos</p>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 h-24 bg-gray-100">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Design Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1">
              Design Title / Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Royal Antique Nakshi Haram Necklace"
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1">
              Showroom Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1">
              Design Description & Craft Details (Optional)
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe gold purity (916 BIS), gemstone inclusions, weight range options, or custom made-to-order details..."
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C] resize-none"
            ></textarea>
          </div>

          {/* Status Switch (Draft vs Published) */}
          <div className="p-4 bg-[#F3EEEA] rounded-2xl border border-[#C5A059]/30 flex items-center justify-between">
            <div>
              <strong className="block text-sm text-[#3B101C] font-bold">Publishing Status</strong>
              <p className="text-xs text-gray-600">
                {status === 'published'
                  ? 'Published: Will immediately appear in public website collection.'
                  : 'Draft: Saved privately in admin dashboard only.'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStatus('draft')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  status === 'draft' ? 'bg-amber-600 text-white shadow' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setStatus('published')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  status === 'published' ? 'bg-emerald-600 text-white shadow' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Publish Now
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('dashboard')}
              className="px-5 py-3 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3.5 bg-[#3B101C] hover:bg-[#2D0A14] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              {saving ? 'Uploading to Cloud...' : 'Save & Upload Design'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
