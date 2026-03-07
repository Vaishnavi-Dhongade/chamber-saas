import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate they exist
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!')
  console.log('URL:', supabaseUrl)
  console.log('Key exists:', !!supabaseAnonKey)
}

// Create client
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: false
    }
  }
)

// Test connection
export async function testConnection() {
  try {
    const { data, error } = await supabase.from('members').select('count')
    if (error) {
      console.error('Connection test failed:', error)
      return false
    }
    console.log('Connection successful!', data)
    return true
  } catch (err) {
    console.error('Connection error:', err)
    return false
  }
}