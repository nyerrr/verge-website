"use client"

import { useState, useEffect } from 'react'
import type { User } from '@/app/admin/utils/types'

interface InquiriesPageProps {
  userData: User
}

interface Inquiry {
  id: string
  customerName: string
  customerEmail: string
  propertyTitle: string
  message: string
  status: 'pending' | 'responded' | 'closed'
  date: string
}

export default function InquiriesPage({ userData }: InquiriesPageProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      // TODO: Replace with actual API call
      setTimeout(() => {
        setInquiries([
          {
            id: '1',
            customerName: 'Alice Johnson',
            customerEmail: 'alice@example.com',
            propertyTitle: 'Modern Villa in Makati',
            message: 'I would like to schedule a viewing for this property.',
            status: 'pending',
            date: '2024-12-05'
          },
          {
            id: '2',
            customerName: 'Bob Williams',
            customerEmail: 'bob@example.com',
            propertyTitle: 'Beach House in Batangas',
            message: 'Is this property still available? What are the payment terms?',
            status: 'responded',
            date: '2024-12-04'
          },
          {
            id: '3',
            customerName: 'Carol Davis',
            customerEmail: 'carol@example.com',
            propertyTitle: 'Condo Unit BGC',
            message: 'Can I get more photos of the unit?',
            status: 'closed',
            date: '2024-12-03'
          }
        ])
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
      setIsLoading(false)
    }
  }

  const filteredInquiries = inquiries.filter(
    inquiry => filterStatus === 'all' || inquiry.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'responded':
        return 'bg-blue-100 text-blue-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-600 mt-1">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {inquiries.filter(i => i.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Responded</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {inquiries.filter(i => i.status === 'responded').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Closed</p>
          <p className="text-2xl font-bold text-gray-600 mt-1">
            {inquiries.filter(i => i.status === 'closed').length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">All Inquiries</option>
          <option value="pending">Pending</option>
          <option value="responded">Responded</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-400 text-lg">No inquiries found</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{inquiry.propertyTitle}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    From: <span className="font-medium">{inquiry.customerName}</span> ({inquiry.customerEmail})
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                  <span className="text-sm text-gray-500">{new Date(inquiry.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">{inquiry.message}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                  Respond
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm">
                  Mark as Closed
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}