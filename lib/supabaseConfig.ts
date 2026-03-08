import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Missing Supabase environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'NOT SET')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
    },
  },
})

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

// Export types for TypeScript
export type Member = {
  id: string
  chamber_id?: string
  business_name: string
  owner_name: string
  category: string
  phone: string
  email: string
  website?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  description?: string
  logo_url?: string
  status?: string
  created_at?: string
}

export type Event = {
  id: string
  chamber_id?: string
  title: string
  description: string
  event_date: string
  start_time: string
  end_time?: string
  location: string
  created_at?: string
}