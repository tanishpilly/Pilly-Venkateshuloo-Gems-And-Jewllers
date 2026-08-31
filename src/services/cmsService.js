import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

// Default initial categories fallback
const DEFAULT_CATEGORIES = [
  'Gold Jewellery',
  'Silver Jewellery',
  'Men\'s Jewellery',
  'Precious Gemstones',
  'Semi-Precious Gemstones',
  'Beads',
  'Pearls',
  'Corals',
  'Custom Jewellery'
];

// Local storage fallback key for dev mode when Supabase env keys are pending
const LOCAL_STORAGE_DESIGNS_KEY = 'pv_gems_jewellers_admin_designs';
const LOCAL_STORAGE_CATEGORIES_KEY = 'pv_gems_jewellers_admin_categories';
const LOCAL_STORAGE_AUTH_KEY = 'pv_gems_jewellers_admin_session';

// Helper to get local mock storage items
const getLocalDesigns = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_DESIGNS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLocalDesigns = (designs) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_DESIGNS_KEY, JSON.stringify(designs));
  } catch (e) {
    console.error('Local storage save error:', e);
  }
};

// ==============================================================================
// AUTHENTICATION SERVICE
// ==============================================================================

export const loginAdmin = async (email, password) => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data.session;
  } else {
    // Development fallback mode: Allow login if credentials provided match email format
    if (email && password && password.length >= 6) {
      const mockSession = {
        user: { email, role: 'authenticated' },
        expires_at: Date.now() + 86400000,
      };
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(mockSession));
      return mockSession;
    }
    throw new Error('Invalid login credentials or password too short (min 6 characters).');
  }
};

export const logoutAdmin = async () => {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};

export const getAdminSession = async () => {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.auth.getSession();
    return data?.session || null;
  } else {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
};

// ==============================================================================
// CATEGORIES SERVICE
// ==============================================================================

export const fetchCategories = async () => {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .order('name', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((c) => c.name);
    }
  }

  // Fallback to dynamic local storage or default list
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_CATEGORIES_KEY);
    if (local) return JSON.parse(local);
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_CATEGORIES;
};

export const addCategory = async (categoryName) => {
  const trimmed = categoryName.trim();
  if (!trimmed) throw new Error('Category name cannot be empty.');

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('categories')
      .insert([{ name: trimmed }]);

    if (error) throw new Error(error.message);
  } else {
    const current = await fetchCategories();
    if (!current.includes(trimmed)) {
      const updated = [...current, trimmed];
      localStorage.setItem(LOCAL_STORAGE_CATEGORIES_KEY, JSON.stringify(updated));
    }
  }
  return trimmed;
};

// ==============================================================================
// IMAGE UPLOAD SERVICE
// ==============================================================================

export const uploadDesignImage = async (file) => {
  if (isSupabaseConfigured && supabase) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('jewellery-designs')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Image upload failed: ${uploadError.message}`);
    }

    const { data } = supabase.storage
      .from('jewellery-designs')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } else {
    // Fallback: Convert file to Base64 data URL for instant dev testing
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
};

// ==============================================================================
// DESIGNS SERVICE (NO PRICE FIELDS)
// ==============================================================================

export const fetchPublishedDesigns = async (categoryFilter = null) => {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('designs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (categoryFilter && categoryFilter !== 'All') {
      query = query.eq('category', categoryFilter);
    }

    const { data, error } = await query;
    if (!error && data) return data;
  }

  // Local fallback
  const local = getLocalDesigns();
  let filtered = local.filter((d) => d.status === 'published');
  if (categoryFilter && categoryFilter !== 'All') {
    filtered = filtered.filter((d) => d.category.toLowerCase() === categoryFilter.toLowerCase());
  }
  return filtered;
};

export const fetchAllAdminDesigns = async (categoryFilter = null, statusFilter = null) => {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('designs')
      .select('*')
      .order('created_at', { ascending: false });

    if (categoryFilter && categoryFilter !== 'All') {
      query = query.eq('category', categoryFilter);
    }
    if (statusFilter && statusFilter !== 'All') {
      query = query.eq('status', statusFilter.toLowerCase());
    }

    const { data, error } = await query;
    if (!error && data) return data;
  }

  // Local fallback
  let local = getLocalDesigns();
  if (categoryFilter && categoryFilter !== 'All') {
    local = local.filter((d) => d.category.toLowerCase() === categoryFilter.toLowerCase());
  }
  if (statusFilter && statusFilter !== 'All') {
    local = local.filter((d) => d.status.toLowerCase() === statusFilter.toLowerCase());
  }
  return local;
};

export const addDesign = async ({ title, category, description, status = 'published' }, imageFiles = []) => {
  if (!title.trim()) throw new Error('Design title is required.');
  if (!category.trim()) throw new Error('Category is required.');

  // Upload all provided image files
  const imageUrls = [];
  for (const file of imageFiles) {
    if (file instanceof File) {
      const url = await uploadDesignImage(file);
      imageUrls.push(url);
    } else if (typeof file === 'string') {
      imageUrls.push(file);
    }
  }

  const newDesign = {
    title: title.trim(),
    category: category.trim(),
    description: description ? description.trim() : '',
    images: imageUrls,
    status: status.toLowerCase(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('designs')
      .insert([newDesign])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  } else {
    // Local fallback
    const local = getLocalDesigns();
    const created = {
      ...newDesign,
      id: `design_${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    saveLocalDesigns([created, ...local]);
    return created;
  }
};

export const updateDesign = async (id, updatedFields, newImageFiles = [], removedImageUrls = []) => {
  // Upload any new image files
  const newUploadedUrls = [];
  for (const file of newImageFiles) {
    if (file instanceof File) {
      const url = await uploadDesignImage(file);
      newUploadedUrls.push(url);
    }
  }

  // Calculate final image list
  let existingImages = updatedFields.images || [];
  existingImages = existingImages.filter((img) => !removedImageUrls.includes(img));
  const finalImages = [...existingImages, ...newUploadedUrls];

  const payload = {
    title: updatedFields.title?.trim(),
    category: updatedFields.category?.trim(),
    description: updatedFields.description?.trim(),
    images: finalImages,
    status: updatedFields.status?.toLowerCase(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('designs')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  } else {
    const local = getLocalDesigns();
    const updated = local.map((item) => (item.id === id ? { ...item, ...payload } : item));
    saveLocalDesigns(updated);
    return updated.find((item) => item.id === id);
  }
};

export const toggleDesignStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  return updateDesign(id, { status: newStatus });
};

export const deleteDesign = async (id) => {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('designs')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  } else {
    const local = getLocalDesigns();
    const updated = local.filter((item) => item.id !== id);
    saveLocalDesigns(updated);
  }
  return true;
};
