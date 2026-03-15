'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseConfig'

type Member = {
  id: string
  business_name: string
  owner_name: string
  category: string
  phone: string
  email: string
}

export default function Dashboard() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    business_name: '',
    owner_name: '',
    category: '',
    phone: '',
    email: ''
  })

  const fetchMembers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Fetch error:', error)
        throw error
      }
      
      console.log('✅ Fetched members:', data)
      setMembers(data || [])
    } catch (error: unknown) {
      console.error('❌ Error loading members:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert('Error loading members: ' + errorMessage)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const categories = [...new Set(members.map(m => m.category))]

  const handleAdd = async () => {
    if (!formData.business_name || !formData.owner_name) {
      alert('Please fill in required fields')
      return
    }

    try {
      console.log('📤 Attempting to insert:', formData)
      
      const { data, error } = await supabase
        .from('members')
        .insert([{
          business_name: formData.business_name,
          owner_name: formData.owner_name,
          category: formData.category,
          phone: formData.phone,
          email: formData.email
        }])
        .select()

      if (error) {
        console.error('❌ Insert error:', error)
        throw error
      }

      console.log('✅ Insert successful:', data)
      alert('Member added successfully!')
      setFormData({ business_name: '', owner_name: '', category: '', phone: '', email: '' })
      setShowAddForm(false)
      fetchMembers()
    } catch (error: unknown) {
      console.error('❌ Error adding member:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert('Error adding member: ' + errorMessage)
    }
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

  const handleUpdate = async () => {
    if (!editingId) return

    try {
      console.log('📤 Attempting to update:', editingId, formData)
      
      const { error } = await supabase
        .from('members')
        .update({
          business_name: formData.business_name,
          owner_name: formData.owner_name,
          category: formData.category,
          phone: formData.phone,
          email: formData.email
        })
        .eq('id', editingId)

      if (error) {
        console.error('❌ Update error:', error)
        throw error
      }

      console.log('✅ Update successful')
      alert('Member updated successfully!')
      setEditingId(null)
      setFormData({ business_name: '', owner_name: '', category: '', phone: '', email: '' })
      fetchMembers()
    } catch (error: unknown) {
      console.error('❌ Error updating member:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert('Error updating member: ' + errorMessage)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      console.log('📤 Attempting to delete:', id)
      
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('❌ Delete error:', error)
        throw error
      }

      console.log('✅ Delete successful')
      alert('Member deleted successfully!')
      fetchMembers()
    } catch (error: unknown) {
      console.error('❌ Error deleting member:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert('Error deleting member: ' + errorMessage)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setShowAddForm(false)
    setFormData({ business_name: '', owner_name: '', category: '', phone: '', email: '' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading members...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Member Management</p>
            </div>
            <div className="flex gap-4">
              <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="/dashboard" className="text-sm text-gray-900 font-semibold">
                Members
              </Link>
              <Link href="/dashboard/events" className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                Events
              </Link>
              <Link href="/dashboard/timer" className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                Timer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Total Members</p>
            <p className="text-3xl font-bold text-gray-900">{members.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Categories</p>
            <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Active</p>
            <p className="text-3xl font-bold text-gray-900">{members.length}</p>
          </div>
        </div>

        <div className="mb-6">
          {!showAddForm && !editingId && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gray-900 text-white px-4 py-2.5 rounded-md hover:bg-gray-800 text-sm font-medium"
            >
              Add New Member
            </button>
          )}
        </div>

        {(showAddForm || editingId) && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Member' : 'Add New Member'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name *</label>
                <input
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Joe's Plumbing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Owner Name *</label>
                <input
                  type="text"
                  value={formData.owner_name}
                  onChange={(e) => setFormData({...formData, owner_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Joe Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Home Services"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="(817) 555-1234"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="joe@joesplumbing.com"
                  />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-medium"
              >
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{member.business_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{member.owner_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      {member.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{member.phone}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-gray-700 hover:text-gray-900 font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-gray-500 hover:text-gray-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm text-gray-500">No members yet. Add your first member to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}