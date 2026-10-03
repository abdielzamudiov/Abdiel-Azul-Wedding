import { useState, type FormEvent } from 'react'
import './RsvpForm.css'

export type RsvpStatus = 'accepted' | 'rejected' | null

export interface RsvpGuest {
  id?: string
  name: string
  status?: RsvpStatus
  attending?: boolean
  answered?: boolean
}

export interface RsvpResponse {
  invitationId: string
  guests: Array<{
    id?: string
    name: string
    attending: boolean | null
    status: RsvpStatus
  }>
}

interface RsvpFormProps {
  invitationId: string
  guestCount: number
  guests: RsvpGuest[]
  responseDeadlinePassed: boolean
  onSubmit: (response: RsvpResponse) => void
}

function RsvpForm({
  invitationId,
  guestCount,
  guests,
  responseDeadlinePassed,
  onSubmit,
}: RsvpFormProps) {
  const normalizedGuests = guests.map((guest) => {
    const status =
      guest.status ??
      (guest.attending === true ? 'accepted' : guest.attending === false && guest.answered ? 'rejected' : null)

    return {
      ...guest,
      key: guest.id ?? guest.name,
      status,
    }
  })

  const [attendance, setAttendance] = useState<Record<string, RsvpStatus>>(() =>
    Object.fromEntries(normalizedGuests.map((guest) => [guest.key, guest.status])),
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const submittedGuests = normalizedGuests
      .filter((guest) => attendance[guest.key] !== null)
      .map((guest) => ({
        id: guest.id,
        name: guest.name,
        attending: attendance[guest.key] === 'accepted',
        status: attendance[guest.key] ?? null,
      }))

    onSubmit({
      invitationId,
      guests: submittedGuests,
    })
  }

  return (
    <section className="rsvp" aria-labelledby="rsvp-title">
      <div className="rsvp__heading">
        <p className="rsvp__eyebrow">Confirmación de asistencia</p>
        <h2 id="rsvp-title">¿Nos acompañas?</h2>
        <p className="rsvp__count">
          Esta invitación es para <strong>{guestCount}</strong>{' '}
          {guestCount === 1 ? 'persona' : 'personas'}.
        </p>
      </div>

      <form className="rsvp__form" onSubmit={handleSubmit}>
        <fieldset className="rsvp__list" disabled={responseDeadlinePassed}>
          <legend className="rsvp__legend">Indica quiénes asistirán</legend>
          {normalizedGuests.map((guest) => (
            <div className="rsvp__guest" key={guest.key}>
              <span className="rsvp__name">{guest.name}</span>
              <div className="rsvp__choices">
                <label className="rsvp__choice">
                  <input
                    aria-label={`${guest.name}: sí asistirá`}
                    checked={attendance[guest.key] === 'accepted'}
                    className="rsvp__checkbox"
                    onChange={(event) =>
                      setAttendance((current) => ({
                        ...current,
                        [guest.key]: event.target.checked ? 'accepted' : null,
                      }))
                    }
                    type="checkbox"
                  />
                  <span>Sí asistiré</span>
                </label>
                <label className="rsvp__choice">
                  <input
                    aria-label={`${guest.name}: no asistirá`}
                    checked={attendance[guest.key] === 'rejected'}
                    className="rsvp__checkbox"
                    onChange={(event) =>
                      setAttendance((current) => ({
                        ...current,
                        [guest.key]: event.target.checked ? 'rejected' : null,
                      }))
                    }
                    type="checkbox"
                  />
                  <span>No asistiré</span>
                </label>
              </div>
            </div>
          ))}
        </fieldset>

        {responseDeadlinePassed ? (
          <p className="rsvp__notice" role="status">
            El plazo para confirmar asistencia ha terminado.
          </p>
        ) : (
          <button className="rsvp__submit" type="submit">
            Enviar confirmación
          </button>
        )}
      </form>
    </section>
  )
}

export default RsvpForm
