# MoodVibe API Documentation

## Overview
MoodVibe uses Supabase as its backend service, providing real-time database, authentication, and storage capabilities.

## Base Configuration

```typescript
// src/lib/supabase.ts
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
```

## Authentication API

### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: string,
  password: string,
})
```
**Response**: User object with session

### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: string,
  password: string,
})
```
**Response**: User object with session

### Sign Out
```typescript
const { error } = await supabase.auth.signOut()
```

### Get Current User
```typescript
const { data: { user } } = await supabase.auth.getUser()
```

### Session Management
```typescript
// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  // Handle auth state changes
})
```

## Database API

### Mood Entries

#### Create Mood Entry
```typescript
const { data, error } = await supabase
  .from('mood_entries')
  .insert([{
    user_id: string,
    mood_score: number, // 1-10
    entry_type: 'text' | 'image' | 'video' | 'voice',
    text_content?: string,
    media_url?: string,
    synced: boolean,
    metadata?: object
  }])
  .select()
  .single()
```

#### Get User's Mood Entries
```typescript
const { data, error } = await supabase
  .from('mood_entries')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

#### Get Entries by Date Range
```typescript
const { data, error } = await supabase
  .from('mood_entries')
  .select('*')
  .eq('user_id', userId)
  .gte('created_at', startDate.toISOString())
  .lte('created_at', endDate.toISOString())
```

#### Get Today's Entries
```typescript
const today = new Date()
today.setHours(0, 0, 0, 0)

const { data, error } = await supabase
  .from('mood_entries')
  .select('*')
  .eq('user_id', userId)
  .gte('created_at', today.toISOString())
```

#### Update Mood Entry
```typescript
const { data, error } = await supabase
  .from('mood_entries')
  .update({ text_content: newText })
  .eq('id', entryId)
  .select()
```

#### Delete Mood Entry
```typescript
const { error } = await supabase
  .from('mood_entries')
  .delete()
  .eq('id', entryId)
```

### User Profiles

#### Get User Profile
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

#### Update Profile
```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({
    full_name: string,
    username: string,
    avatar_url: string
  })
  .eq('id', userId)
```

## Real-time Subscriptions

### Subscribe to Mood Entries
```typescript
const subscription = supabase
  .channel('mood_entries')
  .on('postgres_changes', 
    { 
      event: '*', 
      schema: 'public', 
      table: 'mood_entries',
      filter: `user_id=eq.${userId}`
    }, 
    (payload) => {
      // Handle real-time updates
    }
  )
  .subscribe()

// Cleanup
subscription.unsubscribe()
```

## Data Aggregation Queries

### Get Mood Statistics
```typescript
// Get average mood for a period
const { data, error } = await supabase
  .rpc('get_mood_average', {
    user_id: userId,
    start_date: startDate,
    end_date: endDate
  })

// Note: Custom RPC functions would need to be created in Supabase
```

### Complex Queries for Analytics

#### Weekly Mood Averages
```typescript
// Get last 7 days of entries
const weekAgo = new Date()
weekAgo.setDate(weekAgo.getDate() - 7)

const { data, error } = await supabase
  .from('mood_entries')
  .select('*')
  .eq('user_id', userId)
  .gte('created_at', weekAgo.toISOString())
  .order('created_at', { ascending: true })
```

#### Mood Distribution
```typescript
// Get all entries and calculate distribution client-side
const { data, error } = await supabase
  .from('mood_entries')
  .select('mood_score')
  .eq('user_id', userId)

// Process data client-side for distribution
const distribution = data.reduce((acc, entry) => {
  acc[entry.mood_score] = (acc[entry.mood_score] || 0) + 1
  return acc
}, {})
```

## Error Handling

All Supabase operations return an error object:

```typescript
if (error) {
  console.error('Error:', error.message)
  // Handle error appropriately
}
```

Common error codes:
- `PGRST116`: No rows returned
- `23505`: Unique constraint violation
- `42501`: Insufficient privileges
- `PGRST301`: JWT expired

## Security

### Row Level Security (RLS)
All tables have RLS policies:
- Users can only read their own data
- Users can only create entries for themselves
- Users can only update/delete their own entries

### Authentication Required
All database operations require an authenticated user session.

## Rate Limits
- Anonymous requests: 60 req/min
- Authenticated requests: 300 req/min

## Best Practices

1. **Always handle errors**
```typescript
try {
  const { data, error } = await supabase.from('mood_entries').select()
  if (error) throw error
  // Process data
} catch (error) {
  // Handle error
}
```

2. **Use select() to get returned data**
```typescript
const { data, error } = await supabase
  .from('mood_entries')
  .insert([...])
  .select() // Returns inserted data
```

3. **Cleanup subscriptions**
```typescript
useEffect(() => {
  const subscription = supabase.channel('...')
  return () => {
    subscription.unsubscribe()
  }
}, [])
```

4. **Batch operations when possible**
```typescript
// Insert multiple entries at once
const { data, error } = await supabase
  .from('mood_entries')
  .insert([entry1, entry2, entry3])
```

## Environment Variables

Required in `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Future API Endpoints

### Planned Features
1. **Export Data**: `/api/export/csv` or `/api/export/pdf`
2. **AI Analysis**: `/api/ai/analyze-mood-patterns`
3. **Weather Data**: `/api/weather/current`
4. **Social Features**: `/api/circles/*`
5. **Notifications**: `/api/notifications/subscribe`