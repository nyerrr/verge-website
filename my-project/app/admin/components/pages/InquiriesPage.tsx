"use client"
import { useState, useEffect } from 'react'
import type { User } from '@/app/admin/utils/types'

interface InquiriesPageProps {
  userData: User
  onNavigate?: (page: string) => void
}

interface Inquiry {
  id: string
  customerName: string
  customerEmail: string
  phoneNumber?: string
  propertyTitle: string
  message: string
  status: 'pending' | 'responded' | 'closed'
  date: string
}

export default function InquiriesPage({ userData }: InquiriesPageProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries')
      
      if (response.ok) {
        const data = await response.json()
        setInquiries(data.inquiries)
      } else {
        console.error('Failed to fetch inquiries')
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateInquiryStatus = async (id: string, status: 'responded' | 'closed') => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status })
      })

      if (response.ok) {
        // Update local state
        setInquiries(prev =>
          prev.map(inquiry =>
            inquiry.id === id ? { ...inquiry, status } : inquiry
          )
        )
      }
    } catch (error) {
      console.error('Failed to update inquiry:', error)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove from local state
        setInquiries(prev => prev.filter(inquiry => inquiry.id !== id))
      } else {
        alert('Failed to delete inquiry')
      }
    } catch (error) {
      console.error('Failed to delete inquiry:', error)
      alert('Failed to delete inquiry')
    } finally {
      setDeletingId(null)
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p className="text-gray-600 mt-1">Manage and respond to customer inquiries</p>
        </div>
        <button
          onClick={fetchInquiries}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {inquiries.length}
          </p>
        </div>
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
      <div className="text-black bg-white p-4 rounded-lg shadow-sm border border-gray-200">
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
            <div
              key={inquiry.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{inquiry.propertyTitle}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    From: <span className="font-medium">{inquiry.customerName}</span> ({inquiry.customerEmail})
                  </p>
                  {inquiry.phoneNumber && (
                    <p className="text-sm text-gray-600">
                      Phone: <span className="font-medium">{inquiry.phoneNumber}</span>
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                  <span className="text-sm text-gray-500">{new Date(inquiry.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => updateInquiryStatus(inquiry.id, 'responded')}
                  disabled={inquiry.status === 'responded' || inquiry.status === 'closed'}
                  className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Mark as Responded
                </button>
                <button
                  onClick={() => updateInquiryStatus(inquiry.id, 'closed')}
                  disabled={inquiry.status === 'closed'}
                  className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Close Inquiry
                </button>
                <button
                  onClick={() => deleteInquiry(inquiry.id)}
                  disabled={deletingId === inquiry.id}
                  className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                  {deletingId === inquiry.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}