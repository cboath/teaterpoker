import { useAdmin } from './AdminContext'

export function useAdminFetch() {
  const { token, logout } = useAdmin()

  return async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })

    if (response.status === 401) {
      logout()
      throw new Error('Admin session expired, please log in again')
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || `Request failed: ${response.status}`)
    }

    return response
  }
}
