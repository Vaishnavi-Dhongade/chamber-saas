'use client'

import { useState } from 'react'
import Link from 'next/link'

type Event = {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
}

const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Weekly Networking Breakfast',
    description: 'Join us for coffee and 45-second pitches',
    date: '2026-03-15',
    time: '08:00',
    location: 'Brix BBQ, Roanoke'
  },
  {
    id: '2',
    title: 'Business After Hours',
    description: 'Casual networking mixer with drinks and appetizers',
    date: '2026-03-20',
    time: '17:30',
    location: 'The Cove, Roanoke'
  }
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  })

  const handleAdd = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...formData
    }
    setEvents([...events, newEvent])
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: ''
    })
    setShowAddForm(false)
  }

  const handleEdit = (event: Event) => {
    setEditingId(event.id)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location
    })
  }

  const handleUpdate = () => {
    setEvents(events.map(e => 
      e.id === editingId 
        ? { ...e, ...formData }
        : e
    ))
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: ''
    })
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
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
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600">
              Members
            </Link>
            <Link href="/dashboard/events" className="text-purple-600 font-semibold">
              Events
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Total Events</div>
            <div className="text-3xl font-bold text-purple-600">{events.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">Upcoming</div>
            <div className="text-3xl font-bold text-blue-600">
              {events.filter(e => new Date(e.date) >= new Date()).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm">This Month</div>
            <div className="text-3xl font-bold text-green-600">{events.length}</div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {showAddForm ? '✕ Cancel' : '📅 Add New Event'}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add New Event</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="border rounded px-4 py-2 col-span-2"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="border rounded px-4 py-2 col-span-2"
                rows={3}
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="border rounded px-4 py-2"
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="border rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="border rounded px-4 py-2 col-span-2"
              />
            </div>
            <button
              onClick={handleAdd}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Event
            </button>
          </div>
        )}

        {/* Events List */}
        <div className="grid gap-6">
          {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {editingId === event.id ? (
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Edit Event</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="border rounded px-4 py-2 col-span-2"
                    />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="border rounded px-4 py-2 col-span-2"
                      rows={3}
                    />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="border rounded px-4 py-2"
                    />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="border rounded px-4 py-2"
                    />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="border rounded px-4 py-2 col-span-2"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-purple-600 text-white p-4">
                    <h2 className="text-2xl font-bold">{event.title}</h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Date</div>
                        <div className="font-semibold">{formatDate(event.date)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Time</div>
                        <div className="font-semibold">{formatTime(event.time)}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Location</div>
                        <div className="font-semibold">{event.location}</div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        ✏️ Edit Event
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}