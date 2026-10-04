import { WaterLilyMotif } from './MonetIcons'
import playingPhoto from '../assets/abdiel&azul-flores-amarillas-jugando-editada.jpg'
import artistsGarden from '../assets/monet-artists-garden.png'

interface HeroInvitationCardProps {
  coupleNames?: string
  dateString?: string
  timeString?: string
  venueName?: string
  cityState?: string
  guestName?: string
  guestCount?: number
  photoUrl?: string
}

export function HeroInvitationCard({
  coupleNames = 'Sofía & Alejandro',
  dateString = 'Sábado, 14 de Noviembre de 2026',
  timeString = '16:00 HRS',
  venueName = 'Hacienda Los Cerezos',
  cityState = 'Valle de Bravo, México',
  guestName,
  guestCount,
  photoUrl,
}: HeroInvitationCardProps) {

  return (
    <div className="w-full max-w-md md:max-w-xl mx-auto px-4 py-8">
      {/* Clean Paper Invitation Card */}
      <div
        className="relative bg-white rounded-2xl p-6 sm:p-10 text-center flex flex-col items-center justify-between min-h-[450px] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-hover)] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.91) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%), url(${artistsGarden})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
          {/* Top Decorative Motif */}
          <div className="pt-2 pb-2">
            <WaterLilyMotif className="w-28 sm:w-36 h-auto mx-auto" />
          </div>

          {/* Invitation Text Content */}
          <div className="space-y-4 my-auto w-full">
            {/* Prompt */}
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium font-[var(--font-sans)]">
              Junto con sus familias
            </p>

            {/* Couple's Names */}
            <h1 className="text-4xl sm:text-6xl font-serif italic font-medium text-[var(--text-main)] leading-[1.1] tracking-tight py-1">
              {coupleNames}
            </h1>

            {/* Featured Photo Banner */}
            <div className="w-full rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-sm h-48 sm:h-56 relative group my-3">
              <img
                src={photoUrl || playingPhoto}
                alt={coupleNames}
                className="w-full h-full object-cover object-[center_35%] transform scale-150 group-hover:scale-155 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,58,48,0.2)] via-transparent to-transparent opacity-80" />
            </div>

            {/* Personalized Guest Badge if provided */}
            {guestName && (
              <div className="inline-block mx-auto py-1 px-4 rounded-full bg-[var(--surface-tint)] border border-[var(--border-subtle)] my-2">
                <p className="text-xs font-medium text-[var(--color-moss)] tracking-wide">
                  Invitación especial para:{' '}
                  <span className="font-semibold text-[var(--text-main)]">{guestName}</span>
                  {guestCount ? ` (${guestCount} ${guestCount === 1 ? 'pase' : 'pases'})` : ''}
                </p>
              </div>
            )}

            <div className="w-12 h-px bg-[var(--color-sage)] mx-auto opacity-40 my-3" />

            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
              Tienen el honor de invitarle a su boda
            </p>

            {/* Date, Time, Venue */}
            <div className="pt-4 space-y-1.5 text-[var(--text-main)]">
              <p className="text-base sm:text-lg font-serif font-medium tracking-wide">
                {dateString}
              </p>
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] font-medium">
                {timeString}
              </p>
              <p className="text-sm font-medium pt-2 text-[var(--color-moss)] font-[var(--font-sans)]">
                {venueName}
              </p>
              <p className="text-xs text-[var(--text-muted)] font-[var(--font-sans)]">
                {cityState}
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

