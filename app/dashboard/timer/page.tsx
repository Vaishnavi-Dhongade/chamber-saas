'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TimerControl() {
  const [duration, setDuration] = useState(45)
  const [timeLeft, setTimeLeft] = useState(45)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionId] = useState(() => Date.now().toString())

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(duration)
    }
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(duration)
  }

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration)
    setTimeLeft(newDuration)
    setIsRunning(false)
  }

  const getColor = () => {
    const percentage = (timeLeft / duration) * 100
    if (percentage > 50) return 'text-gray-700'
    if (percentage > 20) return 'text-gray-600'
    return 'text-gray-900'
  }

  const displayUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/timer/display?duration=${duration}&session=${sessionId}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Pitch Timer Control</p>
            </div>
            <div className="flex gap-4">
              <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                Home
              </Link>
              <Link href="/dashboard" className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                Members
              </Link>
              <Link href="/dashboard/events" className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                Events
              </Link>
              <Link href="/dashboard/timer" className="text-sm text-gray-900 font-semibold">
                Timer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Display URL Instructions */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-gray-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Display on TV/Projector
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Open this URL on the screen everyone can see:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded px-3 py-2 font-mono text-xs text-gray-700 break-all mb-3">
                {displayUrl}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(displayUrl)
                  alert('URL copied to clipboard!')
                }}
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm font-medium"
              >
                Copy URL
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Or open a new tab and navigate to: <span className="font-semibold">/timer/display</span>
              </p>
            </div>
          </div>
        </div>

        {/* Duration Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Set Duration</h2>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[30, 45, 60, 90].map(seconds => (
              <button
                key={seconds}
                onClick={() => handleDurationChange(seconds)}
                className={`py-3 rounded-md font-semibold transition text-sm ${
                  duration === seconds
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {seconds}s
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Duration (seconds)
            </label>
            <input
              type="number"
              min="5"
              max="300"
              value={duration}
              onChange={(e) => handleDurationChange(parseInt(e.target.value) || 45)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Timer Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Preview</div>
            <div className={`text-7xl font-bold mb-4 transition-colors ${getColor()}`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600">
              {isRunning ? '▶ Running' : timeLeft === 0 ? '⏹ Finished' : '⏸ Ready'}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`py-5 rounded-md text-base font-bold transition ${
              isRunning
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            ▶ START
          </button>
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className={`py-5 rounded-md text-base font-bold transition ${
              !isRunning
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            ⏸ PAUSE
          </button>
          <button
            onClick={handleReset}
            className="py-5 rounded-md text-base font-bold bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            🔄 RESET
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
            <li>Choose pitch duration (default: 45 seconds)</li>
            <li>Open the Display URL on a TV or projector</li>
            <li>Press START when the speaker begins</li>
            <li>Timer changes color as time runs out</li>
            <li>Press RESET for the next speaker</li>
          </ol>
        </div>
      </div>
    </div>
  )
}