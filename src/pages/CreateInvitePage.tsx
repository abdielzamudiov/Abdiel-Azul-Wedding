import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InviteSummaryCard, { type AdminInvitation } from '../components/InviteSummaryCard'
import { useAdminAuth } from '../auth/AdminAuthContext'
import { API_BASE_URL } from '../config/api'
import { formatInvitationShareMessage } from '../config/weddingDetails'

interface AdminInvitationsResponse {
  invitations: AdminInvitation[]
  totalConfirmed: number
  totalAttendees: number
}

function CreateInvitePage() {
  const { logout, adminFetch } = useAdminAuth()
  const [data, setData] = useState<AdminInvitationsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [copiedInvitationId, setCopiedInvitationId] = useState<string | null>(null)
  const [copyErrorId, setCopyErrorId] = useState<string | null>(null)
  const [deletingInvitationId, setDeletingInvitationId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<{ invitationId: string; message: string } | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadInvitations() {
      setLoading(true)
      setError(false)

      try {
        const response = await adminFetch(`${API_BASE_URL}/api/admin/invitations`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Could not load invitations')
        }

        const result = (await response.json()) as AdminInvitationsResponse
        setData(result)
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') {
          return
        }

        setError(true)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadInvitations()
    return () => controller.abort()
  }, [adminFetch])

  async function copyInvitationLink(invitation: AdminInvitation) {
    const invitationUrl = `${window.location.origin}/invitation/${encodeURIComponent(invitation._id)}`
    const message = formatInvitationShareMessage(invitation.invitationCode, invitationUrl)

    try {
      await navigator.clipboard.writeText(message)
      setCopiedInvitationId(invitation._id)
      setCopyErrorId(null)
    } catch {
      setCopiedInvitationId(null)
      setCopyErrorId(invitation._id)
    }
  }

  async function deleteInvitation(invitation: AdminInvitation) {
    const confirmed = window.confirm(`¿Seguro que quieres eliminar la invitación "${invitation.invitationCode}"? Esta acción no se puede deshacer.`)
    if (!confirmed) return

    setDeletingInvitationId(invitation._id)
    setDeleteError(null)

    try {
      const response = await adminFetch(`${API_BASE_URL}/api/admin/invitations/${encodeURIComponent(invitation._id)}`, {
        method: 'DELETE',
      })

      if (response.status === 401) return
      if (response.status === 404) {
        setDeleteError({ invitationId: invitation._id, message: 'Esta invitación ya no existe.' })
        return
      }

      if (!response.ok) {
        throw new Error('No se pudo eliminar la invitación. Inténtalo de nuevo.')
      }

      const result = (await response.json()) as { deleted: boolean }
      if (!result.deleted) {
        throw new Error('El servidor no confirmó la eliminación. Inténtalo de nuevo.')
      }

      setData((current) => current && ({
        ...current,
        invitations: current.invitations.filter((item) => item._id !== invitation._id),
        totalConfirmed: Math.max(0, current.totalConfirmed - (invitation.status === 'confirmed' ? 1 : 0)),
        totalAttendees: Math.max(0, current.totalAttendees - invitation.people.filter((person) => person.answered && person.attending).length),
      }))
      setCopiedInvitationId((current) => current === invitation._id ? null : current)
      setCopyErrorId((current) => current === invitation._id ? null : current)
    } catch (requestError) {
      setDeleteError({
        invitationId: invitation._id,
        message: requestError instanceof Error ? requestError.message : 'Ocurrió un error al eliminar la invitación.',
      })
    } finally {
      setDeletingInvitationId(null)
    }
  }

  return (
    <main className="page-shell page-shell--with-form">
      <div className="page-shell__overlay" aria-hidden="true" />
      <section className="page-shell__content page-shell__content--panel">
        <div className="page-shell__header">
          <div>
            <p className="page-shell__eyebrow">Administración</p>
            <h1>Invitaciones</h1>
          </div>
          <div className="admin-dashboard__actions">
            <Link className="invite-form__button admin-dashboard__add-link" to="/admin/invitations/new">
              Agregar invitación
            </Link>
            <button className="page-shell__link admin-logout" onClick={logout} type="button">
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="admin-stats" aria-label="Resumen de confirmaciones">
          <div className="admin-stats__item">
            <span>Invitaciones confirmadas</span>
            <strong>{loading ? '...' : data?.totalConfirmed ?? 0}</strong>
          </div>
          <div className="admin-stats__item">
            <span>Asistentes confirmados</span>
            <strong>{loading ? '...' : data?.totalAttendees ?? 0}</strong>
          </div>
        </div>

        {loading && <p className="admin-state" role="status">Cargando invitaciones...</p>}
        {!loading && error && <p className="admin-state admin-state--error" role="alert">No pudimos cargar las invitaciones. Inténtalo de nuevo.</p>}
        {!loading && !error && data?.invitations.length === 0 && <p className="admin-state">Todavía no hay invitaciones.</p>}

        {!loading && !error && data && data.invitations.length > 0 && (
          <>
            <p className="invite-list__total">
              <span>Total de invitaciones <strong>{data.invitations.length}</strong></span>
              <span>Personas invitadas <strong>{data.invitations.reduce((total, invitation) => total + invitation.people.length, 0)}</strong></span>
            </p>
            <div className="invite-list">
              {data.invitations.map((invitation) => (
                <InviteSummaryCard
                  copied={copiedInvitationId === invitation._id}
                  copyError={copyErrorId === invitation._id}
                  invitation={invitation}
                  key={invitation._id}
                  onCopy={copyInvitationLink}
                  deleting={deletingInvitationId === invitation._id}
                  deleteError={deleteError?.invitationId === invitation._id ? deleteError.message : null}
                  onDelete={deleteInvitation}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default CreateInvitePage
