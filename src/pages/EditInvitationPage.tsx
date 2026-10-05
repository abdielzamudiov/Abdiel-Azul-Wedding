import { useEffect, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAdminAuth } from '../auth/AdminAuthContext'
import InviteSummaryCard, { type AdminInvitation } from '../components/InviteSummaryCard'
import { API_BASE_URL } from '../config/api'

interface AdminInvitationsResponse {
  invitations: AdminInvitation[]
  totalConfirmed: number
  totalAttendees: number
}

interface UpdateInvitationResponse {
  invitation: AdminInvitation
}

interface ApiErrorResponse {
  error?: string
}

export function EditInvitationPage() {
  const { id } = useParams<{ id: string }>()
  const { adminFetch } = useAdminAuth()

  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [originalInvitation, setOriginalInvitation] = useState<AdminInvitation | null>(null)

  // Form state
  const [names, setNames] = useState<string[]>([])
  const [totalPasses, setTotalPasses] = useState<number>(1)
  const [guestInput, setGuestInput] = useState('')

  // Validation & Submit status
  const [validationMessage, setValidationMessage] = useState('')
  const [requestError, setRequestError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [updatedInvitation, setUpdatedInvitation] = useState<AdminInvitation | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // Load invitation details
  useEffect(() => {
    if (!id) return

    const controller = new AbortController()

    async function loadInvitation() {
      setLoading(true)
      setFetchError(null)

      try {
        const response = await adminFetch(`${API_BASE_URL}/api/admin/invitations`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de invitaciones.')
        }

        const result = (await response.json()) as AdminInvitationsResponse
        const target = result.invitations.find((item) => item._id === id)

        if (!target) {
          setFetchError('No se encontró la invitación solicitada.')
          return
        }

        setOriginalInvitation(target)
        setNames(target.people.map((p) => p.name))
        setTotalPasses(target.totalPasses)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setFetchError(err instanceof Error ? err.message : 'Error al cargar la invitación.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadInvitation()
    return () => controller.abort()
  }, [id, adminFetch])

  // Helpers to detect changes
  const originalNames = originalInvitation ? originalInvitation.people.map((p) => p.name) : []
  const hasNamesChanged =
    names.length !== originalNames.length ||
    names.some((name, index) => name !== originalNames[index])
  const hasPassesChanged = originalInvitation ? totalPasses !== originalInvitation.totalPasses : false

  const isResponded = originalInvitation
    ? originalInvitation.status !== 'pending' || originalInvitation.people.some((p) => p.answered)
    : false

  function addGuest() {
    const trimmed = guestInput.trim()
    if (!trimmed) {
      setValidationMessage('Escribe el nombre de la persona.')
      return
    }

    if (names.some((n) => n.toLocaleLowerCase() === trimmed.toLocaleLowerCase())) {
      setValidationMessage('Ese nombre ya está en la lista de la invitación.')
      return
    }

    const nextNames = [...names, trimmed]
    setNames(nextNames)

    // Automatically keep totalPasses matching names count if names were previously in sync
    if (totalPasses === names.length) {
      setTotalPasses(nextNames.length)
    }

    setGuestInput('')
    setValidationMessage('')
    setRequestError('')
    setUpdatedInvitation(null)
  }

  function removeGuest(indexToRemove: number) {
    const nextNames = names.filter((_, idx) => idx !== indexToRemove)
    setNames(nextNames)

    if (totalPasses === names.length && nextNames.length > 0) {
      setTotalPasses(nextNames.length)
    }

    setValidationMessage('')
    setRequestError('')
    setUpdatedInvitation(null)
  }

  function handleGuestKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      addGuest()
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setValidationMessage('')
    setRequestError('')
    setUpdatedInvitation(null)

    if (!id || !originalInvitation) return

    if (!hasNamesChanged && !hasPassesChanged) {
      setValidationMessage('No has realizado ningún cambio en la invitación.')
      return
    }

    const uniqueNames = names.map((n) => n.trim()).filter(Boolean)

    // If names changed, validate names rules
    if (hasNamesChanged) {
      if (uniqueNames.length === 0) {
        setValidationMessage('Agrega al menos una persona a la invitación.')
        return
      }

      if (new Set(uniqueNames.map((n) => n.toLocaleLowerCase())).size !== uniqueNames.length) {
        setValidationMessage('Los nombres de los invitados deben ser únicos.')
        return
      }

      if (totalPasses !== uniqueNames.length) {
        setValidationMessage(
          `La cantidad de pases (${totalPasses}) debe coincidir con el número de personas (${uniqueNames.length}) cuando se modifican los nombres.`
        )
        return
      }
    }

    if (totalPasses < 1) {
      setValidationMessage('La cantidad de pases debe ser al menos 1.')
      return
    }

    // Warn if names are being changed on an already responded invitation
    if (hasNamesChanged && isResponded) {
      const confirmReset = window.confirm(
        '⚠️ ADVERTENCIA: Esta invitación ya tiene respuestas registradas.\n\nAl modificar la lista de invitados, las respuestas de RSVP se reiniciarán a "Pendiente".\n\n¿Deseas continuar?'
      )
      if (!confirmReset) return
    }

    setSubmitting(true)

    try {
      const body: { names?: string[]; totalPasses?: number } = {}

      if (hasNamesChanged) {
        body.names = uniqueNames
        body.totalPasses = totalPasses
      } else if (hasPassesChanged) {
        // Send ONLY totalPasses so backend preserves existing RSVP answers
        body.totalPasses = totalPasses
      }

      const response = await adminFetch(
        `${API_BASE_URL}/api/admin/invitations/${encodeURIComponent(id)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )

      if (response.status === 401) {
        return
      }

      if (!response.ok) {
        const details = (await response.json().catch(() => ({}))) as ApiErrorResponse
        if (response.status === 400) {
          setRequestError(
            details.error ?? 'Petición inválida o discrepancia entre pases y nombres.'
          )
        } else if (response.status === 404) {
          setRequestError(details.error ?? 'No se encontró la invitación.')
        } else if (response.status === 409) {
          setRequestError(details.error ?? 'El código de la invitación ya está en uso.')
        } else {
          setRequestError(details.error ?? 'No se pudo actualizar la invitación.')
        }
        return
      }

      const result = (await response.json()) as UpdateInvitationResponse
      setOriginalInvitation(result.invitation)
      setUpdatedInvitation(result.invitation)
      setNames(result.invitation.people.map((p) => p.name))
      setTotalPasses(result.invitation.totalPasses)
    } catch {
      setRequestError('No pudimos conectar con el servidor. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  async function copyLink(invitationId: string) {
    const url = `${window.location.origin}/invitation/${encodeURIComponent(invitationId)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 3000)
    } catch {
      setCopiedLink(false)
    }
  }

  if (loading) {
    return (
      <main className="page-shell page-shell--with-form">
        <div className="page-shell__overlay" aria-hidden="true" />
        <section className="page-shell__content page-shell__content--panel">
          <p className="admin-state" role="status">Cargando detalles de la invitación...</p>
        </section>
      </main>
    )
  }

  if (fetchError || !originalInvitation) {
    return (
      <main className="page-shell page-shell--with-form">
        <div className="page-shell__overlay" aria-hidden="true" />
        <section className="page-shell__content page-shell__content--panel">
          <div className="page-shell__header">
            <div>
              <p className="page-shell__eyebrow">Administración</p>
              <h1>Editar Invitación</h1>
            </div>
            <Link className="page-shell__link" to="/admin">Volver a invitaciones</Link>
          </div>
          <p className="admin-state admin-state--error" role="alert">
            {fetchError || 'No se pudo encontrar la invitación.'}
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell page-shell--with-form">
      <div className="page-shell__overlay" aria-hidden="true" />
      <section className="page-shell__content page-shell__content--panel" aria-labelledby="edit-invitation-title">
        <div className="page-shell__header">
          <div>
            <p className="page-shell__eyebrow">Administración</p>
            <h1 id="edit-invitation-title">Editar invitación</h1>
            <p className="page-shell__subtitle">Código: <strong>{originalInvitation.invitationCode}</strong></p>
          </div>
          <Link className="page-shell__link" to="/admin">Ver invitaciones</Link>
        </div>

        {isResponded && (
          <div className="admin-login__error" style={{ marginBottom: '16px', background: 'rgba(245, 230, 210, 0.6)', color: '#7a4e10', borderLeftColor: '#d9822b' }} role="status">
            ⚠️ <strong>Nota:</strong> Esta invitación ya fue respondida ({originalInvitation.status === 'confirmed' ? 'Confirmada' : 'Rechazada'}).
            Si modificas la lista de personas, sus respuestas de RSVP se reiniciarán a <em>Pendiente</em>.
            Si solo cambias la cantidad de pases, las respuestas se mantendrán intactas.
          </div>
        )}

        <form className="invite-form" onSubmit={handleSubmit}>
          <div className="admin-login__field">
            <label htmlFor="guest-input-field">
              <span>Invitados de esta tarjeta</span>
            </label>
            <div className="invite-form__row">
              <input
                id="guest-input-field"
                className="invite-form__input"
                onChange={(event) => setGuestInput(event.target.value)}
                onKeyDown={handleGuestKeyDown}
                placeholder="Ej. Alex Morgan"
                type="text"
                value={guestInput}
              />
              <button className="invite-form__button invite-form__button--secondary" onClick={addGuest} type="button">
                Agregar persona
              </button>
            </div>
          </div>

          <div className="admin-login__field">
            <span>Lista de personas ({names.length})</span>
            {names.length === 0 ? (
              <p className="invite-form__empty">No hay personas en esta invitación.</p>
            ) : (
              <ul className="new-invitation__guest-list">
                {names.map((name, index) => (
                  <li key={`${name}-${index}`} className="new-invitation__guest">
                    <span>{name}</span>
                    <button
                      className="new-invitation__remove"
                      onClick={() => removeGuest(index)}
                      type="button"
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="admin-login__field">
            <label htmlFor="passes-count-field">
              <span>Cantidad total de pases</span>
            </label>
            <input
              id="passes-count-field"
              className="invite-form__input"
              type="number"
              min={1}
              max={20}
              value={totalPasses}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10)
                setTotalPasses(isNaN(val) ? 0 : val)
                setValidationMessage('')
                setRequestError('')
                setUpdatedInvitation(null)
              }}
            />
            {hasNamesChanged && totalPasses !== names.length && (
              <p className="invite-list__copy-error" style={{ margin: 0 }}>
                💡 Al cambiar la lista de nombres, el total de pases debe ser igual a la cantidad de personas ({names.length}).
              </p>
            )}
          </div>

          {validationMessage && (
            <p className="admin-login__error" role="alert">{validationMessage}</p>
          )}

          {requestError && (
            <p className="admin-login__error" role="alert">{requestError}</p>
          )}

          <div className="admin-login__actions">
            <button className="invite-form__button" disabled={submitting} type="submit">
              {submitting ? 'Guardando cambios...' : 'Guardar cambios'}
            </button>
          </div>
        </form>

        {updatedInvitation && (
          <div className="new-invitation__success" role="status">
            <h2>¡Invitación actualizada!</h2>
            <p>Los cambios en la invitación de <strong>{updatedInvitation.invitationCode}</strong> han sido guardados correctamente.</p>
            <InviteSummaryCard
              invitation={updatedInvitation}
              copied={copiedLink}
              copyError={false}
              onCopy={copyLink}
              deleting={false}
              deleteError={null}
              onDelete={() => {}}
            />
          </div>
        )}
      </section>
    </main>
  )
}

export default EditInvitationPage

