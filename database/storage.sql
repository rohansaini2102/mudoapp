-- Storage Buckets Setup
-- Run this after schema.sql in Supabase SQL Editor

-- Create avatars bucket (public)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create mood-media bucket (private)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mood-media', 'mood-media', false)
ON CONFLICT (id) DO NOTHING;

-- Avatar storage policies
CREATE POLICY "Users can upload own avatar" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'avatars' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update own avatar" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'avatars' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Anyone can view avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

-- Mood media storage policies
CREATE POLICY "Users can upload own mood media" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'mood-media' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view own mood media" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'mood-media' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete own mood media" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'mood-media' AND 
        auth.uid()::text = (storage.foldername(name))[1]
    );