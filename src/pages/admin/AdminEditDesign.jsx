import React, { useState } from 'react';
import { updateDesign, fetchCategories } from '../../services/cmsService';
import { X, Upload, CheckCircle, Trash2 } from 'lucide-react';

export default function AdminEditDesign({ design, categories, onClose, onUpdated }) {
  const [title, setTitle] = useState(design.title || '');
  const [category, setCategory] = useState(design.category || '');
  const [description, setDescription] = useState(design.description || '');
  const [status, setStatus] = useState(design.status || 'published');
  
  const [existingImages, setExistingImages] = useState(design.images || []);
  const [removedImages, setRemovedImages] = useState([]);
  
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);
  
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setNewFiles([...newFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewPreviews([...newPreviews, ...previews]);
  };

  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter((img) => img !== url));
    setRemovedImages([...removedImages, url]);
  };

  const removeNewPreview = (idx) => {
    setNewFiles(newFiles.filter((_, i) => i !== idx));
    setNewPreviews(newPreviews.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    try {
      await updateDesign(
        design.id,
        { title, category, description, status, images: existingImages },
        newFiles,
        removedImages
      );
      onUpdated();
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update design.');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-[#C5A059]/40 rounded-3xl shadow-2xl overflow-hidden text-[#1C1B1A] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-[#3B101C] text-white border-b border-[#C5A059]/30 flex items-center justify-between">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold">Edit Jewellery Design</h3>
            <p className="text-xs text-[#DFBA6A]">Modify design metadata and image gallery</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-100 border border-red-400 rounded-xl text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1">
              Design Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B101C] resize-none"
            ></textarea>
          </div>

          {/* Existing Images */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
              Existing Images
            </label>
            <div className="grid grid-cols-4 gap-2">
              {existingImages.map((url, idx) => (
                <div key={idx} className="relative group h-20 rounded-lg overflow-hidden border border-gray-200">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(url)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full shadow hover:bg-red-700"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Images */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
              Add Additional Photos
            </label>
            <div className="border border-dashed border-[#C5A059]/40 p-4 rounded-xl text-center bg-[#FAF8F5] relative cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleNewImages}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-6 h-6 text-[#C5A059] mx-auto mb-1" />
              <span className="text-xs font-semibold text-[#3B101C]">Upload additional images</span>
            </div>

            {newPreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {newPreviews.map((src, idx) => (
                  <div key={idx} className="relative h-20 rounded-lg overflow-hidden border border-emerald-500">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewPreview(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#C5A059]/30">
            <span className="text-xs font-bold text-[#3B101C]">Status</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStatus('draft')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${status === 'draft' ? 'bg-amber-600 text-white' : 'bg-gray-200'}`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setStatus('published')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${status === 'published' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}
              >
                Published
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#3B101C] text-white text-xs font-bold uppercase rounded-xl shadow disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
