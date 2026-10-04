import heroImage from '../assets/abdiel&azul-rio-mirandose.jpg'
import { CountdownTimer } from './CountdownTimer'
import { WaterLilyMotif } from './MonetIcons'
import { WEDDING_DETAILS } from '../config/weddingDetails'

interface HeroCoverProps {
  isOpened?: boolean
  onOpen?: () => void
}

export function HeroCover({ isOpened = false, onOpen }: HeroCoverProps) {
  return (
    <section
      className={`relative w-full transition-all duration-700 flex flex-col justify-between items-center text-center overflow-hidden bg-[var(--text-main)] text-white ${
        isOpened ? 'min-h-[85vh] pb-10' : 'min-h-screen pb-16'
      }`}
    >
      {/* Background Couple Photo with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={`${WEDDING_DETAILS.brideName} & ${WEDDING_DETAILS.groomName}`}
          className="w-full h-full object-cover object-[48%_center] filter brightness-[0.85] md:brightness-[0.93] contrast-[1.05] transition-transform duration-1000"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src =
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,38,30,0.7)] via-[rgba(27,38,30,0.48)] to-[rgba(250,248,245,1)] md:from-[rgba(27,38,30,0.4)] md:via-[rgba(27,38,30,0.22)] md:to-[rgba(250,248,245,0.92)]" />
      </div>

      {/* Top Header Motif */}
      <div className="relative z-10 pt-12 sm:pt-16 px-4 space-y-3 max-w-2xl mx-auto">
        <WaterLilyMotif className="w-28 sm:w-36 h-auto mx-auto filter drop-shadow-md brightness-125" />
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-primrose)] font-semibold font-[var(--font-sans)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Nuestra Boda
        </p>
      </div>

      {/* Main Titles Overlay */}
      <div className="relative z-10 my-auto py-6 px-4 space-y-6 max-w-3xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-medium tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          {WEDDING_DETAILS.coupleNames}
        </h1>

        <div className="w-16 h-px bg-[var(--color-primrose)] mx-auto opacity-80 shadow-sm" />

        {/* Unopened State: "Ver Invitación ✉️" Button */}
        {!isOpened ? (
          <div className="pt-4 space-y-5 animate-fade-in">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/90 font-medium font-[var(--font-sans)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] max-w-md mx-auto">
              Tienen el honor de invitarle a celebrar su boda
            </p>
            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                onClick={onOpen}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.22em] bg-white/20 hover:bg-white/35 text-white backdrop-blur-md border border-white/50 shadow-2xl transition-all duration-300 transform hover:scale-108 cursor-pointer active:scale-98 group"
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
        ) : (
          /* Opened State: Date, Venue & Event Info */
          <div className="space-y-2 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] animate-fade-in-smooth">
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
        )}
      </div>

      {/* Real-Time Countdown Timer (Revealed when isOpened = true) */}
      {isOpened && (
        <div className="relative z-10 w-full pt-4 animate-fade-in-smooth">
          <CountdownTimer targetDate={WEDDING_DETAILS.targetDateISO} />
        </div>
      )}
    </section>
  )
}
