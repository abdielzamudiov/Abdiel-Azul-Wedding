import {
  ChurchIcon,
  DanceIcon,
  GlassIcon,
  HeartIcon,
  MoonIcon,
  MusicIcon,
  RingsIcon,
  SparklesIcon,
  UtensilsIcon,
} from './MonetIcons'
import { WEDDING_DETAILS } from '../config/weddingDetails'

export interface ItineraryItem {
  time: string
  title: string
  subtitle: string
  location?: string
  description?: string
  icon: 'church' | 'glass' | 'music' | 'rings' | 'utensils' | 'dance' | 'sparkles' | 'heart' | 'moon'
}

interface ItineraryTimelineProps {
  items?: ItineraryItem[]
  title?: string
  subtitle?: string
}

export function ItineraryTimeline({
  items = WEDDING_DETAILS.itinerary,
  title = WEDDING_DETAILS.itineraryTitle,
  subtitle = WEDDING_DETAILS.itinerarySubtitle,
}: ItineraryTimelineProps) {
  const getIcon = (type: ItineraryItem['icon']) => {
    switch (type) {
      case 'church':
        return <ChurchIcon className="w-5 h-5 text-[var(--color-moss)]" />
      case 'rings':
        return <RingsIcon className="w-5 h-5 text-[var(--color-moss)]" />
      case 'heart':
        return <HeartIcon className="w-4 h-4 text-[var(--color-blush)]" />
      case 'glass':
        return <GlassIcon className="w-5 h-5 text-[var(--color-moss)]" />
      case 'utensils':
        return <UtensilsIcon className="w-5 h-5 text-[var(--color-moss)]" />
      case 'dance':
        return <DanceIcon className="w-5 h-5 text-[var(--color-moss)]" />
      case 'sparkles':
        return <SparklesIcon className="w-5 h-5 text-[var(--color-moss)]" />
      case 'moon':
        return <MoonIcon className="w-5 h-5 text-[var(--color-periwinkle)]" />
      case 'music':
      default:
        return <MusicIcon className="w-5 h-5 text-[var(--color-moss)]" />
    }
  }

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
          {subtitle}
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[var(--text-main)]">
          {title}
        </h2>
        <div className="w-12 h-px bg-[var(--color-sage)] mx-auto opacity-50 my-2" />
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10 space-y-10 border-l border-[var(--border-subtle)] ml-4 sm:ml-28">
        {items.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node Icon/Dot */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-0.5 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-[var(--color-periwinkle)] shadow-sm group-hover:border-[var(--color-sage)] group-hover:scale-110 transition-all duration-300">
              {getIcon(item.icon)}
            </div>

            {/* Content Card */}
            <div className="relative bg-white rounded-xl p-5 sm:p-6 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[var(--surface-tint)] text-[var(--color-moss)] border border-[var(--border-subtle)] font-[var(--font-sans)]">
                  {item.time}
                </span>
                {item.location && (
                  <span className="text-xs text-[var(--text-muted)] font-medium font-[var(--font-sans)]">
                    📍 {item.location}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[var(--text-main)] mt-1">
                {item.title}
              </h3>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-sage)] font-semibold mb-2 font-[var(--font-sans)]">
                {item.subtitle}
              </p>
              {item.description && (
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-[var(--font-sans)]">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
