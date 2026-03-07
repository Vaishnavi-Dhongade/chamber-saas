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

const INITIAL_MEMBERS: Member[] = [
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

export default function Dashboard() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    business_name: '',
    owner_name: '',
    category: '',
    phone: '',
    email: ''
  })

  const handleAdd = () => {
    const newMember: Member = {
      id: Date.now().toString(),
      ...formData
    }
    setMembers([...members, newMember])
    setFormData({
      business_name: '',
      owner_name: '',
      category: '',
      phone: '',
      email: ''
    })
    setShowAddForm(false)
  }

  const handleEdit = (member: Member) => {
    setEditingId(member.id)
    setFormData({
      business_name: member.business_name,
      owner_name: member.owner_name,
      category: member.category,
      phone: member.phone,
      email: member.email
    })
  }

  const handleUpdate = () => {
    setMembers(members.map(m => 
      m.id === editingId 
        ? { ...m, ...formData }
        : m
    ))
    setEditingId(null)
    setFormData({
      business_name: '',
      owner_name: '',
      category: '',
      phone: '',
      email: ''
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            🏛️ Chamber Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <Link href="/" className="text-gray-600 hover:text-purple-600">
              Public Site
            </Link>
            <Link href="/dashboard" className="text-purple-600 font-semibold">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Total Members</div>
            <div className="text-3xl font-bold text-purple-600">{members.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Categories</div>
            <div className="text-3xl font-bold text-blue-600">
              {new Set(members.map(m => m.category)).size}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Active</div>
            <div className="text-3xl font-bold text-green-600">{members.length}</div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {showAddForm ? '✕ Cancel' : '➕ Add New Member'}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Business Name"
                value={formData.business_name}
                onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                className="border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Owner Name"
                value={formData.owner_name}
                onChange={(e) => setFormData({...formData, owner_name: e.target.value})}
                className="border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="border rounded px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="border rounded px-4 py-2 col-span-2"
              />
            </div>
            <button
              onClick={handleAdd}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Member
            </button>
          </div>
        )}

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Business</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Owner</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map(member => (
                <tr key={member.id} className="hover:bg-gray-50">
                  {editingId === member.id ? (
                    <>
                      <td className="px-6 py-4" colSpan={5}>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={formData.business_name}
                            onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                            className="border rounded px-3 py-1"
                          />
                          <input
                            type="text"
                            value={formData.owner_name}
                            onChange={(e) => setFormData({...formData, owner_name: e.target.value})}
                            className="border rounded px-3 py-1"
                          />
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="border rounded px-3 py-1"
                          />
                          <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="border rounded px-3 py-1"
                          />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="border rounded px-3 py-1 col-span-2"
                          />
                          <div className="col-span-2 flex gap-2">
                            <button
                              onClick={handleUpdate}
                              className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-400 text-white px-4 py-1 rounded text-sm hover:bg-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-medium">{member.business_name}</td>
                      <td className="px-6 py-4 text-gray-600">{member.owner_name}</td>
                      <td className="px-6 py-4 text-purple-600">{member.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{member.phone}</div>
                        <div>{member.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}