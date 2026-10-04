import { CalendarIcon, LocationIcon } from './MonetIcons'
import { WEDDING_DETAILS } from '../config/weddingDetails'
import artistsGarden from '../assets/monet-artists-garden.png'
import waterLilies from '../assets/monet-water-lilies.png'

interface VenueLogisticsProps {
  venueName?: string
  address?: string
  cityState?: string
  googleMapsUrl?: string
  googleMapsEmbedUrl?: string
}

export function VenueLogistics({
  venueName = WEDDING_DETAILS.venueName,
  address = WEDDING_DETAILS.address,
  cityState = WEDDING_DETAILS.cityState,
  googleMapsUrl = WEDDING_DETAILS.googleMapsUrl,
  googleMapsEmbedUrl = WEDDING_DETAILS.googleMapsEmbedUrl,
}: VenueLogisticsProps) {

  const mapsAppUrl =
    googleMapsUrl ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${venueName}, ${address}`)}`

  const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
    'Boda ' + WEDDING_DETAILS.coupleNames,
  )}&dates=20261114T220000Z/20261115T080000Z&details=${encodeURIComponent(
    'Celebra con nosotros nuestra boda en ' + venueName + '.',
  )}&location=${encodeURIComponent(`${venueName}, ${address}, ${cityState}`)}`

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
          Ubicación & Detalles
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[var(--text-main)]">
          Lugar & Logística
        </h2>
        <div className="w-12 h-px bg-[var(--color-sage)] mx-auto opacity-50 my-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Venue & Google Maps Embed Card */}
        <div
          className="relative md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col justify-between space-y-6 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.91) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%), url(${artistsGarden})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--surface-tint)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-moss)] flex-shrink-0">
                <LocationIcon className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-sage)] font-semibold font-[var(--font-sans)]">
                  Recepción & Ceremonia
                </span>
                <h3 className="text-2xl font-serif font-medium text-[var(--text-main)]">
                  {venueName}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-[var(--font-sans)]">
              {address} — {cityState}
            </p>

            {/* Interactive Google Maps iFrame */}
            <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-inner relative">
              <iframe
                title={`Mapa de ubicación - ${venueName}`}
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <a
              href={mapsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-5 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[var(--color-sage)] text-white hover:bg-[var(--color-moss)] transition-all duration-300 shadow-sm cursor-pointer"
            >
              <LocationIcon className="w-4 h-4 mr-2" />
              Abrir Mapa en Google Maps App 📍
            </a>
          </div>
        </div>

        {/* Add to Calendar & Logistics Info */}
        <div
          className="relative md:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] flex flex-col justify-between space-y-6 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.91) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%), url(${waterLilies})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
          }}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--surface-tint)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-moss)]">
              <CalendarIcon className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-sage)] font-semibold font-[var(--font-sans)]">
                Agenda la Fecha
              </span>
              <h3 className="text-2xl font-serif font-medium text-[var(--text-main)] mt-1">
                {WEDDING_DETAILS.dateString}
              </h3>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-[var(--font-sans)]">
              Guarda este evento en tu calendario personal para recibir recordatorios automáticos.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.12em] bg-[var(--surface-tint)] text-[var(--color-moss)] border border-[var(--border-subtle)] hover:bg-[var(--color-sage)] hover:text-white transition-all duration-300 text-center"
            >
              Agregar a Google Calendar
            </a>
            <a
              href="/boda.ics"
              download="Boda-Abdiel-y-Esmeralda.ics"
              className="inline-flex items-center justify-center px-4 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.12em] bg-[var(--color-sage)] text-white hover:bg-[var(--color-moss)] transition-all duration-300 text-center cursor-pointer shadow-sm"
            >
              Agregar a Apple / iPhone Calendar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
