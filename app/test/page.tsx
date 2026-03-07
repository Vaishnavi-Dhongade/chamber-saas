'use client'

import { useEffect, useState } from 'react'

export default function TestPage() {
  const [result, setResult] = useState('Testing...')
  const [details, setDetails] = useState<unknown>(null)

  useEffect(() => {
    async function test() {
      const url = 'https://xprzvrzknhbqgahnrqgv.supabase.co/rest/v1/members?select=*'
      const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwcnp2cnprbmhicWdhaG5ycWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MzE1NzAsImV4cCI6MjA1MjEwNzU3MH0.VsEIADFq0C8aWFx1P-xZYjKr15TdTAnWjNy7LwVyb0c'

      try {
        console.log('Fetching from:', url)
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          }
        })

        console.log('Response status:', response.status)
        console.log('Response headers:', response.headers)

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        console.log('Success! Data:', data)
        
        setResult('✅ SUCCESS!')
        setDetails(data)

      } catch (error) {
        console.error('Error:', error)
        const err = error as Error
        setResult('❌ FAILED')
        setDetails({
          error: err.message,
          type: err.constructor.name,
          stack: err.stack
        })
      }
    }

    test()
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Supabase Direct Test
      </h1>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: result.includes('SUCCESS') ? '#d4edda' : '#f8d7da',
        border: '2px solid ' + (result.includes('SUCCESS') ? '#28a745' : '#dc3545'),
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '24px' }}>{result}</h2>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px',
        maxHeight: '500px',
        overflow: 'auto'
      }}>
        <pre style={{ margin: 0, fontSize: '12px' }}>
          {JSON.stringify(details, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p><strong>What to check:</strong></p>
        <ol style={{ lineHeight: '1.8' }}>
          <li>Open F12 → Console tab to see detailed logs</li>
          <li>If you see CORS error, it&apos;s your browser/network blocking</li>
          <li>If you see &quot;Failed to fetch&quot;, try different browser</li>
          <li>If SUCCESS, then main app has different issue</li>
        </ol>
      </div>
    </div>
  )
}