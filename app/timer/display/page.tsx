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
    if (percentage > 50) return 'bg-green-500'
    if (percentage > 20) return 'bg-yellow-400'
    return 'bg-red-500'
  }

  const getStatusText = () => {
    if (timeLeft === 0) return "TIME'S UP!"
    if (isRunning) return 'SPEAKING'
    return 'READY'
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${getBackgroundColor()}`}>
      <div className="text-white text-center">
        <div className="text-9xl md:text-[20rem] font-black mb-8 drop-shadow-2xl">
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
        
        <div className="text-4xl md:text-6xl font-bold uppercase tracking-widest drop-shadow-lg">
          {getStatusText()}
        </div>
      </div>

      <div className="fixed bottom-8 left-8 bg-black bg-opacity-50 text-white p-4 rounded-lg text-sm max-w-md">
        <p className="font-bold mb-2">🎮 Test Controls</p>
        <p className="text-xs mb-3">Duration: {duration} seconds</p>
        <div className="space-x-2">
          <button
            onClick={() => {
              setTimeLeft(duration)
              setIsRunning(true)
            }}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            ▶️ Start
          </button>
          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition"
          >
            ⏸️ Pause
          </button>
          <button
            onClick={() => {
              setIsRunning(false)
              setTimeLeft(duration)
            }}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TimerDisplay() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-green-500 flex items-center justify-center text-white text-4xl">
        Loading Timer...
      </div>
    }>
      <TimerDisplayContent />
    </Suspense>
  )
}