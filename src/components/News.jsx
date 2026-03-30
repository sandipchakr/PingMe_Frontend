import React, { useEffect, useState } from 'react'

function News() {
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 500)

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 87) return 87 // stall at 87% for realism
        return p + Math.floor(Math.random() * 4) + 1
      })
    }, 200)

    return () => {
      clearInterval(dotInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const headlines = [
    'Breaking: Feature Still In The Oven 🔥',
    'Sources Confirm: Launch Date TBD',
    'Exclusive: Developers Working Overtime',
    'Opinion: Good Things Take Time',
  ]

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ef4444, transparent)' }}
      />

      {/* Newspaper masthead */}
      <div className="relative z-10 w-full max-w-2xl">

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-gray-600 pb-2 mb-1">
          <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">Vol. 0 · Issue 0</span>
          <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">Est. Soon™</span>
        </div>

        {/* Masthead title */}
        <div className="text-center border-b-2 border-gray-500 pb-4 mb-6">
          <h1 className="text-5xl font-black text-white tracking-tight leading-none"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>
            THE DAILY
            <span className="text-red-500"> NEWS</span>
          </h1>
          <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mt-1">Your trusted source · Coming very soon</p>
        </div>

        {/* Main card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">

          {/* Red alert banner */}
          <div className="bg-red-700 px-5 py-2 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">Section Under Development</span>
          </div>

          {/* Content */}
          <div className="p-8 text-center">

            {/* Animated icon */}
            <div className="text-6xl mb-4" style={{ animation: 'bounce 1.5s infinite' }}>🗞️</div>

            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              We're Printing The First Edition{dots}
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Our journalists are busy gathering breaking stories, hot takes,<br />
              and everything worth reading. Check back soon!
            </p>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Build Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <p className="text-gray-600 text-xs mb-6">Finalizing layout engine{dots}</p>

            {/* Mock headlines */}
            <div className="border-t border-gray-700 pt-5 text-left space-y-3">
              <p className="text-gray-600 text-xs uppercase tracking-widest mb-3">Sneak Peek Headlines</p>
              {headlines.map((h, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span className="text-red-600 font-black text-xs mt-1 shrink-0">▶</span>
                  <p className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors duration-200 line-through decoration-gray-700">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-700 text-xs mt-5 tracking-wider">
          © The Daily News · All rights reserved · Probably
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}

export default News