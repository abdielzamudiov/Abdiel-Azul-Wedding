import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import RsvpForm, { type RsvpGuest, type RsvpResponse } from '../components/RsvpForm'
import { API_BASE_URL } from '../config/api'

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

function InvitationDetailPage() {
  const { id: routeInvitationId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const invitationId = routeInvitationId ?? searchParams.get('id')

  const [invitation, setInvitation] = useState<InvitationApiResponse['invitation'] | null>(null)
  const [loading, setLoading] = useState(invitationId !== null)
  const [error, setError] = useState<'not-found' | 'network' | null>(null)
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  useEffect(() => {
    if (!invitationId) {
      return
    }

    const fetchInvitation = async (currentInvitationId: string) => {
      setLoading(true)
      setError(null)
      setSubmitState('idle')
      setSubmitMessage('')

      try {
        const response = await fetch(`${API_BASE_URL}/api/invitations/${encodeURIComponent(currentInvitationId)}`)

        if (!response.ok) {
          if (response.status === 404) {
            setInvitation(null)
            setError('not-found')
            return
          }

          throw new Error('Request failed')
        }

        const data = (await response.json()) as InvitationApiResponse
        setInvitation(data.invitation ?? null)

        if (!data.invitation) {
          setError('not-found')
        }
      } catch {
        setInvitation(null)
        setError('network')
      } finally {
        setLoading(false)
      }
    }

    fetchInvitation(invitationId)
  }, [invitationId])

  async function handleSubmit(response: RsvpResponse) {
    if (!invitationId || !invitation) {
      return
    }

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
      const responseApi = await fetch(`${API_BASE_URL}/api/invitations/${encodeURIComponent(invitationId)}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!responseApi.ok) {
        throw new Error('Submit failed')
      }

      const data = (await responseApi.json()) as InvitationApiResponse
      setInvitation(data.invitation ?? null)
      setSubmitState('success')
      setSubmitMessage('Gracias, tu respuesta ha sido enviada correctamente.')
      setError(null)
    } catch {
      setSubmitState('error')
      setSubmitMessage('No pudimos enviar tu respuesta. Inténtalo de nuevo.')
    }
  }

  const peopleForRsvp: RsvpGuest[] = (invitation?.people ?? []).map((person) => ({
    id: person.name,
    name: person.name,
    attending: person.attending,
    answered: person.answered,
    status: person.attending ? 'accepted' : person.answered ? 'rejected' : null,
  }))

  if (loading) {
    return (
      <main className="invitation">
        <div className="invitation__overlay" aria-hidden="true" />
        <section className="invitation__message" aria-labelledby="invitation-title">
          <p className="invitation__eyebrow">Cargando</p>
          <h1 id="invitation-title">Preparando tu invitación</h1>
          <p className="invitation__subtitle">Un momento más...</p>
        </section>
      </main>
    )
  }

  if (!invitationId) {
    return (
      <main className="invitation">
        <div className="invitation__overlay" aria-hidden="true" />
        <section className="invitation__message" aria-labelledby="invitation-title">
          <p className="invitation__eyebrow">Invitación no disponible</p>
          <h1 id="invitation-title">Falta el identificador</h1>
          <p className="invitation__subtitle">No se encontró una invitación válida en esta URL.</p>
        </section>
      </main>
    )
  }

  if (error === 'not-found') {
    return (
      <main className="invitation">
        <div className="invitation__overlay" aria-hidden="true" />
        <section className="invitation__message" aria-labelledby="invitation-title">
          <p className="invitation__eyebrow">Invitación no encontrada</p>
          <h1 id="invitation-title">No existe esta invitación</h1>
          <p className="invitation__subtitle">Verifica que el enlace sea correcto.</p>
        </section>
      </main>
    )
  }

  if (error === 'network') {
    return (
      <main className="invitation">
        <div className="invitation__overlay" aria-hidden="true" />
        <section className="invitation__message" aria-labelledby="invitation-title">
          <p className="invitation__eyebrow">Error de conexión</p>
          <h1 id="invitation-title">No pudimos cargar la invitación</h1>
          <p className="invitation__subtitle">Inténtalo de nuevo más tarde.</p>
        </section>
      </main>
    )
  }

  if (!invitation) {
    return null
  }

  return (
    <main className="invitation">
      <div className="invitation__overlay" aria-hidden="true" />
      <section className="invitation__message" aria-labelledby="invitation-title">
        <p className="invitation__eyebrow">Con mucho amor</p>
        <h1 id="invitation-title">Esta es mi invitación</h1>
        <p className="invitation__subtitle">Para celebrar juntos un momento especial</p>
        <span className="invitation__ornament" aria-hidden="true">✦</span>
      </section>

      {submitState === 'success' && (
        <div className="rsvp__success" role="status">
          {submitMessage}
        </div>
      )}

      {submitState === 'error' && (
        <div className="rsvp__error" role="alert">
          {submitMessage}
        </div>
      )}

      <RsvpForm
        invitationId={invitation._id}
        guestCount={invitation.people.length}
        guests={peopleForRsvp}
        responseDeadlinePassed={false}
        onSubmit={handleSubmit}
      />
    </main>
  )
}

export default InvitationDetailPage
