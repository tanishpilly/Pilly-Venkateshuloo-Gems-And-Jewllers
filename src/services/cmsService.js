import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

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

// Helper to check if Supabase is connected
const checkSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are not configured in Vercel. Please add them in Vercel Project Settings -> Environment Variables.'
    );
  }
};

// ==============================================================================
// AUTHENTICATION & AUTHORIZATION SERVICE
// ==============================================================================

export const loginAdmin = async (email, password) => {
  checkSupabase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Verify that the user is an authorized admin registered in public.admin_users
  const { data: adminCheck, error: adminErr } = await supabase
    .from('admin_users')
    .select('user_id, email')
    .eq('user_id', data.user.id)
    .single();

  if (adminErr || !adminCheck) {
    // Sign out unauthorized user immediately
    await supabase.auth.signOut();
    throw new Error('Access Denied: Your account is not authorized for administrator access.');
  }

  return data.session;
};

export const logoutAdmin = async () => {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
};

export const getAdminSession = async () => {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.auth.getSession();
    if (!data?.session) return null;

    // Verify admin authorization
    const { data: adminCheck } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', data.session.user.id)
      .single();

    if (!adminCheck) {
      await supabase.auth.signOut();
      return null;
    }

    return data.session;
  }
  return null;
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
  return DEFAULT_CATEGORIES;
};

export const addCategory = async (categoryName) => {
  checkSupabase();
  const trimmed = categoryName.trim();
  if (!trimmed) throw new Error('Category name cannot be empty.');

  const { error } = await supabase
    .from('categories')
    .insert([{ name: trimmed }]);

  if (error) throw new Error(error.message);
  return trimmed;
};

// ==============================================================================
// IMAGE UPLOAD SERVICE (SUPABASE BUCKET: jewellery-designs)
// ==============================================================================

export const uploadDesignImage = async (file) => {
  checkSupabase();

  if (!file || !(file instanceof File)) {
    throw new Error('Invalid image file provided.');
  }

  // Max 10MB limit per image for web optimization
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image size exceeds 10MB limit. Please upload a smaller photo.');
  }

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
};

// ==============================================================================
// DESIGNS SERVICE (STRICTLY NO PRICE FIELDS)
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
  return [];
};

export const fetchAllAdminDesigns = async (categoryFilter = null, statusFilter = null) => {
  checkSupabase();

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
  if (error) throw new Error(error.message);
  return data || [];
};

export const addDesign = async ({ title, category, description, status = 'published' }, imageFiles = []) => {
  checkSupabase();

  if (!title || !title.trim()) throw new Error('Design title is required.');
  if (!category || !category.trim()) throw new Error('Category is required.');
  if (!imageFiles || imageFiles.length === 0) throw new Error('At least one image photo is required.');

  // Upload all provided image files to Supabase Storage
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

  const { data, error } = await supabase
    .from('designs')
    .insert([newDesign])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const updateDesign = async (id, updatedFields, newImageFiles = [], removedImageUrls = []) => {
  checkSupabase();

  // Upload new image files
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

  const { data, error } = await supabase
    .from('designs')
    .update(payload)
    .eq('id', id)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const toggleDesignStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  return updateDesign(id, { status: newStatus });
};

export const deleteDesign = async (id) => {
  checkSupabase();

  const { error } = await supabase
    .from('designs')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return true;
};
