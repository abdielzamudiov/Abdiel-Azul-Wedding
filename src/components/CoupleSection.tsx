import { HeartIcon, WaterLilyMotif } from './MonetIcons'
import couplePhoto from '../assets/abdiel&azul-viendonos-green-grass.jpg'
import japaneseFootbridge from '../assets/monet-japanese-footbridge.png'
import { WEDDING_DETAILS } from '../config/weddingDetails'

interface CoupleSectionProps {
  photoUrl?: string
  godParents?: string
}

export function CoupleSection({
  photoUrl,
  godParents = WEDDING_DETAILS.godParents,
}: CoupleSectionProps) {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Monet Japanese Footbridge Card Container */}
      <div
        className="relative bg-white rounded-2xl p-6 sm:p-12 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] overflow-hidden group hover:shadow-[var(--shadow-hover)] transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.91) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%), url(${japaneseFootbridge})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >

        {/* Top Water Lily Header Accent */}
        <div className="text-center mb-8 relative z-10">
          <WaterLilyMotif className="w-28 h-auto mx-auto opacity-85 animate-pulse-soft" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          {/* Couple Image Container */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[var(--shadow-card)] w-full max-w-sm group">
              <img
                src={photoUrl || couplePhoto}
                alt={WEDDING_DETAILS.coupleNames}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.onerror = null
                  target.src =
                    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,58,48,0.45)] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-0 right-0 text-center px-4 text-white">
                <p className="font-serif italic text-xl tracking-wide">
                  {WEDDING_DETAILS.brideName} & {WEDDING_DETAILS.groomName}
                </p>
              </div>
            </div>
          </div>

          {/* Religious Bible Quote & Parents Details */}
          <div className="md:col-span-7 space-y-8 text-center md:text-left">
            {/* Religious / Bible Quote */}
            <div className="relative pl-0 md:pl-6 border-l-0 md:border-l-2 border-[var(--color-blush)] space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--color-sage)]">
                <HeartIcon className="w-4 h-4 text-[var(--color-blush)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Nuestra Fe & Promesa
                </span>
              </div>
              <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--text-main)] leading-relaxed">
                {WEDDING_DETAILS.quoteText}
              </blockquote>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-moss)] font-medium">
                — {WEDDING_DETAILS.quoteSource}
              </p>
            </div>

            <div className="w-full h-px bg-[var(--border-subtle)]" />

            {/* Parents' Blessing */}
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium font-[var(--font-sans)]">
                Con la bendición de nuestros padres
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1 bg-[var(--surface-tint)] p-4 rounded-xl border border-[var(--border-subtle)]">
                  <p className="text-xs uppercase tracking-wider text-[var(--color-moss)] font-semibold">
                    Padres de la Novia
                  </p>
                  <p className="font-serif text-base font-medium text-[var(--text-main)]">
                    {WEDDING_DETAILS.brideParents}
                  </p>
                </div>

                <div className="space-y-1 bg-[var(--surface-tint)] p-4 rounded-xl border border-[var(--border-subtle)]">
                  <p className="text-xs uppercase tracking-wider text-[var(--color-moss)] font-semibold">
                    Padres del Novio
                  </p>
                  <p className="font-serif text-base font-medium text-[var(--text-main)]">
                    {WEDDING_DETAILS.groomParents}
                  </p>
                </div>
              </div>

              {/* Padrinos de Velación (Conditional Rendering) */}
              {Boolean(godParents && godParents.trim()) && (
                <div className="pt-2 text-center">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] font-medium">
                    Padrinos de Velación
                  </p>
                  <p className="font-serif text-base font-medium text-[var(--text-main)] mt-1">
                    {godParents}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
