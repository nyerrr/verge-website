import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import type { User } from './types'

export const useAuth = () => {
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check NextAuth session first
        if (status === 'authenticated' && session?.user) {
          const userType = (session.user as any)?.userType
          if (userType === 'admin') {
            setUserData({
              id: (session.user as any).id || '',
              email: session.user.email || '',
              name: session.user.name || '',
              userType: userType
            })
            setIsLoading(false)
            return
          }
        }

        // Check localStorage for email/password login
        const userDataStr = localStorage.getItem('userData')
        if (!userDataStr) {
          if (status !== 'loading') {
            router.push('/login')
          }
          return
        }

        const user = JSON.parse(userDataStr)
        if (user.userType !== 'admin') {
          alert('⚠️ Access denied. Admin privileges required.')
          router.push('/')
          return
        }

        setUserData(user)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    if (status !== 'loading') {
      checkAuth()
    }
  }, [status, session, router])

  const logout = useCallback(() => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    router.push('/login')
  }, [router])

  return { userData, isLoading, logout }
}