import { useState, type FormEvent } from 'react'
import { CheckIcon, WaterLilyMotif } from './MonetIcons'
import womanWithParasol from '../assets/monet-woman-with-parasol.png'
import { WEDDING_DETAILS } from '../config/weddingDetails'
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
  isSubmitting?: boolean
  submitSuccess?: boolean
  submitMessage?: string
}

export function RsvpForm({
  invitationId,
  guestCount,
  guests,
  responseDeadlinePassed,
  onSubmit,
  isSubmitting = false,
  submitSuccess = false,
  submitMessage = '',
}: RsvpFormProps) {
  const normalizedGuests = guests.length
    ? guests.map((guest) => ({
        ...guest,
        key: guest.id ?? guest.name,
        status:
          guest.status ??
          (guest.attending === true
            ? ('accepted' as RsvpStatus)
            : guest.attending === false && guest.answered
            ? ('rejected' as RsvpStatus)
            : null),
      }))
    : [
        {
          key: 'guest-1',
          name: 'Invitado Especial',
          status: null as RsvpStatus,
        },
      ]

  const [attendance, setAttendance] = useState<Record<string, RsvpStatus>>(() =>
    Object.fromEntries(normalizedGuests.map((guest) => [guest.key, guest.status])),
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const submittedGuests = normalizedGuests.map((guest) => ({
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
    <section id="rsvp-section" className="w-full max-w-2xl mx-auto px-4 py-0">
      <div
        className="bg-white rounded-2xl p-6 sm:p-10 border border-[var(--border-subtle)] shadow-[var(--shadow-card)] overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.91) 0%, rgba(255, 255, 255, 0.94) 75%, rgba(255, 255, 255, 1) 100%), url(${womanWithParasol})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      >
          {/* Top Decorative Motif */}
          <div className="text-center mb-6">
            <WaterLilyMotif className="w-24 h-auto mx-auto mb-2 opacity-80" />
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-moss)] font-semibold font-[var(--font-sans)]">
              Confirmación de Asistencia
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[var(--text-main)] mt-1">
              ¿Nos Acompañas?
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-medium mt-1 font-[var(--font-sans)]">
              Esta invitación es para{' '}
              <strong className="text-[var(--text-main)]">{guestCount || normalizedGuests.length}</strong>{' '}
              {guestCount === 1 || normalizedGuests.length === 1 ? 'persona' : 'personas'}.
            </p>

            {/* Confirmation Deadline Disclaimer Badge */}
            <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--surface-tint)] border border-[var(--border-subtle)] mt-2.5 mb-1">
              <span className="text-xs">⏳</span>
              <p className="text-xs font-medium text-[var(--color-moss)] font-[var(--font-sans)]">
                Fecha límite para confirmar:{' '}
                <span className="font-semibold text-[var(--text-main)]">{WEDDING_DETAILS.rsvpDeadlineString}</span>
              </p>
            </div>

            {/* Polite Pass & Guest Scope Reminder Note */}
            <div className="bg-[var(--surface-tint)] p-4 rounded-xl border border-[var(--border-subtle)] text-center space-y-1.5 mt-4">
              <p className="text-xs font-semibold text-[var(--color-moss)] tracking-wide font-[var(--font-sans)] uppercase">
                🌸 Nota Importante sobre tus Pases
              </p>
              <p className="text-xs text-[var(--text-muted)] font-[var(--font-sans)] leading-relaxed italic">
                Apreciamos de corazón su apoyo reservando la asistencia únicamente para las personas nombradas en esta invitación.
              </p>
            </div>
          </div>

          {submitSuccess && (
            <div
              className="p-4 mb-6 rounded-xl bg-[var(--surface-tint)] border border-[var(--color-sage)] text-[var(--color-moss)] text-center space-y-2 animate-fade-in"
              role="status"
            >
              <div className="w-8 h-8 mx-auto rounded-full bg-[var(--color-sage)] text-white flex items-center justify-center">
                <CheckIcon className="w-5 h-5" />
              </div>
              <p className="font-serif font-medium text-lg text-[var(--text-main)]">
                ¡Muchas Gracias!
              </p>
              <p className="text-xs font-[var(--font-sans)]">
                {submitMessage || 'Tu respuesta ha sido enviada correctamente. ¡Esperamos celebrar juntos!'}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset disabled={responseDeadlinePassed || isSubmitting} className="space-y-4 border-0 p-0 m-0">
              <legend className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] font-semibold font-[var(--font-sans)] mb-3 block text-center w-full">
                Indica quiénes asistirán
              </legend>

              {normalizedGuests.map((guest) => (
                <div
                  key={guest.key}
                  className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-tint)] space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4 transition-colors hover:border-[var(--color-sage)]"
                >
                  <span className="font-serif font-medium text-lg text-[var(--text-main)] block sm:inline">
                    {guest.name}
                  </span>

                  {/* Choice Buttons: Sí asistiré vs No asistiré */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setAttendance((prev) => ({
                          ...prev,
                          [guest.key]: prev[guest.key] === 'accepted' ? null : 'accepted',
                        }))
                      }
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                        attendance[guest.key] === 'accepted'
                          ? 'bg-[var(--color-sage)] text-white border-[var(--color-sage)] shadow-sm'
                          : 'bg-white text-[var(--text-muted)] border-[var(--border-subtle)] hover:border-[var(--color-sage)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      Sí asistiré
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setAttendance((prev) => ({
                          ...prev,
                          [guest.key]: prev[guest.key] === 'rejected' ? null : 'rejected',
                        }))
                      }
                      className={`flex-1 sm:flex-initial px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                        attendance[guest.key] === 'rejected'
                          ? 'bg-[var(--color-blush)] text-[var(--text-main)] border-[var(--color-blush)] shadow-sm'
                          : 'bg-white text-[var(--text-muted)] border-[var(--border-subtle)] hover:border-[var(--color-blush)] hover:text-[var(--text-main)]'
                      }`}
                    >
                      No asistiré
                    </button>
                  </div>
                </div>
              ))}
            </fieldset>

            {/* Generous Spacing Between Guest List and Submit Button */}
            <div className="pt-6 mt-4 border-t border-[var(--border-subtle)]">
              {responseDeadlinePassed ? (
                <p className="text-xs text-[var(--color-moss)] text-center italic py-2">
                  El plazo para confirmar asistencia ha concluido.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[var(--color-sage)] text-white hover:bg-[var(--color-moss)] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sage)] cursor-pointer disabled:opacity-60 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Enviando Confirmación...
                    </span>
                  ) : (
                    'Enviar confirmación'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    )
  }

export default RsvpForm
