'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function TimerDisplayContent() {
  const searchParams = useSearchParams()
  const durationParam = searchParams.get('duration')
  const initialDuration = durationParam ? parseInt(durationParam) : 45
  
  const [timeLeft, setTimeLeft] = useState(initialDuration)
  const [isPaused, setIsPaused] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [autoRestart, setAutoRestart] = useState(true) // NEW: Auto-restart enabled by default
  const [pitchCount, setPitchCount] = useState(0) // NEW: Track number of pitches completed

  useEffect(() => {
    if (!isRunning || isPaused) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer reached 0
          if (autoRestart) {
            // Auto-restart: Reset to initial duration
            setPitchCount(count => count + 1) // Increment pitch counter
            return initialDuration
          } else {
            // Stop if auto-restart is disabled
            setIsRunning(false)
            return 0
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, isPaused, autoRestart, initialDuration])

  const handleStart = () => {
    setIsRunning(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setTimeLeft(initialDuration)
    setIsRunning(false)
    setIsPaused(false)
    setPitchCount(0)
  }

  const toggleAutoRestart = () => {
    setAutoRestart(!autoRestart)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getBackgroundColor = () => {
    if (timeLeft <= 5) return 'bg-red-600'
    if (timeLeft <= 10) return 'bg-yellow-500'
    return 'bg-gray-900'
  }

  const getTextColor = () => {
    if (timeLeft <= 5) return 'text-white'
    if (timeLeft <= 10) return 'text-gray-900'
    return 'text-white'
  }

  return (
    <div className={`min-h-screen ${getBackgroundColor()} transition-colors duration-500 flex flex-col items-center justify-center p-8`}>
      {/* Auto-Restart Indicator */}
      <div className="absolute top-8 right-8 flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
        <span className={`text-sm font-medium ${getTextColor()}`}>
          Auto-Restart: {autoRestart ? 'ON' : 'OFF'}
        </span>
        <button
          onClick={toggleAutoRestart}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            autoRestart ? 'bg-green-500' : 'bg-gray-400'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              autoRestart ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* Pitch Counter */}
      {autoRestart && pitchCount > 0 && (
        <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
          <div className={`text-sm font-medium ${getTextColor()} mb-1`}>Pitches Completed</div>
          <div className={`text-4xl font-bold ${getTextColor()} text-center`}>{pitchCount}</div>
        </div>
      )}

      {/* Main Timer Display */}
      <div className="text-center">
        <div className={`text-[20rem] font-bold ${getTextColor()} leading-none mb-8 tabular-nums`}>
          {formatTime(timeLeft)}
        </div>

        <div className={`text-4xl font-medium ${getTextColor()} mb-2`}>
          {isPaused ? 'PAUSED' : isRunning ? 'RUNNING' : 'READY'}
        </div>

        {autoRestart && isRunning && (
          <div className={`text-xl ${getTextColor()} opacity-75`}>
            Auto-restarts after each pitch
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-12 flex gap-4">
        {!isRunning && (
          <button
            onClick={handleStart}
            className="bg-white text-gray-900 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          >
            START
          </button>
        )}
        
        {isRunning && (
          <button
            onClick={handlePause}
            className="bg-white text-gray-900 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition"
          >
            {isPaused ? 'RESUME' : 'PAUSE'}
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-white/30 transition"
        >
          RESET
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 text-center">
        <p className={`text-sm ${getTextColor()} opacity-50`}>
          Press F11 for fullscreen • ESC to exit
        </p>
      </div>
    </div>
  )
}

export default function TimerDisplay() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading timer...</div>
      </div>
    }>
      <TimerDisplayContent />
    </Suspense>
  )
}