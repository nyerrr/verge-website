"use client"

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { useAuth } from './utils/hooks'

// Import all page components
import DashboardPage from './components/pages/DashboardPage'
import PropertiesPage from './components/pages/PropertiesPage'
import UsersPage from './components/pages/UsersPage'
import InquiriesPage from './components/pages/InquiriesPage'
import AnalyticsPage from './components/pages/AnalyticsPage'
import SettingsPage from './components/pages/SettingsPage'

export default function AdminPage() {
  const { userData, isLoading, logout } = useAuth()

  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('properties')

  // ============================================
  // PAGE ROUTING
  // ============================================
  const renderPage = () => {
    if (!userData) return null

    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage userData={userData} />
      case 'properties':
        return <PropertiesPage userData={userData} />
      case 'users':
        return <UsersPage userData={userData} />
      case 'inquiries':
        return <InquiriesPage userData={userData} />
      case 'analytics':
        return <AnalyticsPage userData={userData} />
      case 'settings':
        return <SettingsPage userData={userData} />
      default:
        return <DashboardPage userData={userData} />
    }
  }

  // ============================================
  // RENDER: LOADING STATE
  // ============================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-gray-700">Loading admin panel...</p>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  // ============================================
  // RENDER: MAIN UI
  // ============================================
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userData={userData}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar
          onMenuClick={() => setIsSidebarOpen(true)}
          onLogout={logout}
          userData={userData}
        />

        {/* Main Content - Dynamic Page Rendering */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
} 