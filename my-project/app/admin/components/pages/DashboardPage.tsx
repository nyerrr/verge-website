"use client"

import { useState, useEffect } from 'react'
import type { User } from '@/app/admin/utils/types'

interface DashboardPageProps {
  userData: User
  onNavigate: (page: string) => void
}

interface Activity {
  id: string
  text: string
  time: string
  icon: string
  type: string
}

interface DashboardStats {
  totalProperties: number
  availableProperties: number
  propertiesSold: number
  pendingProperties: number
  totalInquiries: number
  pendingInquiries: number
  responseRate: number
  revenue: string
  recentActivities: Activity[]
}

export default function DashboardPage({ userData, onNavigate }: DashboardPageProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardStats()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      
      if (data.success) {
        setStats(data.stats)
        setError(null)
      } else {
        setError('Failed to load dashboard data')
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      setError('Failed to connect to server')
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = stats ? [
    { 
      label: 'Total Properties', 
      value: stats.totalProperties, 
      subtext: `${stats.availableProperties} Available`,
      icon: '🏠', 
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    { 
      label: 'Properties Sold', 
      value: stats.propertiesSold, 
      subtext: `${stats.pendingProperties} Pending`,
      icon: '✅', 
      color: 'green',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    { 
      label: 'New Inquiries', 
      value: stats.pendingInquiries, 
      subtext: `${stats.totalInquiries} Total`,
      icon: '💬', 
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    { 
      label: 'Total Revenue', 
      value: stats.revenue, 
      subtext: `${stats.responseRate}% Response Rate`,
      icon: '💰', 
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100'
    }
  ] : []

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
        <button 
          onClick={fetchDashboardStats}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {userData.name || userData.email}! Here's your overview</p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div 
            key={idx} 
            className={`${stat.bgColor} p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
              </div>
              <div className={`${stat.iconBg} w-14 h-14 rounded-lg flex items-center justify-center text-2xl shrink-0`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {stats?.recentActivities && stats.recentActivities.length > 0 ? (
              stats.recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-8">No recent activity</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('properties')}
              className="w-full text-left px-4 py-3 bg-linear-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3"
            >
              <span className="text-xl">➕</span>
              <span>Add New Property</span>
            </button>
            <button 
              onClick={() => onNavigate('users')}
              className="w-full text-left px-4 py-3 bg-lineart-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3"
            >
              <span className="text-xl">👥</span>
              <span>Manage Users</span>
            </button>
            <button 
              onClick={() => onNavigate('inquiries')}
              className="w-full text-left px-4 py-3 bg-linear-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3"
            >
              <span className="text-xl">💬</span>
              <span>View Inquiries</span>
            </button>
            <button 
              onClick={() => onNavigate('analytics')}
              className="w-full text-left px-4 py-3 bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3"
            >
              <span className="text-xl">📈</span>
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Available Properties</h4>
            <span className="text-2xl">🏘️</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.availableProperties || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Ready for listing</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Pending Inquiries</h4>
            <span className="text-2xl">⏳</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.pendingInquiries || 0}</p>
          <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600">Response Rate</h4>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats?.responseRate || 0}%</p>
          <p className="text-xs text-gray-500 mt-1">Inquiry responses</p>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">💻</span>
          System Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Database</p>
              <p className="text-xs text-gray-500">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">API Server</p>
              <p className="text-xs text-gray-500">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Storage</p>
              <p className="text-xs text-gray-500">Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}