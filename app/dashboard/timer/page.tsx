'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TimerControl() {
  const [duration, setDuration] = useState(45) // seconds
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
    if (percentage > 50) return 'green'
    if (percentage > 20) return 'yellow'
    return 'red'
  }

  const displayUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/timer/display?duration=${duration}&session=${sessionId}`

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            ⏱️ Pitch Timer Control
          </h1>
          <div className="flex gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-purple-600">
              Dashboard
            </Link>
            <Link href="/dashboard/timer" className="text-purple-600 font-semibold">
              Timer
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Display URL Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-800 mb-2">
            📺 Display on TV/Projector
          </h2>
          <p className="text-blue-700 mb-3">
            Open this URL on the screen everyone can see:
          </p>
          <div className="bg-white p-3 rounded border border-blue-300 font-mono text-sm break-all">
            {displayUrl}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(displayUrl)
              alert('URL copied to clipboard!')
            }}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📋 Copy URL
          </button>
          <p className="text-sm text-blue-600 mt-3">
            Or just open a new tab and go to: <strong>/timer/display</strong>
          </p>
        </div>

        {/* Duration Presets */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">⚙️ Set Duration</h2>
          <div className="grid grid-cols-4 gap-3">
            {[30, 45, 60, 90].map(seconds => (
              <button
                key={seconds}
                onClick={() => handleDurationChange(seconds)}
                className={`py-3 rounded-lg font-semibold transition ${
                  duration === seconds
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {seconds}s
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Duration (seconds)
            </label>
            <input
              type="number"
              min="5"
              max="300"
              value={duration}
              onChange={(e) => handleDurationChange(parseInt(e.target.value) || 45)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Timer Display (Preview) */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="text-center">
            <div className="text-gray-500 text-sm mb-2">PREVIEW</div>
            <div 
              className={`text-8xl font-bold mb-4 transition-colors ${
                getColor() === 'green' ? 'text-green-600' :
                getColor() === 'yellow' ? 'text-yellow-500' :
                'text-red-600'
              }`}
            >
              0:{timeLeft.toString().padStart(2, '0')}
            </div>
            <div className="text-gray-600 text-lg">
              {isRunning ? '▶️ Running' : timeLeft === 0 ? '⏹️ Finished' : '⏸️ Ready'}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`py-6 rounded-lg text-xl font-bold transition ${
              isRunning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            ▶️ START
          </button>
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className={`py-6 rounded-lg text-xl font-bold transition ${
              !isRunning
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            ⏸️ PAUSE
          </button>
          <button
            onClick={handleReset}
            className="py-6 rounded-lg text-xl font-bold bg-red-600 text-white hover:bg-red-700 transition"
          >
            🔄 RESET
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold mb-3">📖 How to Use:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Choose pitch duration (default: 45 seconds)</li>
            <li>Open the Display URL on a TV or projector</li>
            <li>Press START when the speaker begins</li>
            <li>Timer changes color: Green → Yellow → Red</li>
            <li>Press RESET for the next speaker</li>
          </ol>
        </div>
      </div>
    </div>
  )
}