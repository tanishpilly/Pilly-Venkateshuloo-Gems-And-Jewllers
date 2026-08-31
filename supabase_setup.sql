-- ==============================================================================
-- SUPABASE DATABASE & STORAGE SETUP SCRIPT
-- Pilly Venkateshuloo Gems and Jewellers - Secure Admin CMS & Storage
-- ==============================================================================

-- 1. CREATE ADMIN AUTHORIZATION TABLE
-- Ensures merely creating a Supabase user does NOT grant admin permissions.
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can SELECT from admin_users to verify their admin status
DROP POLICY IF EXISTS "Authenticated users can select admin_users" ON public.admin_users;
CREATE POLICY "Authenticated users can select admin_users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Only admins can insert/update/delete admin_users
DROP POLICY IF EXISTS "Admins can manage admin_users" ON public.admin_users;
CREATE POLICY "Admins can manage admin_users"
    ON public.admin_users
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Helper Function: Returns TRUE if the current user is an authorized admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. CREATE CATEGORIES TABLE
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

-- 3. CREATE DESIGNS TABLE (STRICTLY NO PRICE FIELD)
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

-- 4. POSTGRESQL TABLE & SCHEMA PRIVILEGES (FOR SUPABASE POSTGREST DATA API)
-- Required when "Automatically expose new tables" is disabled in Supabase
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Allow public customers (anon) to SELECT
GRANT SELECT ON public.designs TO anon;
GRANT SELECT ON public.categories TO anon;

-- Allow authenticated users to perform SELECT, INSERT, UPDATE, DELETE at table level
-- (Row Level Security policies enforce that only authorized admins in admin_users can perform write operations)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.designs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT SELECT ON public.admin_users TO authenticated;

-- Grant EXECUTE on security helper function
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- 5. ROW LEVEL SECURITY (RLS) POLICIES FOR DESIGNS
-- PUBLIC CUSTOMERS: Read-only access restricted strictly to PUBLISHED designs (status = 'published')
DROP POLICY IF EXISTS "Public users can view published designs" ON public.designs;
CREATE POLICY "Public users can view published designs"
    ON public.designs
    FOR SELECT
    USING (status = 'published');

-- AUTHORIZED ADMINS ONLY: Full access (Select, Insert, Update, Delete)
DROP POLICY IF EXISTS "Admins have full access to designs" ON public.designs;
CREATE POLICY "Admins have full access to designs"
    ON public.designs
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 6. ROW LEVEL SECURITY (RLS) POLICIES FOR CATEGORIES
-- PUBLIC CUSTOMERS: Read-only access to categories
DROP POLICY IF EXISTS "Public users can view categories" ON public.categories;
CREATE POLICY "Public users can view categories"
    ON public.categories
    FOR SELECT
    USING (true);

-- AUTHORIZED ADMINS ONLY: Can create and manage categories
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
CREATE POLICY "Admins can manage categories"
    ON public.categories
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 7. STORAGE BUCKET CREATION FOR IMAGES
-- Create public bucket 'jewellery-designs' for high-resolution images
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

-- AUTHORIZED ADMINS ONLY: Upload images
DROP POLICY IF EXISTS "Admins can upload jewellery images" ON storage.objects;
CREATE POLICY "Admins can upload jewellery images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'jewellery-designs' AND public.is_admin());

-- AUTHORIZED ADMINS ONLY: Update images
DROP POLICY IF EXISTS "Admins can update jewellery images" ON storage.objects;
CREATE POLICY "Admins can update jewellery images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'jewellery-designs' AND public.is_admin());

-- AUTHORIZED ADMINS ONLY: Delete images
DROP POLICY IF EXISTS "Admins can delete jewellery images" ON storage.objects;
CREATE POLICY "Admins can delete jewellery images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'jewellery-designs' AND public.is_admin());
