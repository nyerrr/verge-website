"use client"

import { useState, useEffect } from 'react'
import type { User } from '@/app/admin/utils/types'

interface DashboardPageProps {
  userData: User
}

interface Stats {
  totalProperties: number
  activeUsers: number
  newInquiries: number
  revenue: string
}

export default function DashboardPage({ userData }: DashboardPageProps) {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    activeUsers: 0,
    newInquiries: 0,
    revenue: '₱0'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/dashboard/stats')
      // const data = await response.json()
      
      // Mock data for now
      setTimeout(() => {
        setStats({
          totalProperties: 245,
          activeUsers: 1429,
          newInquiries: 32,
          revenue: '₱45,200,000'
        })
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      setIsLoading(false)
    }
  }

  const statCards = [
    { 
      label: 'Total Properties', 
      value: stats.totalProperties, 
      icon: '🏠', 
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    { 
      label: 'Active Users', 
      value: stats.activeUsers, 
      icon: '👥', 
      color: 'green',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    { 
      label: 'New Inquiries', 
      value: stats.newInquiries, 
      icon: '💬', 
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    { 
      label: 'Total Revenue', 
      value: stats.revenue, 
      icon: '💰', 
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100'
    }
  ]

  const recentActivities = [
    { id: 1, text: 'New property "Luxury Condo" added', time: '5 minutes ago', icon: '🏠' },
    { id: 2, text: 'User john@example.com registered', time: '15 minutes ago', icon: '👤' },
    { id: 3, text: 'New inquiry received for Property #123', time: '1 hour ago', icon: '💬' },
    { id: 4, text: 'Property "Beach Villa" sold', time: '2 hours ago', icon: '✅' }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {userData.email}! Here's your overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div 
            key={idx} 
            className={`${stat.bgColor} p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                </p>
              </div>
              <div className={`${stat.iconBg} w-14 h-14 rounded-lg flex items-center justify-center text-2xl`}>
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
            {recentActivities.map((activity) => (
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
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-linear-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3">
              <span className="text-xl">➕</span>
              <span>Add New Property</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-linear-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3">
              <span className="text-xl">👥</span>
              <span>Manage Users</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-linear-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3">
              <span className="text-xl">💬</span>
              <span>View Inquiries</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-linear-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-lg transition text-gray-900 font-medium flex items-center space-x-3">
              <span className="text-xl">📈</span>
              <span>Generate Report</span>
            </button>
          </div>
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