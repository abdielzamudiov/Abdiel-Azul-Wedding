import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../auth/AdminAuthContext'
import type { AdminInvitation } from '../components/InviteSummaryCard'
import { API_BASE_URL } from '../config/api'

interface CreateInvitationResponse {
  invitation: AdminInvitation
  url: string
}

interface ApiErrorResponse {
  error?: string
}

function NewInvitationPage() {
  const { adminFetch } = useAdminAuth()
  const [invitationCode, setInvitationCode] = useState('')
  const [guestName, setGuestName] = useState('')
  const [names, setNames] = useState<string[]>([])
  const [validationMessage, setValidationMessage] = useState('')
  const [requestError, setRequestError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [created, setCreated] = useState<CreateInvitationResponse | null>(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  function addGuest() {
    const trimmedName = guestName.trim()

    if (!trimmedName) {
      setValidationMessage('Escribe el nombre de una persona.')
      return
    }

    if (names.some((name) => name.toLocaleLowerCase() === trimmedName.toLocaleLowerCase())) {
      setValidationMessage('Ese nombre ya está en la lista.')
      return
    }

    setNames((current) => [...current, trimmedName])
    setGuestName('')
    setValidationMessage('')
    setRequestError('')
    setCreated(null)
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
    setCreated(null)

    const trimmedCode = invitationCode.trim()
    if (trimmedCode.length > 80) {
      setValidationMessage('El código no puede superar los 80 caracteres.')
      return
    }

    const uniqueNames = names.map((name) => name.trim()).filter(Boolean)
    if (uniqueNames.length === 0) {
      setValidationMessage('Agrega al menos una persona a la invitación.')
      return
    }

    if (new Set(uniqueNames.map((name) => name.toLocaleLowerCase())).size !== uniqueNames.length) {
      setValidationMessage('Los nombres de la invitación deben ser únicos.')
      return
    }

    setSubmitting(true)

    try {
      const body: { names: string[]; invitationCode?: string } = { names: uniqueNames }
      if (trimmedCode) {
        body.invitationCode = trimmedCode
      }

      const response = await adminFetch(`${API_BASE_URL}/api/admin/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.status === 401) {
        return
      }

      if (!response.ok) {
        const details = await response.json().catch(() => ({})) as ApiErrorResponse
        if (response.status === 409) {
          setRequestError(details.error ?? 'Ese código de invitación ya está en uso.')
        } else if (response.status === 400) {
          setRequestError(details.error ?? 'Revisa los datos de la invitación e inténtalo de nuevo.')
        } else {
          setRequestError(details.error ?? 'No se pudo crear la invitación. Inténtalo de nuevo.')
        }
        return
      }

      const result = (await response.json()) as CreateInvitationResponse
      setCreated(result)
      setCopied(false)
      setCopyError(false)
    } catch {
      setRequestError('No pudimos conectar con el servidor. Inténtalo de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleResetForm() {
    setInvitationCode('')
    setGuestName('')
    setNames([])
    setValidationMessage('')
    setRequestError('')
    setSubmitting(false)
    setCreated(null)
    setCopied(false)
    setCopyError(false)
  }

  async function copyCreatedUrl() {
    if (!created) return

    try {
      await navigator.clipboard.writeText(created.url)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopied(false)
      setCopyError(true)
    }
  }

  return (
    <main className="page-shell page-shell--with-form">
      <div className="page-shell__overlay" aria-hidden="true" />
      <section className="page-shell__content page-shell__content--panel" aria-labelledby="new-invitation-title">
        <div className="page-shell__header">
          <div>
            <p className="page-shell__eyebrow">Administración</p>
            <h1 id="new-invitation-title">Agregar invitación</h1>
          </div>
          <Link className="page-shell__link" to="/admin">Ver invitaciones</Link>
        </div>

        <form className="invite-form" onSubmit={handleSubmit}>
          <label className="admin-login__field">
            <span>Código de invitación personalizado <small>(opcional)</small></span>
            <input
              className="invite-form__input"
              maxLength={80}
              onChange={(event) => setInvitationCode(event.target.value)}
              placeholder="Familia Rodriguez, Emi..."
              value={invitationCode}
            />
          </label>

          <div className="admin-login__field">
            <label htmlFor="new-guest-name">Personas invitadas</label>
            <div className="invite-form__row">
              <input
                className="invite-form__input"
                id="new-guest-name"
                onChange={(event) => setGuestName(event.target.value)}
                onKeyDown={handleGuestKeyDown}
                placeholder="Nombre de la persona"
                value={guestName}
              />
              <button className="invite-form__button invite-form__button--secondary" onClick={addGuest} type="button">
                Añadir persona
              </button>
            </div>
          </div>

          {names.length === 0 ? (
            <p className="invite-form__empty">Aún no agregas personas.</p>
          ) : (
            <ul className="new-invitation__guest-list">
              {names.map((name, index) => (
                <li className="new-invitation__guest" key={`${name}-${index}`}>
                  <span>{name}</span>
                  <button
                    aria-label={`Quitar a ${name}`}
                    className="new-invitation__remove"
                    onClick={() => {
                      setNames((current) => current.filter((_, currentIndex) => currentIndex !== index))
                      setCreated(null)
                    }}
                    type="button"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}

          {validationMessage && <p className="admin-login__error" role="alert">{validationMessage}</p>}
          {requestError && <p className="admin-login__error" role="alert">{requestError}</p>}

          <button className="invite-form__button" disabled={submitting} type="submit">
            {submitting ? 'Creando invitación...' : 'Crear invitación'}
          </button>
        </form>

        {created && (
          <section className="new-invitation__success" aria-labelledby="created-invitation-title" role="status">
            <p className="page-shell__eyebrow">Invitación creada</p>
            <h2 id="created-invitation-title">{created.invitation.invitationCode}</h2>
            <p className="new-invitation__url">{created.url}</p>
            <div className="new-invitation__actions">
              <Link className="invite-form__button" to={`/invitation/${encodeURIComponent(created.invitation._id)}`}>
                Abrir invitación
              </Link>
              <button className="invite-form__button invite-form__button--secondary" onClick={copyCreatedUrl} type="button">
                {copied ? '¡Link copiado!' : 'Copiar link'}
              </button>
              <button className="invite-form__button invite-form__button--secondary" onClick={handleResetForm} type="button">
                Crear otra invitación
              </button>
            </div>
            {copyError && <p className="admin-login__error" role="alert">No se pudo copiar el link.</p>}
          </section>
        )}
      </section>
    </main>
  )
}

export default NewInvitationPage