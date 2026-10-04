import { useEffect, useRef, useState } from 'react'
import { AudioWaveIcon } from './MonetIcons'
import { WEDDING_DETAILS } from '../config/weddingDetails'

interface AudioPlayerProps {
  src?: string
  autoPlay?: boolean
  visible?: boolean
}

export function AudioPlayer({
  src = WEDDING_DETAILS.musicUrl,
  autoPlay = WEDDING_DETAILS.musicAutoPlay,
  visible = true,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  // Initialize audio / Web Audio API synth
  useEffect(() => {
    // 1. If custom MP3/Audio file URL is provided
    if (src) {
      if (!audioRef.current) {
        const audio = new Audio(encodeURI(src))
        audio.loop = true
        audio.preload = 'auto'
        audio.setAttribute('playsinline', 'true')
        audio.setAttribute('webkit-playsinline', 'true')

        // Ensure seamless start as soon as enough buffer is loaded on slow connections
        audio.addEventListener('canplay', () => {
          if (isPlaying && audio.paused) {
            audio.play().catch(() => {})
          }
        })

        audioRef.current = audio
      }
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked on load by browser policy: waiting for first user activation
        })
      } else {
        audioRef.current.pause()
      }
      return
    }

    // 2. Otherwise use ambient Web Audio API romantic synth
    if (!isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend()
      }
      return
    }

    let isCancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const playHarmonies = async () => {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          audioCtxRef.current = new AudioContextClass()
        }

        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume()
        }

        const ctx = audioCtxRef.current
        const chords = [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7
          [220.00, 261.63, 329.63, 392.00], // Am7
          [174.61, 220.00, 261.63, 329.63], // Fmaj7
          [196.00, 246.94, 293.66, 392.00], // G7
        ]

        let step = 0

        const playNextChord = () => {
          if (isCancelled || !isPlaying || !ctx) return

          const chord = chords[step % chords.length]
          step++

          chord.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()

            osc.type = 'sine'
            osc.frequency.setValueAtTime(freq, ctx.currentTime)

            const startTime = ctx.currentTime + i * 0.15
            const duration = 3.5

            gain.gain.setValueAtTime(0, startTime)
            gain.gain.linearRampToValueAtTime(0.04, startTime + 0.8)
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.start(startTime)
            osc.stop(startTime + duration + 0.1)
          })

          timeoutId = setTimeout(playNextChord, 3800)
        }

        playNextChord()
      } catch {
        // Autoplay pending user gesture
      }
    }

    playHarmonies()

    return () => {
      isCancelled = true
      clearTimeout(timeoutId)
    }
  }, [isPlaying, src])

  // Handle browser autoplay policy: start audio on first user tap, click, or keypress anywhere on screen
  useEffect(() => {
    if (!autoPlay) return

    const handleFirstInteraction = () => {
      if (src) {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {})
        }
      } else {
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(() => {})
        }
        setIsPlaying(true)
      }

      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true)
        document.removeEventListener(evt, handleFirstInteraction, true)
      })
    }

    const events = ['click', 'pointerdown', 'mousedown', 'keydown', 'touchstart', 'touchend']

    events.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true })
      document.addEventListener(evt, handleFirstInteraction, { capture: true })
    })

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true)
        document.removeEventListener(evt, handleFirstInteraction, true)
      })
    }
  }, [autoPlay, src])

  // Listen for custom trigger event when Ver Invitación is clicked
  useEffect(() => {
    const handleCustomPlay = () => {
      if (src && audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      } else {
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(() => {})
        }
        setIsPlaying(true)
      }
    }

    window.addEventListener('play-wedding-music', handleCustomPlay)
    return () => {
      window.removeEventListener('play-wedding-music', handleCustomPlay)
    }
  }, [src])

  const togglePlay = () => {
    if (src && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      } else {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    } else {
      setIsPlaying((prev) => !prev)
    }
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <button
        onClick={togglePlay}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg transition-all duration-300 border cursor-pointer ${
          isPlaying
            ? 'bg-[var(--surface-card)] text-[var(--color-moss)] border-[var(--color-sage)] shadow-[var(--shadow-watercolor)]'
            : 'bg-[var(--color-sage)] text-white border-transparent hover:bg-[var(--color-moss)]'
        }`}
        aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
        title={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-blush)] opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isPlaying ? 'bg-[var(--color-sage)]' : 'bg-white'
            }`}
          ></span>
        </span>

        <AudioWaveIcon className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />

        <span className="text-xs font-medium uppercase tracking-widest font-[var(--font-sans)]">
          {isPlaying ? 'Música activa' : 'Música'}
        </span>
      </button>
    </div>
  )
}
