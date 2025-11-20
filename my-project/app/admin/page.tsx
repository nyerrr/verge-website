"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '../components/PageTransition'

export default function AdminPage() {
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is admin
    const userDataStr = localStorage.getItem('userData')
    
    if (!userDataStr) {
      // Not logged in - redirect to login
      router.push('/login')
      return
    }

    const user = JSON.parse(userDataStr)
    
    if (user.userType !== 'admin') {
      // Not an admin - redirect to home
      router.push('/')
      return
    }

    // User is admin - show page
    setUserData(user)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userData')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-black">Loading...</div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {userData?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Properties</h3>
              <p className="text-3xl font-bold text-green-600">456</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending</h3>
              <p className="text-3xl font-bold text-orange-600">23</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Manage Users
              </button>
              <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Properties
              </button>
              <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Reports
              </button>
              <button className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                Settings
              </button>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}