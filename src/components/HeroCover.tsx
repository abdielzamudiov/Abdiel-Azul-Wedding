import heroImage from '../assets/abdiel&azul-rio-mirandose.jpg'
import { CountdownTimer } from './CountdownTimer'
import { WEDDING_DETAILS } from '../config/weddingDetails'

interface HeroCoverProps {
  isOpened?: boolean
  onOpen?: () => void
}

export function HeroCover({ isOpened = false, onOpen }: HeroCoverProps) {
  return (
    <section
      className={`relative w-full transition-all duration-1000 ease-in-out flex flex-col justify-between items-center text-center overflow-hidden bg-[var(--text-main)] text-white ${
        isOpened ? 'min-h-[85vh] pb-10 pt-10 sm:pt-14' : 'min-h-screen py-8 sm:py-12'
      }`}
    >
      {/* Background Couple Photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={`${WEDDING_DETAILS.brideName} & ${WEDDING_DETAILS.groomName}`}
          className="w-full h-full object-cover object-[48%_center] filter brightness-[0.88] md:brightness-[0.95] contrast-[1.05] transition-transform duration-1000"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src =
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80'
          }}
        />
        {/* Subtle & Elegant Gradient Overlay: Hidden (opacity-0) when unopened, smoothly fades in (opacity-100) when opened */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-gradient-to-b from-[rgba(27,38,30,0.7)] via-[rgba(27,38,30,0.48)] to-[rgba(250,248,245,1)] md:from-[rgba(27,38,30,0.4)] md:via-[rgba(27,38,30,0.22)] md:to-[rgba(250,248,245,0.92)] ${
            isOpened ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Title Section: "Nuestra Boda" & "Abdiel & Esmeralda" smoothly transition between top position and original centered position */}
      <div
        className={`relative z-10 px-4 space-y-3 max-w-3xl mx-auto flex flex-col items-center transition-all duration-1000 ease-in-out transform ${
          isOpened ? 'translate-y-4 sm:translate-y-8 my-auto' : 'translate-y-0 pt-2 sm:pt-4'
        }`}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-primrose)] font-semibold font-[var(--font-sans)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Nuestra Boda
        </p>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-medium tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] pt-1">
          {WEDDING_DETAILS.coupleNames}
        </h1>
        <div className="w-16 h-px bg-[var(--color-primrose)] mx-auto opacity-80 shadow-sm pt-1" />

        {/* Opened State Content: Date & Venue details smoothly fade in */}
        <div
          className={`space-y-2 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] transition-all duration-1000 ease-in-out ${
            isOpened
              ? 'opacity-100 translate-y-0 max-h-40 pt-4'
              : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden pointer-events-none'
          }`}
        >
          <p className="text-base sm:text-xl font-serif tracking-widest uppercase text-white font-medium">
            {WEDDING_DETAILS.dateString}
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[var(--color-primrose)] font-semibold">
            {WEDDING_DETAILS.timeString} • {WEDDING_DETAILS.venueName}
          </p>
          <p className="text-xs text-white/90 tracking-wide font-[var(--font-sans)]">
            {WEDDING_DETAILS.cityState}
          </p>
        </div>
      </div>

      {/* Flexible Middle Spacer for Unopened state */}
      <div
        className={`transition-all duration-1000 ease-in-out ${
          isOpened ? 'min-h-0 flex-0' : 'flex-1 min-h-[140px] sm:min-h-[200px]'
        }`}
      />

      {/* Unopened Bottom Section: Button and text smoothly fade out when opened */}
      <div
        className={`relative z-10 pb-4 sm:pb-6 px-4 space-y-4 max-w-3xl mx-auto flex flex-col items-center transition-all duration-700 ease-in-out ${
          isOpened
            ? 'opacity-0 translate-y-8 max-h-0 overflow-hidden pointer-events-none'
            : 'opacity-100 translate-y-0 max-h-60'
        }`}
      >
        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/90 font-medium font-[var(--font-sans)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] max-w-md mx-auto">
          Tienen el honor de invitarle a celebrar su boda
        </p>

        <div className="pt-1 flex flex-col items-center gap-3">
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.22em] bg-white/25 hover:bg-white/40 text-white backdrop-blur-md border border-white/60 shadow-2xl transition-all duration-300 transform hover:scale-108 cursor-pointer active:scale-98 group"
          >
            <span>Ver Invitación</span>
            <span className="text-base group-hover:translate-x-1 transition-transform">✉️</span>
          </button>
          <p className="text-[11px] text-white/80 font-[var(--font-sans)] tracking-wide flex items-center justify-center gap-1.5 pt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            <span>🎵</span>
            <span>Al abrir se reproducirá música de fondo</span>
          </p>
        </div>
      </div>

      {/* Real-Time Countdown Timer (Revealed when isOpened = true) */}
      <div
        className={`relative z-10 w-full pt-4 transition-all duration-1000 ease-in-out ${
          isOpened
            ? 'opacity-100 translate-y-0 max-h-48'
            : 'opacity-0 translate-y-6 max-h-0 overflow-hidden pointer-events-none'
        }`}
      >
        <CountdownTimer targetDate={WEDDING_DETAILS.targetDateISO} />
      </div>
    </section>
  )
}
