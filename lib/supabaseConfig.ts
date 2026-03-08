const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Types
type SupabaseResponse<T> = {
  data: T | null
  error: Error | null
}

// Export helper functions
export const supabase = {
  from: (table: string) => ({
    select: async (columns: string = '*') => {
      try {
        const url = `${supabaseUrl}/rest/v1/${table}?select=${columns}&order=created_at.desc`
        const response = await fetch(url, {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          }
        })
        const data = await response.json()
        return { data, error: null }
      } catch (error) {
        return { data: null, error: error as Error }
      }
    },
    
    insert: (values: Record<string, unknown>[]) => ({
      select: async () => {
        try {
          const url = `${supabaseUrl}/rest/v1/${table}`
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(values)
          })
          const data = await response.json()
          return { data, error: null }
        } catch (error) {
          return { data: null, error: error as Error }
        }
      }
    }),
    
    update: (values: Record<string, unknown>) => ({
      eq: async (column: string, value: string) => {
        try {
          const url = `${supabaseUrl}/rest/v1/${table}?${column}=eq.${value}`
          const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`,
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(values)
          })
          const data = await response.json()
          return { data, error: null }
        } catch (error) {
          return { data: null, error: error as Error }
        }
      }
    }),
    
    delete: () => ({
      eq: async (column: string, value: string) => {
        try {
          const url = `${supabaseUrl}/rest/v1/${table}?${column}=eq.${value}`
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${supabaseAnonKey}`
            }
          })
          return { error: null }
        } catch (error) {
          return { error: error as Error }
        }
      }
    })
  })
}

export async function testConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('members').select('*')
    if (error) {
      console.error('❌ Connection test failed:', error)
      return false
    }
    console.log('✅ Supabase connected successfully!')
    return true
  } catch (err) {
    console.error('❌ Connection test error:', err)
    return false
  }
}