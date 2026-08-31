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

// Initial Catalogue Items for One-Time Seeding Migration
const INITIAL_SEED_ITEMS = [
  {
    title: 'Bespoke Bridal Gold Haram',
    category: 'Gold Jewellery',
    description: 'Grand traditional long necklace custom-designed with intricate Nakshi or temple artwork and gemstone inlay.',
    images: ['/hero-jewellery.png'],
    status: 'published'
  },
  {
    title: 'Custom Gold Choker & Earrings',
    category: 'Gold Jewellery',
    description: 'Elegant close-fitting gold choker set with uncut diamonds, emerald beads, or rubies crafted by master goldsmiths.',
    images: ['/gold-craftsmanship.png'],
    status: 'published'
  },
  {
    title: 'Traditional Gold Kadas & Bangles',
    category: 'Gold Jewellery',
    description: 'Handcrafted 916 gold bangles featuring traditional antique finishes, screw mechanisms, or smooth polished textures.',
    images: ['/gold-craftsmanship.png'],
    status: 'published'
  },
  {
    title: 'Custom Gold Vaddanam (Waistbelt)',
    category: 'Gold Jewellery',
    description: 'Heritage waist belt crafted with divine motifs, peacocks, or floral carving to complement royal South Indian bridal attire.',
    images: ['/hero-jewellery.png'],
    status: 'published'
  },
  {
    title: 'Men\'s Custom Gold Chains & Rings',
    category: 'Men\'s Jewellery',
    description: 'Subtle, solid gold chains and gemstone-studded signet rings tailored for gentlemen.',
    images: ['/gold-craftsmanship.png'],
    status: 'published'
  },
  {
    title: 'Pigeon Blood & Precious Rubies (Manikyam)',
    category: 'Precious Gemstones',
    description: 'Deep red natural rubies selected for clarity, color, and astrological purity. Custom-set into rings, pendants, and neckpieces.',
    images: ['/ruby-gemstones.jpg'],
    status: 'published'
  },
  {
    title: 'Colombian & Zambian Emeralds (Panna)',
    category: 'Precious Gemstones',
    description: 'Vibrant green emeralds possessing exceptional luster and depth. Renowned for custom bridal jewellery and gemstone settings.',
    images: ['/emerald-gemstones.jpg'],
    status: 'published'
  },
  {
    title: 'Blue & Yellow Sapphires (Neelam & Pukhraj)',
    category: 'Precious Gemstones',
    description: 'Unheated natural sapphires chosen for brilliance, cuts, and astrological suitability. Certified for authenticity.',
    images: ['/sapphire-gemstones.jpg'],
    status: 'published'
  },
  {
    title: 'Navratna Precious Nine Gemstones',
    category: 'Precious Gemstones',
    description: 'Harmonious combinations of nine precious stones custom-crafted into traditional rings, pendants, and bracelets.',
    images: ['/navratna-gemstones.jpg'],
    status: 'published'
  },
  {
    title: 'Hyderabadi & South Sea Pearls (Moti)',
    category: 'Pearls',
    description: 'Lustrous white and golden pearls carrying Secunderabad\'s iconic pearl legacy, available in multi-strand strings and studded settings.',
    images: ['/basra-pearls.jpg'],
    status: 'published'
  },
  {
    title: 'Natural Red Coral (Pagam / Moonga)',
    category: 'Corals',
    description: 'Premium natural Italian red corals cut into cabs and beads, suitable for customary rings and gold-encased pendants.',
    images: ['/italian-coral.jpg'],
    status: 'published'
  },
  {
    title: 'Men\'s 92.5 Sterling Silver Kada',
    category: 'Silver Jewellery',
    description: 'Robust, heavy solid silver kadas for men available in polished, textured, and oxidized antique designs.',
    images: ['/silver-jewellery.jpg'],
    status: 'published'
  },
  {
    title: 'Men\'s & Women\'s Silver Chains',
    category: 'Silver Jewellery',
    description: 'Durable silver chains in classic curb, figaro, box, and traditional designs.',
    images: ['/silver-jewellery.jpg'],
    status: 'published'
  },
  {
    title: 'Traditional Silver Anklets (Pailu / Payal)',
    category: 'Silver Jewellery',
    description: 'Intricately detailed silver anklets with bell accents and smooth daily-wear finishes.',
    images: ['/silver-jewellery.jpg'],
    status: 'published'
  },
  {
    title: 'Silver Pooja & Heritage Articles',
    category: 'Silver Jewellery',
    description: 'Traditional silver diyas, kalash, kumkum boxes, and gifting silver coins.',
    images: ['/silver-jewellery.jpg'],
    status: 'published'
  },
  {
    title: 'Precious Gemstone Beads String',
    category: 'Beads',
    description: 'Fine hand-cut and smooth polished beads of natural rubies, emeralds, and sapphires strung in single or multi-strand designs.',
    images: ['/precious-beads.jpg'],
    status: 'published'
  },
  {
    title: 'Semi-Precious Specialty Beads',
    category: 'Semi-Precious Gemstones',
    description: 'A wide variety of colorful semi-precious beads for custom neckpieces, layered malas, and contemporary statement jewellery.',
    images: ['/precious-beads.jpg'],
    status: 'published'
  }
];

// Helper to check if Supabase is connected
const checkSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are not configured in Vercel. Please add them in Vercel Project Settings -> Environment Variables.'
    );
  }
};

/**
 * ONE-TIME MIGRATION: Seeds initial 17 catalogue items into Supabase and uploads images to Storage.
 * Uses persistent marker in public.app_config. CAN NEVER RUN AGAIN AFTER INITIAL SEEDING!
 */
export const seedInitialCatalogueToSupabase = async () => {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    // 1. Check if persistent migration marker exists in app_config
    const { data: markerData } = await supabase
      .from('app_config')
      .select('value')
      .eq('key', 'initial_catalogue_seeded')
      .maybeSingle();

    if (markerData && markerData.value === true) {
      // Migration already executed! DO NOT SEED AGAIN EVEN IF ALL DESIGNS ARE DELETED!
      return;
    }

    // 2. Execute one-time migration
    console.log('Executing ONE-TIME catalogue migration to Supabase...');

    // Process initial items & upload static assets into Supabase Storage
    const itemsToInsert = [];

    for (const item of INITIAL_SEED_ITEMS) {
      const storageUrls = [];

      for (const assetPath of item.images) {
        try {
          // Fetch local asset blob
          const response = await fetch(assetPath);
          if (response.ok) {
            const blob = await response.blob();
            const fileName = `initial_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.jpg`;

            // Upload image to Supabase Storage bucket 'jewellery-designs'
            const { error: uploadErr } = await supabase.storage
              .from('jewellery-designs')
              .upload(fileName, blob, {
                cacheControl: '3600',
                upsert: false,
                contentType: blob.type || 'image/jpeg',
              });

            if (!uploadErr) {
              const { data: publicUrlData } = supabase.storage
                .from('jewellery-designs')
                .getPublicUrl(fileName);

              if (publicUrlData?.publicUrl) {
                storageUrls.push(publicUrlData.publicUrl);
              }
            }
          }
        } catch (err) {
          console.warn(`Could not upload asset ${assetPath} to storage:`, err);
        }

        // Fallback to static URL if upload was restricted
        if (storageUrls.length === 0) {
          storageUrls.push(assetPath);
        }
      }

      itemsToInsert.push({
        ...item,
        images: storageUrls,
      });
    }

    // 3. Insert migrated items into public.designs table
    const { error: insertErr } = await supabase
      .from('designs')
      .insert(itemsToInsert);

    if (!insertErr) {
      // 4. Permanently record one-time seed marker in app_config
      await supabase
        .from('app_config')
        .upsert([{ key: 'initial_catalogue_seeded', value: true }]);

      console.log('Initial catalogue migration completed & permanently marked.');
    }
  } catch (e) {
    console.error('One-time seeding migration error:', e);
  }
};

// ==============================================================================
// AUTHENTICATION & AUTHORIZATION SERVICE
// ==============================================================================

export const verifyAdminUser = async (userId) => {
  if (!userId || !isSupabaseConfigured || !supabase) return false;

  try {
    const { data: adminRows, error: adminErr } = await supabase
      .from('admin_users')
      .select('user_id, email')
      .eq('user_id', userId);

    if (!adminErr && adminRows && adminRows.length > 0) {
      const match = adminRows.find((r) => r.user_id === userId);
      if (match) return true;
    }

    const { data: rpcCheck } = await supabase.rpc('is_admin');
    if (rpcCheck === true) return true;
  } catch (e) {
    console.error('Error verifying admin authorization:', e);
  }

  return false;
};

export const loginAdmin = async (email, password) => {
  checkSupabase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const isAuthorized = await verifyAdminUser(data.user.id);

  if (!isAuthorized) {
    await supabase.auth.signOut();
    throw new Error('Access Denied: Your account is not authorized for administrator access.');
  }

  // Attempt initial catalogue migration check upon admin login
  await seedInitialCatalogueToSupabase();

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

    const isAuthorized = await verifyAdminUser(data.session.user.id);
    if (!isAuthorized) {
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
// DESIGNS SERVICE (DETERMINISTIC CATEGORY MATCHING)
// ==============================================================================

export const fetchPublishedDesigns = async (categoryFilter = null) => {
  if (isSupabaseConfigured && supabase) {
    // Check one-time seed migration marker
    await seedInitialCatalogueToSupabase();

    let query = supabase
      .from('designs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    const { data, error } = await query;
    if (!error && data) {
      if (!categoryFilter || categoryFilter === 'All') {
        return data;
      }

      const filterLower = categoryFilter.toLowerCase();

      // Deterministic Category Group Matching
      return data.filter((item) => {
        const itemCatLower = (item.category || '').toLowerCase();

        if (filterLower.includes('gold')) {
          return (
            itemCatLower === 'gold jewellery' ||
            itemCatLower === 'custom jewellery' ||
            itemCatLower === 'men\'s jewellery' ||
            itemCatLower.includes('gold')
          );
        }
        if (filterLower.includes('gemstone') || filterLower.includes('ruby') || filterLower.includes('emerald') || filterLower.includes('sapphire')) {
          return (
            itemCatLower === 'precious gemstones' ||
            itemCatLower === 'semi-precious gemstones' ||
            itemCatLower.includes('gemstone') ||
            itemCatLower.includes('ruby') ||
            itemCatLower.includes('emerald') ||
            itemCatLower.includes('sapphire') ||
            itemCatLower.includes('navratna')
          );
        }
        if (filterLower.includes('silver')) {
          return itemCatLower === 'silver jewellery' || itemCatLower.includes('silver');
        }
        if (filterLower.includes('bead') || filterLower.includes('pearl') || filterLower.includes('coral')) {
          return (
            itemCatLower === 'beads' ||
            itemCatLower === 'pearls' ||
            itemCatLower === 'corals' ||
            itemCatLower.includes('bead') ||
            itemCatLower.includes('pearl') ||
            itemCatLower.includes('coral')
          );
        }

        return itemCatLower === filterLower;
      });
    }
  }
  return [];
};

export const fetchAllAdminDesigns = async (categoryFilter = null, statusFilter = null) => {
  checkSupabase();

  await seedInitialCatalogueToSupabase();

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

  // Upload image files to Supabase Storage
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

  const newUploadedUrls = [];
  for (const file of newImageFiles) {
    if (file instanceof File) {
      const url = await uploadDesignImage(file);
      newUploadedUrls.push(url);
    }
  }

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

  // 1. Fetch design details to inspect image URLs
  const { data: targetDesign, error: fetchErr } = await supabase
    .from('designs')
    .select('id, images')
    .eq('id', id)
    .single();

  if (fetchErr) {
    throw new Error(`Failed to locate design for deletion: ${fetchErr.message}`);
  }

  // 2. Extract image filenames stored in jewellery-designs bucket
  if (targetDesign && Array.isArray(targetDesign.images)) {
    const storageFilePaths = [];
    for (const url of targetDesign.images) {
      if (typeof url === 'string' && url.includes('/storage/v1/object/public/jewellery-designs/')) {
        const fileName = url.split('/storage/v1/object/public/jewellery-designs/').pop();
        if (fileName) storageFilePaths.push(fileName);
      }
    }

    // 3. Remove files from Supabase Storage bucket
    if (storageFilePaths.length > 0) {
      const { error: storageRemoveErr } = await supabase.storage
        .from('jewellery-designs')
        .remove(storageFilePaths);

      if (storageRemoveErr) {
        console.warn('Storage image deletion warning:', storageRemoveErr.message);
      }
    }
  }

  // 4. Delete row from public.designs table
  const { error: deleteErr } = await supabase
    .from('designs')
    .delete()
    .eq('id', id);

  if (deleteErr) {
    throw new Error(`Database deletion failed: ${deleteErr.message}`);
  }

  return true;
};
