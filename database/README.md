# Database Setup Instructions

## Steps to Set Up Your Database

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/yibcftcczrsquovihmry
   - Navigate to SQL Editor (left sidebar)

2. **Run Schema Setup**
   - Click "New Query"
   - Copy all contents from `schema.sql`
   - Paste and click "Run"
   - You should see "Success. No rows returned"

3. **Run Storage Setup**
   - Click "New Query" again
   - Copy all contents from `storage.sql`
   - Paste and click "Run"
   - You should see "Success. No rows returned"

4. **Verify Setup**
   - Go to Table Editor - you should see all tables
   - Go to Storage - you should see 'avatars' and 'mood-media' buckets
   - Go to Authentication > Policies - you should see all RLS policies

## Tables Created

- `profiles` - User profiles
- `mood_entries` - All mood tracking entries
- `circles` - Social mood circles
- `circle_members` - Members of each circle
- `ai_sessions` - AI therapist chat sessions
- `ai_messages` - Messages in AI sessions

## Storage Buckets

- `avatars` - Public bucket for profile pictures
- `mood-media` - Private bucket for mood photos/videos

## What's Next?

Your database is now ready! The app can now:
- Create user accounts
- Store mood entries
- Handle file uploads
- Manage social circles

Return to the app and start using it!