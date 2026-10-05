import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  targetDate?: string
}

export function CountdownTimer({ targetDate = '2026-11-14T16:00:00' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="w-full max-w-xl mx-auto my-6 sm:my-8 px-4 text-center">
      <div className="inline-block px-5 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/30 shadow-md mb-4">
        <p className="text-xs uppercase tracking-[0.22em] text-white font-semibold font-[var(--font-sans)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          Faltan para el gran día
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: 'Días', value: timeLeft.days },
          { label: 'Horas', value: timeLeft.hours },
          { label: 'Minutos', value: timeLeft.minutes },
          { label: 'Segundos', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-3 sm:p-5 bg-white rounded-xl border border-[var(--border-subtle)] shadow-[var(--shadow-card)] relative overflow-hidden group hover:border-[var(--color-sage)] transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--surface-tint)] opacity-40 group-hover:opacity-80 transition-opacity" />
            <span className="relative text-2xl sm:text-4xl font-serif font-medium text-[var(--text-main)] leading-none mb-1">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="relative text-[10px] sm:text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

