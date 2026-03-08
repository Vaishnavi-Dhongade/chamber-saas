'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function TimerDisplayContent() {
  const searchParams = useSearchParams()
  const durationFromUrl = parseInt(searchParams.get('duration') || '45')
  
  const [duration] = useState(durationFromUrl)
  const [timeLeft, setTimeLeft] = useState(durationFromUrl)
  const [isRunning, setIsRunning] = useState(false)

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

  const getBackgroundColor = () => {
    const percentage = (timeLeft / duration) * 100
    if (percentage > 50) return 'bg-gray-100'
    if (percentage > 20) return 'bg-gray-200'
    return 'bg-gray-300'
  }

  const getTextColor = () => {
    const percentage = (timeLeft / duration) * 100
    if (percentage > 50) return 'text-gray-900'
    if (percentage > 20) return 'text-gray-800'
    return 'text-gray-900'
  }

  const getStatusText = () => {
    if (timeLeft === 0) return "TIME'S UP!"
    if (isRunning) return 'SPEAKING'
    return 'READY'
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${getBackgroundColor()}`}>
      <div className="text-center">
        <div className={`text-9xl md:text-[20rem] font-black mb-8 drop-shadow-lg transition-colors ${getTextColor()}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        
        <div className={`text-4xl md:text-6xl font-bold uppercase tracking-widest ${getTextColor()}`}>
          {getStatusText()}
        </div>
      </div>

      {/* Test Controls */}
      <div className="fixed bottom-8 left-8 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg max-w-md">
        <p className="font-bold text-gray-900 mb-2 text-sm">Test Controls</p>
        <p className="text-xs text-gray-600 mb-3">Duration: {duration} seconds</p>
        <div className="space-x-2">
          <button
            onClick={() => {
              setTimeLeft(duration)
              setIsRunning(true)
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm font-medium"
          >
            ▶ Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition text-sm font-medium"
          >
            ⏸ Pause
          </button>
          <button
            onClick={() => {
              setIsRunning(false)
              setTimeLeft(duration)
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-sm font-medium"
          >
            🔄 Reset
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Note: In production, this syncs with control screen automatically
        </p>
      </div>
    </div>
  )
}

export default function TimerDisplay() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-4xl text-gray-900 font-bold">Loading Timer...</div>
      </div>
    }>
      <TimerDisplayContent />
    </Suspense>
  )
}