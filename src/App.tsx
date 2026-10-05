import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import InvitationDetailPage from './pages/InvitationDetailPage'
import CreateInvitePage from './pages/CreateInvitePage'
import NewInvitationPage from './pages/NewInvitationPage'
import EditInvitationPage from './pages/EditInvitationPage'
import AdminLoginPage from './pages/AdminLoginPage'
import { AdminAuthProvider } from './auth/AdminAuth'
import { useAdminAuth } from './auth/AdminAuthContext'

function ProtectedAdminRoute() {
  const { token, isInitializing } = useAdminAuth()
  const location = useLocation()

  if (isInitializing) {
    return <main className="admin-session-check" role="status">Verificando sesión...</main>
  }

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<CreateInvitePage />} />
          <Route path="/admin/invitations/new" element={<NewInvitationPage />} />
          <Route path="/admin/invitations/:id/edit" element={<EditInvitationPage />} />
          <Route path="/create-invite" element={<Navigate to="/admin/invitations/new" replace />} />
        </Route>
        <Route path="/invitation" element={<InvitationDetailPage />} />
        <Route path="/invitation/:id" element={<InvitationDetailPage />} />
        <Route path="/invitaton/:id" element={<InvitationDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminAuthProvider>
  )
}

export default App
