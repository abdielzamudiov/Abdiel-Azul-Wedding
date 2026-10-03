import { createContext, useContext } from 'react'

interface AdminAuthContextValue {
  token: string | null
  isInitializing: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  adminFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  }

  return context
}