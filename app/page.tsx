'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chamber SaaS</h1>
              <p className="text-sm text-gray-500">Platform for Chambers of Commerce</p>
            </div>
            <Link 
              href="/dashboard"
              className="bg-gray-900 text-white px-5 py-2.5 rounded-md hover:bg-gray-800 transition font-medium text-sm"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Manage Your Chamber
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete platform for member management, events calendar, and networking tools
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Member Directory */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-md transition">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Member Directory</h3>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              Searchable directory of all chamber members with contact information and business details
            </p>
            <Link 
              href="/members"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium inline-flex items-center"
            >
              Browse Members
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Events Calendar */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-md transition">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Events Calendar</h3>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              Manage networking events, mixers, and meetings with our events management system
            </p>
            <Link 
              href="/dashboard/events"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium inline-flex items-center"
            >
              View Events
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Pitch Timer */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-md transition">
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
              <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pitch Timer</h3>
            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
              Professional timer for networking pitches. Control from phone, display on projector
            </p>
            <Link 
              href="/dashboard/timer"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium inline-flex items-center"
            >
              Open Timer
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Admin Quick Access */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Admin Dashboard</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link 
              href="/dashboard"
              className="bg-gray-900 text-white px-5 py-3 rounded-md hover:bg-gray-800 transition text-center text-sm font-medium"
            >
              Members
            </Link>

            <Link 
              href="/dashboard/events"
              className="bg-gray-700 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition text-center text-sm font-medium"
            >
              Events
            </Link>

            <Link 
              href="/dashboard/timer"
              className="bg-gray-700 text-white px-5 py-3 rounded-md hover:bg-gray-600 transition text-center text-sm font-medium"
            >
              Timer Control
            </Link>

            {/* <Link 
              href="/timer/display"
              className="bbg-gray-900 text-white px-5 py-3 rounded-md hover:bg-gray-800 transition text-center text-sm font-medium"
            >
              Timer Display
            </Link> */}

            <Link 
              href="/timer/display"
              className="bg-gray-900 text-white px-5 py-3 rounded-md hover:bg-gray-800 transition text-center text-sm font-medium"
            >
              Timer Display
            </Link>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
            <p className="mt-1">Chamber SaaS Platform © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  )
}