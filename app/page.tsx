'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Chamber SaaS</h1>
              <p className="text-sm text-gray-600 mt-1">Complete Platform for Chambers of Commerce</p>
            </div>
            <Link 
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Manage Your Chamber with Ease
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to run a successful chamber: member directory, events calendar, and our unique pitch timer for networking events.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Member Directory Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Member Directory</h3>
            <p className="text-gray-600 mb-6">
              Searchable, beautiful directory of all chamber members with contact information and business details.
            </p>
            <Link 
              href="/members"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Browse Members →
            </Link>
          </div>

          {/* Events Calendar Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Events Calendar</h3>
            <p className="text-gray-600 mb-6">
              Manage networking events, mixers, and meetings with our easy-to-use events system.
            </p>
            <Link 
              href="/dashboard/events"
              className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
            >
              View Events →
            </Link>
          </div>

          {/* Pitch Timer Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 hover:shadow-lg transition">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Pitch Timer</h3>
            <p className="text-gray-600 mb-6">
              Professional timer for 45-second networking pitches. Control from your phone, display on projector.
            </p>
            <Link 
              href="/dashboard/timer"
              className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
            >
              Open Timer →
            </Link>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link 
              href="/dashboard"
              className="bg-gray-900 text-white px-6 py-4 rounded-md hover:bg-gray-800 transition text-center font-medium"
            >
              Members Dashboard
            </Link>
            <Link 
              href="/dashboard/events"
              className="bg-blue-600 text-white px-6 py-4 rounded-md hover:bg-blue-700 transition text-center font-medium"
            >
              Events Dashboard
            </Link>
            <Link 
              href="/dashboard/timer"
              className="bg-green-600 text-white px-6 py-4 rounded-md hover:bg-green-700 transition text-center font-medium"
            >
              Pitch Timer
            </Link>
            <Link 
              href="/timer/display"
              className="bg-purple-600 text-white px-6 py-4 rounded-md hover:bg-purple-700 transition text-center font-medium"
            >
              Timer Display
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Your Chamber SaaS MVP - Ready to Launch! 🚀
          </p>
        </div>
      </footer>
    </div>
  )
}