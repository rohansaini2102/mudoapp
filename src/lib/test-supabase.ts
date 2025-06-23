import { supabase } from './supabase'

export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)
    
    if (error && error.code === '42P01') {
      console.log('❌ Tables not created yet. Please run schema.sql in Supabase SQL Editor')
      return false
    }
    
    if (error) {
      console.log('❌ Connection error:', error.message)
      return false
    }
    
    console.log('✅ Successfully connected to Supabase!')
    
    // Test 2: Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      console.log('✅ User authenticated:', user.email)
    } else {
      console.log('ℹ️  No user logged in')
    }
    
    return true
    
  } catch (err) {
    console.log('❌ Unexpected error:', err)
    return false
  }
}