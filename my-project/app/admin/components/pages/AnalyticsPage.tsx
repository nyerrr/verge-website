"use client"
import { useState, useEffect } from 'react'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import type { User } from '@/app/admin/utils/types'

interface AnalyticsPageProps {
  userData: User
}

interface Inquiry {
  id: string
  customerName: string
  customerEmail: string
  phoneNumber?: string
  propertyTitle: string
  message: string
  status: string
  date: string
}

interface Property {
  id: string
  title: string
  category: string
  status: string
  type: string
  price: string
  createdAt: string
}

export default function AnalyticsPage({ userData }: AnalyticsPageProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('30days')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch inquiries
      const inquiriesRes = await fetch('/api/inquiries')
      if (inquiriesRes.ok) {
        const inquiriesData = await inquiriesRes.json()
        setInquiries(inquiriesData.inquiries)
      }

      // Fetch properties
      const propertiesRes = await fetch('/api/properties')
      if (propertiesRes.ok) {
        const propertiesData = await propertiesRes.json()
        setProperties(propertiesData.properties || [])
      }
    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate inquiry status distribution
  const getInquiryStatusData = () => {
    const pending = inquiries.filter(i => i.status === 'pending').length
    const responded = inquiries.filter(i => i.status === 'responded').length
    const closed = inquiries.filter(i => i.status === 'closed').length

    return [
      { name: 'Pending', value: pending, color: '#EAB308' },
      { name: 'Responded', value: responded, color: '#3B82F6' },
      { name: 'Closed', value: closed, color: '#6B7280' }
    ]
  }

  // Calculate property status distribution
  const getPropertyStatusData = () => {
    const available = properties.filter(p => p.status === 'available').length
    const sold = properties.filter(p => p.status === 'sold').length
    const pending = properties.filter(p => p.status === 'pending').length

    return [
      { name: 'Available', value: available, color: '#10B981' },
      { name: 'Sold', value: sold, color: '#EF4444' },
      { name: 'Pending', value: pending, color: '#F59E0B' }
    ]
  }

  // Calculate property categories
  const getPropertyCategoryData = () => {
    const categories = properties.reduce((acc, property) => {
      acc[property.category] = (acc[property.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }))
  }

  // Calculate timeline data
  const getTimelineData = () => {
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90
    const timeline = Array.from({ length: days }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (days - 1 - i))
      return date.toISOString().split('T')[0]
    })

    return timeline.map(date => {
      const inquiryCount = inquiries.filter(i => i.date.startsWith(date)).length
      const propertyCount = properties.filter(p => p.createdAt.startsWith(date)).length

      return {
        date: new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        inquiries: inquiryCount,
        properties: propertyCount
      }
    })
  }

  // Calculate monthly revenue (mock data - replace with actual)
  const getRevenueData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map(month => ({
      month,
      revenue: Math.floor(Math.random() * 500000) + 100000,
      target: 400000
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  const inquiryStatusData = getInquiryStatusData()
  const propertyStatusData = getPropertyStatusData()
  const propertyCategoryData = getPropertyCategoryData()
  const timelineData = getTimelineData()
  const revenueData = getRevenueData()

  // Calculate response rate
  const responseRate = inquiries.length > 0 
    ? ((inquiries.filter(i => i.status !== 'pending').length / inquiries.length) * 100).toFixed(1)
    : '0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your real estate business performance</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Properties</p>
              <p className="text-3xl font-bold mt-2">{properties.length}</p>
              <p className="text-blue-100 text-xs mt-2">
                {properties.filter(p => p.status === 'available').length} Available
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Inquiries</p>
              <p className="text-3xl font-bold mt-2">{inquiries.length}</p>
              <p className="text-green-100 text-xs mt-2">
                {inquiries.filter(i => i.status === 'pending').length} Pending
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Response Rate</p>
              <p className="text-3xl font-bold mt-2">{responseRate}%</p>
              <p className="text-purple-100 text-xs mt-2">
                Inquiry responses
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Properties Sold</p>
              <p className="text-3xl font-bold mt-2">
                {properties.filter(p => p.status === 'sold').length}
              </p>
              <p className="text-orange-100 text-xs mt-2">
                This month
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={timelineData}>
            <defs>
              <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProperties" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="inquiries" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorInquiries)" 
              name="Inquiries"
            />
            <Area 
              type="monotone" 
              dataKey="properties" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorProperties)" 
              name="Properties Added"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inquiry Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inquiry Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inquiryStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {inquiryStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Property Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {propertyStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Property Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={propertyCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Revenue"
                dot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#EF4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
          <div className="space-y-3">
            {inquiries.slice(0, 5).map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{inquiry.customerName}</p>
                  <p className="text-xs text-gray-500">{inquiry.propertyTitle}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  inquiry.status === 'responded' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {inquiry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Properties</h3>
          <div className="space-y-3">
            {properties.slice(0, 5).map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{property.title}</p>
                  <p className="text-xs text-gray-500">{property.category} - {property.price}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  property.status === 'available' ? 'bg-green-100 text-green-800' :
                  property.status === 'sold' ? 'bg-red-100 text-red-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {property.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}