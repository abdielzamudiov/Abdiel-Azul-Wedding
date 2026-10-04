import heroImage from '../assets/abdiel&azul-flores-amarillas.jpg'
import { CountdownTimer } from './CountdownTimer'
import { WaterLilyMotif } from './MonetIcons'
import { WEDDING_DETAILS } from '../config/weddingDetails'

export function HeroCover() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between items-center text-center overflow-hidden bg-[var(--text-main)] text-white pb-10">
      {/* Background Couple Photo with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={`${WEDDING_DETAILS.brideName} & ${WEDDING_DETAILS.groomName}`}
          className="w-full h-full object-cover object-[52%_center] filter brightness-[0.88] contrast-[1.05]"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null
            target.src =
              'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,38,30,0.65)] via-[rgba(27,38,30,0.42)] to-[rgba(250,248,245,1)]" />
      </div>

      {/* Top Header Motif */}
      <div className="relative z-10 pt-10 sm:pt-14 px-4 space-y-3 max-w-2xl mx-auto">
        <WaterLilyMotif className="w-28 sm:w-36 h-auto mx-auto filter drop-shadow-md brightness-125" />
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-primrose)] font-semibold font-[var(--font-sans)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Nuestra Boda
        </p>
      </div>

      {/* Main Titles Overlay */}
      <div className="relative z-10 my-auto py-8 px-4 space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-medium tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
          {WEDDING_DETAILS.coupleNames}
        </h1>

        <div className="w-16 h-px bg-[var(--color-primrose)] mx-auto opacity-80 shadow-sm" />

        <div className="space-y-1.5 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
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

      {/* Real-Time Countdown Timer */}
      <div className="relative z-10 w-full pt-4">
        <CountdownTimer targetDate={WEDDING_DETAILS.targetDateISO} />
      </div>
    </section>
  )
}
