'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-6xl font-black mb-6">
          🏛️ Chamber SaaS
        </h1>
        <p className="text-2xl mb-12 opacity-90">
          The Complete Platform for Chambers of Commerce
        </p>
        
        <div className="flex gap-6 justify-center mb-16">
          <Link 
            href="/dashboard"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition"
          >
            🎛️ Admin Dashboard
          </Link>
          <Link 
            href="/members"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-white hover:text-purple-600 transition"
          >
            👥 View Members
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-2xl font-bold mb-3">Member Directory</h3>
            <p className="opacity-90">Searchable, beautiful directory of all chamber members</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-3">Events Calendar</h3>
            <p className="opacity-90">Manage networking events, mixers, and meetings</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
            <div className="text-5xl mb-4">⏱️</div>
            <h3 className="text-2xl font-bold mb-3">Pitch Timer</h3>
            <p className="opacity-90">Professional timer for 45-second networking pitches</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-20 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">Quick Access</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/dashboard" className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-semibold transition">
              Members Dashboard
            </Link>
            <Link href="/dashboard/events" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition">
              Events Dashboard
            </Link>
            <Link href="/dashboard/timer" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition">
              Pitch Timer
            </Link>
            <Link href="/timer/display" className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg font-semibold transition">
              Timer Display
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-sm opacity-75">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
          <p className="mt-2">Your Chamber SaaS MVP - Ready to Launch! 🚀</p>
        </div>
      </div>
    </div>
  )
}