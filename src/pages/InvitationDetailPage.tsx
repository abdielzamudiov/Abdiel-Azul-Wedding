import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
import { WEDDING_DETAILS } from '../config/weddingDetails'
import { AudioPlayer } from '../components/AudioPlayer'
import { HeroCover } from '../components/HeroCover'
import { CoupleSection } from '../components/CoupleSection'
import { ItineraryTimeline } from '../components/ItineraryTimeline'
import { VenueLogistics } from '../components/VenueLogistics'
import { DressCodeSection } from '../components/DressCodeSection'
import { GiftRegistrySection } from '../components/GiftRegistrySection'
import { HeroInvitationCard } from '../components/HeroInvitationCard'
import RsvpForm, { type RsvpGuest, type RsvpResponse } from '../components/RsvpForm'
import { WaterLilyMotif } from '../components/MonetIcons'
import masterFrame from '../assets/monet-giverny-master-frame.png'

interface InvitationApiPerson {
  name: string
  attending: boolean
  answered: boolean
}

interface InvitationApiResponse {
  invitation: {
    _id: string
    invitationCode: string
    totalPasses: number
    status: 'pending' | 'confirmed' | 'declined'
    people: InvitationApiPerson[]
    respondedAt: string | null
  } | null
}

export function InvitationDetailPage() {
  const { id: routeInvitationId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const invitationId = routeInvitationId ?? searchParams.get('id')

  const [invitation, setInvitation] = useState<InvitationApiResponse['invitation'] | null>(null)
  const [loading, setLoading] = useState(Boolean(invitationId))
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    if (!invitationId) {
      return
    }

    let isMounted = true

    const fetchInvitation = async (currentInvitationId: string) => {
      setLoading(true)
      setSubmitState('idle')
      setSubmitMessage('')

      try {
        const response = await fetch(`${API_BASE_URL}/api/invitations/${encodeURIComponent(currentInvitationId)}`)

        if (!response.ok) {
          if (response.status === 404 && isMounted) {
            setInvitation(null)
            return
          }
          throw new Error('Request failed')
        }

        const data = (await response.json()) as InvitationApiResponse
        if (isMounted) {
          setInvitation(data.invitation ?? null)
        }
      } catch {
        if (isMounted) {
          setInvitation(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchInvitation(invitationId)

    return () => {
      isMounted = false
    }
  }, [invitationId])

  useEffect(() => {
    const codeOrGroup = invitation?.invitationCode || (invitationId && invitationId !== 'demo-invitation' ? invitationId : null)
    if (codeOrGroup) {
      document.title = `Invitación Especial - ${codeOrGroup} | ${WEDDING_DETAILS.coupleNames}`
    } else {
      document.title = `Nuestra Boda | ${WEDDING_DETAILS.coupleNames} 🌸`
    }
  }, [invitation, invitationId])

  async function handleSubmit(response: RsvpResponse) {
    if (invitationId && invitation) {
      setSubmitState('submitting')
      setSubmitMessage('')

      const payload = {
        people: response.guests
          .filter((guest) => guest.attending !== null)
          .map((guest) => ({
            name: guest.name,
            attending: guest.attending,
          })),
      }

      try {
        const responseApi = await fetch(
          `${API_BASE_URL}/api/invitations/${encodeURIComponent(invitationId)}/confirm`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          },
        )

        if (!responseApi.ok) {
          throw new Error('Submit failed')
        }

        const data = (await responseApi.json()) as InvitationApiResponse
        setInvitation(data.invitation ?? null)
        setSubmitState('success')
        setSubmitMessage('¡Muchas gracias! Tu respuesta ha sido guardada con éxito.')
      } catch {
        setSubmitState('error')
        setSubmitMessage('No pudimos enviar tu respuesta. Por favor inténtalo de nuevo.')
      }
    } else {
      setSubmitState('submitting')
      setTimeout(() => {
        setSubmitState('success')
        setSubmitMessage('¡Muchas gracias por confirmar tu asistencia! (Modo demostración)')
      }, 800)
    }
  }

  const peopleForRsvp: RsvpGuest[] = invitation?.people
    ? invitation.people.map((person) => ({
        id: person.name,
        name: person.name,
        attending: person.attending,
        answered: person.answered,
        status: person.attending ? 'accepted' : person.answered ? 'rejected' : null,
      }))
    : [
        { name: 'Invitado Principal', attending: undefined, answered: false, status: null },
        { name: 'Acompañante', attending: undefined, answered: false, status: null },
      ]

  const guestDisplayName = invitation?.invitationCode || invitation?.people?.[0]?.name
  const totalPasses = invitation?.totalPasses ?? invitation?.people?.length ?? 2

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg-canvas)] flex flex-col items-center justify-center p-6 text-center">
        <WaterLilyMotif className="w-24 h-auto mb-4 animate-pulse-soft" />
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-moss)] font-medium font-[var(--font-sans)]">
          Cargando Invitación
        </p>
        <h1 className="text-3xl font-serif font-medium text-[var(--text-main)] mt-2">
          Preparando la Experiencia Giverny...
        </h1>
      </main>
    )
  }

  return (
    <div id="invitation-background-layer" className="relative min-h-screen w-full overflow-x-hidden font-[var(--font-sans)] text-[var(--text-main)]">
      {/* Main Page Monet Giverny Background Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--bg-canvas)]">
        <img
          src={masterFrame}
          alt="Monet Giverny Floral Background"
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
      </div>

      {/* Floating Background Audio Player */}
      <AudioPlayer />

      {/* Hero Cover Banner: Couple Photo Background + Couple Names + Countdown Timer */}
      <HeroCover />

      {/* Couple Photo & Bible Quote Section with Animated Pastel Floral Frame */}
      <section className="relative z-10">
        <CoupleSection />
      </section>

      {/* Event Schedule & Itinerary */}
      <section className="relative z-10">
        <ItineraryTimeline />
      </section>

      {/* Venue & Logistics + Google Maps Embed for Jardín Belcanto */}
      <section className="relative z-10">
        <VenueLogistics />
      </section>

      {/* Dress Code Section */}
      <section className="relative z-10">
        <DressCodeSection />
      </section>

      {/* Gift Registry & Bank Details */}
      <section className="relative z-10">
        <GiftRegistrySection />
      </section>

      {/* RSVP Section: Personalized Paper Invitation Card & Form */}
      <section id="rsvp-section" className="pt-8 relative z-10">
        <div className="text-center mb-4 px-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
            Tu Invitación Personal
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[var(--text-main)]">
            Confirmación de Asistencia
          </h2>
          <div className="w-12 h-px bg-[var(--color-sage)] mx-auto opacity-50 my-2" />
        </div>

        {/* Paper Invitation Card in RSVP Section */}
        <HeroInvitationCard
          coupleNames={WEDDING_DETAILS.coupleNames}
          dateString={WEDDING_DETAILS.dateString}
          timeString={WEDDING_DETAILS.timeString}
          venueName={WEDDING_DETAILS.venueName}
          cityState={WEDDING_DETAILS.cityState}
          guestName={guestDisplayName}
          guestCount={totalPasses}
        />

        <RsvpForm
          invitationId={invitation?._id || 'demo-invitation'}
          guestCount={totalPasses}
          guests={peopleForRsvp}
          responseDeadlinePassed={false}
          onSubmit={handleSubmit}
          isSubmitting={submitState === 'submitting'}
          submitSuccess={submitState === 'success'}
          submitMessage={submitMessage}
        />
      </section>

      {/* Elegant Monet Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 py-8 text-center border-t border-[var(--border-subtle)] mt-8 space-y-4 relative z-10">
        <WaterLilyMotif className="w-24 h-auto mx-auto opacity-70" />
        <h3 className="font-serif italic text-2xl text-[var(--text-main)]">
          {WEDDING_DETAILS.coupleNames}
        </h3>
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {WEDDING_DETAILS.dateString} • {WEDDING_DETAILS.cityState}
        </p>
        <p className="text-[11px] text-[var(--color-moss)] pt-4 italic">
          Con todo nuestro amor, esperamos contar con tu valiosa presencia en {WEDDING_DETAILS.venueName}.
        </p>
      </footer>
    </div>
  )
}

export default InvitationDetailPage
