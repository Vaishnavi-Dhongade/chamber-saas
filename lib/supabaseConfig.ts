import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Missing Supabase environment variables')
}

// Simple, clean configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test connection function
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase connection error:', error)
      return false
    }
    
    console.log('✅ Supabase connected successfully!')
    return true
  } catch (err) {
    console.error('❌ Supabase test failed:', err)
    return false
  }
}