import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from './AdminAuthContext'
import { API_BASE_URL } from '../config/api'

const TOKEN_STORAGE_KEY = 'adminToken'
const TOKEN_EXPIRY_STORAGE_KEY = 'adminTokenExpiresAt'

interface AdminLoginResponse {
  token: string
  tokenType: string
  expiresIn: number
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    sessionStorage.removeItem(TOKEN_EXPIRY_STORAGE_KEY)
    setToken(null)
    setExpiresAt(null)
    navigate('/admin/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    const controller = new AbortController()

    async function restoreSession() {
      const storedToken = sessionStorage.getItem(TOKEN_STORAGE_KEY)
      const storedExpiry = Number(sessionStorage.getItem(TOKEN_EXPIRY_STORAGE_KEY))

      if (!storedToken || !Number.isFinite(storedExpiry) || storedExpiry <= Date.now()) {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY)
        sessionStorage.removeItem(TOKEN_EXPIRY_STORAGE_KEY)
        setIsInitializing(false)
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/invitations`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          signal: controller.signal,
        })

        if (response.status === 401) {
          sessionStorage.removeItem(TOKEN_STORAGE_KEY)
          sessionStorage.removeItem(TOKEN_EXPIRY_STORAGE_KEY)
          return
        }

        if (!response.ok) {
          return
        }

        setToken(storedToken)
        setExpiresAt(storedExpiry)
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return
      } finally {
        if (!controller.signal.aborted) {
          setIsInitializing(false)
        }
      }
    }

    restoreSession()
    return () => controller.abort()
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (response.status === 401) {
      return false
    }

    if (!response.ok) {
      throw new Error('Login request failed')
    }

    const data = (await response.json()) as AdminLoginResponse
    if (!data.token || data.tokenType.toLowerCase() !== 'bearer' || data.expiresIn <= 0) {
      throw new Error('Invalid login response')
    }

    const nextExpiry = Date.now() + data.expiresIn * 1000
    sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token)
    sessionStorage.setItem(TOKEN_EXPIRY_STORAGE_KEY, String(nextExpiry))
    setToken(data.token)
    setExpiresAt(nextExpiry)
    return true
  }, [])

  const adminFetch = useCallback(async (input: RequestInfo | URL, init?: RequestInit) => {
    if (!token || !expiresAt || Date.now() >= expiresAt) {
      logout()
      throw new Error('Admin session expired')
    }

    let requestInput = input
    if (typeof input === 'string' && input.startsWith('/')) {
      requestInput = `${API_BASE_URL}${input}`
    }

    const headers = new Headers(init?.headers)
    headers.set('Authorization', `Bearer ${token}`)
    const response = await fetch(requestInput, { ...init, headers })

    if (response.status === 401) {
      logout()
    }

    return response
  }, [expiresAt, logout, token])

  useEffect(() => {
    if (!expiresAt) {
      return
    }

    const timer = window.setTimeout(logout, Math.max(0, expiresAt - Date.now()))
    return () => window.clearTimeout(timer)
  }, [expiresAt, logout])

  return (
    <AdminAuthContext.Provider value={{ token, isInitializing, login, logout, adminFetch }}>
      {children}
    </AdminAuthContext.Provider>
  )
}