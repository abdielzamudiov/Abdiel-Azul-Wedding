import { Link } from 'react-router-dom'

export interface AdminInvitationPerson {
  name: string
  attending: boolean
  answered: boolean
}

export interface AdminInvitation {
  _id: string
  invitationCode: string
  totalPasses: number
  status: 'pending' | 'confirmed' | 'declined'
  people: AdminInvitationPerson[]
  respondedAt: string | null
}

interface InviteSummaryCardProps {
  invitation: AdminInvitation
  copied: boolean
  copyError: boolean
  onCopy: (invitationId: string) => void
  deleting: boolean
  deleteError: string | null
  onDelete: (invitation: AdminInvitation) => void
}

function InviteSummaryCard({ invitation, copied, copyError, onCopy, deleting, deleteError, onDelete }: InviteSummaryCardProps) {
  const confirmedGuests = invitation.people.filter((person) => person.answered && person.attending).length
  const statusLabel = invitation.status === 'confirmed'
    ? 'Confirmada'
    : invitation.status === 'declined'
      ? 'Rechazada'
      : 'Pendiente'

  return (
    <article className="invite-card">
      <div className="invite-card__header">
        <div>
          <p className="invite-card__label">Invitación</p>
          <div className="invite-card__code-row">
            <Link className="invite-card__code-link" to={`/invitation/${encodeURIComponent(invitation._id)}`}>
              <h3>{invitation.invitationCode}</h3>
            </Link>
            <button className="invite-list__copy" onClick={() => onCopy(invitation._id)} type="button">
              {copied ? '¡Link copiado!' : 'Copiar link de invitación'}
            </button>
            {copyError && <span className="invite-list__copy-error" role="alert">No se pudo copiar el link.</span>}
          </div>
        </div>
        <div className="invite-card__count" aria-label={`${confirmedGuests} confirmados`}>
          {confirmedGuests}
        </div>
      </div>

      <ul className="invite-card__guests">
        {invitation.people.map((person) => (
          <li key={person.name} className="invite-card__guest">
            <span>{person.name}</span>
            <strong>{!person.answered ? 'Pendiente' : person.attending ? 'Confirmado' : 'No asistirá'}</strong>
          </li>
        ))}
      </ul>
      <p className="invite-card__status">{statusLabel} · {invitation.totalPasses} pases</p>
      <div className="invite-card__delete-row">
        <Link
          className="invite-card__edit"
          to={`/admin/invitations/${encodeURIComponent(invitation._id)}/edit`}
        >
          Editar invitación
        </Link>
        <button
          className="invite-card__delete"
          disabled={deleting}
          onClick={() => onDelete(invitation)}
          type="button"
        >
          {deleting ? 'Eliminando...' : 'Eliminar invitación'}
        </button>
        {deleteError && <span className="invite-list__copy-error" role="alert">{deleteError}</span>}
      </div>
    </article>
  )
}

export default InviteSummaryCard
