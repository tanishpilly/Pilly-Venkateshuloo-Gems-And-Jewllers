-- ==============================================================================
-- SUPABASE DATABASE & STORAGE SETUP SCRIPT
-- Pilly Venkateshuloo Gems and Jewellers - Admin CMS & Cloud Storage
-- ==============================================================================

-- 1. CREATE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Populate Initial Default Categories
INSERT INTO public.categories (name) VALUES
    ('Gold Jewellery'),
    ('Silver Jewellery'),
    ('Men''s Jewellery'),
    ('Precious Gemstones'),
    ('Semi-Precious Gemstones'),
    ('Beads'),
    ('Pearls'),
    ('Corals'),
    ('Custom Jewellery')
ON CONFLICT (name) DO NOTHING;

-- 2. CREATE DESIGNS TABLE (STRICTLY NO PRICE FIELD)
CREATE TABLE IF NOT EXISTS public.designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'published', -- 'draft' or 'published'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;

-- 3. ROW LEVEL SECURITY (RLS) POLICIES FOR DESIGNS
-- PUBLIC CUSTOMERS: Can only view PUBLISHED designs (status = 'published')
DROP POLICY IF EXISTS "Public users can view published designs" ON public.designs;
CREATE POLICY "Public users can view published designs"
    ON public.designs
    FOR SELECT
    USING (status = 'published');

-- AUTHENTICATED ADMINS: Full access (Select, Insert, Update, Delete) to all designs
DROP POLICY IF EXISTS "Admins have full access to designs" ON public.designs;
CREATE POLICY "Admins have full access to designs"
    ON public.designs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES FOR CATEGORIES
-- PUBLIC CUSTOMERS: Can view categories
DROP POLICY IF EXISTS "Public users can view categories" ON public.categories;
CREATE POLICY "Public users can view categories"
    ON public.categories
    FOR SELECT
    USING (true);

-- AUTHENTICATED ADMINS: Can manage categories
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
    ON public.categories
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. STORAGE BUCKET CREATION FOR IMAGES
-- Create a public bucket 'jewellery-designs' for high-resolution images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('jewellery-designs', 'jewellery-designs', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
-- Public read access to uploaded images
DROP POLICY IF EXISTS "Public access to jewellery images" ON storage.objects;
CREATE POLICY "Public access to jewellery images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'jewellery-designs');

-- Authenticated Admin upload access
DROP POLICY IF EXISTS "Admins can upload jewellery images" ON storage.objects;
CREATE POLICY "Admins can upload jewellery images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'jewellery-designs');

-- Authenticated Admin update access
DROP POLICY IF EXISTS "Admins can update jewellery images" ON storage.objects;
CREATE POLICY "Admins can update jewellery images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'jewellery-designs');

-- Authenticated Admin delete access
DROP POLICY IF EXISTS "Admins can delete jewellery images" ON storage.objects;
CREATE POLICY "Admins can delete jewellery images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'jewellery-designs');

-- ==============================================================================
-- INSTRUCTIONS FOR CREATING THE FIRST ADMIN USER:
-- 1. Go to Supabase Dashboard -> Authentication -> Users.
-- 2. Click "Add User" -> "Create User".
-- 3. Enter Email: pillyvenkateshuloogemsjeweller@gmail.com (or your owner email)
--    and set a strong admin password.
-- ==============================================================================
