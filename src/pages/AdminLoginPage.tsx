import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../auth/AdminAuthContext'

function AdminLoginPage() {
  const { login, token, isInitializing } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<'invalid-credentials' | 'network' | null>(null)

  if (token) {
    return <Navigate to="/admin" replace />
  }

  if (isInitializing) {
    return (
      <main className="page-shell">
        <div className="page-shell__overlay" aria-hidden="true" />
        <section className="page-shell__content page-shell__content--login" role="status">
          <p className="page-shell__eyebrow">Administración</p>
          <h1 id="admin-login-title">Verificando sesión</h1>
          <p className="page-shell__subtitle">Un momento, por favor.</p>
        </section>
      </main>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const authenticated = await login(username, password)
      if (!authenticated) {
        setError('invalid-credentials')
        return
      }

      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      navigate(from && from !== '/admin/login' ? from : '/admin', { replace: true })
    } catch {
      setError('network')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page-shell">
      <div className="page-shell__overlay" aria-hidden="true" />
      <section className="page-shell__content page-shell__content--login" aria-labelledby="admin-login-title">
        <p className="page-shell__eyebrow">Administración</p>
        <h1 id="admin-login-title">Iniciar sesión</h1>
        <p className="page-shell__subtitle">Acceso privado</p>

        <form className="admin-login" onSubmit={handleSubmit}>
          <label className="admin-login__field">
            <span>Usuario</span>
            <input
              autoComplete="username"
              className="invite-form__input"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              required
              type="text"
              value={username}
            />
          </label>

          <label className="admin-login__field">
            <span>Contraseña</span>
            <input
              autoComplete="current-password"
              className="invite-form__input"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          {error === 'invalid-credentials' && (
            <p className="admin-login__error" role="alert">Usuario o contraseña incorrectos.</p>
          )}
          {error === 'network' && (
            <p className="admin-login__error" role="alert">No pudimos conectar. Inténtalo de nuevo.</p>
          )}

          <div className="admin-login__actions">
            <button className="invite-form__button" disabled={submitting} type="submit">
              {submitting ? 'Verificando...' : 'Entrar'}
            </button>
            <Link className="invite-form__button invite-form__button--secondary admin-login__add-link" to="/admin/invitations/new">
              Agregar invitación
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default AdminLoginPage