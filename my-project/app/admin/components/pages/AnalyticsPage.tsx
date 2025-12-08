"use client"

import type { User } from '@/app/admin/utils/types'

interface AnalyticsPageProps {
  userData: User
}

export default function AnalyticsPage({ userData }: AnalyticsPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Page Views</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">12,543</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Property Views</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">8,234</p>
          <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Inquiries</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">456</p>
          <p className="text-xs text-red-600 mt-2">↓ 3% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Conversion Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">5.5%</p>
          <p className="text-xs text-green-600 mt-2">↑ 1.2% from last month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Views Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Views Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-2">📊</p>
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-xs text-gray-400 mt-1">(Integrate with Chart.js or Recharts)</p>
            </div>
          </div>
        </div>

        {/* Revenue Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-2">💰</p>
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-xs text-gray-400 mt-1">(Integrate with Chart.js or Recharts)</p>
            </div>
          </div>
        </div>

        {/* Top Properties */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Properties</h3>
          <div className="space-y-3">
            {[
              { name: 'Luxury Condo Makati', views: 1234 },
              { name: 'Beach House Batangas', views: 987 },
              { name: 'Villa BGC', views: 765 },
              { name: 'Townhouse QC', views: 654 },
              { name: 'Apartment Pasig', views: 543 }
            ].map((prop, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{prop.name}</span>
                </div>
                <span className="text-sm text-gray-600">{prop.views} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity Heatmap</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-2">📅</p>
              <p className="text-gray-500">Heatmap visualization</p>
              <p className="text-xs text-gray-400 mt-1">(Show activity by day/hour)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Export to Excel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Export to PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Export to CSV
          </button>
        </div>
      </div>
    </div>
  )
}