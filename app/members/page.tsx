'use client'

import { useState } from 'react'
import Link from 'next/link'

type Member = {
  id: string
  business_name: string
  owner_name: string
  category: string
  phone: string
  email: string
}

const MEMBERS: Member[] = [
  {
    id: '1',
    business_name: "Joe's Plumbing",
    owner_name: 'Joe Smith',
    category: 'Home Services',
    phone: '(817) 555-1234',
    email: 'joe@joesplumbing.com'
  },
  {
    id: '2',
    business_name: 'Smith Law Firm',
    owner_name: 'Jane Smith',
    category: 'Legal Services',
    phone: '(817) 555-5678',
    email: 'jane@smithlaw.com'
  },
  {
    id: '3',
    business_name: 'Best Coffee Shop',
    owner_name: 'Maria Garcia',
    category: 'Food & Beverage',
    phone: '(817) 555-9999',
    email: 'maria@bestcoffee.com'
  }
]

export default function MembersPage() {
  const [members] = useState<Member[]>(MEMBERS)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            🏛️ Roanoke Chamber of Commerce
          </h1>
          <Link href="/" className="text-gray-600 hover:text-purple-600">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            Member Directory
          </h1>
          <p className="text-gray-600">
            Browse our {members.length} chamber members
          </p>
        </div>

        <div className="grid gap-6">
          {members.map(member => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {member.business_name}
              </h2>
              <p className="text-gray-600 mb-1">
                👤 {member.owner_name}
              </p>
              <p className="text-purple-600 font-medium mb-2">
                📂 {member.category}
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                <p className="text-gray-600">
                  📞 {member.phone}
                </p>
                <p className="text-gray-600">
                  📧 {member.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}